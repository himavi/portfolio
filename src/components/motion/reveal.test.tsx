import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal, TextReveal } from "@/components/motion/reveal";
import { useReducedMotionPref } from "@/components/providers/reduced-motion-provider";

vi.mock("@/components/providers/reduced-motion-provider", () => ({
  useReducedMotionPref: vi.fn(),
}));

const mockPref = vi.mocked(useReducedMotionPref);

describe("Reveal", () => {
  it("renders children when motion is allowed", () => {
    mockPref.mockReturnValue(false);
    render(
      <Reveal>
        <p>Visible content</p>
      </Reveal>,
    );
    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });

  it("renders children statically under reduced motion", () => {
    mockPref.mockReturnValue(true);
    render(
      <Reveal>
        <p>Reduced content</p>
      </Reveal>,
    );
    expect(screen.getByText("Reduced content")).toBeInTheDocument();
  });
});

describe("TextReveal", () => {
  it("renders its text in both motion modes", () => {
    mockPref.mockReturnValue(false);
    const { rerender } = render(<TextReveal>Headline</TextReveal>);
    expect(screen.getByText("Headline")).toBeInTheDocument();

    mockPref.mockReturnValue(true);
    rerender(<TextReveal>Headline</TextReveal>);
    expect(screen.getByText("Headline")).toBeInTheDocument();
  });
});
