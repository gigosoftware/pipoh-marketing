import { Section } from "@/components/ui/section";

const FAQS = [
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

export function PricingFAQ() {
  return (
    <Section id="faq" eyebrow="Questions" headline="Frequently asked.">
      <div className="mx-auto max-w-3xl divide-y divide-border-subtle/40">
        {FAQS.map((faq, i) => (
          <details
            key={faq.q}
            className="section-reveal group py-5"
            style={{ "--reveal-delay": `${i * 50}ms` } as React.CSSProperties}
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
              <span>{faq.q}</span>
              <span aria-hidden className="mt-1 shrink-0 text-xl leading-none text-brand-300 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
