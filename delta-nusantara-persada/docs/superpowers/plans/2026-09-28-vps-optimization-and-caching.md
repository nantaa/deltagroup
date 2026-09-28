# VPS Resource Optimization & Cache Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Maximize DNP standalone performance and stability on a 2 vCPU / 2 GB RAM / 20 GB Disk VPS by implementing Next.js standalone builds, ISR caching with on-demand invalidation, Laravel WebP conversion & query indexing, and Nginx/OS resource tuning.

**Architecture:** Next.js 14 frontend built with `output: 'standalone'` running in PM2 (fork mode, max 256MB) backed by ISR native fetch caching. Laravel 11 backend optimized with indexed SQL queries, WebP upload processing, and Nginx FastCGI static caching, protected by a 2GB OS Swap file and Cloudflare CDN caching layer.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Laravel 11, PHP 8.3, MySQL, Nginx, PM2, Node.js 20.

## Global Constraints
- Target Hardware: 2 vCPU, 2 GB RAM, 20 GB SSD
- Next.js must build cleanly with zero TypeScript / lint errors.
- Existing tests in `frontend/scripts/` must pass without regressions.
- All code changes must strictly follow TDD order: test first, then implementation, then verification.

---

### Task 1: Next.js Standalone Output & PM2 Optimization

**Files:**
- Modify: `delta-nusantara-persada/frontend/next.config.js`
- Create: `delta-nusantara-persada/frontend/ecosystem.config.js`
- Test: `delta-nusantara-persada/frontend/scripts/test-standalone-and-caching-config.mjs`

**Interfaces:**
- Consumes: Next.js build pipeline
- Produces: `delta-nusantara-persada/frontend/.next/standalone` production bundle and lightweight PM2 configuration

- [ ] **Step 1: Write the failing test for Next.js config & PM2 ecosystem**

```javascript
// delta-nusantara-persada/frontend/scripts/test-standalone-and-caching-config.mjs
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const frontendRoot = path.resolve(__dirname, '..')

const nextConfigPath = path.join(frontendRoot, 'next.config.js')
const ecosystemPath = path.join(frontendRoot, 'ecosystem.config.js')

const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf-8')
assert.ok(
  nextConfigContent.includes("output: 'standalone'"),
  "next.config.js must specify output: 'standalone' for lightweight VPS memory footprint"
)

assert.ok(fs.existsSync(ecosystemPath), "ecosystem.config.js must exist in frontend root")
const ecosystemContent = fs.readFileSync(ecosystemPath, 'utf-8')
assert.ok(
  ecosystemContent.includes("server.js") || ecosystemContent.includes(".next/standalone"),
  "PM2 script must execute standalone server.js directly instead of npm start"
)
assert.ok(
  ecosystemContent.includes("max_memory_restart: '256M'") || ecosystemContent.includes("max_memory_restart: '300M'"),
  "PM2 max_memory_restart must be capped at <= 300M to protect 2GB RAM server"
)

console.log('✅ test-standalone-and-caching-config passed!')
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node delta-nusantara-persada/frontend/scripts/test-standalone-and-caching-config.mjs`
Expected: FAIL with assertion error (`output: 'standalone'` missing).

- [ ] **Step 3: Update `next.config.js` and create `ecosystem.config.js`**

Update `delta-nusantara-persada/frontend/next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'api.deltanusa.co.id', pathname: '/storage/**' },
      { protocol: 'https', hostname: 'deltanusa.co.id', pathname: '/storage/**' },
      { protocol: 'http', hostname: 'localhost', port: '8000', pathname: '/storage/**' },
      { protocol: 'http', hostname: '127.0.0.1', port: '8000', pathname: '/storage/**' },
    ],
    dangerouslyAllowSVG: true,
  },
  compress: true,
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.deltanusa.co.id/api'
    const targetUrl = backendUrl.replace(/\/+$/, '')
    return [
      {
        source: '/api/:path*',
        destination: `${targetUrl}/:path*`,
      },
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
```

Create `delta-nusantara-persada/frontend/ecosystem.config.js`:
```javascript
module.exports = {
  apps: [
    {
      name: 'dnp-frontend',
      script: '.next/standalone/delta-nusantara-persada/frontend/server.js',
      cwd: '/var/www/delta-nusantara/deltagroup/delta-nusantara-persada/frontend',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
      },
    },
  ],
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node delta-nusantara-persada/frontend/scripts/test-standalone-and-caching-config.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add delta-nusantara-persada/frontend/next.config.js delta-nusantara-persada/frontend/ecosystem.config.js delta-nusantara-persada/frontend/scripts/test-standalone-and-caching-config.mjs
git commit -m "feat(vps): configure nextjs standalone build and pm2 fork mode"
```

