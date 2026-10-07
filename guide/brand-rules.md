# AIM brand rules

The rules every design follows. The values live in `brand/tokens.css`; this file explains
how to use them. Source: the Visual Guideline (`brand/source/Visual_Guideline.pdf`, May 2026)
plus the decisions listed at the end, which take precedence over the PDF.

## Colours

| Name | Hex | Token | Use |
|---|---|---|---|
| Tiefes Lila | `#4C2A85` | `--aim-deep` | glow centres, violet surfaces |
| Primär Lila | `#6E56CF` | `--aim` | buttons, highlighted words on light, the brand signal |
| Highlight Lila | `#8B5CF6` | `--aim-light` | lines, secondary accents |
| Hell-Lila Glow | `#C4B5FD` | `--aim-glow` | eyebrows and highlighted words on dark |
| Dunkelblau / Ink | `#0F1115` | `--ink` | dark background, text on light |
| Dezentes Grau | `#9CA3AF` | `--gray` | muted text on dark |
| Paper | `#FAFAF8` | `--paper` | light background, text on dark |
| Faint, Rule, Muted, Subtle | | `--faint` `--rule` `--muted` `--aim-subtle` | light surfaces, hairlines, secondary text |

- Only these colours. Never invent a new one, never use pure black or pure white backgrounds.
- At most three colours carry a design: one background, one text colour, one purple accent.
- Purple is an accent. Highlight one or two words of a headline (`<span class="hl">`), not whole paragraphs.
- No neon, no rainbow gradients, no colours from partner brands in our layouts.

## Backgrounds: two recipes, pick one per design

**Dark** (`theme-dark`): ink background, purple glow, network dome or a mountain photo under an ink
wash, paper text, glow-purple eyebrows. Default for social media and anything on screens.

**Light** (`theme-light`): paper background, ink text, purple accents, 2px ink rules. Good for print,
documents, editorial posts, recruiting, anything text-heavy.

**Violet** (`theme-violet`) is allowed for one closing slide or block per design, never as the whole campaign.

Never mix recipes randomly inside one design. A poster may have a dark photo band on top of a light page
(see `templates/poster`), but each zone follows one recipe completely.

## Typography

- **Inter Tight Bold (700)** for headlines, big numbers and buttons: `var(--font-display)`.
- **Geist** for everything else: `var(--font-body)`. Regular 400 for text, Medium 500 for labels.
- Both are bundled in `brand/fonts/` (free OFL licence). No other fonts. No monospace fonts anywhere.
- **No italics, ever.** Emphasis is bold or the purple highlight.
- Headlines: tight letter-spacing (`--tracking-display`), line-height around 0.9 to 1.0, sentence case.
  Short headlines often end with a full stop: "Events." "Nächstes Event."
- Eyebrows: small, UPPERCASE, wide letter-spacing (`.eyebrow`). One per block, above the headline.
- Body text never smaller than the minimum the render check reports.

## Logo

Files in `brand/logo/`:

| File | Use |
|---|---|
| `aim-wordmark-light.svg` / `-dark.svg` | AIM + "AI IN MANAGEMENT CLUB". The default logo. |
| `aim-mark-light.svg` / `-dark.svg` | AIM letters only. Small spaces, repeated pages, slide headers. |
| `aim-banner-light.svg` / `-dark.svg` | Horizontal lockup with the network dome. Wide banners, sponsor walls. |
| `aim-icon-round-light.svg` / `-dark.svg` | Round badge. Profile pictures, stickers, favicons. |
| `png/*-4000.png` | Transparent 4000px PNGs for Canva, Word, PowerPoint, print shops. |

`-light` = light artwork for dark backgrounds. `-dark` = dark artwork for light backgrounds.

- Use the files as they are. Set only the width, never the height. Never stretch, rotate, recolour,
  add shadows or outlines, or rebuild the logo from text.
- Clear space: at least half the logo's height free on every side.
- Never put the logo on a busy part of a photo or on a colourful surface.
- One logo per page. On a carousel or deck, the full wordmark on the first page and the mark after that.
- The subline is always UPPERCASE: AI IN MANAGEMENT CLUB.

## Imagery

- **Mountains** are our landscape: `brand/photos/mountains.jpg`, `dark-peak.jpg`, `matterhorn.jpg`.
  Always under the ink wash (`.photo`), desaturated, calm. They stand for the climb: learning step by step.
- **Network dome** (`brand/motifs/network-dome.svg`) is the central brand motif for AI and connection.
  Behind headlines, partly cropped, never in front of text.
- **Real people**: board portraits in `brand/photos/team/` and event photos the user provides.
- **Icons**: `brand/icons/` (35 line icons from the guideline, see `icons.json` for German and English names).
  Use them at the same size in a row, in the accent colour.
- No AI-generated images, no stock photos of robots, glowing brains, handshakes or circuit-board heads.
- Partner logos only when the user confirms the partnership is official, and only in a neutral row
  (all in paper on dark or ink on light), never bigger than our logo.

## Layout

- Generous margins. Text never closer to the edge than the template's padding.
- Strong hierarchy: one headline, one key message, then facts. If everything is big, nothing is.
- Left-aligned by default. Centred only for very short, symmetrical designs (one headline, one date).
- Square shapes. Cards have no rounded corners; only buttons and badges are pills.
- Film grain (`.grain`) on every design with large flat colour areas.
- Prefer leaving things out over squeezing things in.

## Decisions that override the PDF guideline

Decided in October 2026 when this kit was set up (brand owner: Robert Häussler):

1. **Fonts:** Inter Tight + Geist instead of "Helvetica World" (a paid font that renders
   differently on every machine). They match the website.
2. **Light backgrounds are allowed.** The PDF says to avoid them. We use the light recipe above
   for print and text-heavy designs; dark stays the default for screens.
3. **The icons, network dome, banner and round icon were redrawn as vectors** from the PDF.
   The redrawn files in `brand/` are now the reference.
4. **The logo subline is uppercase**, as on the website.
