"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { useReducedMotionPref } from "@/components/providers/reduced-motion-provider";

interface SmoothScrollApi {
  /** Scroll to a target (e.g. "#projects"); prevents default only when smooth scrolling is active. */
  scrollTo: (target: string, event?: Event) => void;
}

const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);

export function useSmoothScroll(): SmoothScrollApi | null {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotionPref();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion: no smooth scroll, native scrolling only.
    if (reduced) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const api = useMemo<SmoothScrollApi>(
    () => ({
      scrollTo: (target, event) => {
        const lenis = lenisRef.current;
        if (!lenis) return; // reduced motion / not ready: let native anchor handle it
        event?.preventDefault();
        lenis.scrollTo(target, { offset: -72 });
        if (typeof history !== "undefined") {
          history.replaceState(null, "", target);
        }
      },
    }),
    [],
  );

  return (
    <SmoothScrollContext.Provider value={api}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
