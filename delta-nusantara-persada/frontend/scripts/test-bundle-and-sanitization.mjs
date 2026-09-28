import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '../..')
const frontendRoot = path.resolve(__dirname, '..')

const navbarPath = path.join(frontendRoot, 'components', 'layout', 'Navbar.tsx')
const postControllerPath = path.join(projectRoot, 'backend', 'app', 'Http', 'Controllers', 'Api', 'PostController.php')

test('Frontend: Navbar.tsx lazy-loads heavy modals via next/dynamic', () => {
  const navbarContent = fs.readFileSync(navbarPath, 'utf-8')
  assert.ok(
    navbarContent.includes("dynamic(") && navbarContent.includes("AboutModal"),
    'Navbar.tsx must lazy-load AboutModal via dynamic import to optimize initial bundle size'
  )
})

test('Backend: PostController.php sanitizes rich text content to prevent XSS', () => {
  const postControllerContent = fs.readFileSync(postControllerPath, 'utf-8')
  assert.ok(
    postControllerContent.includes('sanitizeContent') || postControllerContent.includes('strip_tags') || postControllerContent.includes('preg_replace'),
    'PostController must sanitize incoming HTML content before saving to database'
  )
})
