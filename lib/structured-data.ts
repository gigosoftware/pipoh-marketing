import type {
  FAQPage,
  Organization,
  Question,
  SoftwareApplication,
  WebSite,
  WithContext,
} from "schema-dts";

import { FAQS, type Faq } from "@/lib/faqs";

/**
 * Day 48 SEO/AEO · typed JSON-LD builders.
 *
 * `schema-dts` types make `npx tsc --noEmit` the regression guard — a
 * malformed schema fails the type-check (the repo has no test harness by
 * design). Every builder returns a `WithContext<T>` so `@context` is
 * present + correct.
 *
 * Cravado decisions (Day 48):
 * - `sameAs` (social profiles) OMITTED — the footer has no social links;
 *   founder provides the URLs later. Never fabricate handles.
 * - `WebSite` has NO `potentialAction`/SearchAction — there's no internal
 *   site search; declaring one would be a lie to crawlers.
 * - `SoftwareApplication.offers` is an `AggregateOffer` mirroring the 6
 *   plan prices already public on /pricing ($0–$499). Per-model Pips
 *   pricing from the studio DB does NOT belong here.
 */

const BASE_URL = "https://pipoh.ai";
const APP_URL = "https://studio.pipoh.ai";
const ORG_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;

const DESCRIPTION =
  "The creative studio with hand-picked premium AI models. Image, video, audio, edit, upscale — all in one flow.";

export function organizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Pipoh",
    legalName: "GIGO Studios",
    url: BASE_URL,
    logo: `${BASE_URL}/pipoh-mark.svg`,
    foundingDate: "2026",
    description: DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hi@pipoh.ai",
    },
    // TODO(founder): social profile URLs → `sameAs: [...]` (X / Instagram /
    // LinkedIn / YouTube / TikTok). Omitted until provided.
  };
}

export function webSiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Pipoh",
    url: BASE_URL,
    publisher: { "@id": ORG_ID },
  };
}

export function softwareApplicationSchema(): WithContext<SoftwareApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Pipoh",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    url: APP_URL,
    description: DESCRIPTION,
    image: `${BASE_URL}/og/og-default.png`,
    publisher: { "@id": ORG_ID },
    featureList: [
      "AI image generation",
      "AI video generation",
      "AI audio generation",
      "Darkroom photo editing (8 hand-picked filters)",
      "Splice video editing",
      "Upscale to 4K",
      "Outpaint",
      "Curated presets",
    ],
    // Mirrors the 6 public plans on /pricing ($0 Free → $499 Atelier).
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "499",
      offerCount: 6,
    },
  };
}

export function faqPageSchema(faqs: Faq[] = FAQS): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(
      (faq): Question => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      }),
    ),
  };
}
