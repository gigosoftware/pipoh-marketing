import type { MetadataRoute } from "next";

const BASE_URL = "https://pipoh.ai";

/**
 * Day 48 SEO/AEO foundation · welcome mat for search + AI answer engines.
 *
 * Pipoh WANTS to be discovered by AI answer surfaces (founder cravamento
 * "essa parte tem que ser o nosso show") → allow everything, and welcome
 * the major AI crawlers explicitly. The wildcard rule already covers them,
 * but naming them is a positive signal (and survives a future tightening
 * of the `*` rule).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // AI answer engines · explicit welcome (AEO)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
