import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const MARKETING_CONTACTS_PATH = path.join(rootDir, 'lib/marketingContacts.ts');
const FLOATING_WA_PATH = path.join(rootDir, 'components/ui/FloatingWhatsApp.tsx');
const LAYOUT_PATH = path.join(rootDir, 'app/layout.tsx');
const TESTIMONIAL_CTA_PATH = path.join(rootDir, 'components/ui/TestimonialCTA.tsx');

test('TDD 1: marketingContacts.ts exists and exports valid marketing contact list', () => {
  assert.ok(fs.existsSync(MARKETING_CONTACTS_PATH), 'marketingContacts.ts must exist');
  const content = fs.readFileSync(MARKETING_CONTACTS_PATH, 'utf8');
  
  assert.match(content, /export\s+const\s+MARKETING_CONTACTS(?::\s*[^=]+)?\s*=/, 'Must export MARKETING_CONTACTS');
  assert.match(content, /Atika/i, 'Must include Atika');
  assert.match(content, /Anik/i, 'Must include Anik');
  assert.match(content, /Yopi/i, 'Must include Yopi');
  assert.match(content, /Intang/i, 'Must include Intang');
  assert.match(content, /Ali M/i, 'Must include Ali M');
  assert.match(content, /Erje/i, 'Must include Erje');
  assert.match(content, /Indri/i, 'Must include Indri');
  assert.match(content, /Bayu/i, 'Must include Bayu');
  assert.match(content, /Tya/i, 'Must include Tya');
  assert.match(content, /Yunny/i, 'Must include Yunny');
  assert.match(content, /Eko/i, 'Must include Eko');
});

test('TDD 2: FloatingWhatsApp.tsx implements popup UI matching reference', () => {
  assert.ok(fs.existsSync(FLOATING_WA_PATH), 'FloatingWhatsApp.tsx must exist');
  const content = fs.readFileSync(FLOATING_WA_PATH, 'utf8');

  // Trigger button & headers
  assert.match(content, /Butuh Bantuan\?\s*Klik Disini/i, 'Must have trigger button copy');
  assert.match(content, /Butuh Bantuan\?\s*Silahkan Chat dengan salah satu marketing kami/i, 'Must have modal header copy');
  
  // WhatsApp badges & icons
  assert.match(content, /MARKETING_CONTACTS/, 'Must iterate through MARKETING_CONTACTS');
  assert.match(content, /wa\.me|whatsapp/i, 'Must link to WhatsApp');
});

test('TDD 3: Root layout mounts FloatingWhatsApp component', () => {
  assert.ok(fs.existsSync(LAYOUT_PATH), 'app/layout.tsx must exist');
  const content = fs.readFileSync(LAYOUT_PATH, 'utf8');
  assert.match(content, /<FloatingWhatsApp\s*\/>/, 'Root layout must render FloatingWhatsApp');
});

test('TDD 4: TestimonialCTA.tsx links Konsultasi Gratis to riksauji WhatsApp', () => {
  assert.ok(fs.existsSync(TESTIMONIAL_CTA_PATH), 'TestimonialCTA.tsx must exist');
  const content = fs.readFileSync(TESTIMONIAL_CTA_PATH, 'utf8');
  assert.match(content, /wa\.me/i, 'TestimonialCTA must link Konsultasi Gratis to WhatsApp');
});
