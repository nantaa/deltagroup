import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('TDD 1: Admin layout excludes Courses and Registrations links', () => {
  const layoutPath = path.join(rootDir, 'app/admin/layout.tsx');
  assert.ok(fs.existsSync(layoutPath), 'Admin layout must exist');
  const content = fs.readFileSync(layoutPath, 'utf8');

  assert.doesNotMatch(content, /\/admin\/courses/i, 'Admin layout must not link to /admin/courses');
  assert.doesNotMatch(content, /\/admin\/registrations/i, 'Admin layout must not link to /admin/registrations');
  assert.match(content, /\/admin\/blog/i, 'Admin layout must link to /admin/blog');
  assert.match(content, /\/admin\/topbar/i, 'Admin layout must link to /admin/topbar');
});

test('TDD 2: Landing page mounts LatestBlog news section', () => {
  const homePath = path.join(rootDir, 'app/page.tsx');
  assert.ok(fs.existsSync(homePath), 'app/page.tsx must exist');
  const content = fs.readFileSync(homePath, 'utf8');

  assert.match(content, /LatestBlog/i, 'Landing page must import and render LatestBlog component');
});

test('TDD 3: Admin blog management page fetches live posts on mount', () => {
  const blogAdminPath = path.join(rootDir, 'app/admin/blog/page.tsx');
  assert.ok(fs.existsSync(blogAdminPath), 'app/admin/blog/page.tsx must exist');
  const content = fs.readFileSync(blogAdminPath, 'utf8');

  assert.match(content, /api\.get\(['"]\/posts['"]\)/i, 'Admin blog page must fetch posts from API via api.get');
});

test('TDD 4: Sitemap does not index removed courses route', () => {
  const sitemapPath = path.join(rootDir, 'app/sitemap.ts');
  assert.ok(fs.existsSync(sitemapPath), 'app/sitemap.ts must exist');
  const content = fs.readFileSync(sitemapPath, 'utf8');

  assert.doesNotMatch(content, /\/courses/i, 'Sitemap must not include /courses route');
});
