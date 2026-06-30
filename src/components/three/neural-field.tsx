"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  Color,
  type Group,
  type IUniform,
  MathUtils,
  type ShaderMaterial,
  Vector2,
} from "three";
import { createNeuralGeometry } from "@/lib/particles";
import type { DeviceTier } from "@/lib/device-tier";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uSize;
  attribute float aScale;
  attribute float aPhase;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    float t = uTime * 0.2;
    p.x += sin(t + aPhase) * 0.18;
    p.y += cos(t * 1.1 + aPhase) * 0.18;
    p.z += sin(t * 0.7 + aPhase * 1.3) * 0.18;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    mv.xy += uPointer * 0.25 * aScale;

    gl_Position = projectionMatrix * mv;
    gl_PointSize = max(1.0, uSize * aScale / -mv.z);

    // depth-based fade reads as subtle fog
    vAlpha = smoothstep(15.0, 4.0, -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float alpha = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, alpha * vAlpha * 0.5);
  }
`;

export function NeuralField({ tier }: { tier: DeviceTier }) {
  const groupRef = useRef<Group>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  const { positions, scales, phases, synapses } = useMemo(
    () => createNeuralGeometry(tier),
    [tier],
  );

  const uniforms = useMemo<Record<string, IUniform>>(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new Vector2(0, 0) },
      uColor: { value: new Color("#5cc8ff") },
      uSize: { value: 18 },
    }),
    [],
  );

  useFrame((state, delta) => {
    // useFrame runs outside React render; mutating via refs is the R3F pattern.
    const material = materialRef.current;
    if (material) {
      material.uniforms.uTime.value += delta;
      (material.uniforms.uPointer.value as Vector2).lerp(state.pointer, 0.04);
    }

    const group = groupRef.current;
    if (group) {
      group.rotation.y += delta * 0.025;
      group.rotation.x = MathUtils.lerp(
        group.rotation.x,
        state.pointer.y * 0.18,
        0.04,
      );
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[synapses, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#5cc8ff"
          transparent
          opacity={0.1}
          depthWrite={false}
          fog={false}
          blending={AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
