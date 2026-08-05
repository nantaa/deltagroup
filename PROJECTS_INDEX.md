# Delta Group Project Index

This document provides a comprehensive index of the projects under PT. Delta Indonesia Group. It details their business purpose, technical stack, environment setups, and active configuration states.

---

## 1. Project Directory Overview

The workspace consists of 5 main web application directories and utility scripts:

```
delta-group/
├── delta-indonesia/             # Parent Group (Base Template)
│   ├── frontend/                # Next.js 14 Frontend (Base)
│   └── backend/                 # Laravel 11 Backend (Base)
│
├── delta-nusantara-persada/     # PT. Delta Nusantara Persada (DNP)
│   ├── frontend/                # Next.js 14 Frontend (DNP customization)
│   └── backend/                 # Laravel 11 Backend (DNP customization)
│
├── biro-sertifikasi-indonesia/  # PT. Biro Sertifikasi Indonesia (BSI)
│   └── frontend/                # Next.js 14 Frontend (BSI customization)
│
├── delta-indonesia-pranenggar/  # PT. Delta Indonesia Pranenggar (DIP)
│   └── frontend/                # Next.js 14 Frontend (DIP customization)
│
├── delta-lembaga-kursus/        # PT. Delta Lembaga Kursus (DLK)
│   └── frontend/                # Next.js 14 Frontend (DLK customization)
│
└── replace_brand.js             # Script to automate brand string replacement
```

---

## 2. Project Summaries & Port Configurations

| Project Folder | Represented Entity | Primary Domain/Services | Tech Stack | Default Port | Target API URL |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **`delta-indonesia`** | **PT. Delta Indonesia Group** | Parent holding company profile, news, and brand list. | Next.js 14 (App Router) + Laravel 11 (Sanctum) | `3000` (FE)<br>`8000` (BE) | `http://localhost:8000/api` |
| **`delta-nusantara-persada`** | **PT. Delta Nusantara Persada (DNP)** | Riksa Uji (equipment inspection/testing), building technical audits. | Next.js 14 (App Router) + Laravel 11 (Sanctum) | `3001` (FE)<br>`8001` (BE) | `http://localhost:8001/api` |
| **`biro-sertifikasi-indonesia`** | **PT. Biro Sertifikasi Indonesia (BSI)** | Management system audit & certification (SMK3, ISO 9001/14001/45001). | Next.js 14 (App Router) | `3002` (FE)* | `http://localhost:8001/api` (Local Dev) |
| **`delta-indonesia-pranenggar`** | **PT. Delta Indonesia Pranenggar (DIP)** | Occupational Safety & Health (K3) training and HR development. | Next.js 14 (App Router) | `3003` (FE)* | `http://localhost:8001/api` (Local Dev) |
| **`delta-lembaga-kursus`** | **PT. Delta Lembaga Kursus (DLK)** | Vocational training school (LPK) for individuals and groups. | Next.js 14 (App Router) | `3004` (FE)* | `http://localhost:8001/api` (Local Dev) |

> *\*Note: Ports `3002`, `3003`, and `3004` are recommended default development ports to prevent local collision when running concurrently.*

---

## 3. Project Detail Sheets

### 📂 Delta Indonesia (Parent Group)
*   **Purpose**: The central marketing and brand landing page for the group. It links to all sub-brands, features overall clients, and aggregates news.
*   **Aesthetics & Branding**:
    *   **Primary color**: Navy Blue (`#1a3a6b`)
    *   **Accent color**: Slate Blue (`#2563EB`)
*   **Backend Details**: Database `delta_indonesia`. Contains migrations for `posts`, `brands`, and `clients`.

### 📂 Delta Nusantara Persada (DNP)
*   **Purpose**: Technical division representing the inspection and testing services ("Riksa Uji").
*   **Aesthetics & Branding**:
    *   **Primary color**: Dark Cyan (`#007a91`)
    *   **Accent color**: Golden Yellow (`#ffd60a`)
*   **Backend Details**: Database `delta_nusantara_persada`. Customized seeders list DNP as the primary brand.

### 📂 Biro Sertifikasi Indonesia (BSI)
*   **Purpose**: Specialized audit and certification body for national and international management systems.
*   **Aesthetics & Branding**:
    *   **Primary color**: Dark Cyan (`#007a91`)
    *   **Accent color**: Golden Yellow (`#ffd60a`)
*   **Context Summary**: [PT_BSI_Summary_2024.md](file:///d:/Document%20Backup/website-aryo/delta-group/biro-sertifikasi-indonesia/PT_BSI_Summary_2024.md)

### 📂 Delta Indonesia Pranenggar (DIP)
*   **Purpose**: Safety Training provider (PJK3) for safety experts, cranes, fire, and rigging certifications.
*   **Context Summary**: [PT_DIP_Summary_2024.md](file:///d:/Document%20Backup/website-aryo/delta-group/delta-indonesia-pranenggar/PT_DIP_Summary_2024.md)

### 📂 Delta Lembaga Kursus (DLK)
*   **Purpose**: Vocational training center (LPK) focused on skill certification and individual training programs.

---

## 4. Setup & Running Instructions

### Backend (Laravel Base)
1. Copy template and configure `.env`:
   ```bash
   cp .env.example .env
   # Update DB_DATABASE, DB_USERNAME, DB_PASSWORD
   ```
2. Build and seed database:
   ```bash
   composer install
   php artisan key:generate
   php artisan migrate --seed
   php artisan storage:link
   ```
3. Start the dev server:
   ```bash
   php artisan serve --port=8000 # or 8001
   ```

### Frontend (Next.js Base)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api # or 8001
   ```
3. Run dev server:
   ```bash
   npm run dev -- --port 3000 # Adjust port as needed
   ```

---

## 5. Development Utilities

### Brand Replacement Script (`replace_brand.js`)
To update text references, branding names, and folder links across new cloned projects, run:
```bash
node replace_brand.js
```
This utility reads target directories and performs a search-and-replace using preset regular expressions for respective brands.
