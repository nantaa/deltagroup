import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '../..')

const apiRoutesPath = path.join(projectRoot, 'backend', 'routes', 'api.php')
const apiRoutesContent = fs.readFileSync(apiRoutesPath, 'utf-8')

assert.ok(
  apiRoutesContent.includes('throttle:5,1') || apiRoutesContent.includes('throttle:6,1') || apiRoutesContent.includes('throttle:10,1'),
  'Login route must be protected by throttle rate limiting middleware'
)

// Ensure public registration is not exposed unprotected
assert.ok(
  !apiRoutesContent.includes("Route::post('/register'"),
  'Public registration must not be open to the internet without guard'
)

console.log('✅ test-rate-limit-config passed!')
