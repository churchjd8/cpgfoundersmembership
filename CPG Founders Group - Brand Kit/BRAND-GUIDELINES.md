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

The palette is a warm amber/stone system. Amber is the brand color, everything else is warm neutral. Use amber as the accent, not the whole page.

| Token | Hex | Use |
|---|---|---|
| **Accent** | `#b45309` | Primary brand amber. Buttons, links, key highlights, the flagship tier. |
| **Accent Dark** | `#92400e` | Hover/pressed states, deeper accent. |
| **Accent Light** | `#fef3c7` | Soft amber fills, highlight boxes, badges. |
| **Background** | `#fafaf9` | Page background. Warm off-white, not pure white. |
| **Foreground** | `#1c1917` | Primary text. Near-black, warm. |
| **Muted** | `#78716c` | Secondary text, captions, body copy in long blocks. |
| **Border** | `#e7e5e4` | Hairlines, dividers, card outlines. |
| **Card** | `#ffffff` | Card/surface background on top of the off-white page. |
| **Card Flagship** | `#fffbeb` | Highlighted/featured card (e.g. the VIP tier). Faint amber tint. |

**Logo gradient peaks** (for decorative accents that echo the mark): gold `~#FBBF24`, orange `~#E08A1E`, rust-brown `~#9A3E12`. These all live in the same amber family as the accent.

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
