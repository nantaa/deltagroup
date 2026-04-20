# Delta Nusantara Persada — Setup Guide

> **This is a customized copy of delta-indonesia.**
> Only the files listed in this guide differ from the original.
> Copy identical files from `delta-indonesia/` and override with the files from this package.

---

## Files That Are Different (this package only contains these)

### Frontend (`frontend/`)

| File | What Changed |
|------|--------------|
| `.env.local` | API URL → `http://localhost:8001/api` |
| `tailwind.config.ts` | Primary color `#007a91` (cyan-dark), Accent `#ffd60a` (yellow) |
| `app/globals.css` | CSS variables updated; `.btn-primary` uses dark text on yellow |
| `app/layout.tsx` | Title & meta description → "Delta Nusantara Persada" |
| `app/page.tsx` | Mock post excerpt updated to "Delta Nusantara Persada" |
| `app/about/page.tsx` | Company name changed throughout |
| `app/admin/layout.tsx` | Sidebar brand name + active color → `bg-primary-700` (cyan) |
| `components/layout/Navbar.tsx` | Logo text + hover colors |
| `components/layout/Footer.tsx` | Footer bg `#007a91`, company name, copyright |
| `components/layout/TopBar.tsx` | Default announcement text |
| `components/ui/HeroSlider.tsx` | Slide 1 title → "DELTA NUSANTARA PERSADA" |
| `components/ui/HomeClient.tsx` | Brand pill hover color → cyan; clientSection label updated |
| `lib/LanguageContext.tsx` | All "Delta Indonesia Group" strings → "Delta Nusantara Persada" |

### Backend (`backend/`)

| File | What Changed |
|------|--------------|
| `.env` | `APP_NAME`, `DB_DATABASE=delta_nusantara_persada`, `FRONTEND_URL=http://localhost:3001` |
| `database/seeders/DatabaseSeeder.php` | Admin email, brand order (DNP first), post content mentioning DNP |

---

## How to Set Up

### Step 1 — Copy the base project

```bash
# From the delta-group root:
cp -r delta-indonesia delta-nusantara-persada-full
```

### Step 2 — Override with the changed files

Copy all files from this package into the corresponding locations of `delta-nusantara-persada-full/`, overwriting where they exist.

```
delta-nusantara-persada/
├── frontend/
│   ├── .env.local                              ← override
│   ├── tailwind.config.ts                      ← override
│   ├── app/
│   │   ├── globals.css                         ← override
│   │   ├── layout.tsx                          ← override
│   │   ├── page.tsx                            ← override
│   │   ├── about/page.tsx                      ← override
│   │   └── admin/layout.tsx                    ← override
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                      ← override
│   │   │   ├── Footer.tsx                      ← override
│   │   │   └── TopBar.tsx                      ← override
│   │   └── ui/
│   │       ├── HeroSlider.tsx                  ← override
│   │       └── HomeClient.tsx                  ← override
│   └── lib/
│       └── LanguageContext.tsx                 ← override
└── backend/
    ├── .env                                    ← override
    └── database/seeders/DatabaseSeeder.php     ← override
```

---

## Project Structure

```
delta-nusantara-persada/
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
cd delta-nusantara-persada/backend
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Configure environment

The `.env` file is already set. Adjust your MySQL credentials:

```env
DB_DATABASE=delta_nusantara_persada
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_mysql_password
```

Then generate a fresh app key:

```bash
php artisan key:generate
```

### 4. Create the database

```sql
CREATE DATABASE delta_nusantara_persada CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Run migrations and seed data

```bash
php artisan migrate
php artisan db:seed
```

This creates:
- Admin user: `admin@deltanusantara.com` / `password`
- 3 brands (Delta Nusantara Persada listed first)
- 8 sample clients
- 3 sample posts

### 6. Create storage symlink

```bash
php artisan storage:link
```

### 7. Start the Laravel server on port 8001

```bash
php artisan serve --port=8001
# Runs at http://localhost:8001
```

> **⚠️ Important:** Use `--port=8001` to avoid conflicts with `delta-indonesia` running on port 8000.

---

## Frontend (Next.js)

### 1. Navigate to frontend folder

```bash
cd delta-nusantara-persada/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Verify environment

`.env.local` is already configured:

```env
NEXT_PUBLIC_API_URL=http://localhost:8001/api
```

### 4. Start the development server

```bash
npm run dev
# Runs at http://localhost:3001 (use -- --port 3001 if needed)
```

To run on a different port than delta-indonesia (3000):

```bash
npm run dev -- --port 3001
```

---

## Color Scheme Reference

| Token | Delta Indonesia | Delta Nusantara Persada |
|-------|-----------------|------------------------|
| `--primary` / `primary-700` | `#1a3a6b` (navy blue) | `#007a91` (cyan dark) |
| `accent` | `#2563EB` (blue) | `#ffd60a` (golden yellow) |
| Footer bg | `#1a3a6b` | `#007a91` |
| `.btn-primary` text | white | `text-gray-900` (dark on yellow) |

---

## Logo Setup

Place your logo files in `frontend/public/images/`:

```
frontend/public/images/
├── logo1.png          ← Navbar logo (light background)
├── logo-black.png     ← Footer logo (on white card)
└── hero-bg1.png       ← Hero background image (1920×1080)
```

These filenames match the existing `delta-indonesia` project — you may reuse the same images or replace with DNP-specific branding.

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

---

## Running Both Projects Simultaneously

| Project | Frontend | Backend |
|---------|----------|---------|
| delta-indonesia | `localhost:3000` | `localhost:8000` |
| delta-nusantara-persada | `localhost:3001` | `localhost:8001` |

```bash
# Terminal 1 — delta-indonesia backend
cd delta-indonesia/backend && php artisan serve

# Terminal 2 — delta-indonesia frontend
cd delta-indonesia/frontend && npm run dev

# Terminal 3 — delta-nusantara-persada backend
cd delta-nusantara-persada/backend && php artisan serve --port=8001

# Terminal 4 — delta-nusantara-persada frontend
cd delta-nusantara-persada/frontend && npm run dev -- --port 3001
```

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
