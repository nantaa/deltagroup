import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '..');
const backendDir = path.resolve(frontendDir, '../backend');

test('TDD 1: Backend cors.php permits deltanusa.co.id and supports credentials', () => {
  const corsPath = path.join(backendDir, 'config/cors.php');
  assert.ok(fs.existsSync(corsPath), 'backend/config/cors.php must exist');
  const content = fs.readFileSync(corsPath, 'utf8');

  assert.match(content, /deltanusa\.co\.id/i, 'CORS config must explicitly allow deltanusa.co.id domain');
  assert.match(content, /'supports_credentials'\s*=>\s*true/i, 'CORS config must support credentials for Sanctum/session cookies');
});

test('TDD 2: Admin blog page must not display deceptive solar panel mock posts', () => {
  const blogPagePath = path.join(frontendDir, 'app/admin/blog/page.tsx');
  assert.ok(fs.existsSync(blogPagePath), 'Admin blog page must exist');
  const content = fs.readFileSync(blogPagePath, 'utf8');

  assert.doesNotMatch(content, /solar panel/i, 'Admin blog must not contain fake solar panel mock posts');
  assert.match(content, /error/i, 'Admin blog page must handle and display error states when API is unreachable');
});

test('TDD 3: next.config.js provides API rewrites for same-origin proxy', () => {
  const nextConfigPath = path.join(frontendDir, 'next.config.js');
  assert.ok(fs.existsSync(nextConfigPath), 'next.config.js must exist');
  const content = fs.readFileSync(nextConfigPath, 'utf8');

  assert.match(content, /rewrites/i, 'next.config.js must define rewrites for /api proxy');
  assert.match(content, /\/api\/:path\*/i, 'next.config.js must rewrite /api/:path* to backend');
});
