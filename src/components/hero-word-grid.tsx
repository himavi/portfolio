"use client";

import { useEffect, useRef } from "react";
import { useReducedMotionPref } from "@/components/providers/reduced-motion-provider";
import { siteConfig } from "@/lib/site";

// Accent is duplicated here and in globals.css (--color-accent) because an SVG
// data URI can't read CSS variables. Keep them in sync.
const ACCENT = "#ff3b3b";

const MASK_DESKTOP =
  "radial-gradient(circle 160px at var(--x) var(--y), #000 0%, rgba(0,0,0,0.35) 45%, transparent 72%)";
const MASK_TOUCH =
  "radial-gradient(circle 90px at var(--x) var(--y), #000 0%, rgba(0,0,0,0.35) 45%, transparent 72%)";

/** A tightly tiled "HKS" SVG background, repeated across the area. */
function tileBackground(fill: string, opacity: number): string {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='24'>` +
    `<text x='28' y='12' dominant-baseline='central' text-anchor='middle' ` +
    `font-family='ui-monospace,SFMono-Regular,Menlo,monospace' font-size='11' ` +
    `letter-spacing='1' fill='${fill}' fill-opacity='${opacity}'>${siteConfig.shortName}</text>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * Interactive background: a faint tiled grid of initials with an accent
 * "spotlight" that follows the cursor (written to CSS variables, so no React
 * re-render). Smaller spotlight on touch screens. Static under reduced motion.
 */
export function HeroWordGrid() {
  const reduced = useReducedMotionPref();
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    const highlight = highlightRef.current;
    if (!container || !highlight) return;

    // Use a smaller spotlight radius on touch/mobile devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const mask = isTouch ? MASK_TOUCH : MASK_DESKTOP;
    highlight.style.maskImage = mask;
    (highlight.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = mask;

    let rect = container.getBoundingClientRect();
    const updateRect = () => { rect = container.getBoundingClientRect(); };
    const onMove = (event: PointerEvent) => {
      highlight.style.setProperty("--x", `${event.clientX - rect.left}px`);
      highlight.style.setProperty("--y", `${event.clientY - rect.top}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: tileBackground("#f4f4f5", 0.07),
          backgroundRepeat: "repeat",
        }}
      />

      {!reduced && (
        <div
          ref={highlightRef}
          className="absolute inset-0 [--x:50%] [--y:50%]"
          style={{
            backgroundImage: tileBackground(ACCENT, 1),
            backgroundRepeat: "repeat",
            maskImage: MASK_DESKTOP,
            WebkitMaskImage: MASK_DESKTOP,
            filter: "drop-shadow(0 0 6px rgb(255 59 59 / 0.5))",
          }}
        />
      )}

      {/* Keep hero copy legible, then fade the grid into the page. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_center,color-mix(in_oklab,var(--color-background)_55%,transparent),transparent_72%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
