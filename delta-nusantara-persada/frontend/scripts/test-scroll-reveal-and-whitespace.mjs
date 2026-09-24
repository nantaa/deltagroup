import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('ScrollReveal Component: Exists and implements zero-dependency IntersectionObserver', () => {
  const scrollRevealPath = path.join(rootDir, 'components/ui/ScrollReveal.tsx');
  assert.ok(fs.existsSync(scrollRevealPath), 'ScrollReveal.tsx must exist');
  const content = fs.readFileSync(scrollRevealPath, 'utf8');

  assert.ok(
    content.includes('IntersectionObserver'),
    'ScrollReveal.tsx must use browser IntersectionObserver'
  );
  assert.ok(
    content.includes('opacity') && content.includes('translate'),
    'ScrollReveal.tsx must use hardware-accelerated opacity and transform classes'
  );
});

test('TeamSection Geometry: Uses tall portrait card aspect ratio and balanced max-w-5xl container', () => {
  const teamPath = path.join(rootDir, 'components/ui/TeamSection.tsx');
  assert.ok(fs.existsSync(teamPath), 'TeamSection.tsx must exist');
  const content = fs.readFileSync(teamPath, 'utf8');

  // Must maintain slender card width max-w-[300px] or max-w-[310px]
  assert.ok(
    content.includes('max-w-[300px]') || content.includes('max-w-[310px]'),
    'TeamSection cards must use slender portrait width max-w-[300px]'
  );

  // Must have balanced portrait height
  assert.ok(
    content.includes('min-h-[390px]') || content.includes('min-h-[405px]') || content.includes('min-h-[430px]') || content.includes('min-h-[445px]'),
    'TeamSection cards must maintain balanced portrait height'
  );

  // Must use max-w-5xl container
  assert.ok(
    content.includes('max-w-5xl'),
    'TeamSection container must use max-w-5xl for 3-card balance'
  );
});

test('Section Animations: Homepage components integrate ScrollReveal', () => {
  const teamPath = path.join(rootDir, 'components/ui/TeamSection.tsx');
  const teamContent = fs.readFileSync(teamPath, 'utf8');

  assert.ok(
    teamContent.includes('ScrollReveal'),
    'TeamSection.tsx must integrate ScrollReveal for smooth entry animation'
  );

  const servicesPath = path.join(rootDir, 'components/ui/ServicesSection.tsx');
  const servicesContent = fs.readFileSync(servicesPath, 'utf8');

  assert.ok(
    servicesContent.includes('ScrollReveal'),
    'ServicesSection.tsx must integrate ScrollReveal for smooth entry animation'
  );
});
