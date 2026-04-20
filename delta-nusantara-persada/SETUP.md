# Delta Indonesia Group — Setup Guide

## Project Structure

```
delta-indonesia/
├── frontend/    ← Next.js 14 (TypeScript + Tailwind)
└── backend/     ← Laravel 11 (Sanctum API)
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | >= 18.x |
| npm | >= 9.x |
| PHP | >= 8.2 |
| Composer | >= 2.x |
| MySQL | >= 8.0 |

---

## Backend (Laravel)

### 1. Navigate to backend folder

```bash
cd delta-indonesia/backend
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Copy and configure environment

```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env` and set your database credentials:

```env
DB_DATABASE=delta_indonesia
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_mysql_password

FRONTEND_URL=http://localhost:3000
```

### 4. Create the database

```sql
CREATE DATABASE delta_indonesia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Run migrations and seed data

```bash
php artisan migrate
php artisan db:seed
```

This creates:
- Admin user: `admin@deltaindonesia.com` / `password`
- 3 sample brands
- 8 sample clients
- 3 sample posts

### 6. Create storage symlink (for image uploads)

```bash
php artisan storage:link
```

### 7. Start the Laravel server

```bash
php artisan serve
# Runs at http://localhost:8000
```

---

## Frontend (Next.js)

### 1. Navigate to frontend folder

```bash
cd delta-indonesia/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Copy and configure environment

```bash
cp .env.local.example .env.local
```

`.env.local` content:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 4. Start the development server

```bash
npm run dev
# Runs at http://localhost:3000
```

---

## Logo Setup

### Adding Your Logo

1. Place your logo files in:

```
frontend/public/images/
├── logo.png          ← Main logo (used in Navbar, light bg)
├── logo-white.png    ← White version (used in Footer, dark bg)
└── hero-bg.jpg       ← Hero background image (1920×1080 recommended)
```

2. In `frontend/components/layout/Navbar.tsx`, replace the placeholder block:

```tsx
{/* REPLACE THIS BLOCK */}
<div className="w-12 h-12 bg-primary-700 rounded flex items-center justify-center">
  <svg .../>
</div>

{/* WITH THIS */}
import Image from 'next/image'
<Image src="/images/logo.png" alt="Delta Indonesia Group" width={48} height={48} />
```

3. In `frontend/components/layout/Footer.tsx`, replace the logo placeholder:

```tsx
{/* REPLACE THIS BLOCK */}
<div className="w-10 h-10 bg-white/20 rounded ...">
  <svg .../>
</div>
<span>Delta Indonesia</span>

{/* WITH THIS */}
<Image src="/images/logo-white.png" alt="Delta Indonesia Group" width={40} height={40} />
```

4. In `frontend/components/ui/PageHero.tsx` and `HeroSlider.tsx`, replace:

```tsx
style={{ backgroundImage: "url('/images/hero-bg.png')" }}
```

with the actual path to your hero background image.

---

## Pages Overview

| Route | Description |
|-------|-------------|
| `/` | Homepage — Hero, Brands, Clients, Blog |
| `/about` | Tentang Kami |
| `/brand` | Brand Kami listing |
| `/brand/[slug]` | Brand detail (pranenggar, nusa-persada, bsi) |
| `/berita` | News/Blog listing with search & filter |
| `/berita/[slug]` | Single news article |
| `/admin/blog` | Admin — Blog Management dashboard |
| `/admin/blog/new` | Admin — Create new post |
| `/admin/blog/[id]/edit` | Admin — Edit existing post |

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/posts` | — | List posts (supports `?status=`, `?category=`, `?search=`) |
| GET | `/api/posts/{slug}` | — | Single post |
| POST | `/api/posts` | ✅ | Create post |
| PUT | `/api/posts/{id}` | ✅ | Update post |
| DELETE | `/api/posts/{id}` | ✅ | Delete post |
| GET | `/api/brands` | — | List active brands |
| GET | `/api/clients` | — | List active clients |
| POST | `/api/auth/login` | — | Login (returns token) |
| POST | `/api/auth/logout` | ✅ | Logout |
| GET | `/api/auth/me` | ✅ | Current user |

✅ = requires `Authorization: Bearer {token}` header

---

## Admin Authentication

To protect the admin panel routes, store the token in `localStorage` after login:

```ts
// After successful login:
localStorage.setItem('auth_token', data.access_token)
```

The `lib/api.ts` axios instance automatically attaches it to every request.

---

## Build for Production

### Frontend

```bash
cd frontend
npm run build
npm start
```

### Backend

```bash
cd backend
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Deploy Laravel to **Laravel Forge**, **Railway**, or any PHP host.
Deploy Next.js to **Vercel** (recommended) or any Node.js host.
