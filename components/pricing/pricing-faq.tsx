import { Section } from "@/components/ui/section";

// Day 48 · FAQS lifted to lib/faqs.ts so this accordion + the FAQPage
// JSON-LD on /pricing share one source (no drift). Render is unchanged.
import { FAQS } from "@/lib/faqs";

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
