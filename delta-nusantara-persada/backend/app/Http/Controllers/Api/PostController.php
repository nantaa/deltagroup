<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::query()->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $limit = $request->get('limit', 10);
        $posts = $query->paginate($limit);

        return response()->json($posts);
    }

    public function show(string $identifier)
    {
        $post = is_numeric($identifier)
            ? Post::findOrFail($identifier)
            : Post::where('slug', $identifier)->firstOrFail();

        return response()->json($post);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'    => 'required|string|max:255',
            'excerpt'  => 'nullable|string',
            'content'  => 'required|string',
            'category' => 'nullable|string|max:100',
            'status'   => 'in:draft,published',
            'tags'     => 'nullable|array',
            'tags.*'   => 'string|max:50',
            'image'    => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('posts', 'public');
        }

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(6);
        $validated['user_id'] = auth()->id();

        $post = Post::create($validated);
        return response()->json($post, 201);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title'    => 'sometimes|required|string|max:255',
            'excerpt'  => 'nullable|string',
            'content'  => 'sometimes|required|string',
            'category' => 'nullable|string|max:100',
            'status'   => 'in:draft,published',
            'tags'     => 'nullable|array',
            'tags.*'   => 'string|max:50',
            'image'    => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($post->image) Storage::disk('public')->delete($post->image);
            $validated['image'] = $request->file('image')->store('posts', 'public');
        }

        $post->update($validated);
        return response()->json($post);
    }

    public function destroy(Post $post)
    {
        if ($post->image) Storage::disk('public')->delete($post->image);
        $post->delete();
        return response()->json(['message' => 'Post deleted.']);
    }
}
