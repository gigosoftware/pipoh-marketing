# Pipoh Marketing

The marketing site for [Pipoh](https://pipoh.ai) — the creative studio with hand-picked premium AI models. Image, video, audio, edit, upscale · all in one flow.

This repository hosts the public marketing surface (`pipoh.ai`). The studio app itself lives at [`studio.pipoh.ai`](https://studio.pipoh.ai) in the [`gigosoftware/pipoh`](https://github.com/gigosoftware/pipoh) repo.

## Stack

- **Next.js 16** App Router + Turbopack
- **Tailwind v4** (`@theme` + dual-mode tokens)
- **Motion** (formerly Framer Motion) · hero parallax + reveals
- **lucide-react** · icon set (matches studio convention)
- **Sanity** · headless CMS for Phase 2 blog + case studies + featured presets
- **TypeScript strict** · no ESLint v1 (minimal config in Phase 1.3)

## Getting started

```bash
npm install
npm run dev   # http://localhost:3000
```

Production build + smoke:

```bash
npm run build && npm run start
```

## Environment

Local development reads from `.env.local` (gitignored). For Vercel production, set these in the project dashboard under Settings → Environment Variables:

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `rpw2fj02` | Created via Cowork Day 44 manhã |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Default dataset |

## Sanity CMS

The Sanity project (`rpw2fj02` · GIGO Studios org · Growth Trial 30 days) was created in advance. Phase 1.3 ships the **client scaffold + schema definitions only** — no live queries yet. Phase 2 will wire blog posts, case studies, and Pati's curated preset editorial.

### Where things live

- `lib/sanity/client.ts` · `next-sanity` client wired to the project
- `lib/sanity/types.ts` · TypeScript types mirroring schemas (Post · CaseStudy · FeaturedPreset)
- `sanity/schemas/*.ts` · schema definitions (`post`, `caseStudy`, `featuredPreset`)
- `sanity/schemas/index.ts` · barrel · ready to plug into a Studio config in Phase 2

### Adding content (Phase 2 onwards)

When the blog goes live in Phase 2, content authors will use the hosted Sanity Studio at `https://rpw2fj02.sanity.studio` (or a self-hosted Studio mounted under `/studio` here). Schemas are version-controlled in this repo; structural changes flow through PRs, while content edits happen in the Studio UI.

Pati and the founder can edit content without touching code — schemas keep field shapes consistent across environments.

## Pages

- `/` · Hero · Pain · PipohWay · Showcase (ISR 24 h from studio explore feed) · Pricing · FinalCTA · Footer
- `/pricing` · Comparison table + How Pips work + FAQ + Custom contact
- `/manifesto` · Founder voice · why Pipoh exists
- `/privacy` · 307 redirect to `studio.pipoh.ai/account/privacy`
- `/terms` · 307 redirect to `studio.pipoh.ai/terms`

## Brand

Brand tokens (dusty rose oklch palette, Geist Sans + Mono, dark default) are manually synced from the studio at `pipoh/src/app/globals.css`. When the studio brand evolves, the change ships here via the relevant section of `app/globals.css`.

## DNS

The `pipoh.ai` apex domain is managed in Vercel under the **GIGO Studios** team. To swap domains between projects (e.g., during the Phase 1.3 cutover from `pipoh-landing` to `pipoh-marketing`), follow [`MIGRATION-DNS.md`](./MIGRATION-DNS.md).

## Placeholders to swap before public launch

- `public/hero/tile-{1..8}.webp` · brand-gradient placeholders with labels (Atelier · Reel · etc.). Replace with real Pipoh creations before announcing.
- `public/og/og-default.png` · 1200×630 brand-gradient placeholder. Founder will replace via Adobe Express.

## Hero assets

The hero section ships **8 tiles · 6 image + 2 video**. The two video slots match the modalities Pipoh actually offers for motion (Reel + Stage).

### Image tiles (6)

Drop WebP files at `public/hero/tile-{1,3,5,6,7,8}.webp` matching the aspect ratios declared in `lib/hero-tiles.ts`:

| File | Aspect | Tile |
|---|---|---|
| `tile-1.webp` | 9:16 | Atelier |
| `tile-3.webp` | 1:1 | Spark |
| `tile-5.webp` | 4:3 | Loom |
| `tile-6.webp` | 16:9 | Cinema |
| `tile-7.webp` | 1:1 | Glyph |
| `tile-8.webp` | 9:16 | Mirage |

Target size · **~50–100 KB each**. Use `cwebp -q 80` or Adobe Express export.

### Video tiles (2)

Reel and Stage are video models · they get short loops with a poster fallback:

| File | Aspect | Tile |
|---|---|---|
| `tile-2.webm` | 16:9 | Reel · 3–5 s loop · target ~300–400 KB |
| `tile-2-poster.webp` | 16:9 | Reel first-frame still |
| `tile-4.webm` | 9:16 | Stage · 3–5 s loop · target ~300–400 KB |
| `tile-4-poster.webp` | 9:16 | Stage first-frame still |

Optional MP4 fallbacks (`tile-2.mp4` / `tile-4.mp4`) cover the long tail of older browsers · skip if you're comfortable with WebM-only (Chrome / Safari 17+ / Firefox modern all support it).

### Encoding tips

Convert MP4 → WebM with ffmpeg (audio stripped, web-optimized quality):

```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 32 -b:v 0 -an output.webm
```

`-an` strips audio (we autoplay muted · audio adds weight for nothing).
`-crf 32` targets ~300–400 KB output for a 3–5 s clip.

Extract first frame as a WebP poster:

```bash
ffmpeg -i input.mp4 -vframes 1 -c:v libwebp -q:v 80 output-poster.webp
```

### Drop workflow

1. Pick the creation in `studio.pipoh.ai/explore` (founder + Pati curate)
2. Image: download original → `cwebp -q 80 input.png -o tile-N.webp`
3. Video: download MP4 → encode WebM + WebP poster per snippets above
4. Drop into `public/hero/` overwriting the placeholder
5. Smoke locally with `npm run dev` then commit + push
