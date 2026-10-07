// Start a new design from a template.
//
//   npm run new -- instagram-story kickoff-pwc
//     -> copies templates/instagram-story/ to output/2026-10-07-kickoff-pwc/
//
// Without arguments it lists the templates.

import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TEMPLATES = path.join(ROOT, "templates");
const [template, name] = process.argv.slice(2);

const list = readdirSync(TEMPLATES, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(path.join(TEMPLATES, d.name, "design.html")))
  .map((d) => d.name);

if (!template || !name) {
  console.log("Usage: npm run new -- <template> <short-name>\n\nTemplates:");
  for (const t of list) {
    const html = readFileSync(path.join(TEMPLATES, t, "design.html"), "utf8");
    const about = html.match(/<meta\s+name="aim:about"\s+content="([^"]+)"/i)?.[1] ?? "";
    console.log(`  ${t.padEnd(22)} ${about}`);
  }
  process.exit(template ? 1 : 0);
}
if (!list.includes(template)) {
  console.error(`No template "${template}". Available: ${list.join(", ")}`);
  process.exit(1);
}

const slug = name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const today = new Date().toLocaleDateString("sv-SE"); // local date, YYYY-MM-DD
const dest = path.join(ROOT, "output", `${today}-${slug}`);
if (existsSync(dest)) {
  console.error(`${path.relative(ROOT, dest)} already exists. Pick another name or keep working in that folder.`);
  process.exit(1);
}
cpSync(path.join(TEMPLATES, template), dest, { recursive: true });
rmSync(path.join(dest, "preview.png"), { force: true });
// Remember the template so the brand check can spot sample text that was left in.
const designFile = path.join(dest, "design.html");
writeFileSync(designFile, readFileSync(designFile, "utf8").replace("<head>", `<head>\n<meta name="aim:template" content="${template}">`));
console.log(`Created ${path.relative(ROOT, dest)}/design.html from template "${template}".`);
