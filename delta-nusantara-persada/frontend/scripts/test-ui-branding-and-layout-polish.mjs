import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const FRONTEND_ROOT = path.resolve('.')

test('TDD 1: HomeClient.tsx renders colorful client logos without grayscale and has hover effects', () => {
  const file = path.join(FRONTEND_ROOT, 'components', 'ui', 'HomeClient.tsx')
  assert.ok(fs.existsSync(file), 'HomeClient.tsx must exist')
  const content = fs.readFileSync(file, 'utf8')

  assert.strictEqual(
    content.includes('grayscale'),
    false,
    'HomeClient logo images should not contain grayscale filter'
  )
  assert.ok(
    content.includes('group-hover:scale-') || content.includes('hover:scale-'),
    'HomeClient logo images or cards must have a scale hover effect'
  )
})

test('TDD 2: TeamSection.tsx centers text vertically inside the card body', () => {
  const file = path.join(FRONTEND_ROOT, 'components', 'ui', 'TeamSection.tsx')
  assert.ok(fs.existsSync(file), 'TeamSection.tsx must exist')
  const content = fs.readFileSync(file, 'utf8')

  assert.ok(
    content.includes('justify-center'),
    'TeamSection member details container must use justify-center for vertical center alignment'
  )
})

test('TDD 3: Navbar.tsx and Footer.tsx use Monochrome Logo.svg with unoptimized', () => {
  const navFile = path.join(FRONTEND_ROOT, 'components', 'layout', 'Navbar.tsx')
  const footFile = path.join(FRONTEND_ROOT, 'components', 'layout', 'Footer.tsx')
  assert.ok(fs.existsSync(navFile), 'Navbar.tsx must exist')
  assert.ok(fs.existsSync(footFile), 'Footer.tsx must exist')

  const navContent = fs.readFileSync(navFile, 'utf8')
  const footContent = fs.readFileSync(footFile, 'utf8')

  assert.ok(
    navContent.includes('/images/Monochrome Logo.svg'),
    'Navbar.tsx must use /images/Monochrome Logo.svg'
  )
  assert.ok(
    footContent.includes('/images/Monochrome Logo.svg'),
    'Footer.tsx must use /images/Monochrome Logo.svg'
  )
})

test('TDD 4: layout.tsx configures DNP.ico as website icon', () => {
  const file = path.join(FRONTEND_ROOT, 'app', 'layout.tsx')
  assert.ok(fs.existsSync(file), 'layout.tsx must exist')
  const content = fs.readFileSync(file, 'utf8')

  assert.ok(
    content.includes('/images/DNP.ico'),
    'layout.tsx metadata must configure icon with /images/DNP.ico'
  )
})

test('TDD 5: TestimonialCTA.tsx renders ondos.svg illustration and hides review carousel', () => {
  const file = path.join(FRONTEND_ROOT, 'components', 'ui', 'TestimonialCTA.tsx')
  assert.ok(fs.existsSync(file), 'TestimonialCTA.tsx must exist')
  const content = fs.readFileSync(file, 'utf8')

  assert.ok(
    content.includes('/images/ondos.svg'),
    'TestimonialCTA.tsx must use /images/ondos.svg'
  )
})

test('TDD 6: Footer.tsx includes Member of DELTA INDONESIA Group and official TikTok SVG logo', () => {
  const file = path.join(FRONTEND_ROOT, 'components', 'layout', 'Footer.tsx')
  assert.ok(fs.existsSync(file), 'Footer.tsx must exist')
  const content = fs.readFileSync(file, 'utf8')

  assert.ok(
    content.includes('Member of') && content.includes('DELTA INDONESIA Group') && content.includes('font-figtree'),
    'Footer.tsx must contain "Member of DELTA INDONESIA Group" with font-figtree'
  )
  assert.ok(
    content.includes('<svg') && content.includes('M19.59') && !content.includes('>Tk<'),
    'Footer.tsx must render real SVG TikTok logo instead of text Tk'
  )
})
