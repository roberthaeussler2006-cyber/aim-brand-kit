// Render AIM designs to PNG / PDF and check them against the brand rules.
//
//   npm run render -- output/2026-10-07-kickoff-story/design.html          PNG (and PDF for print formats)
//   npm run render -- output/.../design.html --hd                          PNG at 2x resolution
//   npm run render -- output/.../design.html --pdf                         also a PDF (all pages) for screen formats
//   npm run check  -- output/.../design.html                               brand check only, no files written
//   npm run previews                                                       re-render every templates/*/preview.png
//
// Every design declares its size in <head>:
//   <meta name="aim:size" content="1080x1920">        pixel formats (social, banners, slides)
//   <meta name="aim:print" content="A3">              print formats (A3, A4, A5, A4-landscape), 3 mm bleed included
// The design's outermost element is <div class="canvas ...">. Several canvases in one file
// (carousel, slides, multi-page document) give one PNG per canvas and a multi-page PDF.

import { chromium } from "playwright";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Paper sizes in mm, without bleed.
const PAPER = { A3: [297, 420], A4: [210, 297], A5: [148, 210], "A4-landscape": [297, 210], "A3-landscape": [420, 297] };
const BLEED = 3;
const MM = 96 / 25.4; // CSS px per mm

// Brand palette as RGB. Any alpha is allowed; other colours are flagged.
const PALETTE = {
  "76,42,133": "aim-deep #4C2A85", "110,86,207": "aim #6E56CF", "139,92,246": "aim-light #8B5CF6",
  "196,181,253": "aim-glow #C4B5FD", "15,17,21": "ink #0F1115", "156,163,175": "gray #9CA3AF",
  "250,250,248": "paper #FAFAF8", "242,242,240": "faint #F2F2F0", "217,217,218": "rule #D9D9DA",
  "107,107,107": "muted #6B6B6B", "244,242,255": "aim-subtle #F4F2FF", "255,255,255": "white", "0,0,0": "transparent/black",
};
const FONTS = ["inter tight", "geist"];

function parseArgs(argv) {
  const args = { files: [], hd: false, pdf: false, check: false, previews: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--hd") args.hd = true;
    else if (a === "--pdf") args.pdf = true;
    else if (a === "--check") args.check = true;
    else if (a === "--previews") args.previews = true;
    else args.files.push(a);
  }
  return args;
}

function readFormat(html) {
  const size = html.match(/<meta\s+name="aim:size"\s+content="(\d+)x(\d+)"/i);
  if (size) return { kind: "pixel", w: +size[1], h: +size[2], label: `${size[1]}x${size[2]} px` };
  const print = html.match(/<meta\s+name="aim:print"\s+content="([\w-]+)"/i);
  if (print) {
    const dims = PAPER[print[1]];
    if (!dims) throw new Error(`Unknown print format "${print[1]}". Use one of: ${Object.keys(PAPER).join(", ")}`);
    const [wmm, hmm] = dims.map((d) => d + 2 * BLEED);
    return { kind: "print", paper: print[1], wmm, hmm, w: Math.round(wmm * MM), h: Math.round(hmm * MM), label: `${print[1]} + ${BLEED} mm bleed` };
  }
  throw new Error('No size found. Add <meta name="aim:size" content="1080x1920"> or <meta name="aim:print" content="A3"> to <head>.');
}

async function launch() {
  try {
    return await chromium.launch();
  } catch (first) {
    try {
      return await chromium.launch({ channel: "chrome" }); // fall back to the installed Google Chrome
    } catch {
      throw new Error(`Could not start a browser. Run "npm run setup" once.\n${first.message}`);
    }
  }
}

