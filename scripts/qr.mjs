// Make a brand QR code (ink on transparent, SVG).
//
//   npm run qr -- https://aim-club.ch/events output/2026-10-07-kickoff/qr-signup.svg

import QRCode from "qrcode";
import { writeFileSync } from "node:fs";

const [url, out] = process.argv.slice(2);
if (!url || !out) {
  console.log("Usage: npm run qr -- <url> <output.svg>");
  process.exit(1);
}
const svg = await QRCode.toString(url, { type: "svg", errorCorrectionLevel: "M", margin: 0, color: { dark: "#0F1115", light: "#0000" } });
writeFileSync(out, svg);
console.log(`QR code for ${url} saved to ${out}. Place it on a light square (class="qr").`);
