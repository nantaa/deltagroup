# OG Image Specification — PT Delta Nusantara Persada

> Hand this document to your designer. This image appears when the website link is shared on WhatsApp, LinkedIn, Facebook, Twitter/X, or any messaging app.

---

## Required Output

| Spec | Value |
|------|-------|
| **Format** | PNG-24 (not JPG — needed for sharp edges) |
| **Dimensions** | 1200 × 630 px |
| **Safe zone** | Keep all text/logo within the inner 1040 × 550 px area (Facebook crops 80px on each side) |
| **File name** | `og-dnp.png` |
| **File size** | Under 1 MB |
| **Color space** | sRGB |
| **Resolution** | 72 DPI (screen only, not print) |

---

## Brand Colors (do not deviate)

| Name | Hex | Usage |
|------|-----|-------|
| Navy | `#0A1F44` | Background |
| Teal/Cyan | `#00B4D8` | Accent, tagline, icons |
| White | `#FFFFFF` | Primary text |
| Gold | `#F5A623` | Badge/certification marker |

## Typography

- Figtree bold for headers
- DM Sans Medium for body

---

## Required Content Elements

### Must Include:
1. **Company logo** — `LOGO-DNP-Primary.png` (white version if available), top-left or center
2. **Company name** — "PT Delta Nusantara Persada" — white, bold
3. **Primary tagline** — "Jasa Riksa Uji K3 Terpercaya di Indonesia" — teal/cyan color
4. **Authority badge** — "✅ Ditunjuk Resmi Kemnaker RI" — gold badge or pill shape
5. **Domain** — `deltanusa.co.id` — small, bottom-right, white/muted

### Optional but Recommended:
- Abstract industrial icons (crane silhouette, pressure vessel, elevator shaft) as subtle background elements—opacity 10–20%
- Diagonal or chevron geometric accent in teal

### Do NOT Include:
- Stock photo people or faces
- Lorem ipsum or placeholder text
- Gradients that make text hard to read
- Fonts not in the brand guide
- More than 3 text hierarchy levels

---

## Legibility Test

Before finalising, the designer must verify the image looks correct at:
- **600 × 315 px** (Twitter/X card size — scale down and check)
- **300 × 157 px** (WhatsApp preview thumbnail)
- Company name and tagline must remain legible at all three sizes

---

## Delivery

Place the final file at:
```
frontend/public/images/og-dnp.png
```

This replaces the AI-generated placeholder currently in place.

---

## Reference: How It Will Appear

When someone shares `https://deltanusa.co.id` on WhatsApp or LinkedIn:
- **Title**: PT Delta Nusantara Persada | Jasa Riksa Uji K3 & PJK3 Terpercaya
- **Description**: PT Delta Nusantara Persada — jasa riksa uji pesawat dan riksa uji alat kerja...
- **Image**: This file (og-dnp.png) at 1200×630

For individual service/blog pages, the same image is used (per-article images will be added when the CMS has featured images).
