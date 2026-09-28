import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '../..')
const frontendRoot = path.resolve(__dirname, '..')

const apiRoutesPath = path.join(projectRoot, 'backend', 'routes', 'api.php')
const authTsPath = path.join(frontendRoot, 'lib', 'auth.ts')

// 1. Check backend routes/api.php
const apiRoutes = fs.readFileSync(apiRoutesPath, 'utf-8')
const protectedSection = apiRoutes.split("Route::middleware('auth:sanctum')")[1] || ''

assert.ok(
  protectedSection.includes("Route::post('/posts'") || protectedSection.includes("Route::apiResource('posts'"),
  'POST /posts must be inside auth:sanctum protected middleware group'
)
assert.ok(
  protectedSection.includes("Route::delete('/posts/{post}'") || protectedSection.includes("Route::apiResource('posts'"),
  'DELETE /posts/{post} must be inside auth:sanctum protected middleware group'
)

// 2. Check frontend auth.ts does not use leaked NEXT_PUBLIC_ADMIN_PASS
const authTs = fs.readFileSync(authTsPath, 'utf-8')
assert.ok(
  !authTs.includes('NEXT_PUBLIC_ADMIN_PASS'),
  'auth.ts must NOT use hardcoded or client-exposed NEXT_PUBLIC_ADMIN_PASS'
)
assert.ok(
  authTs.includes('/auth/login') || authTs.includes('api.post'),
  'auth.ts login() must call real backend auth endpoint'
)

console.log('✅ test-auth-and-api-security passed!')
