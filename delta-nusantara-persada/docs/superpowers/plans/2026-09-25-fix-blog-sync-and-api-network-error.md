# Fix Blog Sync, API Network Error & Admin Authentication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore complete end-to-end synchronization between the admin blog dashboard, Laravel backend, and homepage "Artikel & Wawasan K3" slider by eliminating 502/Network Error, fixing CORS, aligning authentication, and replacing deceptive dummy fallbacks with real error states.

**Architecture:** 
1. Fix backend CORS in `backend/config/cors.php` to accept production domains (`https://deltanusa.co.id`, `https://www.deltanusa.co.id`).
2. Provide a Same-Origin Next.js proxy route `/api/:path*` via `next.config.js` rewrites to eliminate CORS and cross-domain preflight failures.
3. Align admin authentication: allow admin operations using the configured admin credentials/API token or public seedable access for DNP blog posts.
4. Replace deceptive `MOCK_POSTS` in `admin/blog/page.tsx` with a visible error banner and retry action so the admin UI never displays fake solar panel posts when the server is unreachable.
5. Provide the exact 1-command fix for the VPS Nginx / PHP-FPM 502 socket mismatch.

**Tech Stack:** Next.js 14 (App Router, Axios), Laravel 11 (PHP-FPM, Eloquent, Sanctum), Nginx, TailwindCSS.

## Global Constraints
- Do not introduce green WhatsApp icons or Hubungi Kami buttons.
- Preserve 2-card layout in `WorkProcessTraining.tsx`.
- Must keep test suite 100% green (`npm test` passes all tests).
- Must verify production build (`npm run build`).

---

### Task 1: Fix Laravel CORS Configuration (`backend/config/cors.php`)

**Files:**
- Modify: `backend/config/cors.php:8-12`
- Test: `frontend/scripts/test-cors-and-api-config.mjs`

**Interfaces:**
- Consumes: HTTP requests from `https://deltanusa.co.id`, `https://www.deltanusa.co.id`, `http://localhost:3000`
- Produces: Valid CORS headers with `Access-Control-Allow-Origin` and `Access-Control-Allow-Credentials: true`

- [ ] **Step 1: Write test for CORS and API configuration**

Create `frontend/scripts/test-cors-and-api-config.mjs` verifying:
1. `backend/config/cors.php` allows `deltanusa.co.id`.
2. `frontend/app/admin/blog/page.tsx` has zero references to solar panel dummy posts.
3. `WorkProcessTraining.tsx` renders dynamic posts or empty state without dummy fallbacks.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test frontend/scripts/test-cors-and-api-config.mjs`
Expected: FAIL

- [ ] **Step 3: Update `backend/config/cors.php`**

Add `https://deltanusa.co.id`, `https://www.deltanusa.co.id`, and `env('FRONTEND_URL')` to `allowed_origins` and `allowed_origins_patterns`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test frontend/scripts/test-cors-and-api-config.mjs`
Expected: PASS

---

### Task 2: Same-Origin API Proxy in `next.config.js` & `lib/api.ts`

**Files:**
- Modify: `frontend/next.config.js`
- Modify: `frontend/lib/api.ts`

**Interfaces:**
- Consumes: Client-side and server-side `/api/*` calls from the browser.
- Produces: Proxied calls without cross-subdomain CORS preflights.

- [ ] **Step 1: Add API rewrites in `frontend/next.config.js`**

Add `rewrites()` in `next.config.js` so calls to `/api/:path*` route to the backend destination configured in `INTERNAL_API_URL` or fallback.

- [ ] **Step 2: Make `lib/api.ts` support relative `/api` on production**

When in browser on `deltanusa.co.id`, use `/api` directly so cross-origin CORS errors cannot occur.

- [ ] **Step 3: Verify with automated test**

Run: `node --test frontend/scripts/test-cors-and-api-config.mjs`
Expected: PASS

---

### Task 3: Eliminate Deceptive `MOCK_POSTS` & Add Real Error States to Admin Blog

**Files:**
- Modify: `frontend/app/admin/blog/page.tsx`
- Modify: `frontend/app/admin/blog/new/page.tsx`

**Interfaces:**
- Consumes: API response or error.
- Produces: If API fails, display clear error banner ("Gagal terhubung ke API backend. Periksa koneksi server") with a retry button, instead of showing 4 fake solar panel articles. If empty, show ("Belum ada artikel").

- [ ] **Step 1: Remove `MOCK_POSTS` ("Importance of Data Protection") from `app/admin/blog/page.tsx`**

Replace dummy solar panel posts with empty initial array and explicit `error` state.

- [ ] **Step 2: Add clear error alert in `app/admin/blog/page.tsx`**

When `fetchPosts` fails, set `error = 'Gagal terhubung ke API backend (502 / Offline).'` and render an alert banner with a retry button.

- [ ] **Step 3: Run existing and new test suites**

Run: `npm test`
Expected: 60+ tests passing.

---

### Task 4: VPS Diagnostic & Hotfix Script for PHP-FPM / Nginx 502

**Files:**
- Create: `backend/vps-fix-502.sh`
- Modify: `DEPLOY_VPS_STANDALONE.md`

**Interfaces:**
- Consumes: VPS shell environment.
- Produces: Automatic detection of active PHP-FPM socket (8.1, 8.2, 8.3), updates Nginx `fastcgi_pass`, tests config, and reloads Nginx.

- [ ] **Step 1: Write `backend/vps-fix-502.sh`**

Script that:
1. Detects which `php*-fpm.sock` exists in `/var/run/php/`.
2. Tests if the PHP-FPM service is active and starts it if inactive.
3. Updates `/etc/nginx/sites-available/deltanusa.conf` with the correct socket path.
4. Runs `php artisan storage:link`, `php artisan migrate --force`, and `sudo nginx -t && sudo systemctl reload nginx`.

- [ ] **Step 2: Document the exact 1-command fix in `DEPLOY_VPS_STANDALONE.md`**

---

### Task 5: End-to-End Verification & Build Check

**Files:**
- Test: `npm test`
- Build: `npm run build`

- [ ] **Step 1: Run complete test suite**
- [ ] **Step 2: Run production Next.js build**
- [ ] **Step 3: Verify git commit and readiness for VPS deployment**
