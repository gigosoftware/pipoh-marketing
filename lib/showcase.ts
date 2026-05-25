export type ShowcaseItem = {
  id: string;
  thumbnailUrl: string;
  /** CSS aspect-ratio (e.g. "3 / 4" or "16 / 9"). */
  aspect?: string;
  alt?: string;
  /** Friendly model label ("Atelier", "Reel", etc.) when present. */
  model?: string;
};

// Day 44 polish round 2 cravamento · over-fetch then filter.
// We need 12 viable thumbnails to render the grid. The studio Explore feed
// occasionally returns placeholder/error WebPs (448-byte content-black files
// from creations whose thumbnail generation failed or whose source video had
// no usable frame). Fetching 24 gives a 100% buffer · enough to drop ~5 duds
// per snapshot and still ship 12 honest tiles.
const EXPLORE_API = "https://studio.pipoh.ai/api/explore?limit=24";

/** Minimum content-length (bytes) to treat a thumbnail as a real image.
 * Real WebPs at 600×338+ run 50–250 KB. Dud placeholders weigh ~448 B.
 * 5 KB clears the duds with a comfortable margin. */
const MIN_THUMB_BYTES = 5000;

/** HEAD-check timeout per URL · keeps a slow CDN from blocking the ISR build. */
const HEAD_TIMEOUT_MS = 2000;

/**
 * Phase 1.2 cravamento · build-time ISR fetch of the public Explore feed.
 * Revalidates every 24h (86400s) per founder cravamento Q3 Day 44.
 *
 * Real API shape (verified via curl on Phase 0):
 *   { items: [{ id, thumbnailUrl, mediumUrl, prompt, modelLabel, aspectRatio, ... }] }
 *
 * We use `mediumUrl` (~512px) over `thumbnailUrl` (~256px) for the 4-col grid
 * sharpness on retina. Falls back to thumbnailUrl if mediumUrl is missing.
 *
 * Day 44 polish round 2 cravamento · HEAD-check each candidate in parallel
 * and drop the duds (content-length < 5 KB ≈ placeholder/error WebP). This
 * stops the "3 black tiles" pattern founder caught on smoke local.
 *
 * Soft-fail to [] on any error · the Showcase component renders null on
 * empty (no broken grid in prod).
 */
export async function getShowcaseItems(): Promise<ShowcaseItem[]> {
  try {
    const res = await fetch(EXPLORE_API, { next: { revalidate: 86400 } });
    if (!res.ok) {
      console.warn(`[showcase] explore API returned ${res.status}`);
      return [];
    }
    const data: unknown = await res.json();
    if (!data || typeof data !== "object" || !("items" in data)) return [];

    const raw = (data as { items: unknown }).items;
    if (!Array.isArray(raw)) return [];

    const mapped: ShowcaseItem[] = raw
      .filter((x): x is Record<string, unknown> => typeof x === "object" && x !== null)
      .map((x) => {
        const thumbnailUrl =
          (typeof x.mediumUrl === "string" && x.mediumUrl) ||
          (typeof x.thumbnailUrl === "string" && x.thumbnailUrl) ||
          "";
        const aspectRatio = typeof x.aspectRatio === "string" ? x.aspectRatio : "";
        const promptText = typeof x.prompt === "string" ? x.prompt : "";
        return {
          id: typeof x.id === "string" ? x.id : "",
          thumbnailUrl,
          // Normalize "3:4" → "3 / 4" for CSS aspect-ratio.
          aspect: aspectRatio ? aspectRatio.replace(":", " / ") : undefined,
          alt: promptText ? promptText.slice(0, 100) : undefined,
          model:
            typeof x.modelLabel === "string" ? x.modelLabel :
            typeof x.model === "string" ? x.model : undefined,
        };
      })
      .filter((x) => x.id && x.thumbnailUrl);

    if (mapped.length === 0) return [];

    // Parallel HEAD checks · all 24 fired at once · max wait = slowest single
    // HEAD (typically ~40 ms over Cloudflare R2 CDN) plus the 2 s timeout cap.
    const aliveFlags = await Promise.all(mapped.map((item) => isValidThumbnail(item.thumbnailUrl)));
    const filtered = mapped.filter((_, i) => aliveFlags[i]);

    if (filtered.length < mapped.length) {
      const dropped = mapped.length - filtered.length;
      console.info(`[showcase] dropped ${dropped} dud thumbnail(s) · ${filtered.length}/${mapped.length} kept`);
    }

    return filtered.slice(0, 12);
  } catch (err) {
    console.error("[showcase] fetch failed", err);
    return [];
  }
}

async function isValidThumbnail(url: string): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), HEAD_TIMEOUT_MS);
  try {
    // Match the parent /api/explore fetch revalidate cadence (24 h). Avoid
    // `cache: "no-store"` · Next 16 treats that as `revalidate: 0` and opts
    // the entire page out of static rendering. Same-revalidate HEAD keeps
    // the parent prerender static while still letting the 24 h cycle pick
    // up new creations (or fixes to bad thumbnails) on the next rebuild.
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      next: { revalidate: 86400 },
    });
    const len = parseInt(res.headers.get("content-length") ?? "0", 10);
    return res.ok && Number.isFinite(len) && len >= MIN_THUMB_BYTES;
  } catch {
    // Network error · abort · DNS · etc. Treat as not viable.
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
