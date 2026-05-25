import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Day 44 Phase 1.2 cravamento · external images for Showcase ISR.
    // CDN domain confirmed via studio docs/infra/STORAGE.md + curl probe of
    // studio.pipoh.ai/api/explore (all thumbnailUrls are media.pipoh.ai).
    remotePatterns: [
      { protocol: "https", hostname: "media.pipoh.ai" },
      { protocol: "https", hostname: "pipoh-media.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "studio.pipoh.ai" },
    ],
  },
};

export default nextConfig;
