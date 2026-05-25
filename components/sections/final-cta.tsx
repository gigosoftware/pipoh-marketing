import Link from "next/link";

export function FinalCTA() {
  return (
    <section
      aria-label="Get started"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--color-brand-900)_0%,transparent_60%)] opacity-40"
      />
      <div className="section-reveal mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
          Start creating · 200 Pips on the house.
        </h2>
        <p className="mt-6 text-balance text-lg leading-relaxed text-text-secondary">
          No credit card. No setup. Open the studio, write your first prompt, and you&apos;re making.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="https://studio.pipoh.ai/sign-up"
            className="group inline-flex h-12 items-center justify-center rounded-full bg-brand-500 px-8 text-base font-medium text-white shadow-xl shadow-brand-900/50 transition-all duration-180 hover:scale-[1.02] hover:bg-brand-300"
          >
            Open the Studio
          </Link>
          <Link
            href="https://studio.pipoh.ai/explore"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border-subtle bg-surface-1/50 px-8 text-base font-medium text-text-primary backdrop-blur transition-all duration-180 hover:border-brand-500/60 hover:bg-surface-2"
          >
            See creations first
          </Link>
        </div>
      </div>
    </section>
  );
}
