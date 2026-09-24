# Blog Management Fix & Course Removal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean up the legacy course catalog and checkout registration systems from DNP, fix the admin blog management to fetch/mutate live backend data, and integrate the live News/Blog section into the homepage with full dynamic routing to `/berita/[slug]`.

**Architecture:**
1. **Prune Legacy Subsystems:** Delete dead routes (`app/courses/*`, `app/checkout/*`, `app/admin/courses/*`, `app/admin/registrations/*`), clean admin sidebar navigation (`app/admin/layout.tsx`), and remove orphaned API endpoints in backend and sitemap.
2. **Fix Admin Blog CRUD:** Update `app/admin/blog/page.tsx` to fetch live posts from `GET /api/posts` on mount via `api.get`, support real deletion, and wire up `new/page.tsx` and `[id]/edit/page.tsx` with image upload handling and rich-text editing.
3. **Landing Page News Integration:** Mount `LatestBlog` on `app/page.tsx` (between `TeamSection` and `TestimonialCTA`) to display the latest 4 published articles with live links to `/berita/[slug]`, bilingual labels, and graceful fallback when API is cold.
4. **News & Detail Pages Alignment:** Connect `app/berita/page.tsx` and `app/berita/[slug]/page.tsx` seamlessly to the same post data model and image storage path.

**Tech Stack:** Next.js 14 (App Router), Laravel 11 (API), Tailwind CSS, Node.js test runner (`node --test`).

## Global Constraints
- Remove all traces of Course catalog and Course Registration checkout from frontend navigation and admin panel.
- Landing page must render live / fallback News section with working links to `/berita` and `/berita/[slug]`.
- All existing tests in `npm test` must pass (updating any obsolete course test assertions).
- Zero TypeScript or ESLint errors on `npm run build`.

---

### Task 1: Write TDD Automated Tests for Blog Integration & Course Removal

**Files:**
- Create: `delta-nusantara-persada/frontend/scripts/test-blog-and-course-cleanup.mjs`
- Modify: `delta-nusantara-persada/frontend/package.json`

**Interfaces:**
- Consumes: `app/admin/layout.tsx`, `app/page.tsx`, `app/admin/blog/page.tsx`, `app/sitemap.ts`
- Produces: Automated test asserting absence of courses/registrations in admin navigation and presence of dynamic news section in landing page and live API calls in admin blog.

- [ ] **Step 1: Write failing test script `scripts/test-blog-and-course-cleanup.mjs`**

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('TDD 1: Admin layout excludes Courses and Registrations links', () => {
  const layoutPath = path.join(rootDir, 'app/admin/layout.tsx');
  const content = fs.readFileSync(layoutPath, 'utf8');

  assert.doesNotMatch(content, /\/admin\/courses/i, 'Admin layout must not link to /admin/courses');
  assert.doesNotMatch(content, /\/admin\/registrations/i, 'Admin layout must not link to /admin/registrations');
  assert.match(content, /\/admin\/blog/i, 'Admin layout must link to /admin/blog');
  assert.match(content, /\/admin\/topbar/i, 'Admin layout must link to /admin/topbar');
});

test('TDD 2: Landing page mounts LatestBlog news section', () => {
  const homePath = path.join(rootDir, 'app/page.tsx');
  const content = fs.readFileSync(homePath, 'utf8');

  assert.match(content, /LatestBlog/i, 'Landing page must import and render LatestBlog component');
});

test('TDD 3: Admin blog management page fetches live posts on mount', () => {
  const blogAdminPath = path.join(rootDir, 'app/admin/blog/page.tsx');
  const content = fs.readFileSync(blogAdminPath, 'utf8');

  assert.match(content, /api\.get\(['"]\/posts['"]\)/i, 'Admin blog page must fetch posts from API via api.get');
});

test('TDD 4: Sitemap does not index removed courses route', () => {
  const sitemapPath = path.join(rootDir, 'app/sitemap.ts');
  const content = fs.readFileSync(sitemapPath, 'utf8');

  assert.doesNotMatch(content, /\/courses/i, 'Sitemap must not include /courses route');
});
```

- [ ] **Step 2: Register test in `package.json` and run to confirm failure**

Run: `node delta-nusantara-persada/frontend/scripts/test-blog-and-course-cleanup.mjs`
Expected: FAIL with assertion errors.

---

### Task 2: Remove Course and Registration Routes & Clean Navigations

**Files:**
- Delete / Clean: `app/courses/*`, `app/checkout/*`, `app/admin/courses/*`, `app/admin/registrations/*`
- Modify: `app/admin/layout.tsx`
- Modify: `app/sitemap.ts`
- Modify: `backend/routes/api.php`
- Modify: `scripts/test-popup-and-navbar-consistency.mjs` (remove obsolete course route checks)

- [ ] **Step 1: Update `app/admin/layout.tsx`**
Remove `Courses` and `Registrations` objects from `navLinks` array.

- [ ] **Step 2: Update `app/sitemap.ts`**
Remove `${SITE_URL}/courses` entry.

- [ ] **Step 3: Remove frontend course and registration route folders**
Delete `app/courses`, `app/checkout`, `app/admin/courses`, `app/admin/registrations`.

- [ ] **Step 4: Update backend `routes/api.php`**
Remove obsolete public and admin routes for courses, course-registrations, and xendit webhooks.

---

### Task 3: Fix Admin Blog Management to Connect Live API

**Files:**
- Modify: `app/admin/blog/page.tsx`
- Modify: `app/admin/blog/new/page.tsx`
- Modify: `app/admin/blog/[id]/edit/page.tsx`

- [ ] **Step 1: Update `app/admin/blog/page.tsx`**
Implement `useEffect` on mount to query `api.get('/posts')`, populate live state, and maintain search/category filters with live deletion support.

- [ ] **Step 2: Update `new/page.tsx` & `[id]/edit/page.tsx`**
Ensure image upload with `FormData` / multipart headers works with Laravel's `/posts` store and update endpoints.

---

### Task 4: Integrate News Section into Landing Page (`app/page.tsx`)

**Files:**
- Modify: `components/ui/LatestBlog.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Polish `LatestBlog.tsx` design**
Ensure it uses consistent section labels (`BERITA & ARTIKEL K3`), 4-card grid, hover elevation, and working navigation to `/berita` and `/berita/[slug]`.

- [ ] **Step 2: Mount `LatestBlog` in `app/page.tsx`**
Fetch latest published posts in `HomePage` server component and render `<LatestBlog posts={posts} />` before `TestimonialCTA`.

- [ ] **Step 3: Run full automated test suite**
Run: `npm test`
Expected: PASS (all tests green).

---

### Task 5: Production Verification & Build Check

**Files:**
- Verify: `npm run build`
- Browser check: `http://localhost:3005` & `http://localhost:3005/admin/blog`

- [ ] **Step 1: Run `npm run build` to verify clean compilation with 0 route errors**
- [ ] **Step 2: Verify live landing page and admin panel in browser**
