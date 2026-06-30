import { describe, expect, it } from "vitest";
import { computeDeviceTier } from "@/lib/device-tier";

describe("computeDeviceTier", () => {
  it("returns low when WebGL is unavailable, regardless of specs", () => {
    expect(
      computeDeviceTier({
        hardwareConcurrency: 16,
        deviceMemory: 32,
        isMobile: false,
        hasWebGL: false,
      }),
    ).toBe("low");
  });

  it("returns high for a powerful desktop", () => {
    expect(
      computeDeviceTier({
        hardwareConcurrency: 12,
        deviceMemory: 16,
        isMobile: false,
        hasWebGL: true,
      }),
    ).toBe("high");
  });

  it("returns medium for a mid-range desktop", () => {
    expect(
      computeDeviceTier({
        hardwareConcurrency: 4,
        deviceMemory: 8,
        isMobile: false,
        hasWebGL: true,
      }),
    ).toBe("medium");
  });

  it("returns low for a weak desktop", () => {
    expect(
      computeDeviceTier({
        hardwareConcurrency: 2,
        deviceMemory: 2,
        isMobile: false,
        hasWebGL: true,
      }),
    ).toBe("low");
  });

  it("caps a high-end phone at medium", () => {
    expect(
      computeDeviceTier({
        hardwareConcurrency: 8,
        deviceMemory: 8,
        isMobile: true,
        hasWebGL: true,
      }),
    ).toBe("medium");
  });

  it("returns low for a modest phone", () => {
    expect(
      computeDeviceTier({
        hardwareConcurrency: 6,
        deviceMemory: 4,
        isMobile: true,
        hasWebGL: true,
      }),
    ).toBe("low");
  });

  it("uses conservative fallbacks when cores/memory are hidden", () => {
    expect(computeDeviceTier({ isMobile: false, hasWebGL: true })).toBe("high");
    expect(computeDeviceTier({ isMobile: true, hasWebGL: true })).toBe("low");
  });
});
