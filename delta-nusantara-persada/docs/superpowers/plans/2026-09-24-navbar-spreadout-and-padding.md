# Navbar Spacing & Padding Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize navbar padding and item distribution so navigation links and actions have balanced breathing room, eliminating the awkward right-side clumping while maintaining grid alignment with the rest of the site.

**Architecture:** 
1. Adopt a balanced 3-zone layout: Logo (Left), Navigation Links (Center), Actions/Language/CTA (Right). This distributes items evenly across the navbar and introduces natural whitespace between sections instead of jamming 8 items together on the right.
2. Refine vertical height from `h-20` (80px) to a sleeker `h-16` (64px) or `h-[72px]`, reducing vertical bulk while maintaining touch targets.
3. Widen container constraint smoothly from `max-w-7xl` to `max-w-[1400px]` with streamlined horizontal padding (`px-4 sm:px-6 lg:px-8`), giving desktop viewports room to breathe without causing gutter misalignment with the page body.

**Tech Stack:** Next.js 14, React, Tailwind CSS, Node.js test runner (`node --test`).

## Global Constraints
- Target component: `delta-nusantara-persada/frontend/components/layout/Navbar.tsx`
- Preserves all 6 shortcuts (`#layanan`, `#keunggulan`, `#alur-kerja`, `#tim-ahli`, `AboutModal` trigger, `/berita`).
- Preserves Language dropdown and CTA button ("HUBUNGI KAMI").
- Maintains mobile drawer responsiveness (< 768px).
- Zero regressions across existing 50 automated tests in `npm test`.

---

### Task 1: Write TDD Automated Tests for Navbar Spacing & Layout

**Files:**
- Create: `delta-nusantara-persada/frontend/scripts/test-navbar-spreadout.mjs`
- Modify: `delta-nusantara-persada/frontend/package.json`

**Interfaces:**
- Consumes: `components/layout/Navbar.tsx`
- Produces: Automated test validating 3-zone distribution, container max-width/padding, and streamlined height.

- [ ] **Step 1: Write failing test script `scripts/test-navbar-spreadout.mjs`**

```javascript
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node delta-nusantara-persada/frontend/scripts/test-navbar-spreadout.mjs`
Expected: FAIL with assertion error.

- [ ] **Step 3: Register test in `package.json`**

Append `scripts/test-navbar-spreadout.mjs` to `npm test`.

---

### Task 2: Implement Spread-Out 3-Zone Layout in `Navbar.tsx`

**Files:**
- Modify: `delta-nusantara-persada/frontend/components/layout/Navbar.tsx`

- [ ] **Step 1: Refactor `Navbar.tsx` container and layout**
  1. Container: `<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">`
  2. Inner Bar: `<div className="flex items-center justify-between h-[72px]">`
  3. Zone 1 (Left): Logo link (`shrink-0`).
  4. Zone 2 (Center): Navigation links (`hidden md:flex items-center justify-center gap-5 lg:gap-7 flex-1 mx-4 lg:mx-8`).
  5. Zone 3 (Right): Language selector + CTA button (`hidden md:flex items-center gap-4 shrink-0`).
  6. Mobile drawer and toggle: retain untouched for small screens.

- [ ] **Step 2: Run `test-navbar-spreadout.mjs` to verify it passes**

Run: `node delta-nusantara-persada/frontend/scripts/test-navbar-spreadout.mjs`
Expected: PASS.

- [ ] **Step 3: Run full regression test suite**

Run: `npm test`
Expected: All 51+ tests PASS.

---

### Task 3: Visual Verification & Production Build

**Files:**
- Inspect: `http://localhost:3005` in browser subagent
- Generate: Screenshot of navbar spread-out layout

- [ ] **Step 1: Capture desktop screenshot across viewport**
Confirm visual harmony, balanced empty spaces, and zero overlap.

- [ ] **Step 2: Production Build Check**
Run: `npm run build`
Expected: 0 errors across all 27 pages.
