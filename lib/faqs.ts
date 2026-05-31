/**
 * Day 48 · single source for the pricing FAQs.
 *
 * Lifted out of `components/pricing/pricing-faq.tsx` so both the rendered
 * accordion AND the `FAQPage` JSON-LD (lib/structured-data.ts) read the
 * exact same copy — no drift between what users see and what answer
 * engines index. Plain data (no React) so it's safe to import from a
 * Server Component schema builder.
 */

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Can I cancel any time?",
    a: "Yes. Cancel from Console · Wallet. Your remaining Pips stay in your wallet · use them up at your own pace. No clawback, no fine print.",
  },
  {
    q: "Do unused Pips expire?",
    a: "No · they roll over up to your plan's rollover cap. Free plan doesn't carry, but every paid plan does. Pause and resume creation without losing what you bought.",
  },
  {
    q: "What happens if I run out of Pips mid-month?",
    a: "Buy a top-up pack (Essential and above) · land in seconds, generate immediately. Or wait for your cycle reset · happens monthly on your sign-up date.",
  },
  {
    q: "Is video included in every plan?",
    a: "Video unlocks at Essential ($10/mo). Free is image-only. Reel and Stage models are Essential+. Premium tier (Atelier exclusive) gets earlier access to new video models.",
  },
  {
    q: "Can I edit and upscale my generations?",
    a: "Yes · Darkroom (8 hand-picked filters), Splice (video editing), Upscale to 4K/8K (Essential+), and Outpaint (Essential+) are integrated. No need to download and switch tools.",
  },
  {
    q: "Do you offer custom plans for studios?",
    a: "Atelier ($499/mo) is built for studios. For volume above 200K Pips/month or custom needs, email hi@pipoh.ai · we'll build something with you.",
  },
];
