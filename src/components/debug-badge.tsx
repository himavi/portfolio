"use client";

import { useReducedMotionPref } from "@/components/providers/reduced-motion-provider";
import { useDeviceTier } from "@/hooks/use-device-tier";

/**
 * Reads device tier and motion preference so the values are available in the
 * React tree (for future logic / analytics) but renders nothing visible.
 */
export function DebugBadge() {
  // Consume both hooks to keep them warm in the component tree.
  useDeviceTier();
  useReducedMotionPref();
  return null;
}
