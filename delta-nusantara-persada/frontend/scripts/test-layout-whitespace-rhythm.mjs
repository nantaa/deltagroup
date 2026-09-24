import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('Whitespace & Layout: TeamSection.tsx must use generous container width and avoid max-w-4xl clamp', () => {
  const teamPath = path.join(rootDir, 'components/ui/TeamSection.tsx');
  assert.ok(fs.existsSync(teamPath), 'TeamSection.tsx must exist');
  const content = fs.readFileSync(teamPath, 'utf8');

  // Must not clamp the 3 cards into narrow max-w-4xl which causes 55%+ empty margins on desktop
  assert.ok(
    !content.includes('max-w-4xl'),
    'TeamSection must expand grid beyond max-w-4xl (e.g. max-w-5xl or max-w-6xl) to prevent empty side gutters'
  );

  // Must not hardcode rigid max-w-[282px] on cards
  assert.ok(
    !content.includes('max-w-[282px]'),
    'TeamSection card width must be flexible (e.g. max-w-sm or max-w-[340px]) rather than clamped to 282px'
  );

  // Must use max-w-5xl or max-w-6xl
  assert.ok(
    content.includes('max-w-5xl') || content.includes('max-w-6xl'),
    'TeamSection must use a balanced container width like max-w-5xl or max-w-6xl'
  );
});

test('Whitespace & Layout: TeamSection vertical rhythm and margins must be tightened', () => {
  const teamPath = path.join(rootDir, 'components/ui/TeamSection.tsx');
  const content = fs.readFileSync(teamPath, 'utf8');

  // Section padding must not be py-20 (causes 160px gap when stacked with previous section)
  assert.ok(
    !content.includes('py-20'),
    'TeamSection must not use excessive py-20 vertical padding'
  );

  // Must use tighter padding like py-14 or py-16
  assert.ok(
    content.includes('py-14') || content.includes('py-16'),
    'TeamSection must use disciplined padding such as py-14 or py-16'
  );

  // Header bottom margin must not be mb-14
  assert.ok(
    !content.includes('mb-14'),
    'TeamSection header must not use excessive mb-14 bottom margin'
  );
});

test('TeamSection Copy & Polish: Eyebrow must reflect leadership and bios must be distinct', () => {
  const teamPath = path.join(rootDir, 'components/ui/TeamSection.tsx');
  const content = fs.readFileSync(teamPath, 'utf8');

  // Eyebrow must not say LAYANAN KAMI
  assert.ok(
    !content.includes('LAYANAN KAMI'),
    'TeamSection eyebrow must not erroneously label leadership as LAYANAN KAMI'
  );

  // Leaders must not repeat the exact same bio 3 times
  const langContextPath = path.join(rootDir, 'lib/LanguageContext.tsx');
  const langContent = fs.existsSync(langContextPath) ? fs.readFileSync(langContextPath, 'utf8') : '';
  const combined = content + '\n' + langContent;
  const matches = [...combined.matchAll(/bio:\s*\{\s*ID:\s*['"]([^'"]+)['"]/g)];
  if (matches.length >= 3) {
    const uniqueBios = new Set(matches.map(m => m[1]));
    assert.strictEqual(
      uniqueBios.size,
      3,
      'All 3 leaders must have distinct, role-specific professional bios instead of duplicated placeholder text'
    );
  } else {
    const rawMatches = [...content.matchAll(/bio:\s*['"]([^'"]+)['"]/g)];
    assert.strictEqual(rawMatches.length, 3, 'Must have 3 leader bios');
    const uniqueBios = new Set(rawMatches.map(m => m[1]));
    assert.strictEqual(
      uniqueBios.size,
      3,
      'All 3 leaders must have distinct, role-specific professional bios instead of duplicated placeholder text'
    );
  }
});

test('Whitespace & Layout: WorkProcessTraining.tsx vertical rhythm must be balanced', () => {
  const wpPath = path.join(rootDir, 'components/ui/WorkProcessTraining.tsx');
  assert.ok(fs.existsSync(wpPath), 'WorkProcessTraining.tsx must exist');
  const content = fs.readFileSync(wpPath, 'utf8');

  assert.ok(
    content.includes('py-14') || content.includes('py-16'),
    'WorkProcessTraining must use balanced padding (py-14 or py-16) to avoid vertical whitespace collision'
  );
});
