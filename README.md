# AIM brand kit

Every AIM design is made here: Instagram stories, posts and carousels, LinkedIn images, posters,
flyers, slides, PDFs and certificates. You describe what you need in plain language and an AI agent
(Claude Code or OpenAI Codex) builds it with AIM's logo, colours, fonts and imagery, so everything
stays on brand. No coding needed.

**Deutsch:** siehe [ANLEITUNG.md](ANLEITUNG.md), mit Einrichtung und Beispiel-Prompts.

## Setup (once, about 15 minutes)

1. Install one app: the **Claude** desktop app (use the **Code** tab) or the **Codex** app.
2. Install **Node.js** (nodejs.org, LTS).
3. Clone this repository, easiest with **GitHub Desktop** (ask Robert for an invite).
4. Open the `aim-brand-kit` folder in Claude Code or Codex (trust the folder if asked).
5. First prompt: `Set up the brand kit and show me the templates.`

## Every time

Pull the latest version, open the folder, start a new conversation and describe your design:

> Make an Instagram story for our workshop "Prompting for pitch decks" on Thursday 15 October, 18:15, room 01-012. Sign-up at aim-club.ch/events.

The agent shows you an image; give feedback until it is right. Files land in `output/<date>-<name>/`:
PNG for social media, PDF for print. More example prompts in [ANLEITUNG.md](ANLEITUNG.md).

## What's inside

| Folder | Contents |
|---|---|
| `brand/` | The locked source of truth: tokens, components, fonts, logos, icons, motifs, photos, QR codes |
| `guide/` | Brand rules, voice, club facts, formats, component reference |
| `templates/` | One starter per format, each with a `preview.png` |
| `gallery/` | Approved past designs |
| `output/` | Your designs (not committed) |
| `scripts/` | Render to PNG/PDF with a built-in brand check, new design, QR codes |
| `AGENTS.md` | The brief every agent reads first (`CLAUDE.md` imports it; German translation in `AGENTS.de.md`) |

For maintainers: [MAINTAINING.md](MAINTAINING.md).
