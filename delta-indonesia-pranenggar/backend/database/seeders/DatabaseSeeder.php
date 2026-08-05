<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Client;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@deltanusantara.com'],
            [
                'name' => 'Admin Delta Nusantara',
                'password' => Hash::make('password'),
            ]
        );

        // Brands — Delta Nusantara Persada as the primary brand
        $brands = [
            [
                'name' => 'Delta Nusantara Persada',
                'slug' => 'nusa-persada',
                'description' => 'Inspeksi teknis dan quality assurance untuk industri dan manufaktur.',
                'is_active' => true,
            ],
            [
                'name' => 'Delta Indonesia Pranenggar',
                'slug' => 'pranenggar',
                'description' => 'Layanan konsultasi profesional untuk keselamatan kerja dan pengembangan SDM.',
                'is_active' => true,
            ],
            [
                'name' => 'Biro Sertifikasi Indonesia',
                'slug' => 'bsi',
                'description' => 'Lembaga sertifikasi profesi terakreditasi untuk berbagai bidang kompetensi.',
                'is_active' => true,
            ],
        ];

        foreach ($brands as $brand) {
            Brand::firstOrCreate(['slug' => $brand['slug']], $brand);
        }

        // Clients
        $clients = [
            ['name' => 'PT Pertamina', 'is_active' => true],
            ['name' => 'PT PLN', 'is_active' => true],
            ['name' => 'PT Telkom Indonesia', 'is_active' => true],
            ['name' => 'PT Chevron', 'is_active' => true],
            ['name' => 'PT Total E&P', 'is_active' => true],
            ['name' => 'PT Medco Energi', 'is_active' => true],
            ['name' => 'PT Krakatau Steel', 'is_active' => true],
            ['name' => 'PT Semen Indonesia', 'is_active' => true],
        ];

        foreach ($clients as $client) {
            Client::firstOrCreate(['name' => $client['name']], $client);
        }

        // Sample posts
        $posts = [
            [
                'title' => 'Pentingnya Keselamatan Kerja di Industri',
                'excerpt' => 'Keselamatan kerja adalah prioritas utama dalam setiap operasional industri modern.',
                'content' => '<p>Keselamatan kerja merupakan aspek fundamental yang harus diperhatikan oleh setiap perusahaan. Delta Nusantara Persada berkomitmen untuk memberikan pelatihan K3 terbaik.</p>',
                'status' => 'published',
                'category' => 'K3',
                'tags' => ['K3', 'Keselamatan', 'Training'],
            ],
            [
                'title' => 'Sertifikasi Kompetensi Profesional 2026',
                'excerpt' => 'Program sertifikasi kompetensi untuk meningkatkan profesionalitas tenaga kerja Indonesia.',
                'content' => '<p>Delta Nusantara Persada bersama Lembaga Sertifikasi Profesi (LSP) menyelenggarakan program sertifikasi kompetensi nasional.</p>',
                'status' => 'published',
                'category' => 'Event',
                'tags' => ['Sertifikasi', 'Event', 'Kompetensi'],
            ],
            [
                'title' => 'Workshop Pengembangan SDM',
                'excerpt' => 'Workshop intensif pengembangan sumber daya manusia untuk perusahaan.',
                'content' => '<p>Tingkatkan kompetensi tim Anda melalui workshop pengembangan SDM yang dirancang khusus oleh Delta Nusantara Persada.</p>',
                'status' => 'draft',
                'category' => 'Training',
                'tags' => ['Training', 'SDM', 'Workshop'],
            ],
        ];

        foreach ($posts as $post) {
            Post::firstOrCreate(
                ['title' => $post['title']],
                array_merge($post, ['user_id' => $admin->id])
            );
        }
    }
}
