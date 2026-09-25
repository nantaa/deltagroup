# Panduan Lengkap: Deployment Standalone `delta-nusantara-persada` ke VPS

Dokumen ini adalah panduan resmi dan teruji untuk mendeploy **hanya** project `delta-nusantara-persada` (Frontend Next.js 14 & Backend Laravel 11) ke server VPS Ubuntu/Debian tanpa menarik (*pull/clone*) project lain dalam monorepo `delta-group`.

---

## 1. Arsitektur & Perbandingan Solusi

| Metode | Nilai | Penjelasan Teknis |
| :--- | :---: | :--- |
| **Metode 1: Git Sparse-Checkout (Direkomendasikan)** | **9.5/10** | Menggunakan fitur bawaan Git (`git sparse-checkout`). VPS hanya mengunduh tree dan blob fisik milik folder `delta-nusantara-persada`. File project lain **0 byte** di server. |
| **Metode 2: Git Subtree Split (Repo Mandiri)** | **7.5/10** | Memisahkan folder DNP ke repository GitHub terpisah via `git subtree push`. Lebih independen di VPS, namun menambah langkah kerja bagi developer di lokal. |
| **Metode 3: Clone Seluruh Monorepo** | **2/10** | **Salah.** Memboroskan storage SSD VPS, membocorkan kode 4 perusahaan lain ke server produksi DNP, dan memperlambat proses deployment. |

---

## 2. Prasyarat Server VPS

Pastikan paket berikut terpasang di VPS Ubuntu 22.04 / 24.04:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl ufw nginx certbot python3-certbot-nginx

# 1. Install Node.js 20 LTS & PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# 2. Install PHP 8.2/8.3 & Ekstensi untuk Laravel
sudo apt install -y php-fpm php-cli php-mysql php-mbstring php-xml php-bcmath php-curl php-zip unzip

# 3. Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

---

## 3. Langkah Demi Langkah: Git Sparse-Checkout di VPS

### Langkah 3.1: Buat Folder Web & Inisialisasi Sparse Clone
Jalankan di server VPS:

```bash
# 1. Buat direktori aplikasi
sudo mkdir -p /var/www/delta-nusantara/deltagroup
sudo chown -R $USER:$USER /var/www/delta-nusantara/deltagroup
cd /var/www/delta-nusantara/deltagroup

# 2. Clone metadata monorepo tanpa mengunduh file fisik (Blobless)
git clone --filter=blob:none --no-checkout https://github.com/USERNAME/delta-group.git .

# 3. Inisialisasi Sparse-Checkout mode cone
git sparse-checkout init --cone

# 4. Tentukan HANYA folder delta-nusantara-persada
git sparse-checkout set delta-nusantara-persada

# 5. Checkout branch main
git checkout main
```

> **Verifikasi:**
> Jalankan `ls -la /var/www/delta-nusantara/deltagroup`. Anda hanya akan melihat folder `delta-nusantara-persada` dan folder tersembunyi `.git`.
> Saat Anda masuk ke `delta-nusantara-persada` (`cd /var/www/delta-nusantara/deltagroup/delta-nusantara-persada`), Anda akan melihat:
> `PT_DNP_Summary_2024.md  SETUP.md  backend  frontend`

---

## 4. Setup Backend Laravel 11

Masuk ke folder backend:
```bash
cd /var/www/delta-nusantara/deltagroup/delta-nusantara-persada/backend

# 1. Install dependensi PHP produksi
composer install --no-dev --optimize-autoloader

# 2. Konfigurasi Environment
cp .env.example .env
nano .env
```

Sesuaikan isi `.env` produksi:
```env
APP_NAME="PT Delta Nusantara Persada"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://api.deltanusa.co.id

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dnp_production
DB_USERNAME=dnp_user
DB_PASSWORD=PasswordKuatDatabase123!
```

Jalankan perintah optimasi:
```bash
# 3. Generate App Key & Simlink Storage
php artisan key:generate
php artisan storage:link

# 4. Eksekusi migrasi database
php artisan migrate --force

# 5. Cache konfigurasi & rute untuk kecepatan maksimal
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 6. Set permission direktori storage
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

---

## 5. Setup Frontend Next.js 14

Masuk ke folder frontend:
```bash
cd /var/www/delta-nusantara/deltagroup/delta-nusantara-persada/frontend

