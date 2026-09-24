# Panduan Deployment: Pull Khusus `delta-nusantara-persada` ke VPS (Tanpa Menarik Project Lain)

Dokumen ini menjelaskan cara menarik (**pull/clone**) **hanya** folder `delta-nusantara-persada` (Frontend Next.js & Backend Laravel) dari repository monorepo `delta-group` ke server VPS Anda tanpa membebani disk VPS dengan 4 project lainnya (`delta-indonesia`, `biro-sertifikasi-indonesia`, `delta-indonesia-pranenggar`, `delta-lembaga-kursus`).

---

## 1. Analisis & Penilaian Metode (Honest Rating)

| Metode | Nilai | Kelebihan | Kekurangan / Catatan |
| :--- | :---: | :--- | :--- |
| **Metode A: Native Git Sparse-Checkout** *(Direkomendasikan)* | **9.5/10** | • 100% native di Git (versi 2.25+)<br>• Tidak perlu bikin repo GitHub baru<br>• `git pull` otomatis hanya mengambil update DNP<br>• Menghemat bandwidth dan kapasitas SSD VPS | Path di VPS memiliki folder pembungkus `delta-nusantara-persada/` |
| **Metode B: Git Subtree Split (Repo GitHub Terpisah)** | **7.5/10** | • VPS hanya melihat repo mandiri 1:1<br>• Struktur folder di VPS langsung root | Mengharuskan developer menjalankan `git subtree push` setiap kali ada update, atau setup CI/CD pipeline tambahan |
| **Metode C: Clone Semua Project ke VPS** | **2/10** | • Sangat mudah dijalankan | **Salah besar.** Membuang resource server, memperlambat git pull, dan mencampur kode 5 perusahaan dalam satu server produksi. |

---

## 2. Cara Kerja Metode A: Git Sparse-Checkout (Direkomendasikan)

Dengan fitur **Blobless Clone (`--filter=blob:none`)** dan **Sparse Checkout**, Git hanya mengunduh data riwayat awal beberapa kilobyte, lalu hanya mengunduh file fisik milik folder `delta-nusantara-persada`.

### Langkah 1: Persiapan di Server VPS
Pastikan versi Git di VPS Anda minimal **v2.25**:
```bash
git --version
# Jika versi di bawah 2.25, update git:
# sudo apt update && sudo apt install git -y
```

### Langkah 2: Clone Awal Khusus Folder DNP
Jalankan langkah ini di direktori web server VPS Anda (misalnya `/var/www/delta-nusantara`):

```bash
# 1. Buat folder target di VPS
sudo mkdir -p /var/www/delta-nusantara
sudo chown -R $USER:$USER /var/www/delta-nusantara
cd /var/www/delta-nusantara

# 2. Inisialisasi clone tanpa mengunduh file fisik (0 MB blob)
git clone --filter=blob:none --no-checkout https://github.com/USERNAME/delta-group.git .

# 3. Aktifkan sparse-checkout
git sparse-checkout init --cone

# 4. Tentukan HANYA folder delta-nusantara-persada yang akan diambil
git sparse-checkout set delta-nusantara-persada

# 5. Checkout branch utama (ganti 'main' jika menggunakan 'master')
git checkout main
```

> **Verifikasi di VPS:**
> Jalankan perintah `ls -la`. Anda hanya akan melihat folder `delta-nusantara-persada/` dan `.git/`. Folder project lain sama sekali **tidak pernah diunduh** ke VPS!

---

## 3. Struktur Direktori di VPS Setelah Sparse-Checkout

```text
/var/www/delta-nusantara/
└── delta-nusantara-persada/
    ├── frontend/       <-- Next.js 14 App
    │   ├── app/
    │   ├── components/
    │   ├── public/
    │   ├── package.json
    │   └── next.config.js
    └── backend/        <-- Laravel 11 API
        ├── app/
        ├── config/
        ├── routes/
        ├── composer.json
        └── artisan
```

---

