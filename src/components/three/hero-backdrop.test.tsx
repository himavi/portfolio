import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Stub the dynamically imported canvas so three.js never loads in jsdom.
vi.mock("next/dynamic", () => ({
  default: () => {
    function NeuralSceneStub() {
      return <div data-testid="neural-scene" />;
    }
    return NeuralSceneStub;
  },
}));
vi.mock("@/hooks/use-device-tier", () => ({ useDeviceTier: vi.fn() }));
vi.mock("@/components/providers/reduced-motion-provider", () => ({
  useReducedMotionPref: vi.fn(),
}));

import { HeroBackdrop } from "@/components/three/hero-backdrop";
import { useDeviceTier } from "@/hooks/use-device-tier";
import { useReducedMotionPref } from "@/components/providers/reduced-motion-provider";

const tierMock = vi.mocked(useDeviceTier);
const reducedMock = vi.mocked(useReducedMotionPref);

describe("HeroBackdrop", () => {
  it("mounts the canvas on high tier with motion allowed", () => {
    tierMock.mockReturnValue("high");
    reducedMock.mockReturnValue(false);
    render(<HeroBackdrop />);
    expect(screen.getByTestId("neural-scene")).toBeInTheDocument();
    expect(screen.queryByTestId("hero-poster")).not.toBeInTheDocument();
  });

  it("shows the static poster (no canvas) on low tier", () => {
    tierMock.mockReturnValue("low");
    reducedMock.mockReturnValue(false);
    render(<HeroBackdrop />);
    expect(screen.getByTestId("hero-poster")).toBeInTheDocument();
    expect(screen.queryByTestId("neural-scene")).not.toBeInTheDocument();
  });

  it("shows the static poster (no canvas) under reduced motion", () => {
    tierMock.mockReturnValue("high");
    reducedMock.mockReturnValue(true);
    render(<HeroBackdrop />);
    expect(screen.getByTestId("hero-poster")).toBeInTheDocument();
    expect(screen.queryByTestId("neural-scene")).not.toBeInTheDocument();
  });
});
