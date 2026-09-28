<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\ClientController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Auth with rate limiting
Route::prefix('auth')->middleware('throttle:5,1')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});

// Public read endpoints
Route::get('/posts',          [PostController::class, 'index']);
Route::get('/posts/{slug}',   [PostController::class, 'show']);
Route::get('/brands',         [BrandController::class, 'index']);
Route::get('/brands/{brand}', [BrandController::class, 'show']);
Route::get('/clients',        [ClientController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Protected Routes (Sanctum)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);

    // Blog Posts Management (Admin Only)
    Route::post('/posts',          [PostController::class, 'store']);
    Route::post('/posts/{post}',   [PostController::class, 'update']);
    Route::put('/posts/{post}',    [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);

    // Brands (Admin Only)
    Route::post('/brands',           [BrandController::class, 'store']);
    Route::put('/brands/{brand}',    [BrandController::class, 'update']);
    Route::delete('/brands/{brand}', [BrandController::class, 'destroy']);

    // Clients (Admin Only)
    Route::post('/clients',            [ClientController::class, 'store']);
    Route::put('/clients/{client}',    [ClientController::class, 'update']);
    Route::delete('/clients/{client}', [ClientController::class, 'destroy']);
});
