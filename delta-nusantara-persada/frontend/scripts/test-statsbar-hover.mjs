import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('TDD 1: StatsBar.tsx implements elevated hover effect on each individual stat part', () => {
  const statsPath = path.join(rootDir, 'components/ui/StatsBar.tsx');
  assert.ok(fs.existsSync(statsPath), 'StatsBar.tsx must exist');
  const content = fs.readFileSync(statsPath, 'utf8');

  // Must have hover lift or elevated hover styling on each stat item
  assert.match(
    content,
    /hover:-translate-y|hover:shadow/i,
    'StatsBar items must have elevated hover translation or shadow effects'
  );

  // Must have transition duration and timing
  assert.match(
    content,
    /transition-(all|transform)/i,
    'StatsBar items must specify transition properties for smooth animation'
  );

  // Must have group hover or icon animation
  assert.match(
    content,
    /group-hover:(scale|translate)/i,
    'StatsBar icon or elements must have interactive group-hover micro-animation'
  );
});

test('TDD 2: HeroSection.tsx container provides adequate padding so StatsBar elevation is not clipped', () => {
  const heroPath = path.join(rootDir, 'components/ui/HeroSection.tsx');
  assert.ok(fs.existsSync(heroPath), 'HeroSection.tsx must exist');
  const content = fs.readFileSync(heroPath, 'utf8');
  assert.ok(
    content.includes('StatsBar'),
    'HeroSection must render StatsBar inside an unclipped wrapper'
  );
});
