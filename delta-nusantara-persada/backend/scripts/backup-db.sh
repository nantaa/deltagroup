#!/bin/bash
# ==============================================================================
# Automated Database Backup Script with Gzip Compression & 7-Day Retention
# PT Delta Nusantara Persada Production Database
# ==============================================================================

set -e

BACKUP_DIR="/var/backups/dnp-database"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/dnp_db_${TIMESTAMP}.sql.gz"

DB_USER="${DB_USERNAME:-dnp_user}"
DB_PASS="${DB_PASSWORD:-PasswordKuatDatabase123!}"
DB_NAME="${DB_DATABASE:-dnp_production}"
DB_HOST="${DB_HOST:-127.0.0.1}"

# Ensure backup directory exists with restricted permissions
mkdir -p "${BACKUP_DIR}"
chmod 700 "${BACKUP_DIR}"

echo "📦 [$(date)] Starting MySQL backup for database: ${DB_NAME}..."

# Export compressed dump
mysqldump --host="${DB_HOST}" --user="${DB_USER}" --password="${DB_PASS}" --single-transaction --quick "${DB_NAME}" | gzip -9 > "${BACKUP_FILE}"

chmod 600 "${BACKUP_FILE}"
echo "✅ [$(date)] Backup successfully saved to: ${BACKUP_FILE} ($(du -sh "${BACKUP_FILE}" | cut -f1))"

# Purge backups older than 7 days to preserve 20GB SSD space
echo "🧹 [$(date)] Purging backups older than 7 days..."
find "${BACKUP_DIR}" -type f -name "dnp_db_*.sql.gz" -mtime +7 -delete

echo "🎉 [$(date)] Database backup routine completed."
