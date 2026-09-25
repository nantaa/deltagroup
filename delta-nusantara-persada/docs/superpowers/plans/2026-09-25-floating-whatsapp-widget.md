# Floating WhatsApp Widget & Consultation CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a floating multi-agent WhatsApp marketing widget matching the reference UI and update the "Konsultasi Gratis" CTA button to link to the official riksa uji WhatsApp channel.

**Architecture:** 
- A client-side `FloatingWhatsApp` component mounted in the root layout or homepage that renders a floating trigger pill at the bottom-right and an expandable, scrollable card displaying marketing representatives with avatars, green WhatsApp badges, branch offices, and direct WhatsApp links.
- A centralized data configuration `frontend/lib/marketingContacts.ts` mapping each marketing member to their photo, branch office, and WhatsApp phone number/URL.
- Update `TestimonialCTA.tsx` to redirect "Konsultasi Gratis" to WhatsApp (`https://wa.me/riksauji.dnp` or configured WhatsApp number with pre-filled consultation text).

**Tech Stack:** Next.js 14 (App Router), React 18, Tailwind CSS, Lucide React (`MessageCircle`, `X`), Node test runner for TDD.

## Global Constraints
- Do not use generic external widgets or bloated third-party scripts.
- Ensure the floating popup is responsive, accessible, closes on outside click or ESC key, and has smooth CSS enter/leave transitions.
- All contact images in `frontend/public/contact/` must be rendered with Next.js `<Image>` or optimized `<img>` with proper dimensions.
- Preserve bilingual capabilities via `useLang()`.

---

### Task 1: Create Marketing Contacts Configuration & TDD Test Suite

**Files:**
- Create: `frontend/lib/marketingContacts.ts`
- Create: `frontend/scripts/test-floating-whatsapp.mjs`

**Interfaces:**
- Produces: `MARKETING_CONTACTS` array with `{ id, name, office, photo, phone, waLink }`

- [ ] **Step 1: Write the test suite**
Create `frontend/scripts/test-floating-whatsapp.mjs` testing that:
1. `marketingContacts.ts` exports a structured list of marketing representatives with photo paths pointing to existing files in `/contact/`.
2. `FloatingWhatsApp.tsx` exists and implements the trigger button, popup header, avatar + green WhatsApp badge, and marketing list.
3. `TestimonialCTA.tsx` links "Konsultasi Gratis" to the WhatsApp consultation link (`wa.me` / `https://wa.me/riksauji.dnp`).
4. Root layout or page mounts the `FloatingWhatsApp` component.

- [ ] **Step 2: Run test to verify it fails**
Run: `node --test frontend/scripts/test-floating-whatsapp.mjs`
Expected: FAIL (files do not exist yet)

- [ ] **Step 3: Implement `frontend/lib/marketingContacts.ts`**
Create structured contacts list with all available marketing staff from `public/contact/`:
- Atika (Head Office) -> `/contact/Atikah (1).png`
- Anik (Head Office) -> `/contact/Anik (1).png`
- Yopi (Head Office) -> `/contact/Yoppi (1).png`
- Intang (Head Office) -> `/contact/Intang (1).png`
- Ali M (Gresik Office) -> `/contact/Ali M.jpeg`
- Erje (Surabaya Office) -> Fallback / Avatar placeholder
- Indri (Head Office) -> `/contact/Indri (1).png`
- Bayu (Head Office) -> `/contact/Bayu (1).png`
- Tya (Head Office) -> `/contact/Tyani (1).png`
- Yunny (Central Java Office) -> `/contact/Yunny.jpeg`
- Eko (Medan Office) -> `/contact/Eko.jpeg`

- [ ] **Step 4: Verify marketing contacts configuration passes initial assertions**

---

### Task 2: Implement `FloatingWhatsApp.tsx` Component

**Files:**
- Create: `frontend/components/ui/FloatingWhatsApp.tsx`
- Modify: `frontend/app/layout.tsx` or `frontend/app/page.tsx`

**Interfaces:**
- Consumes: `MARKETING_CONTACTS` from `@/lib/marketingContacts`, `useLang` from `@/lib/LanguageContext`
- Produces: `<FloatingWhatsApp />` standalone client component

- [ ] **Step 1: Write `FloatingWhatsApp.tsx`**
Implement the component with:
1. State `isOpen` (default `false`).
2. Floating trigger button anchored at bottom-right (`fixed bottom-6 right-6 z-50`):
   - Dark navy background `#011E42`, white text, WhatsApp chat icon, text: `"Butuh Bantuan? Klik Disini"`.
   - Hover scale and elevation shadow.
3. Popup Card (`fixed bottom-20 right-6 w-80 sm:w-88 max-h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col z-50 overflow-hidden`):
   - Header: `#011E42` dark navy background, white text `"Butuh Bantuan? Silahkan Chat dengan salah satu marketing kami"`, close button (`X`).
   - Body: Scrollable list (`overflow-y-auto divide-y divide-slate-100 max-h-[400px]`).
   - List Item:
     - Avatar in circular container with small green WhatsApp badge at bottom-right corner (`w-11 h-11 rounded-full relative`).
     - Text info: Office label (`text-[11px] text-gray-400 font-medium`) and Name (`text-sm font-bold text-[#011E42]`).
     - Hover background transition (`hover:bg-slate-50`).
     - External link opening WhatsApp in new tab (`target="_blank" rel="noopener noreferrer"`).
4. Click-outside listener and ESC key listener for clean UX.

- [ ] **Step 2: Mount `FloatingWhatsApp` in `frontend/app/layout.tsx`**
Add `<FloatingWhatsApp />` into root layout so it is available across the site.

- [ ] **Step 3: Run test suite to verify component passes**
Run: `node --test frontend/scripts/test-floating-whatsapp.mjs`
Expected: PASS for FloatingWhatsApp tests.

---

### Task 3: Update "Konsultasi Gratis" CTA Link in `TestimonialCTA.tsx`

**Files:**
- Modify: `frontend/components/ui/TestimonialCTA.tsx`

- [ ] **Step 1: Update CTA link**
Change the `ctaFree` button in `TestimonialCTA.tsx` from internal link `/services` to:
`href="https://wa.me/riksauji.dnp"` (or configured WhatsApp target) with `target="_blank" rel="noopener noreferrer"`.

- [ ] **Step 2: Run test suite to verify CTA link**
Run: `node --test frontend/scripts/test-floating-whatsapp.mjs`
Expected: PASS

---

### Task 4: Full Verification & Build Validation

**Files:**
- Modify: `frontend/package.json` (add `test-floating-whatsapp.mjs` to test script)

- [ ] **Step 1: Run complete test suite**
Run: `npm test`
Expected: All 57+ tests PASS.

- [ ] **Step 2: Run production build check**
Run: `npm run build`
Expected: Next.js build passes with 0 errors.
