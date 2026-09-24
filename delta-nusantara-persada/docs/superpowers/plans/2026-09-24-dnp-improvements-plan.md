# Implementation Plan: Delta Nusantara Persada Improvements & Redesign

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul `delta-nusantara-persada` frontend navigation with section shortcuts, migrate Tentang Kami into a rich tabbed popup modal using assets from `komponen tambahan`, transform all pill buttons into authoritative `rounded-[10px]` gradient buttons matching `Button Blue (gradasi).svg`, fix repository bugs, and provide an airtight standalone VPS deployment guide.

**Architecture:** 
- Next.js 14 App Router with Tailwind CSS and Lucide React icons.
- Global modal state or event-driven modal trigger for "Tentang Kami" integrated into `SiteHeader` / `Navbar`.
- Anchor-based section navigation with `scroll-mt-24` offsets across `app/page.tsx` components.
- Standardized corporate button design system (`rounded-[10px]` with linear gradient `#04C5F4` -> `#0D5EC4`).

**Tech Stack:** Next.js 14.2, React 18, TypeScript 5, Tailwind CSS 3.4, Node.js Test Runner.

---

## Direct & Honest Idea Evaluation (Rated out of 10)

| User Requirement / Idea | Honest Rating | Honest Critique & Challenge of Assumptions |
| :--- | :---: | :--- |
| **1. Remove "Brand Kami" from Navbar** | **9.5/10** | **Strong Idea.** PT DNP is an independent statutory inspection body (PJK3 Kemnaker RI). Having sister company external links in the top header distracts client procurement and weakens local conversion. Removing it declutters navigation. |
| **2. Migrate Tentang Kami to Popup Modal** | **4/10 if /about route is deleted<br>9/10 if hybrid (Navbar triggers Modal, /about remains for SEO)** | **You are WRONG if you delete the `/about` page completely.**<br>• *Reason:* Industrial B2B clients and Kemnaker compliance officers search Google for "PT Delta Nusantara Persada profil" and "SKP PJK3 PT DNP". If `/about` becomes a 404 or is removed from the sitemap, your SEO ranking and indexing will drop.<br>• *Solution:* Keep `/about` as a dedicated landing page for Google crawlers and direct URLs, but make the Navbar "Tentang Kami" link trigger the interactive Popup Modal on the homepage. |
| **3. Create Section Shortcuts into Navbar** | **8.5/10** | **Good Idea.** Single-page navigation gives corporate visitors instant access to Layanan, Keunggulan, Alur Kerja, and Tim Ahli.<br>• *Watch-out:* When a visitor is on `/berita` or `/services`, clicking `#keunggulan` must route to `/#keunggulan` seamlessly. Also, sections must have `scroll-mt-24` so the sticky header does not cover section headings. |
| **4. Change Buttons from Pill to Square (Rounded 10px Gradient)** | **9/10** | **Strong Idea.** Pill buttons (`rounded-full`) look like playful consumer mobile apps. The Figma reference in `public/Komponen website/Button/Button Blue (gradasi).svg` specifies `rx="10"` with `#04C5F4` to `#0D5EC4` gradient. Changing to `rounded-[10px]` provides a much more authoritative, industrial engineering look. |
| **5. Standalone VPS Deployment Guide** | **9/10** | **Essential Idea.** Deploying a monorepo subfolder without pulling other companies' source code to production VPS is crucial for security and disk efficiency. We will provide a complete guide with Git Sparse-Checkout, Nginx multi-tier proxy, and PM2. |

---

## Global Constraints

- **Preserve Bilingual Support:** All new modal components and navbar links must support Indonesian (`ID`) and English (`EN`) via `useLang()`.
- **Maintain Test Suite:** Existing 43 unit/integration tests in `scripts/` must continue to pass or be updated to match the new specifications.
- **Button Geometry:** Standardize on `rounded-[10px]` with gradient `from-[#04C5F4] to-[#0D5EC4]` (or dark variant for secondary buttons). No `rounded-full` pills on main CTAs.
- **Accessibility:** Modals must have `aria-modal="true"`, backdrop blur, `Escape` key listener, and body scroll lock.

---

## File Structure & Responsibilities

