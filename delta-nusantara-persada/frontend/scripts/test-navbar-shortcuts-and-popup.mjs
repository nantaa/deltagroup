import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PKG_JSON = path.join(rootDir, 'package.json');
const HERO_SECTION = path.join(rootDir, 'components/ui/HeroSection.tsx');
const SERVICES_SECTION = path.join(rootDir, 'components/ui/ServicesSection.tsx');
const WHY_CHOOSE_US = path.join(rootDir, 'components/ui/WhyChooseUs.tsx');
const WORK_PROCESS = path.join(rootDir, 'components/ui/WorkProcessTraining.tsx');
const TEAM_SECTION = path.join(rootDir, 'components/ui/TeamSection.tsx');
const TESTIMONIAL_CTA = path.join(rootDir, 'components/ui/TestimonialCTA.tsx');
const NAVBAR = path.join(rootDir, 'components/layout/Navbar.tsx');
const ABOUT_MODAL = path.join(rootDir, 'components/ui/AboutModal.tsx');
const LANG_CONTEXT = path.join(rootDir, 'lib/LanguageContext.tsx');

test('TDD 1: package.json name must be delta-nusantara-persada-frontend', () => {
  const pkg = JSON.parse(fs.readFileSync(PKG_JSON, 'utf8'));
  assert.strictEqual(
    pkg.name,
    'delta-nusantara-persada-frontend',
    'package.json name should accurately reflect delta-nusantara-persada-frontend'
  );
});

test('TDD 2: Homepage sections must have dedicated anchor IDs and scroll-mt offsets', () => {
  const servicesContent = fs.readFileSync(SERVICES_SECTION, 'utf8');
  assert.match(
    servicesContent,
    /id=["']layanan["']/,
    'ServicesSection.tsx must have id="layanan"'
  );
  assert.match(
    servicesContent,
    /scroll-mt-\d+/,
    'ServicesSection.tsx must have scroll-mt offset for sticky navbar'
  );

  const whyChooseUsContent = fs.readFileSync(WHY_CHOOSE_US, 'utf8');
  assert.match(
    whyChooseUsContent,
    /id=["']keunggulan["']/,
    'WhyChooseUs.tsx must have id="keunggulan"'
  );
  assert.match(
    whyChooseUsContent,
    /scroll-mt-\d+/,
    'WhyChooseUs.tsx must have scroll-mt offset'
  );

  const workProcessContent = fs.readFileSync(WORK_PROCESS, 'utf8');
  assert.match(
    workProcessContent,
    /id=["']alur-kerja["']/,
    'WorkProcessTraining.tsx must have id="alur-kerja"'
  );
  assert.match(
    workProcessContent,
    /scroll-mt-\d+/,
    'WorkProcessTraining.tsx must have scroll-mt offset'
  );

  const teamSectionContent = fs.readFileSync(TEAM_SECTION, 'utf8');
  assert.match(
    teamSectionContent,
    /id=["']tim-ahli["']/,
    'TeamSection.tsx must have id="tim-ahli"'
  );
  assert.match(
    teamSectionContent,
    /scroll-mt-\d+/,
    'TeamSection.tsx must have scroll-mt offset'
  );
});

test('TDD 3: Main action buttons must use rounded-[10px] with gradient and avoid rounded-full pills', () => {
  const heroContent = fs.readFileSync(HERO_SECTION, 'utf8');
  assert.match(
    heroContent,
    /rounded-\[10px\][\s\S]*?from-\[#04C5F4\]\s+to-\[#0D5EC4\]/,
    'HeroSection CTA must use rounded-[10px] with #04C5F4 to #0D5EC4 gradient'
  );
  assert.doesNotMatch(
    heroContent,
    /<Link[^>]*rounded-full/,
    'HeroSection CTA must not use rounded-full'
  );

  const ctaContent = fs.readFileSync(TESTIMONIAL_CTA, 'utf8');
  assert.match(
    ctaContent,
    /rounded-\[10px\][\s\S]*?from-\[#04C5F4\]\s+to-\[#0D5EC4\]/,
    'TestimonialCTA primary button must use rounded-[10px] with gradient'
  );
});

test('TDD 4: AboutModal.tsx must exist, support tabs and use assets from komponen tambahan', () => {
  assert.ok(fs.existsSync(ABOUT_MODAL), 'AboutModal.tsx must exist');
  const modalContent = fs.readFileSync(ABOUT_MODAL, 'utf8');

  assert.match(modalContent, /useLang/, 'AboutModal must use useLang for bilingual support');
  assert.match(modalContent, /komponen tambahan/, 'AboutModal must reference assets in /komponen tambahan');
  assert.match(modalContent, /(?:TentangKamiPic|Tentang Kami)\.png/, 'AboutModal must use Tentang Kami pic');
  assert.match(modalContent, /(?:VisiKamiPic|Visi Kami)\.png/, 'AboutModal must use Visi Kami pic');
  assert.match(modalContent, /(?:MisiKamiPic|Misi Kami)\.png/, 'AboutModal must use Misi Kami pic');
  assert.match(modalContent, /(?:KebijakanMutuPic|Kebijakan Mutu)\.png/, 'AboutModal must use Kebijakan Mutu pic');
  assert.match(modalContent, /(?:KebijakanK3Pic|Kebijakan K3)\.png/, 'AboutModal must use Kebijakan K3 pic');
  assert.match(modalContent, /card\.svg/, 'AboutModal must reuse card.svg wave ornament from ServiceDetailModal');
  assert.match(modalContent, /Escape/, 'AboutModal must support Escape key listener');
});

test('TDD 5: Navbar.tsx must remove Brand Kami and provide section shortcuts with modal trigger', () => {
  const navbarContent = fs.readFileSync(NAVBAR, 'utf8');

  // Brand Kami removed
  assert.doesNotMatch(
    navbarContent,
    /BRAND_MENU/,
    'Navbar.tsx must not contain BRAND_MENU'
  );
  assert.doesNotMatch(
    navbarContent,
    /t\(['"]nav['"],\s*['"]brand['"]\)/,
    'Navbar.tsx must not reference brand translation'
  );

  // Section shortcuts present
  assert.match(
    navbarContent,
    /layanan/,
    'Navbar.tsx must include shortcut to #layanan or /#layanan'
  );
  assert.match(
    navbarContent,
    /keunggulan/,
    'Navbar.tsx must include shortcut to #keunggulan or /#keunggulan'
  );
  assert.match(
    navbarContent,
    /alur-kerja/,
    'Navbar.tsx must include shortcut to #alur-kerja or /#alur-kerja'
  );
  assert.match(
    navbarContent,
    /tim-ahli/,
    'Navbar.tsx must include shortcut to #tim-ahli or /#tim-ahli'
  );

  // About modal integration
  assert.match(
    navbarContent,
    /AboutModal/,
    'Navbar.tsx must import and render AboutModal'
  );
});
