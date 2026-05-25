import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  headline: string;
  sub?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Shared section wrapper · keeps marketing rhythm consistent across the
 * page (eyebrow → headline → sub → content). Each header element gets
 * `section-reveal` so the scroll-driven fade defined in globals.css
 * triggers naturally as the section enters the viewport.
 */
export function Section({ id, eyebrow, headline, sub, children, className }: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("mx-auto max-w-7xl px-6 py-20 sm:py-28", className)}
    >
      <header className="mx-auto mb-12 max-w-3xl text-center">
        {eyebrow && (
          <p className="section-reveal text-xs font-medium uppercase tracking-[0.2em] text-brand-300">
            {eyebrow}
          </p>
        )}
        <h2
          id={headingId}
          className="section-reveal mt-3 text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
        >
          {headline}
        </h2>
        {sub && (
          <p className="section-reveal mt-4 text-balance text-lg leading-relaxed text-text-secondary">
            {sub}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}