| File Path | Responsibility |
| :--- | :--- |
| `frontend/package.json` | Fix package naming from `delta-indonesia-frontend` to `delta-nusantara-persada-frontend`. |
| `frontend/components/ui/AboutModal.tsx` | **(NEW)** Interactive modal popup displaying Tentang Kami, Visi, Misi, Kebijakan Mutu, and Kebijakan K3 using assets in `public/komponen tambahan/`. |
| `frontend/components/layout/Navbar.tsx` | Remove "Brand Kami", add section shortcuts (`#layanan`, `#keunggulan`, `#alur-kerja`, `#tim-ahli`), integrate `AboutModal` trigger, update mobile menu, and update CTA button styling. |
| `frontend/components/ui/HeroSection.tsx` | Update CTA buttons from `rounded-full` to `rounded-[10px]` gradient. |
| `frontend/components/ui/ServicesSection.tsx` | Add `id="layanan"` with `scroll-mt-24`. |
| `frontend/components/ui/WhyChooseUs.tsx` | Add `id="keunggulan"` with `scroll-mt-24`. |
| `frontend/components/ui/WorkProcessTraining.tsx` | Add `id="alur-kerja"` with `scroll-mt-24`. |
| `frontend/components/ui/TeamSection.tsx` | Add `id="tim-ahli"` with `scroll-mt-24`. |
| `frontend/components/ui/TestimonialCTA.tsx` | Update CTA buttons from `rounded-full` to `rounded-[10px]` gradient. |
| `frontend/lib/LanguageContext.tsx` | Add bilingual dictionary entries for AboutModal (tabs, vision, mission, policies) and new navbar section shortcuts. |
| `frontend/scripts/test-navbar-shortcuts-and-popup.mjs` | **(NEW)** TDD test script verifying button geometry, navbar shortcuts, AboutModal rendering, and asset integrity. |
| `delta-nusantara-persada/DEPLOY_VPS_STANDALONE.md` | **(NEW)** Production-grade standalone VPS deployment guide with Sparse-Checkout, Nginx configuration, PM2, and SSL. |

---

## Tasks Decomposition (TDD Order)

### Task 1: Bug Fixes & Section Anchor Offsets

**Files:**
- Modify: `delta-nusantara-persada/frontend/package.json`
- Modify: `delta-nusantara-persada/frontend/components/ui/ServicesSection.tsx`
- Modify: `delta-nusantara-persada/frontend/components/ui/WhyChooseUs.tsx`
- Modify: `delta-nusantara-persada/frontend/components/ui/WorkProcessTraining.tsx`
- Modify: `delta-nusantara-persada/frontend/components/ui/TeamSection.tsx`
- Test: `delta-nusantara-persada/frontend/scripts/test-navbar-shortcuts-and-popup.mjs`

- [ ] **Step 1: Write failing test for section IDs and package naming**
  Create `scripts/test-navbar-shortcuts-and-popup.mjs` asserting:
  - `package.json` name is `"delta-nusantara-persada-frontend"`.
  - `ServicesSection.tsx` has `id="layanan"` and `scroll-mt-`.
  - `WhyChooseUs.tsx` has `id="keunggulan"` and `scroll-mt-`.
  - `WorkProcessTraining.tsx` has `id="alur-kerja"` and `scroll-mt-`.
  - `TeamSection.tsx` has `id="tim-ahli"` and `scroll-mt-`.

- [ ] **Step 2: Run test to verify it fails (RED)**
  `node --test scripts/test-navbar-shortcuts-and-popup.mjs` -> Expected: FAIL

- [ ] **Step 3: Implement minimal code (GREEN)**
  - Update `package.json` name.
  - Add section `id`s and `scroll-mt-24` to `ServicesSection`, `WhyChooseUs`, `WorkProcessTraining`, and `TeamSection`.

- [ ] **Step 4: Run test to verify it passes (GREEN)**
  `node --test scripts/test-navbar-shortcuts-and-popup.mjs` -> Expected: PASS

- [ ] **Step 5: Commit**
  `git commit -m "fix(dnp): update package name and add section anchor ids with scroll margins"`

---

### Task 2: Button Transformation (Pill to Square 10px Gradient)

