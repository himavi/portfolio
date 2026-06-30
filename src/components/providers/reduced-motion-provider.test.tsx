import { describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import {
  ReducedMotionProvider,
  useReducedMotionPref,
} from "@/components/providers/reduced-motion-provider";

function Probe() {
  const reduced = useReducedMotionPref();
  return <span data-testid="pref">{reduced ? "reduced" : "full"}</span>;
}

function mockMatchMedia(initialMatches: boolean) {
  let changeHandler: ((event: MediaQueryListEvent) => void) | null = null;

  const mql = {
    matches: initialMatches,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: (
      _type: string,
      listener: (event: MediaQueryListEvent) => void,
    ) => {
      changeHandler = listener;
    },
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList;

  window.matchMedia = vi.fn(() => mql) as unknown as typeof window.matchMedia;

  return {
    flip(next: boolean) {
      (mql as { matches: boolean }).matches = next;
      changeHandler?.({ matches: next } as MediaQueryListEvent);
    },
  };
}

describe("ReducedMotionProvider", () => {
  it("exposes the initial reduced-motion preference after mount", () => {
    mockMatchMedia(true);
    render(
      <ReducedMotionProvider>
        <Probe />
      </ReducedMotionProvider>,
    );
    expect(screen.getByTestId("pref")).toHaveTextContent("reduced");
  });

  it("flips when the media query changes", () => {
    const media = mockMatchMedia(false);
    render(
      <ReducedMotionProvider>
        <Probe />
      </ReducedMotionProvider>,
    );
    expect(screen.getByTestId("pref")).toHaveTextContent("full");

    act(() => media.flip(true));
    expect(screen.getByTestId("pref")).toHaveTextContent("reduced");
  });
});
