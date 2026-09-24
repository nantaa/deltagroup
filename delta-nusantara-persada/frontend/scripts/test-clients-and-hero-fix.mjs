import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('Client Logos: CLIENTS in HomeClient.tsx must contain at least 20 clients (all 24 reference clients)', () => {
  const homeClientPath = path.join(rootDir, 'components/ui/HomeClient.tsx');
  assert.ok(fs.existsSync(homeClientPath), 'HomeClient.tsx must exist');
  const content = fs.readFileSync(homeClientPath, 'utf8');

  // Must define CLIENTS array with at least 20 entries
  const clientsMatch = content.match(/const CLIENTS = \[([\s\S]*?)\];/);
  assert.ok(clientsMatch, 'CLIENTS array definition must exist in HomeClient.tsx');
  
  // Count client items
  const clientEntries = clientsMatch[1].match(/\{\s*id:/g) || [];
  assert.ok(
    clientEntries.length >= 20,
    `CLIENTS array must have at least 20 clients, found ${clientEntries.length}`
  );

  // Check each referenced logo actually exists in public/
  const logoMatches = [...clientsMatch[1].matchAll(/logo:\s*['"]([^'"]+)['"]/g)];
  assert.ok(logoMatches.length >= 20, `Must have at least 20 logo paths, found ${logoMatches.length}`);
  
  for (const match of logoMatches) {
    const relLogo = match[1].replace(/^\//, '');
    const fullLogoPath = path.join(rootDir, 'public', relLogo);
    assert.ok(fs.existsSync(fullLogoPath), `Logo file must exist on disk: ${fullLogoPath}`);
  }
});

test('Client Logos: HomeClient UI provides navigation/counter for all clients', () => {
  const homeClientPath = path.join(rootDir, 'components/ui/HomeClient.tsx');
  const content = fs.readFileSync(homeClientPath, 'utf8');

  // Should have client indicator or total count visible
  assert.ok(
    content.includes('CLIENTS.length') || content.includes('24') || content.includes('total'),
    'HomeClient must reference total client count in UI'
  );
});

test('HeroSection Typography: Headline must not collide and must match test regex', () => {
  const heroPath = path.join(rootDir, 'components/ui/HeroSection.tsx');
  assert.ok(fs.existsSync(heroPath), 'HeroSection.tsx must exist');
  const content = fs.readFileSync(heroPath, 'utf8');
  const langContextPath = path.join(rootDir, 'lib/LanguageContext.tsx');
  const langContent = fs.existsSync(langContextPath) ? fs.readFileSync(langContextPath, 'utf8') : '';
  const combined = content + '\n' + langContent;

  // Must match the exact regex tested by test-homepage-redesign.mjs
  assert.match(
    combined,
    /Building Trust Through Professional/i,
    'HeroSection must contain "Building Trust Through Professional" without breaking inline tags'
  );

  // Leading must not be leading-[1.15] which causes glyph overlap
  assert.ok(
    !content.includes('leading-[1.15]'),
    'HeroSection must not use tight leading-[1.15] which causes descender collision'
  );

  // Must use generous leading (leading-[1.22], leading-[1.25], leading-tight, etc.)
  assert.ok(
    content.includes('leading-[1.2') || content.includes('leading-tight') || content.includes('leading-snug'),
    'HeroSection must use comfortable leading (e.g. leading-[1.25] or leading-tight) to prevent text collision'
  );
});
