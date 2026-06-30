import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

vi.mock("lenis", () => ({
  default: vi.fn(function LenisMock() {
    return { raf: vi.fn(), destroy: vi.fn(), scrollTo: vi.fn() };
  }),
}));
vi.mock("@/components/providers/reduced-motion-provider", () => ({
  useReducedMotionPref: vi.fn(),
}));

import Lenis from "lenis";
import { useReducedMotionPref } from "@/components/providers/reduced-motion-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

const LenisMock = vi.mocked(Lenis);
const reducedMock = vi.mocked(useReducedMotionPref);

beforeEach(() => {
  LenisMock.mockClear();
});

describe("SmoothScrollProvider", () => {
  it("initializes Lenis when motion is allowed", () => {
    reducedMock.mockReturnValue(false);
    render(
      <SmoothScrollProvider>
        <div />
      </SmoothScrollProvider>,
    );
    expect(LenisMock).toHaveBeenCalledTimes(1);
  });

  it("does not initialize Lenis under reduced motion", () => {
    reducedMock.mockReturnValue(true);
    render(
      <SmoothScrollProvider>
        <div />
      </SmoothScrollProvider>,
    );
    expect(LenisMock).not.toHaveBeenCalled();
  });
});