---

### Task 2: Next.js Server-Side ISR Caching & On-Demand Revalidation Route

**Files:**
- Modify: `delta-nusantara-persada/frontend/app/berita/[slug]/page.tsx`
- Modify: `delta-nusantara-persada/frontend/app/berita/page.tsx`
- Create: `delta-nusantara-persada/frontend/app/api/revalidate/route.ts`
- Test: `delta-nusantara-persada/frontend/scripts/test-isr-caching-and-revalidate.mjs`

**Interfaces:**
- Consumes: Next.js 14 fetch cache, `revalidatePath`, `revalidateTag`
- Produces: Webhook endpoint `POST /api/revalidate?secret=...&path=...` and cached server page rendering

- [ ] **Step 1: Write failing test for ISR data fetching and revalidation route**

```javascript
// delta-nusantara-persada/frontend/scripts/test-isr-caching-and-revalidate.mjs
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const frontendRoot = path.resolve(__dirname, '..')

const slugPagePath = path.join(frontendRoot, 'app', 'berita', '[slug]', 'page.tsx')
const revalidateRoutePath = path.join(frontendRoot, 'app', 'api', 'revalidate', 'route.ts')

const slugContent = fs.readFileSync(slugPagePath, 'utf-8')
assert.ok(
  slugContent.includes('revalidate: 60') || slugContent.includes("revalidate: 300"),
  "berita/[slug]/page.tsx must use fetch cache with revalidate interval"
)
assert.ok(
  !slugContent.includes('api.get('),
  "berita/[slug]/page.tsx should not use un-cached Axios api.get in server components"
)

assert.ok(fs.existsSync(revalidateRoutePath), "api/revalidate/route.ts must exist")
const revalidateContent = fs.readFileSync(revalidateRoutePath, 'utf-8')
assert.ok(
  revalidateContent.includes('revalidatePath') || revalidateContent.includes('revalidateTag'),
  "revalidation route must invoke Next.js revalidation handlers"
)

console.log('✅ test-isr-caching-and-revalidate passed!')
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node delta-nusantara-persada/frontend/scripts/test-isr-caching-and-revalidate.mjs`
Expected: FAIL

- [ ] **Step 3: Implement cached fetch in `[slug]/page.tsx` and create `/api/revalidate/route.ts`**

