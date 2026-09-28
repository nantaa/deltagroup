import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()

test('TDD Perf 1: Hero portal character asset is optimized WebP and under 150 KB', () => {
  const heroPortalWebP = path.join(ROOT, 'public/images/hero-character-portal.webp')
  assert.ok(fs.existsSync(heroPortalWebP), 'hero-character-portal.webp must exist')
  const stats = fs.statSync(heroPortalWebP)
  const sizeKB = stats.size / 1024
  assert.ok(sizeKB < 150, `hero-character-portal.webp must be < 150 KB, got ${sizeKB.toFixed(1)} KB`)
})

test('TDD Perf 2: Hero background asset is under 120 KB', () => {
  const heroBg = path.join(ROOT, 'public/images/herosectionn.webp')
  assert.ok(fs.existsSync(heroBg), 'herosectionn.webp must exist')
  const stats = fs.statSync(heroBg)
  const sizeKB = stats.size / 1024
  assert.ok(sizeKB < 120, `herosectionn.webp must be < 120 KB, got ${sizeKB.toFixed(1)} KB`)
})

test('TDD Perf 3: HeroPortal.tsx and HeroSection.tsx use optimized WebP assets with responsive sizes', () => {
  const portalCode = fs.readFileSync(path.join(ROOT, 'components/ui/HeroPortal.tsx'), 'utf-8')
  assert.ok(portalCode.includes('/images/hero-character-portal.webp'), 'HeroPortal must load hero-character-portal.webp')
  assert.ok(portalCode.includes('sizes='), 'HeroPortal must have responsive sizes attribute')

  const heroCode = fs.readFileSync(path.join(ROOT, 'components/ui/HeroSection.tsx'), 'utf-8')
  assert.ok(heroCode.includes('/images/herosectionn.webp'), 'HeroSection must load herosectionn.webp')
})

test('TDD Perf 4: next.config.js configures modern image formats (AVIF & WebP)', () => {
  const nextConfig = fs.readFileSync(path.join(ROOT, 'next.config.js'), 'utf-8')
  assert.ok(nextConfig.includes('image/avif') && nextConfig.includes('image/webp'), 'next.config.js must support AVIF and WebP formats')
})

test('TDD Perf 5: ondos.webp exists and is under 80 KB (replacing 1.3 MB SVG)', () => {
  const ondosWebP = path.join(ROOT, 'public/images/ondos.webp')
  assert.ok(fs.existsSync(ondosWebP), 'ondos.webp must exist')
  const sizeKB = fs.statSync(ondosWebP).size / 1024
  assert.ok(sizeKB < 80, `ondos.webp must be < 80 KB, got ${sizeKB.toFixed(1)} KB`)
})

test('TDD Perf 6: TestimonialCTA.tsx uses ondos.webp without unoptimized/priority', () => {
  const ctaCode = fs.readFileSync(path.join(ROOT, 'components/ui/TestimonialCTA.tsx'), 'utf-8')
  assert.ok(ctaCode.includes('/images/ondos.webp'), 'TestimonialCTA must reference ondos.webp')
  assert.ok(!ctaCode.includes('/images/ondos.svg'), 'TestimonialCTA must NOT reference ondos.svg')
})

test('TDD Perf 7: cardblue.webp is under 40 KB and WhyChooseUs.tsx does NOT use priority', () => {
  const cardblue = path.join(ROOT, 'public/images/cardblue.webp')
  assert.ok(fs.existsSync(cardblue), 'cardblue.webp must exist')
  const sizeKB = fs.statSync(cardblue).size / 1024
  assert.ok(sizeKB < 40, `cardblue.webp must be < 40 KB, got ${sizeKB.toFixed(1)} KB`)

  const wcuCode = fs.readFileSync(path.join(ROOT, 'components/ui/WhyChooseUs.tsx'), 'utf-8')
  assert.ok(!wcuCode.includes('priority'), 'WhyChooseUs background must NOT have priority tag')
})
