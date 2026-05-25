export type HeroTile = {
  id: string;
  url: string;
  aspect: "16:9" | "9:16" | "1:1" | "4:3";
  alt: string;
  /**
   * Grid coordinates in the form `row-start / col-start / row-end / col-end`.
   * The hero grid is 12 cols × 8 rows; tiles wrap the centered headline
   * (which lives roughly cols 4–9 / rows 4–5) by occupying the corners.
   */
  gridArea: string;
};

/**
 * Phase 1.1 cravamento · 8 placeholder tiles hardcoded with grid positions
 * designed around the centered headline. Mixed aspect ratios (3× 16:9 · 3× 9:16
 * · 1× 1:1 · 1× 4:3) signal the breadth of modalities Pipoh covers.
 *
 * Phase 1.2 will swap this for a build-time ISR fetch:
 *   studio.pipoh.ai/api/explore?limit=12&snapshot=marketing → revalidate 86400s
 */
export async function getHeroTiles(): Promise<HeroTile[]> {
  return [
    { id: "t1", url: "/hero/tile-1.webp", aspect: "9:16", alt: "Atelier portrait composition",       gridArea: "1 / 1 / 4 / 3" },
    { id: "t2", url: "/hero/tile-2.webp", aspect: "16:9", alt: "Reel cinematic frame",               gridArea: "1 / 3 / 3 / 6" },
    { id: "t3", url: "/hero/tile-3.webp", aspect: "1:1",  alt: "Spark square composition",           gridArea: "1 / 10 / 3 / 12" },
    { id: "t4", url: "/hero/tile-4.webp", aspect: "9:16", alt: "Stage vertical short",               gridArea: "1 / 12 / 4 / 13" },
    { id: "t5", url: "/hero/tile-5.webp", aspect: "4:3",  alt: "Loom photo studio",                  gridArea: "6 / 1 / 9 / 3" },
    { id: "t6", url: "/hero/tile-6.webp", aspect: "16:9", alt: "Cinema landscape generation",        gridArea: "7 / 3 / 9 / 6" },
    { id: "t7", url: "/hero/tile-7.webp", aspect: "1:1",  alt: "Glyph typographic composition",      gridArea: "7 / 7 / 9 / 9" },
    { id: "t8", url: "/hero/tile-8.webp", aspect: "9:16", alt: "Mirage portrait sketch",             gridArea: "6 / 11 / 9 / 13" },
  ];
}
