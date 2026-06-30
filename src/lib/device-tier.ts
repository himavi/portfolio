export type DeviceTier = "high" | "medium" | "low";

export interface DeviceSignals {
  /** navigator.hardwareConcurrency (logical CPU cores), if available. */
  hardwareConcurrency?: number;
  /** navigator.deviceMemory in GB, if available. */
  deviceMemory?: number;
  /** Whether the device looks like a phone/tablet (coarse pointer + narrow). */
  isMobile: boolean;
  /** Whether a WebGL context could be created. */
  hasWebGL: boolean;
}

/**
 * Pure capability classifier. Reduced-motion is intentionally NOT considered
 * here — that is a separate axis handled by the consumer when deciding whether
 * to mount heavy 3D. Keeping this pure makes it trivial to unit test.
 */
export function computeDeviceTier(signals: DeviceSignals): DeviceTier {
  const { hardwareConcurrency, deviceMemory, isMobile, hasWebGL } = signals;

  // No WebGL means the heavy particle field can never run.
  if (!hasWebGL) return "low";

  // Conservative fallbacks when the browser hides these signals.
  const cores = hardwareConcurrency ?? (isMobile ? 4 : 8);
  const memory = deviceMemory ?? (isMobile ? 4 : 8);

  if (isMobile) {
    return cores >= 8 && memory >= 6 ? "medium" : "low";
  }

  if (cores >= 8 && memory >= 8) return "high";
  if (cores >= 4 && memory >= 4) return "medium";
  return "low";
}
