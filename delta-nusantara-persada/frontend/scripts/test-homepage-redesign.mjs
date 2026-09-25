import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('Asset Integrity: Critical SVG assets exist in public/', () => {
  const requiredAssets = [
    'public/images/cardblue.webp',
    'public/images/background hero DNP.svg',
  ];

  for (const relPath of requiredAssets) {
    const fullPath = path.join(rootDir, relPath);
    assert.ok(fs.existsSync(fullPath), `Missing required asset: ${relPath}`);
  }
});

test('Component: HeroSection.tsx implements background and reference copy', () => {
  const heroPath = path.join(rootDir, 'components/ui/HeroSection.tsx');
  assert.ok(fs.existsSync(heroPath), 'HeroSection.tsx must exist');
  const content = fs.readFileSync(heroPath, 'utf8');
  const langContextPath = path.join(rootDir, 'lib/LanguageContext.tsx');
  const langContent = fs.existsSync(langContextPath) ? fs.readFileSync(langContextPath, 'utf8') : '';
  const combined = content + '\n' + langContent;
  
  // Must use hero background image
  assert.match(content, /(herosectionn\.webp|background hero DNP\.svg)/i, 'HeroSection must reference hero background image');
  
  // Must include eyebrow, headline, subheadline, and CTAs
  assert.match(combined, /(INSPECTION\s*\|\s*CONSULTANT|INSPECTION TRAINING CERTIFICATION)/i, 'Must contain eyebrow text');
  assert.match(combined, /Building Trust Through Professional/i, 'Headline must match reference');
  assert.match(combined, /Inspection/i, 'Headline must include Inspection accent');
  assert.match(combined, /PELAJARI LAYANAN/i, 'Must include Pelajari Layanan CTA button');
});

test('Component: StatsBar.tsx implements the 3 new reference metrics (5+, 1000+, 11+)', () => {
  const statsPath = path.join(rootDir, 'components/ui/StatsBar.tsx');
  assert.ok(fs.existsSync(statsPath), 'StatsBar.tsx must exist');
  const content = fs.readFileSync(statsPath, 'utf8');
  assert.match(content, /5\s*\+/i, 'Must include 5+ Expert Consultant metric');
  assert.match(content, /1000\s*\+/i, 'Must include 1000+ Projects Completed metric');
  assert.match(content, /11\s*\+/i, 'Must include 11+ Years of Experience metric');
});

test('Component: HomeClient.tsx renders 200+ Perusahaan and 5 industry tags', () => {
  const clientPath = path.join(rootDir, 'components/ui/HomeClient.tsx');
  assert.ok(fs.existsSync(clientPath), 'HomeClient.tsx must exist');
  const content = fs.readFileSync(clientPath, 'utf8');
  const langContextPath = path.join(rootDir, 'lib/LanguageContext.tsx');
  const langContent = fs.existsSync(langContextPath) ? fs.readFileSync(langContextPath, 'utf8') : '';
  const combined = content + '\n' + langContent;

  assert.match(combined, /DIPERCAYA OLEH/i, 'Must include DIPERCAYA OLEH eyebrow');
  assert.match(combined, /200\+\s*Perusahaan/i, 'Must include 200+ Perusahaan headline');
  assert.match(content, /Oil & Gas/i, 'Must include Oil & Gas tag');
  assert.match(content, /Manufacturing/i, 'Must include Manufacturing tag');
  assert.match(content, /Construction/i, 'Must include Construction tag');
  assert.match(content, /Mining/i, 'Must include Mining tag');
  assert.match(content, /Energy/i, 'Must include Energy tag');
});

test('Component: ServicesSection.tsx implements Solusi Terintegrasi with the 3 reference card types', () => {
  const servicesPath = path.join(rootDir, 'components/ui/ServicesSection.tsx');
  assert.ok(fs.existsSync(servicesPath), 'ServicesSection.tsx must exist');
  const content = fs.readFileSync(servicesPath, 'utf8');
  const langContextPath = path.join(rootDir, 'lib/LanguageContext.tsx');
  const langContent = fs.existsSync(langContextPath) ? fs.readFileSync(langContextPath, 'utf8') : '';
  const combined = content + '\n' + langContent;

  assert.match(combined, /LAYANAN KAMI/i, 'Must include LAYANAN KAMI eyebrow');
  assert.match(combined, /Solusi Terintegrasi/i, 'Must include Solusi Terintegrasi headline');
  assert.match(combined, /Pesawat Angkat & Pesawat Angkut/i, 'Must include Pesawat Angkat & Pesawat Angkut');
  assert.match(combined, /Pesawat Uap & Bejana Tekan/i, 'Must include Pesawat Uap & Bejana Tekan');
  assert.match(combined, /Elevator & Eskalator/i, 'Must include Elevator & Eskalator');
});

