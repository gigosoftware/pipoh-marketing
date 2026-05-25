import { createClient } from "next-sanity";

/**
 * Sanity client · Phase 1.3 scaffold (Day 44).
 *
 * Project + dataset created via Cowork Chrome MCP Day 44 manhã:
 *   - Project ID: rpw2fj02
 *   - Organization: GIGO Studios (opaWMs3yk)
 *   - Plan: Growth Trial 30 days (free upgrade · AI Assist + Comments + Scheduled drafts)
 *   - Dataset: production
 *
 * Phase 1.3 wires the client only · ZERO content queries yet. Phase 2 will add
 * blog post / case study / featured preset fetchers.
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "rpw2fj02",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-10-01",
  useCdn: true, // ISR-friendly · always uses Sanity CDN
});
