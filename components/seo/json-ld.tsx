import type { Thing, WithContext } from "schema-dts";

/**
 * Day 48 · JSON-LD injector (Server Component).
 *
 * Renders a `<script type="application/ld+json">` in the document. Per the
 * Next.js metadata docs this is valid + indexable rendered in the body —
 * Next places it correctly and crawlers parse it wherever it sits. Accepts
 * one schema or an array (multiple graph nodes in separate scripts).
 */
export function JsonLd({
  data,
}: {
  data: WithContext<Thing> | WithContext<Thing>[];
}) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // schema is built from static, trusted brand data — no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
