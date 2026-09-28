<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-admin {email=admin@deltanusa.co.id} {password=PasswordAdmin123!}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create or update the administrator account with a known password';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $email = (string) $this->argument('email');
        $password = (string) $this->argument('password');

        $user = User::firstOrNew(['email' => $email]);
        $user->name = 'Admin Delta Group';
        $user->password = Hash::make($password);
        $user->save();

        // Also ensure legacy admin@deltanusantara.com has the same password if it exists
        $legacy = User::where('email', 'admin@deltanusantara.com')->first();
        if ($legacy) {
            $legacy->password = Hash::make($password);
            $legacy->save();
        }

        $this->info("==========================================");
        $this->info(" ✅ Administrator Account Ready!");
        $this->info("==========================================");
        $this->line(" Email   : <comment>{$email}</comment>");
        $this->line(" Password: <comment>{$password}</comment>");
        $this->info("==========================================");

        return Command::SUCCESS;
    }
}
