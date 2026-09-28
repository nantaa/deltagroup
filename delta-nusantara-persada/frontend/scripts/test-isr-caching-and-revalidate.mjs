import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const frontendRoot = path.resolve(__dirname, '..')

const slugPagePath = path.join(frontendRoot, 'app', 'berita', '[slug]', 'page.tsx')
const revalidateRoutePath = path.join(frontendRoot, 'app', 'api', 'revalidate', 'route.ts')

test('ISR data fetching in berita/[slug]/page.tsx', () => {
  const slugContent = fs.readFileSync(slugPagePath, 'utf-8')
  assert.ok(
    slugContent.includes('revalidate: 60') || slugContent.includes('revalidate: 300'),
    'berita/[slug]/page.tsx must use fetch cache with revalidate interval'
  )
  assert.ok(
    !slugContent.includes('api.get('),
    'berita/[slug]/page.tsx should not use un-cached Axios api.get in server components'
  )
})

test('On-demand cache revalidation route endpoint', () => {
  assert.ok(fs.existsSync(revalidateRoutePath), 'api/revalidate/route.ts must exist')
  const revalidateContent = fs.readFileSync(revalidateRoutePath, 'utf-8')
  assert.ok(
    revalidateContent.includes('revalidatePath') || revalidateContent.includes('revalidateTag'),
    'revalidation route must invoke Next.js revalidation handlers'
  )
})
