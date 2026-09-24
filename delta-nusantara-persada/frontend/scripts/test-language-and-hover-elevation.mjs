import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const GLOBALS_CSS = path.join(rootDir, 'app/globals.css');
const SERVICES_SECTION = path.join(rootDir, 'components/ui/ServicesSection.tsx');
const LANGUAGE_CONTEXT = path.join(rootDir, 'lib/LanguageContext.tsx');
const NAVBAR = path.join(rootDir, 'components/layout/Navbar.tsx');
const FOOTER = path.join(rootDir, 'components/layout/Footer.tsx');

test('TDD 1: globals.css defines .elevated-hover with hardware-accelerated transform, pronounced lift, and deep multi-layered shadow', () => {
  assert.ok(fs.existsSync(GLOBALS_CSS), 'globals.css must exist');
  const css = fs.readFileSync(GLOBALS_CSS, 'utf8');

  // Must define .elevated-hover class
  assert.match(css, /\.elevated-hover\b/, 'globals.css must define .elevated-hover class');

  // Must have hover elevation lift of at least -8px or -10px or -translate-y-2.5
  assert.match(
    css,
    /(?:translateY\s*\(\s*-(?:[89]|1[0-9]|20)px\s*\)|-translate-y-(?:2\.5|[3-6]))/i,
    'Must define pronounced lift of at least -8px to -12px on hover'
  );

  // Must have multi-stop / layered shadow or brand glow
  assert.match(
    css,
    /(?:box-shadow|shadow-).*(?:rgba\(0,\s*140,\s*228|#008CE4|rgba\(1,\s*30,\s*66)/is,
    'Must have deep multi-layered elevation shadow with brand blue / navy tint'
  );
});

test('TDD 2: ServicesSection.tsx uses .elevated-hover on service cards and prevents clipping with expanded container padding', () => {
  assert.ok(fs.existsSync(SERVICES_SECTION), 'ServicesSection.tsx must exist');
  const content = fs.readFileSync(SERVICES_SECTION, 'utf8');

  // Service cards must use elevated-hover class
  assert.match(
    content,
    /elevated-hover/,
    'ServicesSection cards must use elevated-hover class'
  );

  // Overflow container must have sufficient vertical padding (greater than py-3, e.g. py-6, py-8, py-12) to avoid clipping elevated cards
  assert.match(
    content,
    /overflow-hidden\s+(?:py-(?:[6-9]|1[0-2]))/,
    'ServicesSection track container must use py-6 or higher to prevent card clipping on hover'
  );
});

test('TDD 3: LanguageContext.tsx implements localStorage persistence ("delta_language") and bilingual dictionary for nav, home servicesSection, and footer', () => {
  assert.ok(fs.existsSync(LANGUAGE_CONTEXT), 'LanguageContext.tsx must exist');
  const content = fs.readFileSync(LANGUAGE_CONTEXT, 'utf8');

  // LocalStorage persistence
  assert.match(
    content,
    /delta_language/,
    'LanguageContext must use delta_language in localStorage'
  );
  assert.match(
    content,
    /localStorage\.getItem/,
    'LanguageContext must read stored language on mount'
  );
  assert.match(
    content,
    /localStorage\.setItem/,
    'LanguageContext must persist changed language'
  );

  // Expanded translations for servicesSection
  assert.match(
    content,
    /servicesSection/,
    'LanguageContext translations must define servicesSection translations'
  );
});

test('TDD 4: Navbar.tsx translates desktop and mobile navigation links and includes language switcher in mobile menu', () => {
  assert.ok(fs.existsSync(NAVBAR), 'Navbar.tsx must exist');
  const content = fs.readFileSync(NAVBAR, 'utf8');

  // Must use t function from useLang
  assert.match(
    content,
    /const\s*\{[^}]*\bt\b[^}]*\}\s*=\s*useLang\(\)/,
    'Navbar.tsx must destructure t from useLang()'
  );

  // Must not have hardcoded Indonesian link text in desktop links
  assert.doesNotMatch(
    content,
    />\s*TENTANG KAMI\s*<\/Link>/,
    'Desktop about link must use translated label, not hardcoded "TENTANG KAMI"'
  );
  assert.doesNotMatch(
    content,
    />\s*BERITA\s*<\/Link>/,
    'Desktop news link must use translated label, not hardcoded "BERITA"'
  );

  // Mobile menu must have language toggle
  assert.match(
    content,
    /mobileOpen[\s\S]*?(?:languages\.map|setLang\('ID'\)|setLang\('EN'\)|setLang\(l\))/,
    'Mobile drawer must include language switcher buttons'
  );
});

test('TDD 5: Footer.tsx connects to useLang and renders translated headings, links, and copyright', () => {
  assert.ok(fs.existsSync(FOOTER), 'Footer.tsx must exist');
  const content = fs.readFileSync(FOOTER, 'utf8');

  // Must import useLang
  assert.match(
    content,
    /useLang/,
    'Footer.tsx must import useLang from LanguageContext'
  );

  // Must destructure t from useLang
  assert.match(
    content,
    /const\s*\{[^}]*\bt\b[^}]*\}\s*=\s*useLang\(\)/,
    'Footer.tsx must destructure t from useLang()'
  );
});

test('TDD 6: ServicesSection.tsx connects to useLang and renders translated eyebrow, title, CTA, and card items', () => {
  assert.ok(fs.existsSync(SERVICES_SECTION), 'ServicesSection.tsx must exist');
  const content = fs.readFileSync(SERVICES_SECTION, 'utf8');

  // Must import useLang
  assert.match(
    content,
    /useLang/,
    'ServicesSection.tsx must import useLang'
  );

  // Must destructure lang or t
  assert.match(
    content,
    /const\s*\{[^}]*(?:lang|t)[^}]*\}\s*=\s*useLang\(\)/,
    'ServicesSection.tsx must use useLang()'
  );

  // Must not hardcode "Selengkapnya" directly without translation lookup or conditional
  assert.doesNotMatch(
    content,
    /<span>Selengkapnya<\/span>/,
    'Card CTA must be translated instead of hardcoding <span>Selengkapnya</span>'
  );
});
