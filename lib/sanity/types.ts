/**
 * Day 44 Phase 1.3 · Sanity schema TypeScript types.
 *
 * These mirror the schemas in `/sanity/schemas/*.ts` · keep in sync when
 * adding/removing fields. Phase 1.3 ships types + schemas only · NO actual
 * queries yet. Phase 2 will wire blog/case studies/featured presets.
 */

export type Post = {
  _id: string;
  _type: "post";
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  /** PortableText blocks · type properly when Phase 2 wires it. */
  body?: unknown;
  coverImage?: {
    asset: { _ref: string };
    alt: string;
  };
};

export type CaseStudy = {
  _id: string;
  _type: "caseStudy";
  title: string;
  slug: { current: string };
  client: string;
  challenge: string;
  outcome: string;
  /** Markdown body · rendered via remark in Phase 2. */
  bodyMarkdown?: string;
  heroImage?: {
    asset: { _ref: string };
    alt: string;
  };
};

export type FeaturedPreset = {
  _id: string;
  _type: "featuredPreset";
  title: string;
  /** Links to studio Preset.id · cross-system reference. */
  presetId: string;
  /** Pati cravamento · why this preset is featured. */
  curatorNote: string;
  publishedAt: string;
};
