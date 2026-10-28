# CPG Founders Group — Brand Kit

Quick reference for designing on-brand materials (one-pagers, decks, web). These are the actual tokens pulled from the live cpgfoundersgroup.com site, so anything built from this will match the site.

---

## Logo

Three files in `/logos`:

| File | Use it for |
|---|---|
| `cpgfg-logo-horizontal.png` | Default. Headers, footers, anywhere wide. |
| `cpgfg-logo-stacked.png` | Square/centered spots. Dark wordmark, transparent background. |
| `cpgfg-logo-stacked-white.png` | White wordmark, for dark or amber backgrounds. |

**The mark:** a three-peak mountain with a summit flag. Left peak gold, center (tallest) rust-brown with the flag, right peak orange. The meaning is the climb to the summit, founders reaching the top. Lean into that "summit / ascent / reaching the peak" idea visually where it helps.

**Rules of thumb:**
- Give it room. Keep clear space around the logo equal to the height of the "C" in CPG.
- Don't recolor, stretch, rotate, or add effects to it.
- On light backgrounds use the dark wordmark; on dark or accent-colored backgrounds use the white version.

---

## Colors

> Updated 2026-10-28 to match the live site (`src/app/globals.css`, rebranded Aug 19, 2026). The older amber/stone palette is retired.

CPG Founders Group is a **human surface**: warm paper + deep navy + gold. Signal blue belongs to Babu (machine surfaces) and only appears here when pointing at Babu, or as the flag on the logo mark.

| Token | Hex | Use |
|---|---|---|
| **Background (warm paper)** | `#f7f5f1` | Page background. ~70% of any layout. |
| **Foreground (deep navy)** | `#0b1a2e` | Primary text, headlines, dark bands. |
| **Card** | `#ffffff` | Surfaces on top of paper. |
| **Border** | `#e4e0d9` | Hairlines, dividers, card outlines. |
| **Muted (stone)** | `#5f6b78` | Body copy in long blocks, captions. 5:1 on paper. |
| **Stone (decorative)** | `#75828f` | Decorative and on-navy use only. |
| **Ridge blue** | `#1b3a5f` | Brand temperature: secondary blocks, charts, accents. |
| **Accent (deep amber)** | `#a56a16` | Links, highlights, eyebrow labels on light surfaces. |
| **Accent dark** | `#8a5814` | Hover / pressed. |
| **Accent light (gold tint)** | `#faf0de` | Callout fills. |
| **Card flagship** | `#fdf6ea` | Featured card (VIP tier, "main ask"). |
| **Summit gold** | `#dfa13c` | Navy surfaces only (7.7:1 on navy). |
| **Signal blue** | `#2b4cf0` | Babu / machine surfaces only, plus the logo flag. |

**Mix:** 70% foundation (paper, navy, white), 20% brand temperature (ridge, amber), 10% signal/emphasis (gold, signal blue).

**Logo mark (current):** three peaks: ridge-blue back peak, navy center peak with a navy flagpole and signal-blue flag, summit-gold front peak, set next to "CPG Founders Group" in Inter Bold. It lives as inline SVG in `src/components/header.tsx`. The PNGs in `/logos` are the **old** amber mark and shouldn't be used for new work.

---

## Type

| Role | Typeface | Notes |
|---|---|---|
| **Headings** | **Playfair Display** (serif) | Bold, elegant. Used for big titles and section headers. Gives the premium, editorial feel. |
| **Body & UI** | **Inter** (sans-serif) | Clean and readable. All body copy, labels, buttons, tables. |

Both are free Google Fonts. Pairing rule: serif Playfair for the statement headlines, Inter for everything else. Don't set long paragraphs in the serif.

---

## Feel

- **Premium but grounded.** Credible, not flashy. Jeff's brand is transparent and earned, the design should feel calm and confident, not loud or salesy.
- **Warm, not corporate.** The off-white background and amber accent keep it human. Avoid cold blues/grays and pure white.
- **Lots of breathing room.** Generous whitespace, clear hierarchy, one accent color doing the heavy lifting.
- **Rounded, soft edges.** The site uses rounded corners on cards and pill-shaped buttons.

---

## Quick component cues (from the site, optional reference)

- **Buttons:** pill-shaped (fully rounded), amber background (`#b45309`), white text, darken to `#92400e` on hover.
- **Cards:** white surface, `#e7e5e4` border, rounded corners (~16px), subtle soft shadow.
- **Highlight boxes:** `#fef3c7` (accent light) fill with `#92400e` text for callouts.
- **Featured/flagship card:** `#fffbeb` background to set the VIP tier apart.
