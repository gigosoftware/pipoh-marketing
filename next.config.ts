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
  experimental: {
    // Day 44 Phase 1.3 polish · barrel-import optimization. Reduces the JS
    // chunk shipped for icon-heavy / motion-heavy pages by importing only the
    // specific named exports actually used. Tree-shake support sometimes
    // misses CJS-styled re-exports · this guarantees the trim.
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
