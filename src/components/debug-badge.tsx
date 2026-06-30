"use client";

import { useReducedMotionPref } from "@/components/providers/reduced-motion-provider";
import { useDeviceTier } from "@/hooks/use-device-tier";
import type { DeviceTier } from "@/lib/device-tier";

const tierColor: Record<DeviceTier, string> = {
  high: "text-emerald-400",
  medium: "text-amber-400",
  low: "text-rose-400",
};

/**
 * TEMPORARY (Checkpoint A): shows the detected device tier + motion preference.
 * Will be removed or gated to development in a later phase.
 */
export function DebugBadge() {
  const tier = useDeviceTier();
  const reduced = useReducedMotionPref();

  return (
    <div
      aria-hidden="true"
      className="fixed right-3 bottom-3 z-50 rounded-md border border-border/70 bg-surface/80 px-3 py-2 font-mono text-[11px] leading-tight text-muted backdrop-blur"
    >
      <div>
        tier: <span className={tierColor[tier]}>{tier}</span>
      </div>
      <div>
        motion:{" "}
        <span className={reduced ? "text-rose-400" : "text-emerald-400"}>
          {reduced ? "reduced" : "full"}
        </span>
      </div>
    </div>
  );
}