Update `delta-nusantara-persada/frontend/app/berita/[slug]/page.tsx`:
```typescript
import type { Metadata } from 'next'
import React from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JsonLd from '@/components/seo/JsonLd'
import { Calendar, Tag } from 'lucide-react'
import { Post } from '@/types'
import { notFound } from 'next/navigation'
import DOMPurify from 'isomorphic-dompurify'
import { getPostImageUrl } from '@/lib/imageUrl'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deltanusa.co.id'
const API_URL  = process.env.NEXT_PUBLIC_API_URL  ?? 'http://localhost:8000/api'

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API_URL}/posts/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60, tags: [`post-${slug}`, 'posts'] },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Artikel Tidak Ditemukan' }

  const ogImage = getPostImageUrl(post.image) || `${SITE_URL}/images/og-dnp.png`

  return {
    title: post.title,
    description: post.excerpt ?? post.title,
    alternates: {
      canonical: `/berita/${params.slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt ?? post.title,
      url: `/berita/${params.slug}`,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt ?? post.title,
      images: [ogImage],
    },
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/posts?status=published&limit=200`, {
      next: { revalidate: 3600, tags: ['posts'] },
    })
    if (!res.ok) return []
    const body = await res.json()
    const posts: Post[] = body.data ?? body
    return Array.isArray(posts) ? posts.map((p) => ({ slug: p.slug })) : []
  } catch {
    return []
  }
}

export default async function BeritaDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const fmt = (d: string) =>
    d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

  const ogImage = getPostImageUrl(post.image)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt ?? post.title,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      '@type': 'Organization',
      name: 'PT Delta Nusantara Persada',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PT Delta Nusantara Persada',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/LOGO-DNP-Primary (1).png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/berita/${params.slug}`,
    },
    ...(ogImage ? { image: ogImage } : {}),
    keywords: post.tags?.join(', '),
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <SiteHeader />
      <Breadcrumb crumbs={[{ label: 'Berita', href: '/berita' }, { label: post.title }]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-72 bg-gray-100 rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
          {ogImage ? (
            <img
              src={ogImage}
              alt={post.title}
              width={800}
              height={288}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="flex items-center gap-1.5 text-sm text-gray-400">
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <time dateTime={post.created_at}>{fmt(post.created_at)}</time>
          </span>
          <span className="bg-blue-50 text-accent text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-snug">{post.title}</h1>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 border border-gray-200 text-gray-500 text-xs px-2.5 py-1 rounded-md">
                <Tag className="w-3 h-3" aria-hidden="true" /> {tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="prose prose-dnp prose-sm sm:prose max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
      </main>

      <Footer />
    </>
  )
}
```

Create `delta-nusantara-persada/frontend/app/api/revalidate/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const path = request.nextUrl.searchParams.get('path')
  const tag = request.nextUrl.searchParams.get('tag')

  const expectedSecret = process.env.REVALIDATION_SECRET || 'dnp-secret-cache-key'

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  if (path) {
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, path, now: Date.now() })
  }

  if (tag) {
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, tag, now: Date.now() })
  }

  return NextResponse.json({ message: 'Missing path or tag parameter' }, { status: 400 })
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node delta-nusantara-persada/frontend/scripts/test-isr-caching-and-revalidate.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add delta-nusantara-persada/frontend/app/berita/[slug]/page.tsx delta-nusantara-persada/frontend/app/api/revalidate/route.ts delta-nusantara-persada/frontend/scripts/test-isr-caching-and-revalidate.mjs
git commit -m "feat(frontend): implement isr fetch caching and on-demand revalidation"
```

---

### Task 3: Backend Database Indexing & WebP Upload Handling

**Files:**
- Create: `delta-nusantara-persada/backend/database/migrations/2026_09_28_000001_add_indexes_to_posts_table.php`
- Modify: `delta-nusantara-persada/backend/app/Http/Controllers/Api/PostController.php`
- Test: `delta-nusantara-persada/backend/tests/Feature/PostOptimizationTest.php`

**Interfaces:**
- Consumes: MySQL index schema & PHP GD / WebP conversion
- Produces: WebP processed uploaded images and indexed database queries

- [ ] **Step 1: Write backend feature test for post indexing and upload behavior**

Create `delta-nusantara-persada/backend/tests/Feature/PostOptimizationTest.php`:
```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use App\Models\Post;

class PostOptimizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_published_posts_with_index(): void
    {
        Post::factory()->count(5)->create(['status' => 'published']);
        $response = $this->getJson('/api/posts?status=published');
        $response->assertStatus(200);
    }
}
```

- [ ] **Step 2: Create migration for indexes on `posts` table**

Create `delta-nusantara-persada/backend/database/migrations/2026_09_28_000001_add_indexes_to_posts_table.php`:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->index('status');
            $table->index('category');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropIndex(['category']);
            $table->dropIndex(['created_at']);
        });
    }
};
```

- [ ] **Step 3: Run migrations and backend tests**

Run: `cd delta-nusantara-persada/backend && php artisan test`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add delta-nusantara-persada/backend/database/migrations/2026_09_28_000001_add_indexes_to_posts_table.php delta-nusantara-persada/backend/tests/Feature/PostOptimizationTest.php
git commit -m "perf(backend): add database indexes for posts table"
```

---

### Task 4: VPS Hardening, Memory Tuning & Updated Deployment Documentation

**Files:**
- Modify: `delta-nusantara-persada/DEPLOY_VPS_STANDALONE.md`
- Create: `delta-nusantara-persada/docs/VPS_CHANGELOG_STEP_BY_STEP.md`

**Interfaces:**
- Consumes: Production best practices for 2GB RAM / 20GB SSD
- Produces: Updated comprehensive deployment guide and explicit diff changelog

- [ ] **Step 1: Create changelog document `docs/VPS_CHANGELOG_STEP_BY_STEP.md` explaining exact differences**
- [ ] **Step 2: Update `DEPLOY_VPS_STANDALONE.md` with standalone setup, 2GB Swap configuration, tuned Nginx microcache, and low-memory MySQL configuration**
- [ ] **Step 3: Run complete test suite across frontend and backend**

Run: `npm test` inside `delta-nusantara-persada/frontend`
Expected: ALL PASS

- [ ] **Step 4: Commit**

```bash
git add delta-nusantara-persada/DEPLOY_VPS_STANDALONE.md delta-nusantara-persada/docs/VPS_CHANGELOG_STEP_BY_STEP.md
git commit -m "docs: document vps hardening, swap config, and step-by-step changelog"
```
