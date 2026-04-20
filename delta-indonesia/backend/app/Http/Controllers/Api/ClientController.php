<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClientController extends Controller
{
    public function index()
    {
        return response()->json(Client::where('is_active', true)->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'website'   => 'nullable|url',
            'logo'      => 'nullable|image|mimes:jpeg,png,jpg,svg,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('clients', 'public');
        }

        return response()->json(Client::create($validated), 201);
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name'      => 'sometimes|string|max:255',
            'website'   => 'nullable|url',
            'logo'      => 'nullable|image|mimes:jpeg,png,jpg,svg,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('logo')) {
            if ($client->logo) Storage::disk('public')->delete($client->logo);
            $validated['logo'] = $request->file('logo')->store('clients', 'public');
        }

        $client->update($validated);
        return response()->json($client);
    }

    public function destroy(Client $client)
    {
        if ($client->logo) Storage::disk('public')->delete($client->logo);
        $client->delete();
        return response()->json(['message' => 'Client deleted.']);
    }
}
