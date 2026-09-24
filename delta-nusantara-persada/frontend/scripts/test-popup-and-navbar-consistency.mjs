import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SITE_HEADER = path.join(rootDir, 'components/layout/SiteHeader.tsx');
const NAVBAR = path.join(rootDir, 'components/layout/Navbar.tsx');
const SERVICE_MODAL = path.join(rootDir, 'components/ui/ServiceDetailModal.tsx');
const LANGUAGE_CONTEXT = path.join(rootDir, 'lib/LanguageContext.tsx');

test('TDD 1: SiteHeader.tsx exists and encapsulates TopBar and Navbar in a sticky top-0 container', () => {
  assert.ok(fs.existsSync(SITE_HEADER), 'SiteHeader.tsx must exist');
  const content = fs.readFileSync(SITE_HEADER, 'utf8');

  assert.match(content, /TopBar/, 'SiteHeader must include TopBar');
  assert.match(content, /Navbar/, 'SiteHeader must include Navbar');
  assert.match(
    content,
    /sticky\s+top-0\s+z-50/,
    'SiteHeader must have sticky top-0 z-50 for persistent navigation across all pages'
  );
});

test('TDD 2: Navbar.tsx includes desktop link to /services with translation key', () => {
  assert.ok(fs.existsSync(NAVBAR), 'Navbar.tsx must exist');
  const content = fs.readFileSync(NAVBAR, 'utf8');

  // Must have desktop Link href="/#layanan" or "/services"
  assert.match(
    content,
    /hidden\s+md:flex[\s\S]*?href=["']\/(?:#layanan|services)["'][\s\S]*?t\(['"]nav['"],\s*['"]services['"]\)/,
    'Navbar.tsx must render desktop link for /#layanan or /services using t("nav", "services")'
  );
});

test('TDD 3: LanguageContext.tsx defines comprehensive serviceModal translations for all 6 statutory services', () => {
  assert.ok(fs.existsSync(LANGUAGE_CONTEXT), 'LanguageContext.tsx must exist');
  const content = fs.readFileSync(LANGUAGE_CONTEXT, 'utf8');

  assert.match(content, /serviceModal\s*:/, 'LanguageContext must define serviceModal translations');

  const requiredServiceIds = [
    'pesawat-angkat-angkut',
    'pubt',
    'elevator-eskalator',
    'proteksi-kebakaran',
    'listrik-petir',
    'pesawat-tenaga-produksi',
  ];

  for (const id of requiredServiceIds) {
    assert.ok(
      content.includes(`'${id}'`) || content.includes(`"${id}"`) || content.includes(id),
      `serviceModal in LanguageContext must contain service ID: ${id}`
    );
  }
});

test('TDD 4: ServiceDetailModal.tsx connects to useLang and supports bilingual details and modal UI labels', () => {
  assert.ok(fs.existsSync(SERVICE_MODAL), 'ServiceDetailModal.tsx must exist');
  const content = fs.readFileSync(SERVICE_MODAL, 'utf8');

  assert.match(content, /useLang/, 'ServiceDetailModal must import useLang');
  assert.match(
    content,
    /const\s*\{[^}]*(?:lang|t)[^}]*\}\s*=\s*useLang\(\)/,
    'ServiceDetailModal must destructure lang or t from useLang()'
  );

  // Must not hardcode static Indonesian labels without bilingual resolution
  assert.doesNotMatch(
    content,
    /<span>Layanan K3<\/span>/,
    'Modal badge must be bilingual, not hardcoded <span>Layanan K3</span>'
  );
  assert.doesNotMatch(
    content,
    /<h3[^>]*>\s*Dasar Hukum\s*<\/h3>/,
    'Legal basis heading must be bilingual, not hardcoded "Dasar Hukum"'
  );
  assert.doesNotMatch(
    content,
    /<h3[^>]*>\s*Jenis Layanan\s*<\/h3>/,
    'Service scope heading must be bilingual, not hardcoded "Jenis Layanan"'
  );
});

test('TDD 5: Public pages use SiteHeader for 100% consistent navbar behavior and sticky layout', () => {
  const pagesToCheck = [
    'app/page.tsx',
    'app/about/page.tsx',
    'app/services/page.tsx',
    'app/contact/page.tsx',
    'app/berita/page.tsx',
    'app/courses/page.tsx',
    'app/courses/[slug]/page.tsx',
    'app/brand/page.tsx',
    'app/privacy/page.tsx',
    'app/terms/page.tsx',
  ];

  for (const pageRelPath of pagesToCheck) {
    const fullPath = path.join(rootDir, pageRelPath);
    assert.ok(fs.existsSync(fullPath), `${pageRelPath} must exist`);
    const content = fs.readFileSync(fullPath, 'utf8');

    assert.match(
      content,
      /(?:SiteHeader|<div\s+className=["'][^"']*sticky\s+top-0)/,
      `${pageRelPath} must use SiteHeader or sticky header`
    );
  }
});

test('TDD 6: Secondary public pages (/about, /services, /contact) support bilingual content', () => {
  const aboutPage = path.join(rootDir, 'app/about/page.tsx');
  const servicesPage = path.join(rootDir, 'app/services/page.tsx');
  const contactPage = path.join(rootDir, 'app/contact/page.tsx');

  const aboutContent = fs.readFileSync(aboutPage, 'utf8');
  const servicesContent = fs.readFileSync(servicesPage, 'utf8');
  const contactContent = fs.readFileSync(contactPage, 'utf8');

  // Should use client-side bilingual component or useLang
  assert.match(
    aboutContent,
    /(?:AboutClient|useLang)/,
    '/about must render a bilingual client component'
  );
  assert.match(
    servicesContent,
    /(?:ServicesClient|useLang)/,
    '/services must render a bilingual client component'
  );
  assert.match(
    contactContent,
    /(?:ContactClient|useLang)/,
    '/contact must render a bilingual client component'
  );
});
