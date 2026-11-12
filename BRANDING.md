# TalentXM brand guide

The single reference for TalentXM's visual identity on this site: logo, colour, type, and how each maps to code. Read this before adding or changing any UI.

## Status and sources

- **Direction:** "Option 8", applied to the site on 2026-11-12 on the `preview` branch.
- **Source files:** three Canva slides in `../Branding/` (outside this repo): `23.svg` (logo colour tests), `24.svg` (brand board with palettes and applications), `25.svg` (design and marketing team feedback).
- **What the slides define:** the mark, the wordmark, the four logo treatments, the primary and extended palettes with their names, and the gradient.
- **What they do not define:** typeface names, logo clear space and minimum sizes, spacing, radius, or usage rules. Those sections below are marked **Proposed**; they were written for this site and need design team sign-off.
- **Open feedback:** one reviewer noted that building on navy "conflicts with moving away from blue", and another preferred applications where navy becomes charcoal. The decision for now is navy (Trust Blue). If that changes, only `--txm-brand-navy` and `--txm-bg-surface` in `app/globals.css` need new values, plus regenerated logo files.

## Brand idea

- **Tagline:** People × AI × What's next
- **Essence line (brand board):** Human Intelligence Extended. Talent, technology and possibility in motion.
- **Character:** the mark is an organic network of connected nodes. Navy carries trust; orange, yellow and teal bring energy and a human feel. Colours do not all need to appear together.

## Logo

The logo is the node mark plus the wordmark **TALENTXM** in bold, wide-tracked capitals.

### Treatments

| Treatment | Background | Mark | Wordmark | Use for |
|---|---|---|---|---|
| Light (Clara) | Neutral Base `#e6e5e2`, white or cream | Trust Blue | Trust Blue | Default on light surfaces: header, documents |
| Dark (Escura) | Trust Blue | Neutral Base | Neutral Base | Dark surfaces where a quiet logo is wanted |
| Highlight (Destaque) | Opportunity Yellow | Trust Blue | Trust Blue | Campaigns, social, callouts. Not for page chrome |
| Gradient (Gradiente) | Trust Blue | Orange → yellow → teal gradient | Neutral Base | Hero moments: footer, social image, app icon |

### Files in this repo

All in `public/images/brand/`. Transparent PNGs unless noted.

| File | What it is | Used in |
|---|---|---|
| `logo-horizontal-navy.png` | Mark + wordmark side by side, navy | Header, mobile menu |
| `logo-horizontal-gradient.png` | Gradient mark + neutral wordmark | Footer (on navy) |
| `logo-horizontal-neutral.png` | All neutral, for dark surfaces | Available |
| `logo-stacked-navy.png` | Mark above wordmark, navy | Organization schema in `lib/seo.ts` |
| `logo-stacked-gradient.png` | Stacked, gradient mark | Available |
| `mark-navy.png`, `mark-neutral.png`, `mark-gradient.png` | Mark only | Available |
| `tile-light.png`, `tile-dark.png`, `tile-highlight.png`, `tile-gradient.png` | The four square treatments, 512px, opaque | Social avatars, references |

Also: `app/icon.png` and `app/apple-icon.png` (gradient mark on navy) and `public/og.png` (stacked gradient logo on navy, 1200x630).

**These files are interim.** They were rebuilt from the logo shape embedded in the Canva slide, not exported as vectors. Replace them with SVG exports from the design team when available, keeping the same filenames.

### Logo rules (Proposed)

- **Clear space:** keep a margin equal to the height of the wordmark's letters on all sides.
- **Minimum size:** horizontal logo 24px tall on screen; mark alone 16px.
- **Do not** recolour the mark outside the four treatments, place the navy logo on navy or orange, put the gradient mark on a light background, stretch, rotate, add shadows, or retype the wordmark in another font.
- On photos, use the neutral or gradient logo over a navy overlay, never directly on a busy image.

## Colour

### Primary palette

| Name | Role (brand board) | Hex | CSS variable | Tailwind class |
|---|---|---|---|---|
| Trust Blue | Trust scales | `#091d5c` | `--txm-brand-navy` | `txm-navy` |
| Energy Orange-Red | Energy drives | `#f9552b` | `--txm-brand-orange` | `txm-orange` |
| Opportunity Yellow | Opportunity opens | `#fce403` | `--txm-brand-yellow` | `txm-yellow` |
| Human Teal | Human connection | `#57c3bb` | `--txm-brand-teal` | `txm-teal` |

### Extended palette

