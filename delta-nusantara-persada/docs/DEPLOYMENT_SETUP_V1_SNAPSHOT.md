# Snapshot: Deployment Setup V1 (Baseline Pre-Optimization)

Dokumen ini adalah arsip snapshot konfigurasi awal deployment VPS sebelum penerapan optimasi resource (2 vCPU, 2 GB RAM, 20 GB Disk), Caching ISR, dan Standalone Output.

---

## 1. Spesifikasi Server & Karakteristik Baseline

- **Spesifikasi:** 2 vCPU, 2 GB RAM, 20 GB SSD
- **Web Server:** Nginx (Proxy Pass ke Next.js :3000 & FastCGI PHP 8.2/8.3)
- **Database:** MySQL 8.0 (Konfigurasi Default)
- **Node Process Manager:** PM2 (Cluster Mode `instances: max`, Memory Limit: 500M per worker)
- **Build Mode:** Next.js Full Build (Membutuhkan `node_modules` lengkap di VPS)

---

## 2. Langkah Setup Baseline V1 (Asli)

### A. Prasyarat OS
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl ufw nginx certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
sudo apt install -y php-fpm php-cli php-mysql php-mbstring php-xml php-bcmath php-curl php-zip unzip
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

### B. Sparse Clone
```bash
sudo mkdir -p /var/www/delta-nusantara/deltagroup
sudo chown -R $USER:$USER /var/www/delta-nusantara/deltagroup
cd /var/www/delta-nusantara/deltagroup
git clone --filter=blob:none --no-checkout https://github.com/USERNAME/delta-group.git .
git sparse-checkout init --cone
git sparse-checkout set delta-nusantara-persada
git checkout main
```

### C. Backend Setup
```bash
cd /var/www/delta-nusantara/deltagroup/delta-nusantara-persada/backend
composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate
php artisan storage:link
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### D. Frontend Setup
```bash
cd /var/www/delta-nusantara/deltagroup/delta-nusantara-persada/frontend
npm ci
npm run build

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

pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### E. Nginx Baseline Configuration
```nginx
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

server {
    server_name api.deltanusa.co.id;
    root /var/www/delta-nusantara/deltagroup/delta-nusantara-persada/backend/public;
    index index.php;
    charset utf-8;
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```