// Runs inside the page. Returns a list of problems.
function inspect({ palette, fonts, minPx, samples, wordmarkMin }) {
  const issues = [];
  const canvases = [...document.querySelectorAll(".canvas")];
  if (!canvases.length) return [{ level: "error", msg: 'No element with class "canvas" found.' }];
  const decorative = (el) => el.closest(".glow, .dome, .photo, .grain, .vignette, [data-decor]");
  const describe = (el) => {
    const t = (el.innerText || el.getAttribute("src") || el.className || el.tagName).toString().trim().replace(/\s+/g, " ");
    return `<${el.tagName.toLowerCase()}> "${t.slice(0, 50)}"`;
  };
  const colorsIn = (value) => [...value.matchAll(/rgba?\(([^)]+)\)/g)].map((m) => m[1].split(/[ ,/]+/).filter(Boolean));
  const seenColor = new Set();

  for (const el of document.querySelectorAll("[data-sample]")) {
    issues.push({ level: "error", msg: `Sample text from the template is still marked (data-sample): ${describe(el)}. Replace it with real content or delete it, then remove data-sample.` });
  }

  // Sample sentences from the template that survived without their data-sample marker.
  const bodyText = document.body.innerText.replace(/\s+/g, " ");
  for (const sample of samples) {
    if (bodyText.includes(sample)) issues.push({ level: "error", msg: `Template sample text is still in the design: "${sample.slice(0, 60)}". Replace or delete it, unless the user confirmed this exact text.` });
  }

  for (const canvas of canvases) {
  const box = canvas.getBoundingClientRect();

  // Text that collides with other text or with a rule line.
  // Glyph box of the text, clipped to the layout box of its block (tight line-heights make glyph boxes taller than the line).
  const textRect = (el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const g = range.getBoundingClientRect();
    let block = el;
    while (block.parentElement && getComputedStyle(block).display.startsWith("inline")) block = block.parentElement;
    const b = block.getBoundingClientRect();
    return { left: g.left, right: g.right, top: Math.max(g.top, b.top), bottom: Math.min(g.bottom, b.bottom) };
  };
  const blocks = [...canvas.querySelectorAll(".content *")].filter((el) => {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || decorative(el)) return false;
    return [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  });
  const rects = blocks.map((el) => [el, textRect(el)]);
  for (let i = 0; i < rects.length; i++) {
    for (let j = i + 1; j < rects.length; j++) {
      const [a, ra] = rects[i], [b, rb] = rects[j];
      if (a.contains(b) || b.contains(a)) continue;
      const w = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
      const h = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
      if (w > 2 && h > 2) issues.push({ level: "warn", msg: `Text overlaps other text: ${describe(a)} and ${describe(b)}` });
    }
  }
  for (const el of canvas.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;

    // Colours
    for (const prop of ["color", "backgroundColor", "borderTopColor", "backgroundImage", "fill", "stroke"]) {
      const v = cs[prop];
      if (!v || v === "none") continue;
      for (const parts of colorsIn(v)) {
        const alpha = parts.length > 3 ? parseFloat(parts[3]) : 1;
        if (alpha === 0) continue;
        const key = parts.slice(0, 3).map((n) => Math.round(parseFloat(n))).join(",");
        if (!palette[key] && !seenColor.has(key) && !el.closest("svg[data-artwork]") && !(el.tagName === "IMG")) {
          seenColor.add(key);
          issues.push({ level: "error", msg: `Colour rgb(${key}) is not in the AIM palette (${describe(el)}). Use a token from brand/tokens.css.` });
        }
      }
    }

    // Fonts and italics (text elements only)
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (hasText) {
      const family = cs.fontFamily.split(",")[0].replace(/["']/g, "").trim().toLowerCase();
      if (!fonts.includes(family)) issues.push({ level: "error", msg: `Font "${family}" is not a brand font (${describe(el)}). Use var(--font-display) or var(--font-body).` });
      if (cs.fontStyle === "italic" || cs.fontStyle.startsWith("oblique")) issues.push({ level: "error", msg: `Italic text (${describe(el)}). AIM never uses italics.` });
      if (parseFloat(cs.fontSize) < minPx) issues.push({ level: "warn", msg: `Text is too small for this format (${parseFloat(cs.fontSize).toFixed(1)}px, minimum ${minPx.toFixed(1)}px): ${describe(el)}` });
      if (el.scrollWidth > el.clientWidth + 2 && cs.overflow !== "visible") issues.push({ level: "warn", msg: `Text is cut off: ${describe(el)}` });
    }

    // Anything outside the canvas (except decorative layers)
    if (!decorative(el)) {
      const r = el.getBoundingClientRect();
      if (r.width && r.height && (r.left < box.left - 1 || r.top < box.top - 1 || r.right > box.right + 1 || r.bottom > box.bottom + 1)) {
        issues.push({ level: "warn", msg: `Element runs off the edge of the design: ${describe(el)}` });
      }
    }

    // Images
    if (el.tagName === "IMG") {
      const src = el.getAttribute("src") || "";
      if (/^https?:/i.test(src)) issues.push({ level: "warn", msg: `Image loaded from the internet: ${src}. Save it into the design folder instead.` });
      if (!el.complete || el.naturalWidth === 0) issues.push({ level: "error", msg: `Image did not load: ${src}` });
      if (/brand\/logo\//.test(src) && el.naturalWidth) {
        const r = el.getBoundingClientRect();
        const natural = el.naturalWidth / el.naturalHeight;
        const actual = r.width / r.height;
        if (Math.abs(natural / actual - 1) > 0.02) issues.push({ level: "error", msg: `The logo is stretched or squashed (${src}). Set only its width.` });
        if (r.width < box.width * 0.04) issues.push({ level: "warn", msg: `The logo is very small (${Math.round(r.width)}px wide).` });
        if (/wordmark/.test(src) && wordmarkMin && r.width < wordmarkMin) issues.push({ level: "warn", msg: `The wordmark is too small for its subline "AI IN MANAGEMENT CLUB" to be readable. Make it at least ${Math.ceil(wordmarkMin / r.width * 100)}% of its current width, or use the mark (aim-mark-*.svg).` });
      }
    }
  }
  }
  return issues;
}

// Text of every data-sample element in the template this design was made from (meta aim:template).
function templateSamples(html) {
  const name = html.match(/<meta\s+name="aim:template"\s+content="([\w-]+)"/i)?.[1];
  const file = name && path.join(ROOT, "templates", name, "design.html");
  if (!file || !existsSync(file)) return [];
  const source = readFileSync(file, "utf8");
  const out = new Set();
  for (const m of source.matchAll(/<(\w+)[^>]*\bdata-sample\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    const text = m[2].replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
    if (text.length >= 8) out.add(text);
  }
  return [...out];
}

// <img class="icon" src=".../brand/icons/chip.svg"> is swapped for the inline SVG so the icon
// takes the text/accent colour (an <img> cannot inherit colour).
async function inlineIcons(page, htmlPath) {
  const srcs = await page.$$eval("img.icon", (els) => els.map((el) => el.getAttribute("src")));
  for (const src of new Set(srcs)) {
    const file = path.resolve(path.dirname(htmlPath), src);
    if (!src.endsWith(".svg") || !existsSync(file)) continue;
    const svg = readFileSync(file, "utf8").replace(/<\?xml[^>]*>/, "");
    await page.$$eval(`img.icon[src="${src}"]`, (els, markup) => {
      for (const el of els) {
        const holder = document.createElement("span");
        holder.innerHTML = markup;
        const node = holder.firstElementChild;
        node.setAttribute("class", el.getAttribute("class"));
        if (el.getAttribute("style")) node.setAttribute("style", el.getAttribute("style"));
        node.setAttribute("aria-hidden", "true");
        el.replaceWith(node);
      }
    }, svg.trim());
  }
}

async function renderOne(browser, file, opts) {
  const abs = path.resolve(file);
  if (!existsSync(abs)) throw new Error(`File not found: ${file}`);
  const html = readFileSync(abs, "utf8");
  const fmt = readFormat(html);
  const scale = opts.previewPath ? 1 : opts.hd ? 2 : fmt.kind === "print" ? 2 : 1;

  const page = await browser.newPage({ viewport: { width: fmt.w, height: fmt.h }, deviceScaleFactor: scale });
  await page.goto(pathToFileURL(abs).href, { waitUntil: "networkidle" });
  await inlineIcons(page, abs);
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "screen" });

  // Minimum readable text: 7 pt in print, about 1/56 of the short side on screens.
  const minPx = fmt.kind === "print" ? 7 * (96 / 72) : Math.max(12, Math.round(Math.min(fmt.w, fmt.h) / 56));
  const wordmarkMin = fmt.kind === "print" ? 35 * MM : Math.round(Math.min(fmt.w, fmt.h) * 0.2);
  let issues = await page.evaluate(inspect, { palette: PALETTE, fonts: FONTS, minPx, samples: templateSamples(html), wordmarkMin });
  if (opts.previewPath) issues = issues.filter((i) => !i.msg.startsWith("Sample text"));

  const out = [];
  if (!opts.check) {
    const base = abs.replace(/\.html$/i, "");
    // One PNG per canvas: design.png, or design-01.png, design-02.png ... for carousels and slides.
    const canvases = page.locator(".canvas");
    const count = opts.previewPath ? 1 : await canvases.count();
    for (let i = 0; i < count; i++) {
      const png = opts.previewPath || (count > 1 ? `${base}-${String(i + 1).padStart(2, "0")}.png` : `${base}.png`);
      await canvases.nth(i).screenshot({ path: png, type: "png" });
      out.push(png);
    }
    if (fmt.kind === "print" || opts.pdf) {
      await page.emulateMedia({ media: "print" });
      const pdfOpts = { printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } };
      const size = fmt.kind === "print" ? { width: `${fmt.wmm}mm`, height: `${fmt.hmm}mm` } : { width: `${fmt.w}px`, height: `${fmt.h}px` };
      if (!opts.previewPath) {
        await page.pdf({ ...pdfOpts, ...size, path: `${base}.pdf` });
        out.push(`${base}.pdf`);
      }
    }
  }
  await page.close();
  return { file, fmt, issues, out };
}

