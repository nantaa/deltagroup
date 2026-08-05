<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseRegistration;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class CourseRegistrationController extends Controller
{
    /**
     * Public — create a registration, generate a Xendit invoice, return payment URL.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id'       => 'required|exists:courses,id',
            'name'            => 'required|string|max:255',
            'email'           => 'required|email|max:255',
            'whatsapp_number' => 'required|string|max:20',
            'company_name'    => 'nullable|string|max:255',
        ]);

        $course = Course::where('id', $validated['course_id'])
                        ->where('is_active', true)
                        ->firstOrFail();

        return DB::transaction(function () use ($validated, $course) {
            // 1. Create registration
            $registration = CourseRegistration::create([
                'course_id'       => $course->id,
                'name'            => $validated['name'],
                'email'           => $validated['email'],
                'whatsapp_number' => $validated['whatsapp_number'],
                'company_name'    => $validated['company_name'] ?? null,
                'status'          => 'pending',
            ]);

            // 2. Create transaction record
            $invoiceNumber = 'INV-' . now()->format('Ymd') . '-' . strtoupper(Str::random(6));

            $transaction = Transaction::create([
                'registration_id' => $registration->id,
                'invoice_number'  => $invoiceNumber,
                'amount'          => $course->price,
                'status'          => 'pending',
            ]);

            // 3. Call Xendit to create an invoice
            $successUrl = rtrim(env('XENDIT_SUCCESS_REDIRECT_URL', 'http://localhost:3000/checkout/success'), '/')
                        . '?invoice_number=' . $invoiceNumber;

            $failureUrl = env('XENDIT_FAILURE_REDIRECT_URL', 'http://localhost:3000/courses');

            $xenditResponse = Http::withBasicAuth(env('XENDIT_SECRET_KEY'), '')
                ->post('https://api.xendit.co/v2/invoices', [
                    'external_id'          => $invoiceNumber,
                    'amount'               => (int) $course->price,
                    'payer_email'          => $validated['email'],
                    'description'          => 'Pendaftaran Kursus: ' . $course->title,
                    'currency'             => 'IDR',
                    'invoice_duration'     => 86400, // 24 hours
                    'success_redirect_url' => $successUrl,
                    'failure_redirect_url' => $failureUrl,
                ]);

            if ($xenditResponse->failed()) {
                // Roll back on Xendit failure
                throw new \Exception('Failed to create Xendit invoice: ' . $xenditResponse->body());
            }

            $xenditData = $xenditResponse->json();

            $transaction->update([
                'xendit_invoice_id' => $xenditData['id'] ?? null,
                'payment_url'       => $xenditData['invoice_url'] ?? null,
            ]);

            return response()->json([
                'invoice_number' => $invoiceNumber,
                'payment_url'    => $xenditData['invoice_url'] ?? null,
            ], 201);
        });
    }

    /**
     * Admin — list all registrations with course and transaction data.
     */
    public function index(Request $request)
    {
        $query = CourseRegistration::with(['course:id,title,slug', 'transaction'])
            ->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('whatsapp_number', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%");
            });
        }

        $limit = $request->get('limit', 20);
        $registrations = $query->paginate($limit);

        // Append the resolved whatsapp_link accessor
        $registrations->getCollection()->transform(function ($reg) {
            $reg->append('whatsapp_link');
            return $reg;
        });

        return response()->json($registrations);
    }

    /**
     * Admin / External API — assign or override the WhatsApp invite link
     * for a specific registration.
     */
    public function updateWhatsappLink(Request $request, int $id)
    {
        $validated = $request->validate([
            'whatsapp_invite_link' => 'required|string|max:500',
        ]);

        $registration = CourseRegistration::findOrFail($id);
        $registration->update([
            'whatsapp_invite_link' => $validated['whatsapp_invite_link'],
        ]);

        return response()->json([
            'message'              => 'WhatsApp link updated.',
            'whatsapp_invite_link' => $registration->whatsapp_invite_link,
        ]);
    }

    /**
     * Public — check transaction status by invoice number.
     * Used by the checkout success page for polling.
     */
    public function status(string $invoiceNumber)
    {
        $transaction = Transaction::where('invoice_number', $invoiceNumber)
            ->with('registration.course')
            ->firstOrFail();

        $registration = $transaction->registration;

        return response()->json([
            'invoice_number' => $transaction->invoice_number,
            'amount'         => $transaction->amount,
            'status'         => $transaction->status,
            'paid_at'        => $transaction->paid_at,
            'course_title'   => $registration->course->title ?? null,
            'whatsapp_link'  => $registration->whatsapp_link, // uses accessor with fallback
        ]);
    }
}
