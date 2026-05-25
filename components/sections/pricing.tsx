import Link from "next/link";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type Plan = {
  id: string;
  name: string;
  price: number;
  pips: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
  badge?: string;
};

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    pips: "200 Pips welcome",
    description: "Start creating with no commitment",
    features: ["1 concurrent generation", "All image models", "No video · upgrade for video"],
    cta: "Start free",
    highlight: false,
  },
  {
    id: "essential",
    name: "Essential",
    price: 10,
    pips: "2,500 Pips/mo",
    description: "Entry-point creator",
    features: ["1 concurrent", "Image + video", "Top-up packs", "Rollover 7,500 cap"],
    cta: "Choose Essential",
    highlight: false,
  },
  {
    id: "spark",
    name: "Spark",
    price: 29,
    pips: "8,000 Pips/mo",
    description: "For experimenting",
    features: ["2 concurrent", "Image + video + audio", "Top-up packs", "Rollover 24,000 cap"],
    cta: "Choose Spark",
    highlight: false,
  },
  {
    id: "cinema",
    name: "Cinema",
    price: 79,
    pips: "25,000 Pips/mo",
    description: "For serious creators",
    features: ["3 concurrent", "All modalities", "Priority queue", "Rollover 75,000 cap"],
    cta: "Choose Cinema",
    highlight: false,
  },
  {
    id: "studio",
    name: "Studio",
    price: 199,
    pips: "75,000 Pips/mo",
    description: "For professionals",
    features: ["5 concurrent", "All modalities", "Premium tier models unlocked", "Rollover 225,000 cap"],
    cta: "Choose Studio",
    highlight: false,
  },
  {
    id: "atelier",
    name: "Atelier",
    price: 499,
    pips: "200,000 Pips/mo",
    description: "Enterprise · studios",
    features: ["6 concurrent", "All modalities", "Premium tier · early access", "Rollover 600,000 cap"],
    cta: "Choose Atelier",
    highlight: true,
    badge: "Best for studios",
  },
];

export function Pricing() {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      headline="Honest pricing. No surprise bills."
      sub="Pre-paid Pips. See the cost before you click. Cancel any time."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((plan, i) => (
          <article
            key={plan.id}
            className={cn(
              "section-reveal relative flex flex-col rounded-2xl border p-6 transition-all duration-180",
              plan.highlight
                ? "border-brand-500/50 bg-gradient-to-b from-brand-900/[0.15] to-surface-1/40 shadow-xl shadow-brand-900/20"
                : "border-border-subtle bg-surface-1/40 hover:border-brand-700/40 hover:bg-surface-2/50",
            )}
            style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-brand-500 px-3 py-0.5 text-xs font-medium text-white">
                {plan.badge}
              </span>
            )}
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold tracking-tight text-text-primary">{plan.name}</h3>
              <div className="text-right">
                <span className="text-3xl font-bold tracking-tight text-text-primary">${plan.price}</span>
                {plan.price > 0 && <span className="ml-1 text-sm text-text-muted">/mo</span>}
              </div>
            </div>
            <p className="mt-1 text-sm text-text-secondary">{plan.description}</p>
            <p className="mt-3 inline-flex items-center gap-2 self-start rounded-full border border-brand-700/30 bg-brand-900/[0.15] px-3 py-1 text-xs font-medium text-brand-300">
              <span aria-hidden>⚡</span> {plan.pips}
            </p>
            <ul className="mt-6 flex-1 space-y-2.5">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2 text-sm text-text-secondary">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <Link
              href="https://studio.pipoh.ai/sign-up"
              className={cn(
                "mt-6 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-all duration-180",
                plan.highlight
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-900/40 hover:scale-[1.02] hover:bg-brand-300"
                  : "border border-border-subtle bg-surface-2 text-text-primary hover:border-brand-500/60 hover:bg-surface-2/80",
              )}
            >
              {plan.cta}
            </Link>
          </article>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-text-muted">
        All plans include the 200 Pips welcome bonus. No credit card required for Free.
      </p>
    </Section>
  );
}
