"use client";

import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor,
  Preload,
} from "@react-three/drei";
import { useState } from "react";
import { NeuralField } from "./neural-field";
import type { DeviceTier } from "@/lib/device-tier";

export default function NeuralScene({ tier }: { tier: DeviceTier }) {
  const [dpr, setDpr] = useState<number>(tier === "high" ? 1.5 : 1);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 6], fov: 62 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <NeuralField tier={tier} />
      <Preload all />
    </Canvas>
  );
}
