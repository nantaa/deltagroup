<?php

namespace App\Providers;

use Illuminate\Database\Schema\Builder;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Fix for MySQL < 5.7.7 or MariaDB < 10.2.2
        // Prevents "Specified key was too long" error
        Builder::defaultStringLength(191);
    }
}