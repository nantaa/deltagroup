<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\CourseRegistrationController;
use App\Http\Controllers\Api\WebhookController;

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

// Course catalog (public)
Route::get('/courses',        [CourseController::class, 'index']);
Route::get('/courses/{slug}', [CourseController::class, 'show']);

// Course checkout (public — no auth required for registration)
Route::post('/course-registrations',                [CourseRegistrationController::class, 'store']);
Route::get('/transactions/status/{invoice_number}', [CourseRegistrationController::class, 'status']);

// Xendit webhook (public — verified by x-callback-token header)
Route::post('/webhooks/xendit', [WebhookController::class, 'handleXendit']);

/*
|--------------------------------------------------------------------------
| Protected Routes (Sanctum)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);

    // Posts (admin)
    Route::post('/posts',           [PostController::class, 'store']);
    Route::put('/posts/{post}',     [PostController::class, 'update']);
    Route::delete('/posts/{post}',  [PostController::class, 'destroy']);

    // Brands (admin)
    Route::post('/brands',           [BrandController::class, 'store']);
    Route::put('/brands/{brand}',    [BrandController::class, 'update']);
    Route::delete('/brands/{brand}', [BrandController::class, 'destroy']);

    // Clients (admin)
    Route::post('/clients',            [ClientController::class, 'store']);
    Route::put('/clients/{client}',    [ClientController::class, 'update']);
    Route::delete('/clients/{client}', [ClientController::class, 'destroy']);

    // Courses (admin CRUD)
    Route::post('/courses',           [CourseController::class, 'store']);
    Route::put('/courses/{course}',   [CourseController::class, 'update']);
    Route::delete('/courses/{course}',[CourseController::class, 'destroy']);

    // Registrations (admin management)
    Route::get('/admin/registrations',                          [CourseRegistrationController::class, 'index']);
    Route::patch('/admin/registrations/{id}/whatsapp-link',     [CourseRegistrationController::class, 'updateWhatsappLink']);
});
