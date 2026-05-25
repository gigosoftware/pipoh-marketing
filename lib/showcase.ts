export type ShowcaseItem = {
  id: string;
  thumbnailUrl: string;
  /** CSS aspect-ratio (e.g. "3 / 4" or "16 / 9"). */
  aspect?: string;
  alt?: string;
  /** Friendly model label ("Atelier", "Reel", etc.) when present. */
  model?: string;
};

const EXPLORE_API = "https://studio.pipoh.ai/api/explore?limit=12";

/**
 * Phase 1.2 cravamento · build-time ISR fetch of the public Explore feed.
 * Revalidates every 24h (86400s) per founder cravamento Q3 Day 44.
 *
 * Real API shape discovered via curl on Phase 0 (NOT the spec's guess):
 *   { items: [{ id, thumbnailUrl, mediumUrl, prompt, modelLabel, aspectRatio, ... }] }
 *
 * We use `mediumUrl` (~512px) over `thumbnailUrl` (~256px) for the 4-col grid
 * sharpness on retina. Falls back to thumbnailUrl if mediumUrl is missing.
 *
 * Soft-fail to [] on any error · the Showcase component then renders null
 * (no broken grid in prod · founder cravamento "no broken UI").
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

    return mapped.slice(0, 12);
  } catch (err) {
    console.error("[showcase] fetch failed", err);
    return [];
  }
}
