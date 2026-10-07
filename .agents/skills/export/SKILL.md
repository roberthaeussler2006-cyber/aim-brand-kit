---
name: export
description: Export a finished AIM design as PNG, high-resolution PNG, PDF, or print-ready PDF in another paper size (A3, A4, A5). Use when the user asks for a file format, print version, higher resolution, or "zum Drucken".
---

# Export a design

All exports come from the design's HTML file via the render script. Never screenshot manually.

| User wants | Command | Result |
|---|---|---|
| Social media image | `npm run render -- output/<folder>/design.html` | `design.png` at exact size |
| Sharper image (e.g. for a big screen) | `... --hd` | `design.png` at 2x |
| PDF of slides or a carousel | `... --pdf` | multi-page `design.pdf` |
| Print poster | `npm run render -- <file>` (print templates make a PDF automatically) | `design.pdf`, 3 mm bleed |
| Same poster as A4 or A5 (flyer) | new folder with a copy of the design, paper values from `guide/formats.md` ("Poster sizes"), then render | `design.pdf` in that size |
| QR code for a link | `npm run qr -- <url> output/<folder>/qr.svg` | SVG to place in the design |

Print checklist to tell the user:
- PDF is RGB with 3 mm bleed. Print at 100% ("actual size"). If the print shop needs CMYK or PDF/X,
  send them the PDF and ask them to convert it.
- Scan any QR code from the preview with a phone before printing.

Want a format that has no template (e.g. 1080x1080)? Copy the closest template with `npm run new`,
then change `<meta name="aim:size">` and `--w` / `--h` in the design's own style block, re-balance and render.
