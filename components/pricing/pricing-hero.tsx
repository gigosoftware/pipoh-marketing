export function PricingHero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-brand-900)_0%,transparent_60%)] opacity-30"
      />
      <div className="mx-auto max-w-3xl px-6 text-center motion-safe:opacity-0 motion-safe:animate-[hero-reveal_800ms_cubic-bezier(0.4,0,0.2,1)_forwards]">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-300">
          Pricing
        </p>
        <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight text-text-primary sm:text-6xl">
          Honest pricing. No surprise bills.
        </h1>
        <p className="mt-6 text-balance text-lg leading-relaxed text-text-secondary">
          Pre-paid Pips. See the cost before each generation. Cancel any time. Free forever to try.
        </p>
      </div>
    </section>
  );
}
