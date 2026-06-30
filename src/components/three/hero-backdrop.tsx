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
      {/* Darken behind the hero text for contrast, fade the field into the page. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_42%,color-mix(in_oklab,var(--color-background)_72%,transparent),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
