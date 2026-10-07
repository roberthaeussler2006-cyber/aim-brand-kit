# Formats

Pick the template that matches where the design will be used. `npm run new` lists them.

| Use | Template | Size | Base size (`--base`) | Output |
|---|---|---|---|---|
| Instagram story | `instagram-story` | 1080 x 1920 px | 30px | PNG |
| Instagram feed post | `instagram-post` (dark, photo) / `instagram-post-light` | 1080 x 1350 px (4:5) | 30px | PNG |
| Instagram carousel | `instagram-carousel` | 1080 x 1350 px per slide | 30px | one PNG per slide |
| LinkedIn post, website header, link preview, event platforms | `banner-landscape` | 1200 x 630 px | 22px | PNG |
| LinkedIn company cover | `linkedin-cover` | 1128 x 191 px | 18px | PNG |
| Poster, flyer | `poster` | A3 + 3 mm bleed (also prints as A4/A5) | 6.2mm | PDF + PNG preview |
| Presentation | `slides` | 1920 x 1080 px | 30px | PNGs + PDF (`--pdf`) |
| Document, factsheet, handout | `document-a4` | A4 + 3 mm bleed, multiple pages | 3.9mm | PDF + PNG preview |
| Certificate | `certificate` | A4 landscape + 3 mm bleed | 4.6mm | PDF + PNG preview |

Other sizes on request: copy the closest template and change `<meta name="aim:size">`, the
`--w` / `--h` values and `--base`. Common ones:

| Use | Size |
|---|---|
| Instagram square post | 1080 x 1080 px |
| LinkedIn square post | 1200 x 1200 px |
| LinkedIn event cover | 1600 x 900 px |
| WhatsApp / Telegram status | 1080 x 1920 px (same as a story) |
| Website OG image | 1200 x 630 px |
| Roll-up banner | 850 x 2000 mm (print shop decides bleed, ask them) |

## Safe zones

- **Instagram story:** Instagram's own UI covers the top ~200 px and the bottom ~250 px. No text or logo there.
- **Instagram feed:** the grid shows posts cropped to 3:4 in the profile view. Keep the headline away from the outer 45 px left and right.
- **LinkedIn cover:** the company logo covers the bottom-left corner (about 300 px wide). Mobile crops the sides.
- **Print:** 3 mm bleed on every side is already in the templates. Keep text at least 15 mm inside the trimmed edge.
  Backgrounds and photos must run all the way into the bleed.

## Print notes

- PDFs are RGB. Most print shops (and the HSG print shop) accept RGB PDFs. If a shop asks for CMYK or PDF/X,
  send them the PDF and ask them to convert, or tell the user that this needs a print-shop conversion.
- Print at 100% / "actual size", not "fit to page".
- A4 and A5 versions of the poster: `npm run render -- <file> --paper A4`.
