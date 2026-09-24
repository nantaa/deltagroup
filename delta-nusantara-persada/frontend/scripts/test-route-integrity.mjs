import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const FILES_TO_CHECK = [
  'components/layout/Navbar.tsx',
  'components/layout/Footer.tsx',
  'components/ui/HeroSection.tsx',
  'components/ui/ServicesSection.tsx',
  'components/ui/WorkProcessTraining.tsx',
  'components/ui/TestimonialCTA.tsx',
];

test('Route Integrity: Zero 404 links to /kontak across all layout and UI components', () => {
  for (const relPath of FILES_TO_CHECK) {
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, 'utf8');
    assert.doesNotMatch(
      content,
      /href=["']\/kontak["']/i,
      `Broken route 404: ${relPath} contains href="/kontak" instead of href="/contact"`
    );
  }
});

test('Route Integrity: Zero 404 links to /layanan across all layout and UI components', () => {
  for (const relPath of FILES_TO_CHECK) {
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, 'utf8');
    assert.doesNotMatch(
      content,
      /href=["']\/layanan(["'#]|`)/i,
      `Broken route 404: ${relPath} contains href="/layanan..." instead of href="/services..."`
    );
  }
});

test('Route Integrity: Footer brand link points to /brand instead of dead anchor /about#brand', () => {
  const footerPath = path.join(rootDir, 'components/layout/Footer.tsx');
  assert.ok(fs.existsSync(footerPath), 'Footer.tsx must exist');
  const content = fs.readFileSync(footerPath, 'utf8');
  assert.doesNotMatch(
    content,
    /\/about#brand/i,
    'Footer must not link to non-existent anchor /about#brand; use /brand instead'
  );
});
