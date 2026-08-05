<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CourseRegistration;
use App\Models\Transaction;
use Illuminate\Http\Request;

class WebhookController extends Controller
{
    /**
     * Handle Xendit invoice callback.
     *
     * Xendit sends a POST request with payment status updates.
     * We verify the x-callback-token header before processing.
     */
    public function handleXendit(Request $request)
    {
        // 1. Verify callback token
        $callbackToken = env('XENDIT_CALLBACK_TOKEN');
        $headerToken   = $request->header('x-callback-token');

        if (! $callbackToken || $headerToken !== $callbackToken) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        // 2. Extract payload
        $externalId = $request->input('external_id');        // Our invoice_number
        $status     = strtolower($request->input('status')); // PAID, EXPIRED, etc.

        if (! $externalId) {
            return response()->json(['message' => 'Missing external_id.'], 400);
        }

        // 3. Find the transaction
        $transaction = Transaction::where('invoice_number', $externalId)->first();

        if (! $transaction) {
            return response()->json(['message' => 'Transaction not found.'], 404);
        }

        // 4. Map Xendit status to our status
        $statusMap = [
            'paid'    => 'paid',
            'expired' => 'expired',
            'failed'  => 'failed',
        ];

        $newStatus = $statusMap[$status] ?? null;

        if (! $newStatus) {
            // Unknown status — acknowledge but don't update
            return response()->json(['message' => 'Status not actionable.'], 200);
        }

        // 5. Update transaction
        $transaction->update([
            'status'  => $newStatus,
            'paid_at' => $newStatus === 'paid' ? now() : $transaction->paid_at,
        ]);

        // 6. If paid, mark registration as completed
        if ($newStatus === 'paid') {
            $registration = $transaction->registration;
            if ($registration) {
                $registration->update(['status' => 'completed']);
            }
        }

        return response()->json(['message' => 'Webhook processed.'], 200);
    }
}