**Files:**
- Modify: `delta-nusantara-persada/frontend/components/ui/HeroSection.tsx`
- Modify: `delta-nusantara-persada/frontend/components/ui/TestimonialCTA.tsx`
- Modify: `delta-nusantara-persada/frontend/components/layout/Navbar.tsx`
- Test: `delta-nusantara-persada/frontend/scripts/test-navbar-shortcuts-and-popup.mjs`

- [ ] **Step 1: Write failing test asserting button styling**
  Add assertions in `scripts/test-navbar-shortcuts-and-popup.mjs` verifying:
  - `HeroSection.tsx` CTA buttons use `rounded-[10px]` or `rounded-lg` and `bg-gradient-to-r from-[#04C5F4] to-[#0D5EC4]`. No `rounded-full` on main action links.
  - `TestimonialCTA.tsx` CTA buttons use `rounded-[10px]` and gradient.
  - `Navbar.tsx` "Hubungi Kami" CTA uses `rounded-[10px]` and gradient.

- [ ] **Step 2: Run test to verify it fails (RED)**
  `node --test scripts/test-navbar-shortcuts-and-popup.mjs` -> Expected: FAIL

- [ ] **Step 3: Implement minimal code (GREEN)**
  - Update `HeroSection.tsx` primary button to `rounded-[10px] bg-gradient-to-r from-[#04C5F4] to-[#0D5EC4] shadow-md shadow-[#04C5F4]/30 hover:brightness-105 active:scale-[0.98]` and secondary button to `rounded-[10px] border border-white/80 hover:bg-white/10`.
  - Update `TestimonialCTA.tsx` primary CTA to `rounded-[10px] bg-gradient-to-r from-[#04C5F4] to-[#0D5EC4]`.
  - Update `Navbar.tsx` Hubungi Kami button to `rounded-[10px] bg-gradient-to-r from-[#04C5F4] to-[#0D5EC4]`.

- [ ] **Step 4: Run test to verify it passes (GREEN)**
  `node --test scripts/test-navbar-shortcuts-and-popup.mjs` -> Expected: PASS

- [ ] **Step 5: Commit**
  `git commit -m "style(dnp): update buttons from pill to square 10px gradient matching design spec"`

---

### Task 3: Build "Tentang Kami" Popup Modal with Komponen Tambahan Assets

**Files:**
- Create: `delta-nusantara-persada/frontend/components/ui/AboutModal.tsx`
- Modify: `delta-nusantara-persada/frontend/lib/LanguageContext.tsx`
- Test: `delta-nusantara-persada/frontend/scripts/test-navbar-shortcuts-and-popup.mjs`

**Assets Used:**
- `/komponen tambahan/Tentang Kami.png` (Overview)
- `/komponen tambahan/Visi Kami.png` (Visi)
- `/komponen tambahan/Misi Kami.png` (Misi)
- `/komponen tambahan/Kebijakan Mutu.png` (Kebijakan Mutu)
- `/komponen tambahan/Kebijakan K3.png` (Kebijakan K3)
- SVGs: `glyphs_binoculars-bold.svg`, `mage_goals.svg`, `carbon_policy.svg`, `carbon_deployment-policy.svg`

- [ ] **Step 1: Write failing test for AboutModal**
  Add assertions in `scripts/test-navbar-shortcuts-and-popup.mjs`:
  - `AboutModal.tsx` exists and imports `useLang`.
  - Contains tab switching for `Tentang Kami`, `Visi & Misi`, `Kebijakan Mutu`, and `Kebijakan K3`.
  - References assets in `/komponen tambahan/`.
  - Implements `Escape` key close and backdrop overlay.

- [ ] **Step 2: Run test to verify it fails (RED)**
  `node --test scripts/test-navbar-shortcuts-and-popup.mjs` -> Expected: FAIL

- [ ] **Step 3: Implement minimal code (GREEN)**
  - Add `aboutModal` dictionary to `LanguageContext.tsx` for `ID` and `EN`.
  - Create `AboutModal.tsx` with high-aesthetic card layout, tabs, image display, close button, backdrop blur, and bilingual copy.

