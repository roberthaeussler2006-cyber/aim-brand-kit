@AGENTS.md

## Claude Code specifics

- Show every rendered PNG to the user inline: use the `SendUserFile` tool with `display: "render"`
  if you have it, otherwise open the file in the Browser pane. Do not just print the path.
- Skills for this repo are in `.claude/skills/` (linked to `.agents/skills/`): `design`, `export`, `brand-check`.
  Use the `design` skill for any request to create or change a design.
- Editing `brand/`, `guide/`, `templates/` and `scripts/` is blocked in `.claude/settings.json` on purpose.
  If the user really wants to change the brand kit, explain that a maintainer has to do it.
