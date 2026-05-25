import Link from "next/link";
import { Section } from "@/components/ui/section";
import { getShowcaseItems } from "@/lib/showcase";

/**
 * Showcase · live snapshot of the Pipoh community Explore feed.
 *
 * ISR cached 24h via `getShowcaseItems`. If the upstream API fails or
 * returns zero items, the section unmounts itself rather than rendering
 * an empty grid (founder cravamento "no broken UI in prod").
 */
export async function Showcase() {
  const items = await getShowcaseItems();
  if (items.length === 0) return null;

  return (
    <Section
      id="showcase"
      eyebrow="Made with Pipoh"
      headline="Real creations · refreshed daily."
      sub="A live snapshot from the Pipoh community. Click any to see how it was made."
    >
      {/*
        Day 44 polish round 3 · CSS multi-column masonry · Pinterest/Leonardo-style.
        Previous `grid + items-start` approach left vertical gaps below shorter
        tiles because grid row height = tallest tile in the row. Switching to
        `columns-N` flows each tile into an independent column · the next tile
        starts immediately after the previous one ends · zero black gaps even
        with wildly different aspect ratios (1:1, 3:4, 9:16, 16:9 all pack
        together cleanly).

        Implementation notes:
        - `columns-2` / `md:columns-3` / `lg:columns-4` → column-count per BP
        - `gap-X` on the container → column-gap
        - `break-inside-avoid` on each tile → never split a tile across columns
        - `mb-X` on each tile → vertical rhythm inside a column (column flow
          ignores gap-Y; margin-bottom is how you get spacing between stacked
          items in CSS columns)
        - `inline-block` is a Safari guardrail · pre-15 versions sometimes
          mis-calculate column heights when children are block-level

        Visual order: tiles flow top-to-bottom in column 1, then column 2, etc.
        (column-major, vs grid's row-major). Doesn't matter here · creations
        are unordered.
      */}
      <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
        {items.slice(0, 12).map((item, i) => (
          <Link
            key={item.id}
            href={`https://studio.pipoh.ai/explore/${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="section-reveal group relative mb-3 inline-block w-full break-inside-avoid overflow-hidden rounded-xl bg-surface-2"
            style={
              {
                "--reveal-delay": `${(i % 4) * 60}ms`,
              } as React.CSSProperties
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.thumbnailUrl}
              alt={item.alt || "Pipoh creation"}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full object-cover transition-transform duration-240 ease-default group-hover:scale-[1.04]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
            />
            {item.model && (
              <div className="absolute bottom-3 left-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="truncate text-xs font-medium text-white">{item.model}</p>
              </div>
            )}
          </Link>
        ))}
      </div>
    </Section>
  );
}
