"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { MotionConfig } from "framer-motion";

const ReducedMotionContext = createContext(false);

/** Boolean: does the user prefer reduced motion? Safe default is `false`. */
export function useReducedMotionPref(): boolean {
  return useContext(ReducedMotionContext);
}

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * App-root provider. Exposes the reduced-motion preference via context (for
 * logic like "should we mount the 3D canvas") and wires framer-motion's
 * MotionConfig so every animation respects the OS setting.
 *
 * Uses useSyncExternalStore so the value is SSR-safe (false on the server),
 * hydration-safe, and updates live when the OS preference changes.
 */
export function ReducedMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <ReducedMotionContext.Provider value={reduced}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReducedMotionContext.Provider>
  );
}
