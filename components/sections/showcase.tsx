import Link from "next/link";
import { Play } from "lucide-react";
import { Section } from "@/components/ui/section";
import { getShowcaseItems } from "@/lib/showcase";

/**
 * Showcase · live snapshot of the Pipoh community Explore feed.
 *
 * ISR cached 24h via `getShowcaseItems`. If the upstream API fails or
 * returns zero items, the section unmounts itself rather than rendering
 * an empty grid (founder cravamento "no broken UI in prod").
 *
 * Day 45 cravamento · video items now render real Cloudflare Stream
 * frames (mapper dispatches by `kind` and picks `thumbnailUrl`/Stream
 * for videos). A small "Video" chip overlays the top-left of each video
 * tile · honest signaling that this is motion content without obscuring
 * the frame itself.
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
        Tiles flow into independent columns · zero black gaps between adjacent
        tiles of mixed aspect ratios. See lib/showcase.ts for the URL dispatch
        + dud-thumbnail HEAD filter.
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

            {item.kind === "video" && (
              <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                <Play className="size-3 fill-white" aria-hidden />
                Video
              </div>
            )}

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