# 1. Install dependensi
npm ci

# 2. Konfigurasi Environment Produksi
cat << 'EOF' > .env.local
NEXT_PUBLIC_API_URL=https://api.deltanusa.co.id/api
NEXT_PUBLIC_SITE_URL=https://deltanusa.co.id
NEXT_PUBLIC_ADMIN_USER=admin_dnp
NEXT_PUBLIC_ADMIN_PASS=GantiDenganPasswordAman2026!
EOF

# 3. Build Next.js Bundle
npm run build

# 4. Buat File Konfigurasi PM2 (ecosystem.config.js)
cat << 'EOF' > ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'dnp-frontend',
      script: 'npm',
      args: 'start -- -p 3000',
      cwd: '/var/www/delta-nusantara/deltagroup/delta-nusantara-persada/frontend',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}
EOF

# 5. Jalankan aplikasi dengan PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 6. Konfigurasi Nginx & Let's Encrypt SSL

Buat file konfigurasi Nginx untuk domain utama dan API:
```bash
sudo nano /etc/nginx/sites-available/deltanusa.conf
```

Paste konfigurasi berikut (ganti `deltanusa.co.id` dengan domain Anda):

```nginx
# 1. FRONTEND NEXT.JS (deltanusa.co.id & www.deltanusa.co.id)
server {
    server_name deltanusa.co.id www.deltanusa.co.id;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 2. BACKEND LARAVEL API (api.deltanusa.co.id)
server {
    server_name api.deltanusa.co.id;
    root /var/www/delta-nusantara/deltagroup/delta-nusantara-persada/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock; # Sesuaikan versi PHP Anda
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Aktifkan konfigurasi dan pasang SSL gratis:
```bash
# Aktifkan site
sudo ln -s /etc/nginx/sites-available/deltanusa.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Pasang SSL Certbot otomatis
sudo certbot --nginx -d deltanusa.co.id -d www.deltanusa.co.id -d api.deltanusa.co.id
```

---

## 7. Script Otomasi Update 1-Klik (`deploy.sh`)

Buat file script di VPS: `/var/www/delta-nusantara/deltagroup/deploy.sh`
```bash
nano /var/www/delta-nusantara/deltagroup/deploy.sh
```

Paste script berikut:
```bash
#!/bin/bash
set -e

echo "🚀 [1/4] Menarik update Git terbaru khusus delta-nusantara-persada..."
cd /var/www/delta-nusantara/deltagroup
git pull origin main

echo "📦 [2/4] Mengoptimasi Backend Laravel..."
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
pm2 reload ecosystem.config.js

echo "✅ [4/4] Deployment Berhasil! Sistem berjalan stabil tanpa downtime."
```

Beri izin eksekusi:
```bash
chmod +x /var/www/delta-nusantara/deltagroup/deploy.sh
```

Kapan pun Anda melakukan `git push` dari komputer lokal, cukup ketik satu perintah ini di VPS:
```bash
/var/www/delta-nusantara/deltagroup/deploy.sh
```

---

## 8. Ringkasan Keamanan & Tips Troubleshooting

1. **UFW Firewall:**
   ```bash
   sudo ufw allow OpenSSH
   sudo ufw allow 'Nginx Full'
   sudo ufw enable
   ```
2. **Jika Next.js tidak merespons:**
   Cek status dengan `pm2 status` dan log error dengan `pm2 logs dnp-frontend`.
3. **Jika upload gambar Laravel gagal:**
   Pastikan folder `storage` memiliki izin tulis:
   `sudo chown -R www-data:www-data /var/www/delta-nusantara/deltagroup/delta-nusantara-persada/backend/storage`
4. **Jika API mengembalikan 502 Bad Gateway atau Network Error:**
   Masalah ini terjadi ketika versi PHP-FPM tidak cocok dengan socket di Nginx. Cukup jalankan script auto-fixer:
   ```bash
   cd /var/www/delta-nusantara/deltagroup/delta-nusantara-persada/backend
   chmod +x vps-fix-502.sh
   ./vps-fix-502.sh
   ```
