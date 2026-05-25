import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Manifesto — Pipoh",
  description:
    "Why Pipoh exists. The creative studio for makers who want premium AI without the fragmentation.",
  openGraph: {
    title: "Pipoh — Why we exist",
    description:
      "We were the user before we were the founders. Pipoh is the creative studio we kept wishing existed.",
  },
};

/**
 * Manifesto · founder voice (v2 capricho cravamento Day 44).
 * Draft preliminar · founder edits post-commit for authentic voice
 * (target follow-up: "docs(manifesto): founder voice edits").
 */
export default function ManifestoPage() {
  return (
    <main className="min-h-screen">
      <article className="mx-auto max-w-2xl px-6 pt-32 pb-20 sm:pt-40">
        <header className="mb-12 text-center motion-safe:opacity-0 motion-safe:animate-[hero-reveal_800ms_cubic-bezier(0.4,0,0.2,1)_forwards]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-300">
            Manifesto
          </p>
          <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight text-text-primary sm:text-6xl">
            Why Pipoh exists.
          </h1>
        </header>

        <div className="space-y-10 text-[17px] leading-[1.75] text-text-secondary">
          {/* Opener · personal · "we were the user before we were the founders" */}
          <section className="section-reveal">
            <p className="text-xl leading-[1.6] text-text-primary">
              We were creators using AI before we were the founders of Pipoh.
            </p>
            <p className="mt-5">
              We had four browser tabs open at all times · OpenAI for image, Runway for video, ElevenLabs for audio, Photoshop for the finishing touches. Four logins. Four billing dates we kept forgetting. Four prompt styles to remember. Every project was a relay race across apps · and the baton kept dropping.
            </p>
            <p className="mt-4">
              Then came the marketplaces · &ldquo;every AI model in one place.&rdquo; A thousand models in a dropdown. Most lookalike. Most uncalibrated. We went from too few tools to too many · and got stuck again. Paralysis with extra steps.
            </p>
            <p className="mt-5 text-lg font-medium text-text-primary">
              So we built what we kept wishing existed.
            </p>
          </section>

          <section className="section-reveal">
            <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
              What Pipoh is
            </h2>
            <p className="mt-4">
              Pipoh is a creative studio with hand-picked premium models. Not a thousand. A few · curated the way a record label curates artists. We pick what works. We drop what doesn&apos;t. We tell you which model is for what · Atelier for portraits with text, Spark for fast ideation, Reel for cinematic motion, Score for sound.
            </p>
            <p className="mt-4">
              When you generate, the next step is right there · no tool switching. Darkroom · 8 hand-picked filters from professional retouching workflows. Splice · video edits without leaving the studio. Upscale to 4K · one click. Outpaint · extend a frame · no Photoshop round-trip.
            </p>
            <p className="mt-4">
              Stuck at the empty prompt? Pati ships new presets every week. Fashion, portrait, cinematic, brand, typographic, sketch. Pick one, customize, run. Presets are alive at Pipoh · they evolve as our community creates.
            </p>
          </section>

          <section className="section-reveal">
            <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
              Honest pricing
            </h2>
            <p className="mt-4">
              We sell pre-paid credits called Pips. Every generation shows its cost before you click. No surprise overages. No opaque API math. No subscriptions you forget to cancel · cancel any time and your remaining Pips wait for you.
            </p>
            <p className="mt-5 text-lg font-medium text-text-primary">
              Pricing is a feature here. Not a hidden cost.
            </p>
          </section>

          <section className="section-reveal">
            <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
              What we believe
            </h2>
            <ul className="mt-4 list-none space-y-3">
              <li>We believe AI tools should respect creative momentum · not break it across four apps.</li>
              <li>We believe curation by humans beats catalogs by algorithms.</li>
              <li>We believe pricing is a feature, not a hidden cost.</li>
              <li>We believe the empty prompt is a problem worth solving.</li>
              <li>We believe a creative studio should feel like home · dark, focused, fast, with soul.</li>
            </ul>
          </section>

          <section className="section-reveal">
            <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
              Where we come from
            </h2>
            <p className="mt-4">
              Pipoh is built in São Paulo · by two people who care more about the work than the noise around AI. Gigo builds the studio. Pati curates the soul. We ship on real users in real production · ourselves first, then our community.
            </p>
            <p className="mt-4">
              Brazilian creative energy meets premium AI craft. That&apos;s the DNA.
            </p>
          </section>

          <section className="section-reveal pt-6 text-center">
            <p className="text-2xl font-semibold tracking-tight text-text-primary">
              Where pixels become art.
            </p>
            <p className="mt-4 text-[17px] text-text-secondary">
              Bring an idea. We&apos;ll bring everything else.
            </p>
            <p className="mt-10 text-sm text-text-muted">
              — Gigo + Pati
              <br />
              GIGO Studios · São Paulo · 2026
            </p>
          </section>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="https://studio.pipoh.ai/sign-up"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-500 px-7 text-base font-medium text-white shadow-lg shadow-brand-900/40 transition-all duration-180 hover:scale-[1.02] hover:bg-brand-300"
          >
            Start creating · 200 Pips free
          </Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}
