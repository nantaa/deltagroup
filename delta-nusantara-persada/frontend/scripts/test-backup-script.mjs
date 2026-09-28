import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '../..')

const backupScriptPath = path.join(projectRoot, 'backend', 'scripts', 'backup-db.sh')
assert.ok(fs.existsSync(backupScriptPath), 'backup-db.sh script must exist')

const content = fs.readFileSync(backupScriptPath, 'utf-8')
assert.ok(content.includes('mysqldump'), 'backup script must execute mysqldump')
assert.ok(content.includes('gzip'), 'backup script must compress dump with gzip to save 20GB disk')
assert.ok(content.includes('-mtime +7'), 'backup script must purge dumps older than 7 days')

console.log('✅ test-backup-script passed!')
