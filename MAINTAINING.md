# Maintaining the brand kit

Owner: Robert Häussler. This file is for whoever changes the kit itself, not for making designs.

## Principles

- `brand/tokens.css` is the only place brand values live. Templates and designs reference tokens.
- The kit is the source of truth for the brand. When the brand changes, change it here first, then
  carry the change to the website (`AIM-Club` repo: `tailwind.config.ts`, `app/globals.css`, `BRAND.md`).
- `guide/brand-rules.md` records every decision that departs from the original Visual Guideline PDF.

## Changing locked files

`.claude/settings.json` denies edits to `brand/`, `guide/`, `templates/` and `scripts/` so that
design sessions cannot change the system by accident. To change the kit with Claude Code, work on a
branch and remove the relevant `deny` entries for that session (or edit in your own editor), then
restore them before merging. Codex has no file-level deny; `AGENTS.md` carries the same rule.

After changing anything that affects templates, re-render all previews and check them:

```
npm run previews
```

## Logos

`scripts/build-logos.py` regenerates `aim-mark*` and `aim-wordmark*` (SVG + 4000px PNG) from the
website's letterform trace, with the subline outlined in Geist. Needs `pip install fonttools` and
`brew install librsvg`. The banner, round icon, icons and network dome were redrawn from the
Visual Guideline in October 2026 and are maintained as files.

## Adding a template

1. Copy the closest template folder, keep `design.html` as the file name.
2. Set `<meta name="aim:size">` or `<meta name="aim:print">` and `<meta name="aim:about">` (one line,
   shown by `npm run new`).
3. Mark every piece of example copy with `data-sample`.
4. `npm run previews`, check the output, add the format to `guide/formats.md`.

## Adding to the gallery

Copy an approved design folder from `output/` to `gallery/<yyyy-mm>-<name>/` and commit it.
Keep the HTML, PNG and PDF so agents can learn from the source.

## Language parity

`AGENTS.md` (English, loaded by agents) and `AGENTS.de.md` (German, for people) must say the same thing.
`README.md` and `ANLEITUNG.md` likewise.
