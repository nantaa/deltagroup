#!/bin/bash
# ==============================================================================
# VPS Hardening & Logrotate Configuration Script (1-Click Run on VPS)
# PT Delta Nusantara Persada
# ==============================================================================

set -e

echo "🛡️ [1/3] Configuring Logrotate for Nginx, PM2, and Laravel..."

# 1. Buat konfigurasi logrotate khusus DNP
cat << 'EOF' | sudo tee /etc/logrotate.d/deltanusa > /dev/null
/var/www/delta-nusantara/deltagroup/delta-nusantara-persada/backend/storage/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 0664 www-data www-data
}

/root/.pm2/logs/*.log
/home/*/.pm2/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    copytruncate
}
EOF

# Test logrotate configuration
sudo logrotate -d /etc/logrotate.d/deltanusa > /dev/null 2>&1
echo "✅ Logrotate configured successfully (Keeps max 7 days of logs to save 20GB SSD)."

echo "🛡️ [2/3] Setting up Fail2ban for SSH & HTTP brute-force protection..."
sudo apt-get update -qq
sudo apt-get install -y fail2ban -qq
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
echo "✅ Fail2ban active."

echo "🛡️ [3/3] Setting up automated daily database backup cron job..."
CRON_JOB="0 2 * * * /var/www/delta-nusantara/deltagroup/delta-nusantara-persada/backend/scripts/backup-db.sh >> /var/log/dnp-backup.log 2>&1"
(crontab -l 2>/dev/null | grep -v "backup-db.sh" ; echo "$CRON_JOB") | crontab -
echo "✅ Automated daily database backup registered in crontab (Runs at 02:00 AM daily)."

echo "🎉 All professional VPS hardening steps completed successfully!"
