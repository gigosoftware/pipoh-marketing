import { FloatingTiles } from "./floating-tiles";
import { HeroContent } from "./hero-content";
import { getHeroTiles } from "@/lib/hero-tiles";

/**
 * Hero · server component shell.
 *
 * Layout: full-viewport section · `<FloatingTiles>` (client · Motion-driven)
 * underneath, `<HeroContent>` (headline + CTAs) overlaid centered.
 *
 * Backdrop: soft brand-tinted radial gradient + faint grid texture.
 * The grid is masked to fade out at the edges so it doesn't compete with
 * the floating tiles.
 */
export async function Hero() {
  const tiles = await getHeroTiles();

  return (
    <section
      aria-label="Pipoh hero"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Backdrop · brand-tinted radial gradient from top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center_top,var(--color-brand-900)_0%,transparent_60%)] opacity-25"
      />

      {/* Grid texture · subtle 48px squares · radial mask fades to center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_85%)]"
      />

      {/* Floating tiles · client component · Motion mouse parallax + CSS keyframe oscillation */}
      <FloatingTiles tiles={tiles} />

      {/* Headline overlay · centered above tiles · z-10 to sit on top */}
      <HeroContent />
    </section>
  );
}
