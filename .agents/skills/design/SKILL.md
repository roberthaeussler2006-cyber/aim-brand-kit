---
name: design
description: Create or change an AIM design (Instagram story/post/carousel, LinkedIn image, poster, flyer, slides, PDF document, certificate, banner). Use for any request to make, adapt or translate a visual for the AIM club, in German or English.
---

# Make an AIM design

Follow this every time. The user is non-technical: keep the chat about the design, show images, not code.

## 1. Brief (at most one round of questions)

Find out, from the message or by asking in ONE short message:
- **Where** it will be used (story, feed post, LinkedIn, print poster, slides, PDF). This picks the template.
- **Facts**: what, when, where, who, link/registration. Only what the user gives you or what is in `guide/club-facts.md`.
- **The one message** people should remember.
- **Language** of the design, if it is not obvious. Default: the language the user writes in.
  Templates are German; for English, translate every label too (Datum → Date, see `guide/voice.md`) and set `<html lang="en">`.
- **Photos**: for recaps or anything about a past event, ask whether they have event photos.

If the user says "just make something", pick the most likely format (Instagram story for events,
feed post for announcements) and say which one you chose.

## 2. Start from a template

```
npm run new                                   # lists templates
npm run new -- instagram-story kickoff-pwc    # creates output/<date>-kickoff-pwc/design.html
```

Pick dark or light according to `guide/brand-rules.md` (dark for screens by default, light for
print and text-heavy designs). Several variants? Create one folder each (`kickoff-pwc-dark`, `kickoff-pwc-light`).

## 3. Fill and adapt

- Read `design.html` before editing it (some tools refuse to overwrite a file they have not read).
- Replace all sample text, remove every `data-sample` attribute, delete blocks you have no content for.
  Sample lines that sound like facts ("Eintritt frei", "Offen für alle", a room, a speaker) stay only if
  the user confirmed them. The brand check flags template sample text that is still in the design.
- Copy follows `guide/voice.md`: short headlines, Swiss spelling, "du", no hype, no invented facts.
  This includes content: do not promise learning outcomes, agenda points or takeaways the user did not give you.
  A lede can restate the topic in other words; it cannot add claims. If you do not know what an event is
  about, ask, or leave the lede out.
- Highlight at most one or two words with `<span class="hl">`.
- Layout changes: only in the design's own `<style>` block and only spacing, sizes (`--headline-size`,
  `--logo-w`, ...), positions and grids. Colours, fonts and effects come from `brand/`.
- Building blocks: `guide/components.md`. Need a photo the user sent? Copy it into the design folder
  and use `<div class="photo"><img src="their-photo.jpg" alt=""></div>`.
- Multi-page designs (carousel, slides): duplicate or delete `.canvas` blocks to get the requested number
  of pages and update every page counter ("2 / 5"). Keep logo, counter and headline positions identical across
  pages, and keep background motifs away from the counter and logo.
- Long German words break layouts: check that headlines fit; shorten the copy before shrinking the type.

## 4. Render, check, look

```
npm run render -- output/<folder>/design.html
```

- Fix every ERROR from the brand check. Fix warnings unless there is a reason not to.
- Then look at the PNG yourself (read the image). Check: hierarchy obvious in one second? Enough margin?
  Anything cut off, overlapping, too small to read on a phone? Logo clear space? Safe zones (`guide/formats.md`)?
- Fix and re-render until you would be proud to post it.

## 5. Show and iterate

Show the PNG to the user (inline if your tool allows it) with one or two sentences: what you made and
one or two options for changes. Apply feedback, re-render, show again. Keep earlier versions only if
the user wants to compare (`design-v1.png`).

## 6. Deliver

Tell the user which file to use and where it is:
- Social media: `output/<folder>/design.png` (carousels and slides: `design-01.png`, `design-02.png`, ...).
- Print: `output/<folder>/design.pdf` (3 mm bleed included, print at 100%). Use the `export` skill for A4/A5 or HD versions.
- Remind them to double-check names, dates and links before publishing.
