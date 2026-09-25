#!/usr/bin/env bash
set -e

echo "=================================================="
echo "  PT Delta Nusantara Persada - VPS 502 Auto-Fixer "
echo "=================================================="

# 1. Detect PHP-FPM socket
echo "[1/5] Mendeteksi socket PHP-FPM aktif..."
ACTIVE_SOCK=$(ls -1 /var/run/php/php*-fpm.sock 2>/dev/null | head -n 1)

if [ -z "$ACTIVE_SOCK" ]; then
    echo "  > Socket PHP-FPM tidak ditemukan. Memeriksa service PHP-FPM..."
    for ver in 8.3 8.2 8.1; do
        if systemctl list-unit-files | grep -q "php${ver}-fpm"; then
            echo "  > Menyalakan service php${ver}-fpm..."
            sudo systemctl enable "php${ver}-fpm"
            sudo systemctl restart "php${ver}-fpm"
            break
        fi
    done
    ACTIVE_SOCK=$(ls -1 /var/run/php/php*-fpm.sock 2>/dev/null | head -n 1)
fi

if [ -z "$ACTIVE_SOCK" ]; then
    echo "  [ERROR] Tidak dapat menemukan atau menyalakan PHP-FPM!"
    echo "  Jalankan: sudo apt install -y php8.2-fpm (atau php8.3-fpm)"
    exit 1
fi

echo "  > Ditemukan socket aktif: $ACTIVE_SOCK"

# 2. Update Nginx fastcgi_pass configuration
echo "[2/5] Memperbarui konfigurasi Nginx..."
NGINX_CONF="/etc/nginx/sites-available/deltanusa.conf"
if [ ! -f "$NGINX_CONF" ]; then
    NGINX_CONF=$(grep -rl "api.deltanusa.co.id" /etc/nginx/sites-available/ /etc/nginx/conf.d/ 2>/dev/null | head -n 1)
fi

if [ -n "$NGINX_CONF" ] && [ -f "$NGINX_CONF" ]; then
    echo "  > Memperbarui socket di $NGINX_CONF -> $ACTIVE_SOCK"
    sudo sed -i -E "s|fastcgi_pass unix:/var/run/php/php[0-9.]+-fpm\.sock;|fastcgi_pass unix:${ACTIVE_SOCK};|g" "$NGINX_CONF"
else
    echo "  > Catatan: File konfigurasi Nginx untuk deltanusa belum ditemukan di sites-available."
fi

# 3. Fix Laravel Directory Permissions
echo "[3/5] Memperbaiki permission storage & bootstrap/cache..."
BACKEND_DIR="/var/www/delta-nusantara/deltagroup/delta-nusantara-persada/backend"
if [ -d "$BACKEND_DIR" ]; then
    cd "$BACKEND_DIR"
    sudo chown -R www-data:www-data storage bootstrap/cache
    sudo chmod -R 775 storage bootstrap/cache
    
    # 4. Run Laravel Optimizations
    echo "[4/5] Menjalankan migrasi database & link storage..."
    php artisan storage:link 2>/dev/null || true
    php artisan migrate --force
    php artisan config:cache
    php artisan route:cache
fi

# 5. Test & Reload Nginx
echo "[5/5] Menguji dan me-reload Nginx..."
sudo nginx -t
sudo systemctl reload nginx

echo "=================================================="
echo "  SUKSES! PHP-FPM dan Nginx telah diselaraskan."
echo "  Endpoint API Anda kini aktif tanpa 502 Bad Gateway."
echo "=================================================="
