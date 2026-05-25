/**
 * Day 44 polish · hero tiles support image + video kinds via discriminated union.
 *
 * Reel + Stage are Pipoh's video models · they ship as autoplay loop tiles to
 * honest-model what the studio actually creates. The other 6 stay as static
 * images. Each tile carries a `label` field rendered as a corner chip in
 * `floating-tiles.tsx` (brand-300 uppercase tracking-wide · backdrop-blur).
 *
 * Until founder + Pati drop real assets in `public/hero/`, the placeholder
 * Phase 1.1 brand-gradient WebPs (`tile-{1..8}.webp`) continue to serve. Video
 * tiles point to `.webm` + dedicated poster WebPs that founder will create:
 *
 *   public/hero/tile-2.webm + tile-2-poster.webp · Reel (16:9 · 3-5s loop)
 *   public/hero/tile-4.webm + tile-4-poster.webp · Stage (9:16 · 3-5s loop)
 *
 * See README.md → Hero assets for the encoding workflow.
 */

type BaseTile = {
  id: string;
  aspect: "16:9" | "9:16" | "1:1" | "4:3";
  alt: string;
  /** Corner chip label · always shown bottom-left · brand-tinted uppercase. */
  label: string;
  /** Grid coordinates · `row-start / col-start / row-end / col-end` on a 12×8 grid. */
  gridArea: string;
};

export type ImageTile = BaseTile & {
  kind: "image";
  /** WebP path under `public/hero/`. */
  url: string;
};

export type VideoTile = BaseTile & {
  kind: "video";
  /** Primary WebM source · target ~300-400 KB, audio stripped. */
  videoUrl: string;
  /** Optional MP4 fallback for older browsers · skip if WebM-only is acceptable. */
  videoUrlMp4?: string;
  /** WebP first-frame poster · provides CLS reservation + reduced-motion fallback. */
  posterUrl: string;
};

export type HeroTile = ImageTile | VideoTile;

export async function getHeroTiles(): Promise<HeroTile[]> {
  return [
    // Top row · 4 tiles spread above the headline
    {
      kind: "image",
      id: "atelier",
      url: "/hero/tile-1.webp",
      aspect: "9:16",
      alt: "Atelier portrait creation · OpenAI gpt-image-2",
      label: "Atelier",
      gridArea: "1 / 1 / 4 / 3",
    },
    {
      kind: "video",
      id: "reel",
      videoUrl: "/hero/tile-2.webm",
      // Day 44 cravamento · WebM-only ship · MP4 fallback skipped (Chrome/Safari/Firefox
      // modern all support WebM · ~98% browsers). Re-add videoUrlMp4 if legacy compat needed.
      posterUrl: "/hero/tile-2-poster.webp",
      aspect: "16:9",
      alt: "Reel cinematic motion · Kling Standard",
      label: "Reel",
      gridArea: "1 / 3 / 3 / 6",
    },
    {
      kind: "image",
      id: "spark",
      url: "/hero/tile-3.webp",
      aspect: "1:1",
      alt: "Spark fast composition · Gemini Flash",
      label: "Spark",
      gridArea: "1 / 10 / 3 / 12",
    },
    {
      kind: "video",
      id: "stage",
      videoUrl: "/hero/tile-4.webm",
      // WebM-only ship · MP4 fallback skipped (see tile-2 comment above).
      posterUrl: "/hero/tile-4-poster.webp",
      aspect: "9:16",
      alt: "Stage vertical motion · Veo 3.1 Fast",
      label: "Stage",
      gridArea: "1 / 12 / 4 / 13",
    },
    // Bottom row · 4 tiles spread below the headline
    {
      kind: "image",
      id: "loom",
      url: "/hero/tile-5.webp",
      aspect: "4:3",
      alt: "Loom photo studio · Wan 2.7 Pro",
      label: "Loom",
      gridArea: "6 / 1 / 9 / 3",
    },
    {
      kind: "image",
      id: "cinema",
      url: "/hero/tile-6.webp",
      aspect: "16:9",
      alt: "Cinema landscape · Kling Pro",
      label: "Cinema",
      gridArea: "7 / 3 / 9 / 6",
    },
    {
      kind: "image",
      id: "glyph",
      url: "/hero/tile-7.webp",
      aspect: "1:1",
      alt: "Glyph typographic · Qwen Image",
      label: "Glyph",
      gridArea: "7 / 7 / 9 / 9",
    },
    {
      kind: "image",
      id: "mirage",
      url: "/hero/tile-8.webp",
      aspect: "9:16",
      alt: "Mirage portrait sketch · Seedream",
      label: "Mirage",
      gridArea: "6 / 11 / 9 / 13",
    },
  ];
}
