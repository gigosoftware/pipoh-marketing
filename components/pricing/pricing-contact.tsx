import Link from "next/link";
import { Section } from "@/components/ui/section";

export function PricingContact() {
  return (
    <Section
      id="contact"
      eyebrow="Building bigger?"
      headline="Studios, agencies, productions."
      sub="If Atelier isn't enough · custom volumes, dedicated support, white-label · we'll build a plan with you."
    >
      <div className="section-reveal mx-auto max-w-md text-center">
        <Link
          href="mailto:hi@pipoh.ai?subject=Custom%20plan%20inquiry"
          className="inline-flex h-12 items-center justify-center rounded-full border border-border-subtle bg-surface-2 px-7 text-base font-medium text-text-primary transition-all duration-180 hover:scale-[1.02] hover:border-brand-500/60 hover:bg-surface-2/80"
        >
          hi@pipoh.ai
        </Link>
        <p className="mt-3 text-sm text-text-muted">Reply within 1 business day.</p>
      </div>
    </Section>
  );
}
