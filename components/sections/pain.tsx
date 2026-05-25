import { Section } from "@/components/ui/section";

const PAIN_POINTS = [
  {
    title: "Stop juggling subscriptions",
    body:
      "OpenAI here · Google there · Runway · Kling. Four paywalls, four prompts, four logins. Pipoh consolidates the best of each into one subscription.",
  },
  {
    title: "Too many models, no taste",
    body:
      "Marketplaces list a thousand lookalike models and leave you guessing. Pipoh hand-picks the premium models per modality. Curated, not catalogued.",
  },
  {
    title: "Don't switch tools to finish",
    body:
      "Generation is 30% of the work. Editing, upscaling, recomposing is 70%. Darkroom · Splice · Upscale · Outpaint live inside the same flow.",
  },
  {
    title: "Beat the empty prompt",
    body:
      "Staring at a blank textbox kills momentum. Pipoh presets unlock starting points · hand-curated by humans, refreshed weekly.",
  },
];

export function Pain() {
  return (
    <Section
      id="pain"
      eyebrow="The status quo"
      headline="AI tools were supposed to make you faster."
      sub="They didn't. They scattered your workflow across four apps."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PAIN_POINTS.map((point, i) => (
          <article
            key={point.title}
            className="section-reveal group rounded-2xl border border-border-subtle bg-surface-1/40 p-6 backdrop-blur-sm transition-colors duration-180 hover:border-brand-700/60 hover:bg-surface-2/60"
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
          >
            <h3 className="text-lg font-semibold tracking-tight text-text-primary">
              {point.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
              {point.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
