import type { DeviceTier } from "@/lib/device-tier";

/**
 * Particle count for the neural field, scaled by device tier. Capable devices
 * sit in the 20k–50k band; low tier returns a small value but is never mounted.
 */
export function particleCountForTier(tier: DeviceTier): number {
  switch (tier) {
    case "high":
      return 42000;
    case "medium":
      return 20000;
    case "low":
    default:
      return 8000;
  }
}

/** Whether the live WebGL neural field should mount (vs. the static poster). */
export function shouldRenderNeuralField(
  tier: DeviceTier,
  prefersReducedMotion: boolean,
): boolean {
  return !prefersReducedMotion && tier !== "low";
}

/**
 * Build a sparse set of "synapse" line segments by connecting nearby nodes.
 * Returns a flat Float32Array of vertex pairs: [ax,ay,az, bx,by,bz, ...].
 */
export function buildSynapses(
  positions: Float32Array,
  nodeCount: number,
  maxLines: number,
  maxDistance: number,
): Float32Array {
  const segments: number[] = [];
  const maxDistSq = maxDistance * maxDistance;
  const ceiling = Math.min(nodeCount, 4000); // cap scan range for perf
  let lines = 0;

  for (let attempt = 0; attempt < maxLines * 8 && lines < maxLines; attempt++) {
    const a = Math.floor(Math.random() * ceiling);
    const b = Math.floor(Math.random() * ceiling);
    if (a === b) continue;

    const ax = positions[a * 3];
    const ay = positions[a * 3 + 1];
    const az = positions[a * 3 + 2];
    const bx = positions[b * 3];
    const by = positions[b * 3 + 1];
    const bz = positions[b * 3 + 2];

    const dx = ax - bx;
    const dy = ay - by;
    const dz = az - bz;
    if (dx * dx + dy * dy + dz * dz > maxDistSq) continue;

    segments.push(ax, ay, az, bx, by, bz);
    lines++;
  }

  return new Float32Array(segments);
}

export interface NeuralGeometry {
  positions: Float32Array;
  scales: Float32Array;
  phases: Float32Array;
  synapses: Float32Array;
}

/**
 * Generate the neural field's buffer data for a tier. Lives outside the React
 * component so its (intentional) Math.random use stays out of render purity.
 */
export function createNeuralGeometry(tier: DeviceTier): NeuralGeometry {
  const count = particleCountForTier(tier);
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const r = 5 * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.65;
    positions[i * 3 + 2] = r * Math.cos(phi);
    scales[i] = 0.5 + Math.random() * 1.6;
    phases[i] = Math.random() * Math.PI * 2;
  }

  const synapses = buildSynapses(
    positions,
    count,
    tier === "high" ? 900 : 500,
    0.9,
  );

  return { positions, scales, phases, synapses };
}
