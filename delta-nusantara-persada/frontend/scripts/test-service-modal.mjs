import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const MODAL_PATH = path.join(rootDir, 'components/ui/ServiceDetailModal.tsx');
const SERVICES_SECTION_PATH = path.join(rootDir, 'components/ui/ServicesSection.tsx');

test('TDD 1: ServiceDetailModal.tsx component exists', () => {
  assert.ok(fs.existsSync(MODAL_PATH), 'components/ui/ServiceDetailModal.tsx must exist');
});

test('TDD 2: ServiceDetailModal data contains all 6 services with required fields matching docs', () => {
  assert.ok(fs.existsSync(MODAL_PATH), 'File must exist');
  const content = fs.readFileSync(MODAL_PATH, 'utf8');

  const expectedServiceIds = [
    'pesawat-angkat-angkut',
    'pubt',
    'elevator-eskalator',
    'proteksi-kebakaran',
    'listrik-petir',
    'pesawat-tenaga-produksi',
  ];

  for (const id of expectedServiceIds) {
    assert.match(
      content,
      new RegExp(`['"]?${id}['"]?\\s*:`, 'i'),
      `ServiceDetailModal must contain data for service id: ${id}`
    );
  }

  // Legal basis (Dasar Hukum) checks from docs
  assert.match(content, /Pemenaker No\. 8 Tahun 2020|Permenaker No\. 8 Tahun 2020/i, 'Must contain legal basis for Pesawat Angkat & Angkut');
  assert.match(content, /Undang-Undang Uap 1930/i, 'Must contain legal basis for PUBT');
  assert.match(content, /Permenaker No\. 6 Tahun 2017/i, 'Must contain legal basis for Elevator & Eskalator');
  assert.match(content, /Permenakertrans No\. Per\.02\/MEN\/1983/i, 'Must contain legal basis for Proteksi Kebakaran');
  assert.match(content, /Permenaker No\. 12 Tahun 2015/i, 'Must contain legal basis for Listrik & Petir');
  assert.match(content, /Permenaker No\. 38 Tahun 2016/i, 'Must contain legal basis for Pesawat Tenaga & Produksi');
});

test('TDD 3: ServiceDetailModal uses card.svg for corner ornament and provides accessible close triggers', () => {
  assert.ok(fs.existsSync(MODAL_PATH), 'File must exist');
  const content = fs.readFileSync(MODAL_PATH, 'utf8');
  assert.match(content, /card\.svg/i, 'Modal must use card.svg as corner ornament');
  assert.match(content, /Escape/i, 'Modal must handle Escape key for accessibility');
  assert.match(content, /onClose/i, 'Modal must accept onClose handler');
  assert.match(content, /Layanan K3/i, 'Modal must include Layanan K3 badge');
  assert.match(content, /Dasar Hukum/i, 'Modal must include Dasar Hukum section');
  assert.match(content, /Jenis Layanan/i, 'Modal must include Jenis Layanan section');
});

test('TDD 4: ServicesSection integrates modal popup instead of redirecting page', () => {
  const content = fs.readFileSync(SERVICES_SECTION_PATH, 'utf8');
  
  // Must import or render ServiceDetailModal
  assert.match(content, /ServiceDetailModal/i, 'ServicesSection must use ServiceDetailModal');

  // Must not have <Link href="/services#..." for Selengkapnya
  assert.doesNotMatch(
    content,
    /<Link[^>]*href=\{`\/services#\$\{s\.id\}`\}[^>]*>[\s\S]*?Selengkapnya/i,
    'ServicesSection must not redirect with Link to /services# for Selengkapnya'
  );

  // Must have interactive click trigger for opening modal
  assert.match(
    content,
    /onClick=\{[^}]*(?:setSelected|setActive|setModal|openModal|handleOpen)[^}]*\}/i,
    'ServicesSection must have an onClick handler to open modal on user interaction'
  );
});
