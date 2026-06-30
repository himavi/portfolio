/**
 * Static neural backdrop shown on low-tier devices and under reduced motion.
 * Decorative only — the hero text content is identical to the live-canvas path.
 */
export function HeroPoster() {
  return (
    <div
      data-testid="hero-poster"
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-accent)_22%,transparent),transparent_62%)] blur-3xl" />
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="neural-dots"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="var(--color-accent)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural-dots)" />
      </svg>
    </div>
  );
}
