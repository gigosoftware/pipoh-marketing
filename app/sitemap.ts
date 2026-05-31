import type { MetadataRoute } from "next";

const BASE_URL = "https://pipoh.ai";

/**
 * Day 48 · indexable marketing pages only. `/privacy` and `/terms` are
 * 307 redirects cross-domain to the studio (legal lives there) → excluded
 * from the sitemap so they never get treated as pipoh.ai canonical content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/manifesto`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
