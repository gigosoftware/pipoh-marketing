"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import type { HeroTile, ImageTile, VideoTile } from "@/lib/hero-tiles";

type FloatingTilesProps = { tiles: HeroTile[] };

/**
 * Floating media grid · 8 tiles in mixed aspect ratios · 6 image + 2 video.
 *
 * Mouse-follow parallax (subtle · max 18px translate at depth 4) driven by
 * Motion spring with high damping (20) for calm movement · not dramatic.
 * Gentle Y oscillation (4s loop · ±8px · staggered per tile) lives as a
 * CSS keyframe (`tile-float`) so it stays on the GPU compositor.
 *
 * Each tile renders a brand-tinted corner label (Atelier · Reel · etc.) so
 * the modality is named even when the user is parsing the visual.
 *
 * The whole grid is `aria-hidden` because tiles are decorative · the headline
 * + CTAs (HeroContent) carry the page's accessible meaning.
 */
export function FloatingTiles({ tiles }: FloatingTilesProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring smoothing · subtle damping so parallax glides rather than darts.
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      // Normalize cursor position to -1..1 around section center.
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseX.set(x);
      mouseY.set(y);
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      // Mobile (<md): tiles hidden · Hero shows headline+CTAs only for clean
      // mobile presentation + perf budget. Desktop (md+): full 12×8 grid.
      // Founder cravamento Phase 1.2 TASK 10 · option A · perf-first.
      className="pointer-events-none absolute inset-0 hidden md:grid p-8 gap-4"
      style={{
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "repeat(8, 1fr)",
      }}
    >
      {tiles.map((tile, i) => (
        <FloatingTile key={tile.id} tile={tile} index={i} springX={springX} springY={springY} />
      ))}
    </div>
  );
}

function FloatingTile({
  tile,
  index,
  springX,
  springY,
}: {
  tile: HeroTile;
  index: number;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}) {
  // Stagger parallax depth per tile · 6 / 10 / 14 / 18px max translate.
  // Further-out tiles drift more → reinforces depth perception.
  const depth = (index % 4) * 4 + 6;
  const x = useTransform(springX, [-1, 1], [-depth, depth]);
  const y = useTransform(springY, [-1, 1], [-depth, depth]);

  // Staggered float start so the 8 tiles don't oscillate in lockstep.
  const floatDelay = `${(index * 0.3) % 4}s`;
  const priority = index < 4;

  return (
    <motion.div
      // Cast through `unknown` because Motion's `style` accepts MotionValue
      // for `x`/`y` while CSSProperties doesn't, and CSSProperties has no
      // typing for the `--tile-delay` custom property. Both are valid at
      // runtime · this is the canonical Motion + custom-property workaround.
      style={
        {
          x,
          y,
          gridArea: tile.gridArea,
          "--tile-delay": floatDelay,
        } as unknown as React.CSSProperties
      }
      className="relative overflow-hidden rounded-2xl border border-border-subtle/60 bg-surface-1 shadow-2xl shadow-brand-900/30 motion-safe:animate-[tile-float_4s_ease-in-out_infinite] motion-safe:[animation-delay:var(--tile-delay)]"
    >
      {/*
        Day 44 polish cravamento · tile FILLS its grid cell · NO inner
        aspect-ratio wrapper. Grid cells have shapes dictated by their
        gridArea (e.g. 3 rows × 2 cols ≈ 2:3) which usually doesn't
        match the creation's natural aspect (e.g. 9:16 portrait).
        Image + Video use `object-cover` so the creation crops naturally
        to fit the cell · zero dark bands. The `tile.aspect` field stays
        as metadata (alt semantic + tile placement intent) but doesn't
        force inner sizing anymore.
      */}
      {tile.kind === "video" ? (
        <VideoMedia tile={tile} priority={priority} />
      ) : (
        <ImageMedia tile={tile} priority={priority} />
      )}
      {/* Subtle gradient overlay · adds depth + brand wash without obscuring content. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-tr from-surface-0/40 via-transparent to-brand-500/10"
      />
      {/* Corner chip · always shown · names the modality. */}
      <CornerLabel label={tile.label} />
    </motion.div>
  );
}

function ImageMedia({ tile, priority }: { tile: ImageTile; priority: boolean }) {
  return (
    <Image
      src={tile.url}
      alt={tile.alt}
      fill
      sizes="(max-width: 768px) 50vw, 25vw"
      className="object-cover"
      priority={priority}
    />
  );
}

function VideoMedia({ tile, priority }: { tile: VideoTile; priority: boolean }) {
  // Day 44 polish cravamento · video tile autoplays muted/looped/inline.
  // - `muted` is required for browser autoplay policy
  // - `playsInline` keeps iOS from forcing fullscreen
  // - `prefers-reduced-motion: reduce` pauses video at mount · poster remains visible
  // - poster is a WebP first-frame so CLS stays at 0 even while WebM streams in
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      video.pause();
      video.removeAttribute("autoplay");
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload={priority ? "auto" : "metadata"}
      poster={tile.posterUrl}
      className="absolute inset-0 h-full w-full object-cover"
      aria-label={tile.alt}
    >
      <source src={tile.videoUrl} type="video/webm" />
      {tile.videoUrlMp4 && <source src={tile.videoUrlMp4} type="video/mp4" />}
    </video>
  );
}

function CornerLabel({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center rounded-full border border-white/10 bg-black/40 px-2.5 py-1 backdrop-blur-sm">
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-300/95">
        {label}
      </span>
    </div>
  );
}
