import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('TDD 1: Navbar.tsx uses optimized container width and streamlined height', () => {
  const navPath = path.join(rootDir, 'components/layout/Navbar.tsx');
  assert.ok(fs.existsSync(navPath), 'Navbar.tsx must exist');
  const content = fs.readFileSync(navPath, 'utf8');

  // Must use expanded max width (e.g., max-w-[1400px] or max-w-screen-2xl) to allow spreadout
  assert.match(
    content,
    /max-w-(screen-2xl|\[1400px\]|\[1440px\])/,
    'Navbar container must use expanded max width for spread-out layout'
  );

  // Must use streamlined height (h-16 or h-[72px]) instead of bulky h-20
  assert.match(
    content,
    /h-(16|\[72px\]|\[70px\])/,
    'Navbar must use streamlined vertical height'
  );
});

test('TDD 2: Navbar.tsx separates nav links and action CTA into distinct flex zones', () => {
  const navPath = path.join(rootDir, 'components/layout/Navbar.tsx');
  const content = fs.readFileSync(navPath, 'utf8');

  // Desktop nav should separate the central link list from the right-side actions
  assert.match(
    content,
    /justify-center|flex-1|mx-auto/i,
    'Navbar navigation links must be distributed with balanced whitespace'
  );
});
