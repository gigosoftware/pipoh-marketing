import { post } from "./post";
import { caseStudy } from "./caseStudy";
import { featuredPreset } from "./featuredPreset";

/**
 * Schema barrel · Phase 2 will pass `schemaTypes` to a Sanity Studio config
 * (e.g. `sanity.config.ts`) or directly to the next-sanity client when
 * authoring content. Phase 1.3 ships definitions only · no Studio mounted yet.
 */
export const schemaTypes = [post, caseStudy, featuredPreset];
