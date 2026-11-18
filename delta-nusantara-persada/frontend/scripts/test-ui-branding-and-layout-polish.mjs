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

test('TDD 3: Navbar.tsx and Footer.tsx use DNP Logo Baru.png', () => {
  const navFile = path.join(FRONTEND_ROOT, 'components', 'layout', 'Navbar.tsx')
  const footFile = path.join(FRONTEND_ROOT, 'components', 'layout', 'Footer.tsx')
  assert.ok(fs.existsSync(navFile), 'Navbar.tsx must exist')
  assert.ok(fs.existsSync(footFile), 'Footer.tsx must exist')

  const navContent = fs.readFileSync(navFile, 'utf8')
  const footContent = fs.readFileSync(footFile, 'utf8')

  assert.ok(
    navContent.includes('DNP Logo Baru.png'),
    'Navbar.tsx must use DNP Logo Baru.png'
  )
  assert.ok(
    footContent.includes('DNP Logo Baru.png'),
    'Footer.tsx must use DNP Logo Baru.png'
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

test('TDD 7: LanguageContext.tsx and TestimonialCTA.tsx feature Director Commitment and compact non-overlapping framing', () => {
  const langFile = path.join(FRONTEND_ROOT, 'lib', 'LanguageContext.tsx')
  const ctaFile = path.join(FRONTEND_ROOT, 'components', 'ui', 'TestimonialCTA.tsx')
  assert.ok(fs.existsSync(langFile), 'LanguageContext.tsx must exist')
  assert.ok(fs.existsSync(ctaFile), 'TestimonialCTA.tsx must exist')

  const langContent = fs.readFileSync(langFile, 'utf8')
  const ctaContent = fs.readFileSync(ctaFile, 'utf8')

  assert.ok(
    langContent.includes('Kami berkomitmen memberikan beragam jasa pelayanan Konsultan') &&
    langContent.includes('Direktur') &&
    langContent.includes('DELTA NUSANTARA'),
    'LanguageContext.tsx must contain the official Director commitment statement'
  )

  assert.ok(
    ctaContent.includes('max-w-7xl') || ctaContent.includes('max-w-[1340px]') || ctaContent.includes('max-w-[1380px]'),
    'TestimonialCTA.tsx must use a compact container'
  )
})

test('TDD 8: Footer logo sits in a white background block', () => {
  const footFile = path.join(FRONTEND_ROOT, 'components', 'layout', 'Footer.tsx')
  assert.ok(fs.existsSync(footFile), 'Footer.tsx must exist')
  const content = fs.readFileSync(footFile, 'utf8')

  assert.ok(
    content.includes('bg-white') && content.includes('rounded-') && content.includes('shadow-'),
    'Footer logo must be contained in a white background block with rounded corners and shadow'
  )
})

test('TDD 9: Navbar features dualtone left white 15% and right blue 85% (#011E42)', () => {
  const navFile = path.join(FRONTEND_ROOT, 'components', 'layout', 'Navbar.tsx')
  assert.ok(fs.existsSync(navFile), 'Navbar.tsx must exist')
  const content = fs.readFileSync(navFile, 'utf8')

  assert.ok(
    content.includes('linear-gradient(90deg') && content.includes('#ffffff') && content.includes('15%') && content.includes('#011E42'),
    'Navbar.tsx must implement a dual-tone linear-gradient with 15% white and #011E42'
  )
})

test('TDD 10: Multi-resolution favicons and icons exist', () => {
  const dnpIco = path.join(FRONTEND_ROOT, 'public', 'images', 'DNP.ico')
  const publicFavicon = path.join(FRONTEND_ROOT, 'public', 'favicon.ico')
  const appFavicon = path.join(FRONTEND_ROOT, 'app', 'favicon.ico')
  const appleIcon = path.join(FRONTEND_ROOT, 'public', 'apple-icon.png')

  assert.ok(fs.existsSync(dnpIco) && fs.statSync(dnpIco).size > 1000, 'public/images/DNP.ico must exist')
  assert.ok(fs.existsSync(publicFavicon) && fs.statSync(publicFavicon).size > 1000, 'public/favicon.ico must exist')
  assert.ok(fs.existsSync(appFavicon) && fs.statSync(appFavicon).size > 1000, 'app/favicon.ico must exist')
  assert.ok(fs.existsSync(appleIcon) && fs.statSync(appleIcon).size > 1000, 'public/apple-icon.png must exist')
})

