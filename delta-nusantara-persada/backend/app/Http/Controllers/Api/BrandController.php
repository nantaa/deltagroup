<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    public function index()
    {
        return response()->json(Brand::where('is_active', true)->get());
    }

    public function show(Brand $brand)
    {
        return response()->json($brand);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'slug'        => 'required|string|unique:brands,slug',
            'description' => 'nullable|string',
            'website'     => 'nullable|url',
            'logo'        => 'nullable|image|mimes:jpeg,png,jpg,svg,webp|max:2048',
            'is_active'   => 'boolean',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('brands', 'public');
        }

        return response()->json(Brand::create($validated), 201);
    }

    public function update(Request $request, Brand $brand)
    {
        $validated = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'website'     => 'nullable|url',
            'logo'        => 'nullable|image|mimes:jpeg,png,jpg,svg,webp|max:2048',
            'is_active'   => 'boolean',
        ]);

        if ($request->hasFile('logo')) {
            if ($brand->logo) Storage::disk('public')->delete($brand->logo);
            $validated['logo'] = $request->file('logo')->store('brands', 'public');
        }

        $brand->update($validated);
        return response()->json($brand);
    }

    public function destroy(Brand $brand)
    {
        if ($brand->logo) Storage::disk('public')->delete($brand->logo);
        $brand->delete();
        return response()->json(['message' => 'Brand deleted.']);
    }
}
