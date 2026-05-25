import { Palette, Layers, Wallet, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/section";

const PIPOH_WAY = [
  {
    icon: Palette,
    title: "Curated, not catalogued",
    body:
      "Atelier · Spark · Reel · Stage · Cinema · Score · Loom · Glyph · Mirage. Each model hand-picked for what it does best. Less noise, more taste.",
    pain: "Solves: too many models, no taste",
  },
  {
    icon: Layers,
    title: "All in one studio",
    body:
      "Image, video, audio · plus Darkroom for finishing touches, Splice for video cuts, Upscale to 4K/8K, Outpaint to extend. From prompt to final art, one flow.",
    pain: "Solves: don't switch tools to finish",
  },
  {
    icon: Wallet,
    title: "Pricing you can trust",
    body:
      "Pips wallet · pre-paid credit, transparent cost per generation. See exactly what each run costs before you click. No surprise overages, no opaque API math.",
    pain: "Solves: stop juggling subscriptions",
  },
  {
    icon: Sparkles,
    title: "Presets that unlock",
    body:
      "Stuck staring at the prompt? Pati-curated presets give you 200+ starting points · fashion · portrait · cinematic · brand · typographic · sketch. Pick one, customize, run.",
    pain: "Solves: beat the empty prompt",
  },
];

export function PipohWay() {
  return (
    <Section
      id="pipoh-way"
      eyebrow="The Pipoh way"
      headline="One studio. Four reasons it works."
      sub="Curated models. Integrated workflow. Honest pricing. Human-curated unlocks."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {PIPOH_WAY.map((feature, i) => (
          <article
            key={feature.title}
            className="section-reveal group relative overflow-hidden rounded-3xl border border-border-subtle bg-surface-1/50 p-8 transition-all duration-180 hover:border-brand-500/40 hover:bg-surface-2/60 hover:shadow-2xl hover:shadow-brand-900/30"
            style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
          >
            <div
              aria-hidden
              className="absolute -right-12 -top-12 size-40 rounded-full bg-brand-500/[0.05] blur-3xl transition-opacity group-hover:bg-brand-500/[0.10]"
            />
            <feature.icon className="size-7 text-brand-300" aria-hidden />
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">
              {feature.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
              {feature.body}
            </p>
            <p className="mt-4 text-xs uppercase tracking-wider text-text-muted">
              {feature.pain}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
