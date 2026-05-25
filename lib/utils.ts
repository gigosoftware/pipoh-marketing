import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind-aware className combiner.
 *
 * `clsx` handles conditional/array/object inputs · `twMerge` collapses
 * conflicting Tailwind utilities (last wins), so callers can pass a base
 * className and override-friendly extensions without worrying about
 * `bg-zinc-500 bg-brand-500` both lingering in the DOM.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
