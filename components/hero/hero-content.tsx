import Link from "next/link";

/**
 * Hero headline + CTAs · centered overlay above the floating-tile grid.
 *
 * Reveal animation: `motion-safe:opacity-0` + `animate-hero-reveal` keyframe
 * (defined in globals.css). Users with `prefers-reduced-motion: reduce`
 * skip the motion-safe class entirely, leaving content visible at opacity 1
 * (the @media block in globals.css collapses any residual animation).
 *
 * CTAs link out to studio.pipoh.ai (the app) — marketing is conversion-only,
 * sign-up + explore live in the app. Two-domain pattern (Linear · claude.ai).
 */
export function HeroContent() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 text-center motion-safe:opacity-0 motion-safe:animate-[hero-reveal_800ms_cubic-bezier(0.4,0,0.2,1)_400ms_forwards]">
      <h1 className="text-balance text-5xl font-semibold tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
        Where pixels become art.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-text-secondary sm:text-xl">
        One creative studio · premium models, curated · image, video, audio, edit, upscale · all in flow.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="https://studio.pipoh.ai/sign-up"
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-brand-500 px-7 text-base font-medium text-white shadow-lg shadow-brand-900/40 transition-all duration-180 hover:scale-[1.02] hover:bg-brand-300 hover:shadow-xl hover:shadow-brand-900/50"
        >
          <span className="relative z-10">Start free · 200 Pips welcome</span>
        </Link>
        <Link
          href="https://studio.pipoh.ai/explore"
          className="inline-flex h-12 items-center justify-center rounded-full border border-border-subtle bg-surface-1/50 px-7 text-base font-medium text-text-primary backdrop-blur transition-all duration-180 hover:scale-[1.02] hover:border-brand-500/60 hover:bg-surface-2"
        >
          Explore creations
        </Link>
      </div>
      <p className="mt-4 text-sm text-text-muted">No card required · cancel any time.</p>
    </div>
  );
}
