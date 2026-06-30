"use client";

import { useSyncExternalStore } from "react";
import { computeDeviceTier, type DeviceTier } from "@/lib/device-tier";

function hasWebGLSupport(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return (
      typeof WebGLRenderingContext !== "undefined" &&
      Boolean(
        canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl"),
      )
    );
  } catch {
    return false;
  }
}

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 768px)").matches;
  return coarse && narrow;
}

// Capability is fixed for the session, so compute once and cache.
let cachedTier: DeviceTier | null = null;

function getSnapshot(): DeviceTier {
  if (cachedTier === null) {
    const nav = navigator as Navigator & { deviceMemory?: number };
    cachedTier = computeDeviceTier({
      hardwareConcurrency: nav.hardwareConcurrency,
      deviceMemory: nav.deviceMemory,
      isMobile: isMobileDevice(),
      hasWebGL: hasWebGLSupport(),
    });
  }
  return cachedTier;
}

function getServerSnapshot(): DeviceTier {
  return "low";
}

// Device capability does not change during a session: no-op subscription.
function subscribe(): () => void {
  return () => {};
}

/**
 * Detects a device-capability tier on the client. Returns a conservative
 * "low" during SSR/hydration, then the measured tier afterwards.
 */
export function useDeviceTier(): DeviceTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
