/**
 * One-shot generator for Phase 1.1 placeholder hero tiles + OG image.
 *
 * Output:
 *   public/hero/tile-{1..8}.webp · brand-tinted gradient + label text
 *   public/og/og-default.png     · 1200×630 brand gradient + Pipoh wordmark + tagline
 *
 * Run:   node scripts/gen-placeholders.mjs
 *
 * Founder will swap these with real Pipoh creations before Phase 1.2 wires
 * the studio.pipoh.ai/api/explore ISR snapshot. The OG can be replaced via
 * Adobe Express in Phase 1.3.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public");
const HERO = join(PUBLIC, "hero");
const OG = join(PUBLIC, "og");

await mkdir(HERO, { recursive: true });
await mkdir(OG, { recursive: true });

// sRGB approximations of the brand oklch palette (globals.css).
const BRAND = {
  50:  "#f3e6e3",
  300: "#d59b8e",
  500: "#bf6f5f",
  700: "#8f4a3c",
  900: "#4d2a23",
};

// Tile config mirrors lib/hero-tiles.ts (id order matches alt label order).
const TILES = [
  { idx: 1, label: "Atelier", w: 540, h: 960, angle: 135 },
  { idx: 2, label: "Reel",    w: 960, h: 540, angle: 90 },
  { idx: 3, label: "Spark",   w: 720, h: 720, angle: 45 },
  { idx: 4, label: "Stage",   w: 540, h: 960, angle: 210 },
  { idx: 5, label: "Loom",    w: 800, h: 600, angle: 180 },
  { idx: 6, label: "Cinema",  w: 960, h: 540, angle: 30 },
  { idx: 7, label: "Glyph",   w: 720, h: 720, angle: 270 },
  { idx: 8, label: "Mirage",  w: 540, h: 960, angle: 315 },
];

function gradientEnds(w, h, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.max(w, h);
  return {
    x1: (cx - (r / 2) * Math.cos(rad)).toFixed(1),
    y1: (cy - (r / 2) * Math.sin(rad)).toFixed(1),
    x2: (cx + (r / 2) * Math.cos(rad)).toFixed(1),
    y2: (cy + (r / 2) * Math.sin(rad)).toFixed(1),
  };
}

function tileSvg({ w, h, label, angle }) {
  const { x1, y1, x2, y2 } = gradientEnds(w, h, angle);
  const fontSize = Math.round(Math.min(w, h) * 0.15);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="${BRAND[300]}" />
        <stop offset="1" stop-color="${BRAND[700]}" />
      </linearGradient>
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="0.55" stop-color="#000" stop-opacity="0" />
        <stop offset="1" stop-color="#000" stop-opacity="0.4" />
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)" />
    <rect width="${w}" height="${h}" fill="url(#vignette)" />
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
          font-family="Geist, Inter, system-ui, -apple-system, sans-serif"
          font-size="${fontSize}" font-weight="600" letter-spacing="3"
          fill="${BRAND[50]}" fill-opacity="0.94">${label}</text>
  </svg>`;
}

for (const tile of TILES) {
  const svg = tileSvg(tile);
  await sharp(Buffer.from(svg))
    .webp({ quality: 82, effort: 6 })
    .toFile(join(HERO, `tile-${tile.idx}.webp`));
  console.log(`✓ tile-${tile.idx}.webp · ${tile.label} · ${tile.w}×${tile.h}`);
}

// 1200×630 OG image · brand-gradient + Pipoh wordmark + tagline + P mark.
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="og-bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${BRAND[900]}" />
      <stop offset="0.55" stop-color="${BRAND[700]}" />
      <stop offset="1" stop-color="${BRAND[500]}" />
    </linearGradient>
    <radialGradient id="og-glow" cx="35%" cy="35%" r="60%">
      <stop offset="0" stop-color="${BRAND[300]}" stop-opacity="0.28" />
      <stop offset="1" stop-color="${BRAND[300]}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="og-mark-grad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${BRAND[300]}" />
      <stop offset="1" stop-color="${BRAND[700]}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#og-bg)" />
  <rect width="1200" height="630" fill="url(#og-glow)" />

  <text x="80" y="310"
        font-family="Geist, Inter, system-ui, -apple-system, sans-serif"
        font-size="128" font-weight="700" letter-spacing="-4"
        fill="${BRAND[50]}">Pipoh</text>

  <text x="80" y="390"
        font-family="Geist, Inter, system-ui, -apple-system, sans-serif"
        font-size="48" font-weight="500" letter-spacing="-1"
        fill="${BRAND[50]}" fill-opacity="0.92">Where pixels become art.</text>

  <text x="80" y="460"
        font-family="Geist, Inter, system-ui, -apple-system, sans-serif"
        font-size="24" font-weight="400" letter-spacing="0"
        fill="${BRAND[50]}" fill-opacity="0.7">Premium AI models · curated, not catalogued.</text>

  <g transform="translate(1000, 450)">
    <rect width="120" height="120" rx="26" fill="url(#og-mark-grad)" />
    <text x="60" y="60" text-anchor="middle" dominant-baseline="central"
          font-family="Geist, Inter, system-ui, sans-serif"
          font-size="80" font-weight="700" fill="${BRAND[50]}">P</text>
  </g>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .png({ compressionLevel: 9 })
  .toFile(join(OG, "og-default.png"));
console.log(`✓ og-default.png · 1200×630`);

console.log("\nDone. Placeholders ready · founder may swap with real creations.");
