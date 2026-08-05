<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    /**
     * Public — list active courses with optional search & pagination.
     */
    public function index(Request $request)
    {
        $query = Course::query()->where('is_active', true)->latest();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $limit = $request->get('limit', 12);
        return response()->json($query->paginate($limit));
    }

    /**
     * Public — show a single course by slug.
     */
    public function show(string $slug)
    {
        $course = Course::where('slug', $slug)
                        ->where('is_active', true)
                        ->firstOrFail();

        return response()->json($course);
    }

    /**
     * Admin — create a new course.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'               => 'required|string|max:255',
            'description'         => 'required|string',
            'price'               => 'required|numeric|min:0',
            'whatsapp_group_link' => 'nullable|string|max:500',
            'is_active'           => 'boolean',
            'cover_image'         => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(6);

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('courses', 'public');
        }

        $course = Course::create($validated);
        return response()->json($course, 201);
    }

    /**
     * Admin — update an existing course.
     */
    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title'               => 'sometimes|required|string|max:255',
            'description'         => 'sometimes|required|string',
            'price'               => 'sometimes|required|numeric|min:0',
            'whatsapp_group_link' => 'nullable|string|max:500',
            'is_active'           => 'boolean',
            'cover_image'         => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('cover_image')) {
            if ($course->cover_image) {
                Storage::disk('public')->delete($course->cover_image);
            }
            $validated['cover_image'] = $request->file('cover_image')->store('courses', 'public');
        }

        $course->update($validated);
        return response()->json($course);
    }

    /**
     * Admin — delete a course.
     */
    public function destroy(Course $course)
    {
        if ($course->cover_image) {
            Storage::disk('public')->delete($course->cover_image);
        }
        $course->delete();
        return response()->json(['message' => 'Course deleted.']);
    }
}
