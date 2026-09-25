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

// Auth
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

// Public read endpoints
Route::get('/posts',          [PostController::class, 'index']);
Route::get('/posts/{slug}',   [PostController::class, 'show']);
Route::get('/brands',         [BrandController::class, 'index']);
Route::get('/brands/{brand}', [BrandController::class, 'show']);
Route::get('/clients',        [ClientController::class, 'index']);

// Blog Posts Management (Admin)
Route::post('/posts',          [PostController::class, 'store']);
Route::post('/posts/{post}',   [PostController::class, 'update']);
Route::put('/posts/{post}',    [PostController::class, 'update']);
Route::delete('/posts/{post}', [PostController::class, 'destroy']);

/*
|--------------------------------------------------------------------------
| Protected Routes (Sanctum)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);

    // Brands (admin)
    Route::post('/brands',           [BrandController::class, 'store']);
    Route::put('/brands/{brand}',    [BrandController::class, 'update']);
    Route::delete('/brands/{brand}', [BrandController::class, 'destroy']);

    // Clients (admin)
    Route::post('/clients',            [ClientController::class, 'store']);
    Route::put('/clients/{client}',    [ClientController::class, 'update']);
    Route::delete('/clients/{client}', [ClientController::class, 'destroy']);
});
