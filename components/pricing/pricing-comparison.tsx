import { Check, Minus } from "lucide-react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const PLANS = ["Free", "Essential", "Spark", "Cinema", "Studio", "Atelier"] as const;

/** Atelier is the highlighted plan (rightmost column · stronger background). */
const HIGHLIGHT_COL = PLANS.length - 1;

type RowValue = string | boolean;

const ROWS: Array<{ label: string; values: [RowValue, RowValue, RowValue, RowValue, RowValue, RowValue] }> = [
  { label: "Monthly price",            values: ["$0", "$10", "$29", "$79", "$199", "$499"] },
  { label: "Pips per cycle",           values: ["0", "2,500", "8,000", "25,000", "75,000", "200,000"] },
  { label: "Welcome bonus",            values: ["200 Pips", "200 Pips", "200 Pips", "200 Pips", "200 Pips", "200 Pips"] },
  { label: "Concurrent generations",   values: ["1", "1", "2", "3", "5", "6"] },
  { label: "Image models",             values: [true, true, true, true, true, true] },
  { label: "Video models",             values: [false, true, true, true, true, true] },
  { label: "Audio (Score)",            values: [false, false, true, true, true, true] },
  { label: "Darkroom + Splice",        values: [true, true, true, true, true, true] },
  { label: "Upscale to 8K",            values: [false, true, true, true, true, true] },
  { label: "Outpaint",                 values: [false, true, true, true, true, true] },
  { label: "Top-up packs",             values: [false, true, true, true, true, true] },
  { label: "Rollover cap",             values: ["—", "7.5K", "24K", "75K", "225K", "600K"] },
  { label: "Priority queue",           values: [false, false, false, true, true, true] },
  { label: "Premium tier early access",values: [false, false, false, false, false, true] },
];

function Cell({ value, highlight }: { value: RowValue; highlight: boolean }) {
  if (typeof value === "boolean") {
    return (
      <span className={cn("inline-flex h-6 w-6 items-center justify-center", highlight && "scale-110")}>
        {value ? (
          <Check className="size-4 text-brand-300" aria-label="included" />
        ) : (
          <Minus className="size-4 text-text-muted" aria-label="not included" />
        )}
      </span>
    );
  }
  return (
    <span className={cn("text-sm text-text-primary", highlight && "font-semibold")}>
      {value}
    </span>
  );
}

export function PricingComparison() {
  return (
    <Section
      id="comparison"
      eyebrow="Side by side"
      headline="What's included at each tier."
      sub="Same studio for everyone. More throughput and unlocks as you scale."
    >
      <div className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
        <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-10 bg-surface-0 py-4 pr-4 text-sm font-medium text-text-muted">
                <span className="sr-only">Feature</span>
              </th>
              {PLANS.map((plan, i) => (
                <th
                  key={plan}
                  scope="col"
                  className={cn(
                    "px-3 py-4 text-center text-sm font-semibold tracking-tight",
                    i === HIGHLIGHT_COL
                      ? "rounded-t-xl bg-brand-900/[0.18] text-text-primary"
                      : "text-text-primary",
                  )}
                >
                  {plan}
                  {i === HIGHLIGHT_COL && (
                    <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.15em] text-brand-300">
                      Best for studios
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="section-reveal">
            {ROWS.map((row, rowIdx) => (
              <tr key={row.label} className={cn(rowIdx % 2 === 1 && "bg-surface-1/30")}>
                <th
                  scope="row"
                  className="sticky left-0 z-10 whitespace-nowrap bg-inherit py-3 pr-4 text-sm font-medium text-text-secondary"
                >
                  {row.label}
                </th>
                {row.values.map((value, colIdx) => (
                  <td
                    key={`${row.label}-${colIdx}`}
                    className={cn(
                      "px-3 py-3 text-center",
                      colIdx === HIGHLIGHT_COL && "bg-brand-900/[0.10]",
                      rowIdx === ROWS.length - 1 && colIdx === HIGHLIGHT_COL && "rounded-b-xl",
                    )}
                  >
                    <Cell value={value} highlight={colIdx === HIGHLIGHT_COL} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
