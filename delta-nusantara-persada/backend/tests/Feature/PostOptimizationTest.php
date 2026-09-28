<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Post;

class PostOptimizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_query_posts_by_status_and_category_efficiently(): void
    {
        Post::create([
            'title'    => 'Test Keselamatan Kerja',
            'slug'     => 'test-keselamatan-kerja',
            'content'  => '<p>Isi artikel keselamatan</p>',
            'status'   => 'published',
            'category' => 'Regulasi K3',
        ]);

        $response = $this->getJson('/api/posts?status=published&category=Regulasi+K3');
        $response->assertStatus(200);
        $response->assertJsonFragment(['slug' => 'test-keselamatan-kerja']);
    }
}
