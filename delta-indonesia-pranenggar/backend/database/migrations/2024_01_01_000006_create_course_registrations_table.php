<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('course_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('whatsapp_number', 20);
            $table->string('company_name')->nullable();
            $table->string('whatsapp_invite_link')->nullable();
            $table->enum('status', ['pending', 'completed'])->default('pending');
            $table->timestamps();

            $table->index(['course_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_registrations');
    }
};