## 4. Setup Awal di VPS (Frontend & Backend)

### A. Setup Backend Laravel
```bash
cd /var/www/delta-nusantara/delta-nusantara-persada/backend

# 1. Install dependencies
composer install --no-dev --optimize-autoloader

# 2. Konfigurasi Environment
cp .env.example .env
nano .env
# Sesuaikan: APP_ENV=production, APP_URL, DB_DATABASE, DB_USERNAME, DB_PASSWORD

# 3. Generate Key & Storage Link
php artisan key:generate
php artisan storage:link

# 4. Migrate database
php artisan migrate --force

# 5. Permission storage & cache
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### B. Setup Frontend Next.js
```bash
cd /var/www/delta-nusantara/delta-nusantara-persada/frontend

# 1. Install dependencies
npm ci --production=false

# 2. Buat file .env.local untuk URL Backend VPS
cat << 'EOF' > .env.local
NEXT_PUBLIC_API_URL=https://api.deltanusa.co.id/api
NEXT_PUBLIC_SITE_URL=https://deltanusa.co.id
EOF

# 3. Build aplikasi Next.js
npm run build

# 4. Jalankan dengan PM2 (Process Manager)
pm2 start npm --name "dnp-frontend" -- start -- -p 3000
pm2 save
pm2 startup
```

---

## 5. Cara Melakukan Update di Masa Depan (`git pull`)

Ketika Anda melakukan commit dan push dari komputer lokal ke GitHub, Anda **cukup menjalankan perintah ini di VPS**:

```bash
cd /var/www/delta-nusantara

# 1. Pull update terbaru (Hanya akan mengunduh perubahan delta-nusantara-persada)
git pull origin main

# 2. Update Backend (Jika ada perubahan API/database)
cd delta-nusantara-persada/backend
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 3. Update Frontend (Jika ada perubahan UI)
cd ../frontend
npm install
npm run build
pm2 reload dnp-frontend
```

---

## 6. Otomasi: Script Deploy 1-Klik (`deploy.sh`)

Buat file script di VPS: `/var/www/delta-nusantara/deploy.sh`
```bash
nano /var/www/delta-nusantara/deploy.sh
```

Paste script berikut:
```bash
#!/bin/bash
set -e

echo "🚀 [1/4] Menarik update dari GitHub..."
cd /var/www/delta-nusantara
git pull origin main

echo "📦 [2/4] Memperbarui Backend Laravel..."
cd delta-nusantara-persada/backend
composer install --no-dev --optimize-autoloader --quiet
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
sudo chown -R www-data:www-data storage bootstrap/cache

echo "⚡ [3/4] Membangun Frontend Next.js..."
cd ../frontend
npm install --silent
npm run build
pm2 reload dnp-frontend

echo "✅ [4/4] Deployment Selesai! Web siap digunakan."
```

Beri izin eksekusi:
```bash
chmod +x /var/www/delta-nusantara/deploy.sh
```

Setiap kali Anda ingin update web di server, cukup ketik:
```bash
/var/www/delta-nusantara/deploy.sh
```

---

## 7. Alternatif Metode B: Git Subtree Split (Jika Ingin Repo Terpisah)

Jika Anda **tidak ingin** VPS terhubung ke monorepo sama sekali dan ingin repo terpisah `https://github.com/USERNAME/delta-nusantara-persada.git`:

1. Buat repository kosong baru di GitHub: `delta-nusantara-persada`.
2. Dari komputer lokal (di folder `delta-group`), jalankan perintah:
   ```bash
   git subtree push --prefix=delta-nusantara-persada git@github.com:USERNAME/delta-nusantara-persada.git main
   ```
3. Di VPS, Anda tinggal melakukan clone biasa:
   ```bash
   git clone git@github.com:USERNAME/delta-nusantara-persada.git /var/www/delta-nusantara
   ```
*(Catatan: Anda harus selalu menjalankan perintah `git subtree push` dari lokal setiap kali selesai mengedit).*
