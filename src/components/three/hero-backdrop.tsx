"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useReducedMotionPref } from "@/components/providers/reduced-motion-provider";
import { useDeviceTier } from "@/hooks/use-device-tier";
import { shouldRenderNeuralField } from "@/lib/particles";
import { HeroPoster } from "./hero-poster";

// ssr:false keeps three.js out of the server bundle and initial HTML.
const NeuralScene = dynamic(() => import("./neural-scene"), { ssr: false });

export function HeroBackdrop() {
  const tier = useDeviceTier();
  const reduced = useReducedMotionPref();
  const enabled = shouldRenderNeuralField(tier, reduced);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {enabled ? (
        <Suspense fallback={<HeroPoster />}>
          <NeuralScene tier={tier} />
        </Suspense>
      ) : (
        <HeroPoster />
      )}
      {/* Contrast scrim so hero text stays legible over the field. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,var(--color-background)_82%)]" />
    </div>
  );
}