| Name | Hex | CSS variable | Tailwind class | Use |
|---|---|---|---|---|
| Warm accent | `#fac9b2` | `--txm-tint-warm` | `txm-tint-warm` | Soft orange fills, chips |
| Bright surface | `#faf4cb` | `--txm-tint-bright` | `txm-tint-bright` | Soft yellow highlights |
| Soft UI | `#d2ece9` | `--txm-tint-soft` | `txm-tint-soft` | Soft teal fills |
| Cool support | `#c0c4df` | `--txm-tint-cool` | `txm-tint-cool`, `txm-on-dark` | Body text on navy, navy-tint chips |
| Neutral base | `#e6e5e2` | `--txm-brand-neutral` | `txm-neutral` | Logo on dark, light tiles |

### Site surfaces and text

| Purpose | Hex | CSS variable | Tailwind class |
|---|---|---|---|
| Dark surface (header, hero, footer, dark sections) | `#0d1725` | `--txm-bg-base` (`--txm-brand-deep`) | `bg-txm-base` |
| Raised panel on dark (cards, hover) | `#162033` | `--txm-bg-surface` | `bg-txm-surface` |
| Light section background (cream) | `#f6f4f1` | `--txm-bg-light` | `bg-txm-light` |
| Cards and page background | `#ffffff` | `--txm-bg-elevated` | `bg-white` |
| Headings and primary text | `#0d1725` | `--txm-text-primary` | `text-txm-ink` |
| Body text on light | `#4a5568` | `--txm-text-secondary` | `text-txm-slate` |
| Quiet text on light | `#5a6578` | `--txm-text-subtle` | `text-txm-subtle` |
| Body text on navy | `#c0c4df` | `--txm-text-on-dark` | `text-txm-on-dark` |
| Accent text on light (links, eyebrows) | `#c2380f` | `--txm-brand-orange-ink` | `text-txm-accent` |
| Borders on light | navy at 12% | `--txm-border-default` | `border-txm-line` |

`#c2380f` is **derived, not from the slides**: Energy Orange-Red darkened so small text passes contrast on white and cream. `#0d1725`, `#4a5568` and `#5a6578` are site neutrals; `#0d1725` matches the deep navy canvas of slide 24.

### Contrast (WCAG ratios)

Small text needs 4.5:1; large text and icons need 3:1.

| Foreground | Background | Ratio | OK for |
|---|---|---|---|
| Trust Blue `#091d5c` | White | 15.7 | All text |
| Trust Blue | Cream `#f6f4f1` | 14.3 | All text |
| Trust Blue | Opportunity Yellow | 12.1 | All text |
| Trust Blue | Human Teal | 7.4 | All text |
| Trust Blue | Energy Orange-Red | 4.7 | All text |
| White | Trust Blue | 15.7 | All text |
| Opportunity Yellow | Trust Blue | 12.1 | All text |
| Cool support `#c0c4df` | Trust Blue | 9.1 | All text |
| Human Teal | Trust Blue | 7.4 | All text |
| Energy Orange-Red | Trust Blue | 4.7 | All text |
| Accent `#c2380f` | White | 5.4 | All text |
| Accent `#c2380f` | Cream | 5.0 | All text |
| Energy Orange-Red `#f9552b` | White | 3.3 | Large text and icons only |
| Human Teal | White | 2.1 | Fills only, never text |
| Opportunity Yellow | White | 1.3 | Fills only, never text |

### Colour rules

- **On light surfaces:** text is ink or slate; links, eyebrows and small icons use `text-txm-accent`. Never set small text in raw orange, yellow or teal.
- **Dark surfaces are deep navy `#0d1725`**, as on the brand board's website concept, not Trust Blue. Trust Blue `#091d5c` is a colour used on top: buttons on light surfaces, shapes, chips, the logo tiles.
- **On deep navy:** headings white, body `text-txm-on-dark`, eyebrows and text links `text-txm-yellow`. Teal and orange are also allowed for accents.
- **On the gradient or on yellow:** text and icons are deep navy (`text-txm-base`), never white.
- **On orange (closing call only):** the display headline is white (large text only, 3.3:1); all smaller text and buttons are deep navy.
- **Header:** deep navy with the neutral logo, white navigation and a white pill call to action.
- **Proportion:** deep navy, white and cream do most of the work. Orange, teal and yellow appear as large brand shapes in the hero and closing call, and otherwise one bright colour per component; the gradient is for small, high-value moments.
- Focus rings are navy on light (`.txm-focus`) and yellow on dark (`.txm-focus-inverse`).

### Gradient

