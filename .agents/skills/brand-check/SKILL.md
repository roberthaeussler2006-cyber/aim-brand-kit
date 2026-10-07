---
name: brand-check
description: Check whether a design, or an image/file the user made elsewhere (Canva, PowerPoint, a photo of a poster), follows the AIM brand, and list what to fix. Use when the user asks "is this on brand?", "passt das?", or before anything gets published.
---

# Brand check

## Designs in this repo

Run `npm run check -- output/<folder>/design.html`. It checks colours, fonts, italics, logo
distortion and size, text overflow, text size, internet images and leftover sample text.
Then review by eye with the checklist below.

## Files made elsewhere (PNG, JPG, PDF)

Look at the image and go through the checklist. Be specific and kind, e.g.
"Die Überschrift ist in Arial, bei uns ist es Inter Tight Bold."

## Checklist

1. **Logo**: an original file from `brand/logo/`, not stretched or recoloured, enough clear space, uppercase subline, only once.
2. **Colours**: only AIM palette (`guide/brand-rules.md`). Purple as accent. At most three colours carry the design.
3. **Type**: Inter Tight Bold headlines, Geist text. No italics, no other fonts, no monospace.
4. **Background**: one recipe (dark / light / single violet block). Photos under an ink wash.
5. **Copy**: `guide/voice.md`: short, concrete, Swiss spelling, no hype, no exclamation marks in headlines.
6. **Facts**: date, time, place, links, names match what the user confirmed and `guide/club-facts.md`.
7. **Format**: correct size and safe zones for the channel (`guide/formats.md`).
8. **Imagery**: no AI-generated or cliché stock images; partner logos only if the partnership is official.

Answer with: a one-line verdict (on brand / small fixes / not on brand), then the fixes in order of importance.
Offer to rebuild it properly in this repo if it is far off.
