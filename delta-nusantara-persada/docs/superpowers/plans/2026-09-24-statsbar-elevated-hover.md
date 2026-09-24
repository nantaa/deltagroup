# StatsBar Elevated Hover Effect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a responsive, hardware-accelerated elevated hover effect on each individual statistic item in `StatsBar.tsx` without clipping or container collision.

**Architecture:** Create individual interactive micro-cards for each stat item with smooth lift (`-translate-y-1.5`), custom glow shadow (`shadow-lg shadow-[#008CE4]/15`), soft background highlight (`bg-[#F3F8FD]/80`), and icon micro-interaction (`group-hover:scale-110`). Replace harsh dividing borders with responsive, isolated item spacing so hovered items lift cleanly without slicing border artifacts.

**Tech Stack:** Next.js 14 (App Router), React, Tailwind CSS, Node.js test runner (`node --test`).

## Global Constraints
- Target component: `delta-nusantara-persada/frontend/components/ui/StatsBar.tsx`
- Parent container: `delta-nusantara-persada/frontend/components/ui/HeroSection.tsx`
- Must preserve existing text content, metrics (`5+`, `1000+`, `11+`), labels, and SVG icons.
- Must ensure parent container padding prevents shadow/transform clipping.
- Must pass all existing automated tests in `npm test` without regressions.

---

### Task 1: Write TDD Automated Tests for StatsBar Elevated Hover

**Files:**
- Create/Modify: `delta-nusantara-persada/frontend/scripts/test-statsbar-hover.mjs`
- Modify: `delta-nusantara-persada/frontend/package.json`

**Interfaces:**
- Consumes: `components/ui/StatsBar.tsx` and `components/ui/HeroSection.tsx`
- Produces: Automated test suite validating hover classes, transition timing, icon interaction, and anti-clipping container geometry.

- [ ] **Step 1: Write the failing test script `scripts/test-statsbar-hover.mjs`**

```javascript
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
  const content = fs.readFileSync(heroPath, 'utf8');
  assert.ok(
    content.includes('StatsBar'),
    'HeroSection must render StatsBar inside an unclipped wrapper'
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node delta-nusantara-persada/frontend/scripts/test-statsbar-hover.mjs`
Expected: FAIL with "StatsBar items must have elevated hover translation or shadow effects"

- [ ] **Step 3: Register test in `package.json` test script**

Ensure `scripts/test-statsbar-hover.mjs` is run as part of `npm test`.

---

### Task 2: Implement Tailored Elevated Hover in `StatsBar.tsx`

**Files:**
- Modify: `delta-nusantara-persada/frontend/components/ui/StatsBar.tsx`

**Interfaces:**
- Consumes: `STATS` array, icons in `/images/components/`
- Produces: Enhanced interactive stat capsules with subtle lift, shadow, background tint, and icon zoom on hover.

- [ ] **Step 1: Update `StatsBar.tsx` markup and styles**

Refactor the inner stat card container:
- Wrap each stat item in a `group` container with `rounded-xl p-3 sm:p-4 transition-all duration-300 ease-out cursor-default`.
- Add elevated hover effects: `hover:-translate-y-1.5 hover:bg-[#F2F8FD]/80 hover:shadow-lg hover:shadow-[#008CE4]/12 border border-transparent hover:border-[#CCE3F8]/70`.
- Animate the icon container on group hover: `group-hover:scale-110 transition-transform duration-300 ease-out`.
- Replace the rigid full-height `border-l` with refined separators or discrete item capsules that elevate independently without clipping.

- [ ] **Step 2: Run test to verify it passes**

Run: `node delta-nusantara-persada/frontend/scripts/test-statsbar-hover.mjs`
Expected: PASS with 2 passing tests.

- [ ] **Step 3: Run full regression test suite**

Run: `npm test`
Expected: PASS (all 49+ tests passing).

---

### Task 3: Visual Inspection and Verification

**Files:**
- Inspect: `http://localhost:3005` in browser
- Generate: Visual recording/screenshot of hover interaction

- [ ] **Step 1: Verify hover states in browser using browser subagent**
Hover over each of the 3 stat capsules (Expert Consultant, Projects Completed, Years of Experience) and record screenshot of the elevated state.

- [ ] **Step 2: Production Build Check**
Run: `npm run build`
Expected: 0 errors, all 27 pages compiled cleanly.