function report({ file, fmt, issues, out }) {
  const rel = (p) => path.relative(process.cwd(), p);
  console.log(`\n${rel(path.resolve(file))}  (${fmt.label})`);
  for (const o of out) console.log(`  saved  ${rel(o)}`);
  const errors = issues.filter((i) => i.level === "error");
  const warns = issues.filter((i) => i.level === "warn");
  for (const i of errors) console.log(`  ERROR  ${i.msg}`);
  for (const i of warns) console.log(`  warn   ${i.msg}`);
  if (!issues.length) console.log("  brand check: OK");
  else console.log(`  brand check: ${errors.length} error(s), ${warns.length} warning(s)`);
  return errors.length;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let jobs = args.files.map((f) => ({ file: f }));
  if (args.previews) {
    const dir = path.join(ROOT, "templates");
    jobs = readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && existsSync(path.join(dir, d.name, "design.html")))
      .map((d) => ({ file: path.join(dir, d.name, "design.html"), previewPath: path.join(dir, d.name, "preview.png") }));
  }
  if (!jobs.length) {
    console.log("Usage: npm run render -- path/to/design.html [--hd] [--pdf]\n       npm run check -- path/to/design.html");
    process.exit(1);
  }
  const browser = await launch();
  let errors = 0;
  try {
    for (const job of jobs) errors += report(await renderOne(browser, job.file, { ...args, previewPath: job.previewPath }));
  } finally {
    await browser.close();
  }
  process.exit(errors ? 2 : 0);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
