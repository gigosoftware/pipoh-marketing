import Image from "next/image";
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
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {items.slice(0, 12).map((item, i) => (
          <Link
            key={item.id}
            href={`https://studio.pipoh.ai/explore/${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="section-reveal group relative block overflow-hidden rounded-xl bg-surface-2"
            style={
              {
                "--reveal-delay": `${(i % 4) * 60}ms`,
                aspectRatio: item.aspect || "1 / 1",
              } as React.CSSProperties
            }
          >
            <Image
              src={item.thumbnailUrl}
              alt={item.alt || "Pipoh creation"}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-240 ease-default group-hover:scale-[1.04]"
              loading="lazy"
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
