import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '../..')

const postControllerPath = path.join(projectRoot, 'backend', 'app', 'Http', 'Controllers', 'Api', 'PostController.php')

test('Image processing pipeline in PostController.php', () => {
  const postControllerContent = fs.readFileSync(postControllerPath, 'utf-8')

  assert.ok(
    postControllerContent.includes('imagewebp') || postControllerContent.includes('.webp'),
    'PostController must convert uploaded images to WebP format'
  )
  assert.ok(
    postControllerContent.includes('1600') || postControllerContent.includes('max_width') || postControllerContent.includes('imagescale'),
    'PostController must clamp max image dimensions to save 20GB SSD'
  )
})