- [ ] **Step 4: Run test to verify it passes (GREEN)**
  `node --test scripts/test-navbar-shortcuts-and-popup.mjs` -> Expected: PASS

- [ ] **Step 5: Commit**
  `git commit -m "feat(dnp): add AboutModal popup component using komponen tambahan assets"`

---

### Task 4: Navbar Overhaul (Remove Brand Kami & Add Section Shortcuts)

**Files:**
- Modify: `delta-nusantara-persada/frontend/components/layout/Navbar.tsx`
- Modify: `delta-nusantara-persada/frontend/lib/LanguageContext.tsx`
- Test: `delta-nusantara-persada/frontend/scripts/test-navbar-shortcuts-and-popup.mjs`
- Test: `delta-nusantara-persada/frontend/scripts/test-popup-and-navbar-consistency.mjs`

- [ ] **Step 1: Write failing test for Navbar links**
  Add assertions in `test-navbar-shortcuts-and-popup.mjs`:
  - Navbar does NOT contain `BRAND_MENU` or `t('nav', 'brand')`.
  - Navbar contains button/trigger for Tentang Kami modal.
  - Navbar contains section shortcuts: Layanan (`/#layanan`), Keunggulan (`/#keunggulan`), Alur Kerja (`/#alur-kerja`), Tim Ahli (`/#tim-ahli`).
  - Mobile menu includes all section shortcuts and modal trigger.

- [ ] **Step 2: Run test to verify it fails (RED)**
  `node --test scripts/test-navbar-shortcuts-and-popup.mjs` -> Expected: FAIL

- [ ] **Step 3: Implement minimal code (GREEN)**
  - Remove `BRAND_MENU` and Brand Kami dropdown.
  - Add state `aboutModalOpen` in Navbar and mount `<AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />`.
  - Replace desktop and mobile links with section shortcuts (`Tentang Kami` button, `/#layanan`, `/#keunggulan`, `/#alur-kerja`, `/#tim-ahli`, `/berita`).
  - Update `test-popup-and-navbar-consistency.mjs` to align with the new section link architecture.

- [ ] **Step 4: Run all tests to verify they pass (GREEN)**
  `npm test` -> Expected: PASS (all tests pass)

- [ ] **Step 5: Commit**
  `git commit -m "feat(dnp): overhaul navbar with section shortcuts, remove brand kami, integrate about modal"`

---

### Task 5: Standalone VPS Deployment Guide

**Files:**
- Create/Update: `delta-nusantara-persada/DEPLOY_VPS_STANDALONE.md`

- [ ] **Step 1: Write comprehensive guide**
  Cover:
  1. Git Sparse-Checkout step-by-step (`--filter=blob:none`, `git sparse-checkout set delta-nusantara-persada`).
  2. Nginx configuration with SSL Certbot (serving Next.js on port 3000 and proxying Laravel API `/api`).
  3. Node.js 20+ and PM2 cluster setup (`pm2 start npm --name "dnp-frontend" -- start`).
  4. Laravel 11 Backend setup (`composer install --no-dev`, `php artisan migrate --force`, cache optimization).
  5. One-click update script (`deploy.sh`) that only updates `delta-nusantara-persada`.
  6. Security hardening (firewall UFW, production `.env` credentials).

- [ ] **Step 2: Review guide for precision and zero placeholders**

- [ ] **Step 3: Commit**
  `git commit -m "docs(dnp): create comprehensive standalone VPS deployment guide"`

---

### Task 6: Full Verification & Visual Inspection

- [ ] **Step 1: Run full test suite**
  `npm test` in `frontend` -> Confirm 100% passing tests.

- [ ] **Step 2: Run production build check**
  `npm run build` in `frontend` -> Confirm zero build errors and valid output.

- [ ] **Step 3: Visual Inspection using Playwright / Browser Subagent**
  Launch local dev server, capture screenshots of:
  - Navbar with new section shortcuts and square gradient buttons.
  - Tentang Kami popup modal open with tabs.
  - Smooth scroll behavior to sections.

---

## Pause for Approval Gate

Before executing this plan, please review the direct evaluations, architectural decisions, and tasks above. Reply with **Approved** to begin execution, or provide adjustments.
