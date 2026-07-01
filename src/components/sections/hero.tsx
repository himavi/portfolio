import { Reveal, TextReveal } from "@/components/motion/reveal";
import { HeroWordGrid } from "@/components/hero-word-grid";
import { SmoothLink } from "@/components/smooth-link";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6"
    >
      <HeroWordGrid />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center [text-shadow:0_2px_24px_rgb(2_6_12_/_0.7)]">
        <Reveal immediate>
          <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
            {siteConfig.role}
          </p>
        </Reveal>

        <h1 className="mt-5 font-display text-5xl leading-[1.05] font-semibold tracking-tight text-white sm:text-7xl">
          <TextReveal immediate>{siteConfig.name}</TextReveal>
        </h1>

        <Reveal immediate delay={0.15}>
          <p className="mt-6 max-w-xl text-lg text-balance text-zinc-200 sm:text-xl">
            {siteConfig.valueProp}
          </p>
        </Reveal>

        <Reveal immediate delay={0.25}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <SmoothLink
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              View Work
            </SmoothLink>
          </div>
        </Reveal>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-muted uppercase"
      >
        Scroll
      </div>
    </section>
  );
}
