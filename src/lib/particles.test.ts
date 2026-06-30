import { describe, expect, it } from "vitest";
import {
  buildSynapses,
  particleCountForTier,
  shouldRenderNeuralField,
} from "@/lib/particles";

describe("particleCountForTier", () => {
  it("scales high > medium > low", () => {
    expect(particleCountForTier("high")).toBeGreaterThan(
      particleCountForTier("medium"),
    );
    expect(particleCountForTier("medium")).toBeGreaterThan(
      particleCountForTier("low"),
    );
  });

  it("keeps the high tier within the 20k-50k band", () => {
    const count = particleCountForTier("high");
    expect(count).toBeGreaterThanOrEqual(20000);
    expect(count).toBeLessThanOrEqual(50000);
  });
});

describe("shouldRenderNeuralField", () => {
  it("does not render on low tier", () => {
    expect(shouldRenderNeuralField("low", false)).toBe(false);
  });

  it("does not render under reduced motion, even on high tier", () => {
    expect(shouldRenderNeuralField("high", true)).toBe(false);
  });

  it("renders on medium and high tiers with motion allowed", () => {
    expect(shouldRenderNeuralField("medium", false)).toBe(true);
    expect(shouldRenderNeuralField("high", false)).toBe(true);
  });
});

describe("buildSynapses", () => {
  it("returns vertex pairs (multiple of 6) within the requested cap", () => {
    const positions = new Float32Array(300 * 3);
    for (let i = 0; i < positions.length; i++) {
      positions[i] = Math.random() * 0.2; // tight cluster -> many valid pairs
    }

    const out = buildSynapses(positions, 300, 100, 1);
    expect(out.length % 6).toBe(0);
    expect(out.length / 6).toBeLessThanOrEqual(100);
  });
});