test('Component: WhyChooseUs.tsx renders 4 value pillars in navy banner', () => {
  const whyPath = path.join(rootDir, 'components/ui/WhyChooseUs.tsx');
  assert.ok(fs.existsSync(whyPath), 'WhyChooseUs.tsx must exist');
  const content = fs.readFileSync(whyPath, 'utf8');
  const langContextPath = path.join(rootDir, 'lib/LanguageContext.tsx');
  const langContent = fs.existsSync(langContextPath) ? fs.readFileSync(langContextPath, 'utf8') : '';
  const combined = content + '\n' + langContent;

  assert.match(combined, /KENAPA HARUS MEMILIH KAMI/i, 'Must include eyebrow');
  assert.match(combined, /Komitmen Kami, Nilai Untuk Anda/i, 'Must include headline');
  assert.match(combined, /Standar Internasional/i, 'Must include Standar Internasional');
  assert.match(combined, /Tenaga Ahli/i, 'Must include Tenaga Ahli');
  assert.match(combined, /Solusi Terintegrasi/i, 'Must include Solusi Terintegrasi');
  assert.match(combined, /Kepuasan Klien/i, 'Must include Kepuasan Klien');
});

test('Component: WorkProcessTraining.tsx implements 5-step process and Jasa Riksa Uji Populer', () => {
  const splitPath = path.join(rootDir, 'components/ui/WorkProcessTraining.tsx');
  assert.ok(fs.existsSync(splitPath), 'WorkProcessTraining.tsx must exist');
  const content = fs.readFileSync(splitPath, 'utf8');
  const langContextPath = path.join(rootDir, 'lib/LanguageContext.tsx');
  const langContent = fs.existsSync(langContextPath) ? fs.readFileSync(langContextPath, 'utf8') : '';
  const combined = content + '\n' + langContent;

  assert.match(combined, /Proses Kerja Kami/i, 'Must include Proses Kerja Kami');
  assert.match(combined, /workflow\.svg|Consultation/i, 'Must include 5-step process workflow graphic or steps');
  assert.match(combined, /Jasa Riksa Uji Populer/i, 'Must pivot from Training Populer to Jasa Riksa Uji Populer');
});

test('Component: TeamSection.tsx features professional team with the 3 leaders from reference', () => {
  const teamPath = path.join(rootDir, 'components/ui/TeamSection.tsx');
  assert.ok(fs.existsSync(teamPath), 'TeamSection.tsx must exist');
  const content = fs.readFileSync(teamPath, 'utf8');
  const langContextPath = path.join(rootDir, 'lib/LanguageContext.tsx');
  const langContent = fs.existsSync(langContextPath) ? fs.readFileSync(langContextPath, 'utf8') : '';
  const combined = content + '\n' + langContent;

  assert.match(combined, /Tim Profesional Kami/i, 'Must have Section title');
  assert.match(content, /Pranan Jaya Barus/i, 'Must feature Pranan Jaya Barus');
  assert.match(content, /Terzha R\. Perdanawan/i, 'Must feature Terzha R. Perdanawan');
  assert.match(content, /Ricky Rumindo/i, 'Must feature Ricky Rumindo');
});

test('Component: TestimonialCTA.tsx implements dual card banner with Astra testimonial and consultation CTA', () => {
  const ctaPath = path.join(rootDir, 'components/ui/TestimonialCTA.tsx');
  assert.ok(fs.existsSync(ctaPath), 'TestimonialCTA.tsx must exist');
  const content = fs.readFileSync(ctaPath, 'utf8');
  const langContextPath = path.join(rootDir, 'lib/LanguageContext.tsx');
  const langContent = fs.existsSync(langContextPath) ? fs.readFileSync(langContextPath, 'utf8') : '';
  const combined = content + '\n' + langContent;

  assert.match(combined, /Apa Kata Klien Kami/i, 'Must render testimonial title');
  assert.match(combined, /Astra International/i, 'Must feature Astra testimonial');
  assert.match(combined, /Siap Meningkatkan Standar Keselamatan/i, 'Must render consultation banner headline');
  assert.match(combined, /KONSULTASI GRATIS/i, 'Must render Konsultasi Gratis CTA button');
});

test('Page: app/page.tsx integrates components including TopBar running text', () => {
  const pagePath = path.join(rootDir, 'app/page.tsx');
  const content = fs.readFileSync(pagePath, 'utf8');
  assert.ok(content.includes('<TopBar') || content.includes('<SiteHeader'), 'Page should render TopBar/SiteHeader running text ticker');
  assert.ok(content.includes('<Navbar') || content.includes('<SiteHeader'), 'Page should render Navbar/SiteHeader');
  assert.ok(content.includes('<HeroSection'), 'Page should render HeroSection');
  assert.ok(content.includes('<HomeClient'), 'Page should render HomeClient');
  assert.ok(content.includes('<ServicesSection'), 'Page should render ServicesSection');
  assert.ok(content.includes('<WhyChooseUs'), 'Page should render WhyChooseUs');
  assert.ok(content.includes('<WorkProcessTraining'), 'Page should render WorkProcessTraining');
  assert.ok(content.includes('<TeamSection'), 'Page should render TeamSection');
  assert.ok(content.includes('<TestimonialCTA'), 'Page should render TestimonialCTA');
});
