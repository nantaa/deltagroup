# Perbandingan & Changelog Setup Deployment VPS: V1 (Lama) vs V2 (Optimasi 2GB RAM / 20GB SSD)

Dokumen ini menjelaskan secara transparan dan detail setiap perubahan pada langkah setup VPS antara versi awal baseline (V1) dan arsitektur optimal (V2).

---

## Ringkasan Perubahan Arsitektur

| Aspek | Setup V1 (Lama / Baseline) | Setup V2 (Baru / Teroptimasi) | Alasan Teknis & Dampak |
| :--- | :--- | :--- | :--- |
| **Swap Memory** | Tidak dikonfigurasi (0 GB) | **2 GB Swap File** di SSD | Mencegah OS Out Of Memory (OOM) Panic saat `npm run build` atau traffic spike. |
| **Next.js Output Mode** | Full Next.js (Perlu semua `node_modules` di VPS ~500MB+) | **Standalone Output (`server.js`)** (~45MB) | Menghemat kuota disk 20GB hingga 90% dan memangkas waktu start server. |
| **PM2 Process Config** | `instances: 'max'` (2 worker), `max_memory: 500M` | **`instances: 1` (fork mode), `max_memory: 256M`** | Mencegah Node.js memakan seluruh RAM 2GB yang harus dibagi bersama MySQL & PHP. |
| **Frontend Caching** | Axios tanpa Next.js cache (Setiap visit menembak API Laravel) | **Native `fetch` + ISR (`revalidate: 60`)** + On-demand revalidation | 99% request artikel disajikan instan dari cache HTML tanpa menyentuh PHP-FPM. |
| **MySQL Config** | Default MySQL 8.0 (~600MB–800MB RAM) | **Tuned Low-Memory MySQL** (~256MB RAM) | Menurunkan `innodb_buffer_pool_size` & matikan `performance_schema` agar server stabil. |
| **Database Index** | Index hanya pada primary key | **Index pada `status`, `category`, `created_at`** | Query `WHERE status = 'published'` menjadi instan O(log N) tanpa full table scan. |
| **Nginx Static Caching** | Standar proxy pass | **Long-lived Cache Header (1 tahun) + Gzip Compression** | Nginx langsung menyajikan asset gambar, JS, dan CSS dengan beban CPU mendekati 0%. |
| **Auto-Deploy Script** | Full build di server tanpa cache cleanup | **Standalone build + pembersihan cache otomatis** | Mencegah akumulasi file temporary `.next/cache` memenuhi disk 20GB. |

---

## Perubahan Step-by-Step pada Server VPS

### 1. Penambahan Konfigurasi Swap (Sebelum Install Paket)
* **V1:** Langsung install nodejs & php.
* **V2:** Wajib membuat 2GB Swap:
  ```bash
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
  ```

### 2. Penyesuaian MySQL 8 (`/etc/mysql/mysql.conf.d/mysqld.cnf`)
* **V1:** Dibiarkan bawaan.
* **V2:** Tambahkan batasan memori:
  ```ini
  [mysqld]
  performance_schema = OFF
  innodb_buffer_pool_size = 128M
  innodb_log_buffer_size = 8M
  max_connections = 50
  ```

### 3. Eksekusi Next.js di PM2
* **V1:**
  ```javascript
  script: 'npm',
  args: 'start -- -p 3000',
  instances: 'max'
  ```
* **V2:**
  ```javascript
  script: '.next/standalone/delta-nusantara-persada/frontend/server.js',
  instances: 1,
  exec_mode: 'fork',
  max_memory_restart: '256M'
  ```