- **Brand gradient** (`--txm-gradient-primary`, class `.txm-gradient-bg`): left to right, `#f95e29` 0% → `#fa8c1c` 25% → `#fce403` 50% → `#d4dc2f` 64% → `#94cf76` 82% → `#61c4ae` 100%. Named on the slide as Energy Orange-Red → Opportunity Yellow → Human Teal. Used for icon tiles, the active item in a list, the contact button, thin accent bars.
- **Mesh** (`--txm-gradient-mesh`, class `.txm-mesh-bg`): a quiet Trust Blue glow and a trace of teal over deep navy, for depth behind dark heroes and panels. It carries no orange or yellow; the bright colours come from the brand shapes.
- **Brand shapes:** the orange ribbon, teal crescent and yellow lobe from the board. See `MOTION.md`, "Ribbon field".

## Typography

The slides have all text converted to outlines, so no typeface is named. **Proposed** pairing, chosen to match the wordmark's bold geometric capitals:

| Role | Font | Loaded as | Used by |
|---|---|---|---|
| Display | Montserrat (300 to 500: light display, regular headings) | `--font-montserrat` → `--font-display`, class `font-display` | `.txm-h1`, `.txm-h2`, `.txm-h3`, `.txm-eyebrow`, prose `h2` |
| Body and UI | Inter | `--font-inter` → `--font-sans` | Everything else |
| Numbers and labels | System monospace | `--font-mono` | Step numbers, layer labels |

Both web fonts load through `next/font/google` in `app/layout.tsx`.

| Class | Size / line height | Weight | Notes |
|---|---|---|---|
| `.txm-h1` | 56/64 (38/46 on mobile) | 800 | -0.02em tracking |
| `.txm-h2` | 40/48 (30/38) | 700 | -0.02em tracking |
| `.txm-h3` | 28/36 (22/30) | 700 | |
| `.txm-lede` | 18/28 (17/27) | 400 | Intro paragraphs |
| `.txm-body` | 16/26 | 400 | |
| `.txm-small` | 14/20 | 400 | |
| `.txm-eyebrow` | 13/20 | 600 | Uppercase, 0.12em tracking |

Headings use sentence case. Uppercase is reserved for eyebrows and the wordmark.

## Shape, depth and layout

Carried over from the previous design system; the slides do not change them.

- **Radius:** 8px (`rounded-txm-sm`), 12px (`rounded-txm-md`), 20px (`rounded-txm-lg`, cards). Buttons use `rounded-lg`.
- **Shadow:** `shadow-txm-card` for cards at rest, `shadow-txm-elev` on hover and for floating panels. Both are navy-tinted.
- **Layout:** `.txm-container` is 1200px wide with 24px gutters (16px on mobile). `.txm-section` has 96/64/48px vertical padding.
- **Motion:** animation, transitions and scroll behaviour have their own guide, `MOTION.md`. All motion stops under `prefers-reduced-motion`.

## Components

- **Buttons are pills** (fully rounded). Primary: on light, Trust Blue fill with white text; on dark, yellow fill with deep navy text (hover: white); on orange, deep navy fill. The header call to action is a white pill. See `components/ui/button.tsx`.
- **Secondary button:** outline; navy-tinted border on light, white border on dark.
- **Text link button:** `text-txm-accent` on light (hover navy), `text-txm-yellow` on dark (hover white).
- **Eyebrow:** `txm-eyebrow` plus `text-txm-accent` on light or `text-txm-yellow` on dark.
- **Icon tile:** gradient background with a navy icon, or navy background with a white icon (`components/ui/icon.tsx`).
- **Cards:** `.txm-card`, white on cream or white sections.
- **Status chips** (`components/signature/signature.tsx`): Validated POC uses the navy tint. Available (emerald), Pilot (sky) and Concept (slate) are functional status colours, not brand colours.

## Not brand-controlled

- POC videos, thumbnails and embedded decks keep their own styling. POC data is read only through `lib/pocs.ts`.
- Form error (red) and success (emerald) states, and the WhatsApp green dot.
- Neutral greys from Tailwind's `slate` scale for input borders, hover fills and tech pills.
- Background photos in `public/images/` predate this brand. Heroes no longer use them; they show the brand shapes instead (`components/motion/ribbon-field.tsx`).

## Changing the brand in code

1. Colours, gradients, fonts and type scale live in `app/globals.css` (`:root` for values, `@theme inline` for Tailwind class names).
2. Use the `txm-*` classes above. Do not add raw hex values or `bg-[#...]` classes in components.
3. Logo files live in `public/images/brand/`; icons in `app/icon.png` and `app/apple-icon.png`; the social image in `public/og.png`.
4. Update this file in the same change.

## Open items

- Vector logo exports (SVG) from the design team to replace the interim PNGs.
- Design team confirmation of the typefaces, or the real wordmark font name.
- Final decision on navy versus charcoal as the dark base.
- Sign-off on the Proposed logo rules.
- Brand imagery to replace the older hero photos.
