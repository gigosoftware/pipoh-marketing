import { Section } from "@/components/ui/section";

export function HowPipsWork() {
  return (
    <Section
      id="how-pips-work"
      eyebrow="How Pips work"
      headline="One credit. Every modality. Transparent cost."
      sub="Pips are Pipoh's universal credit. Each generation shows its cost before you click. No conversion tables, no surprise charges."
    >
      <div className="mx-auto max-w-3xl space-y-6 text-[15px] leading-relaxed text-text-secondary">
        <p className="section-reveal">
          <strong className="text-text-primary">Pre-paid model.</strong> You buy a plan or a top-up pack. Pips land in your wallet immediately. No subscriptions you forget to cancel · cancel any time and your remaining Pips stay (within rollover cap).
        </p>
        <p className="section-reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
          <strong className="text-text-primary">Cost visible before click.</strong> Every Studio button shows the Pips cost upfront. A 1K Atelier image is ~50 Pips. A 5-second Reel video is ~250 Pips. No estimates, no surprises.
        </p>
        <p className="section-reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <strong className="text-text-primary">Rollover.</strong> Unused Pips carry forward up to your plan&apos;s cap. Use them when you need a burst · they don&apos;t expire if you stay on the same plan or upgrade.
        </p>
        <p className="section-reveal" style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
          <strong className="text-text-primary">Welcome bonus.</strong> Every new account gets 200 Pips on the house. Enough to try Atelier, Spark, Reel · explore before committing.
        </p>
      </div>
    </Section>
  );
}
