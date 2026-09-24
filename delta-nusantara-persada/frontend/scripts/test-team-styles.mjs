import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('TeamSection: Implements official SVG header card style with enhanced, larger typography', () => {
  const teamPath = path.join(rootDir, 'components/ui/TeamSection.tsx');
  assert.ok(fs.existsSync(teamPath), 'TeamSection.tsx must exist');
  const content = fs.readFileSync(teamPath, 'utf8');

  // Must reference official SVG ribbon backgrounds
  assert.ok(content.includes('pak-pranan.svg'), 'Must reference pak-pranan.svg');
  assert.ok(content.includes('mas-terzha.svg'), 'Must reference mas-terzha.svg');
  assert.ok(content.includes('pak-ricky.svg'), 'Must reference pak-ricky.svg');

  // Must reference portraits
  assert.ok(content.includes('pak-pranan.png'), 'Must reference pak-pranan.png');
  assert.ok(content.includes('mas-terzha.jpg'), 'Must reference mas-terzha.jpg');
  assert.ok(content.includes('pak-ricky.png'), 'Must reference pak-ricky.png');

  // Must have larger, legible typography classes
  assert.ok(
    content.includes('text-lg') || content.includes('text-xl'),
    'TeamSection must use prominent text size for leader names'
  );
  assert.ok(
    content.includes('text-sm') || content.includes('text-xs'),
    'TeamSection must use comfortable text size for bios'
  );

  // Must have ScrollReveal
  assert.ok(content.includes('ScrollReveal'), 'TeamSection must retain ScrollReveal animation');
});
