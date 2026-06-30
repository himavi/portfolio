import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";

export function About() {
  return (
    <Section id="about" eyebrow="01 — About" title="About">
      <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:gap-14">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              [Placeholder bio] I&apos;m an AI/ML engineer focused on turning
              research into reliable, production-grade systems — model training,
              evaluation, and the serving infrastructure around it.
            </p>
            <p>
              [Placeholder bio] I care about measurable outcomes, clean
              interfaces, and experiences that feel fast and considered. Real
              copy lands in Phase C.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="space-y-3">
            <div
              className="flex aspect-square w-full items-center justify-center rounded-2xl border border-border bg-surface text-sm text-muted"
              role="img"
              aria-label="Portrait placeholder"
            >
              Portrait
            </div>
            <figcaption className="text-xs text-muted">
              Portrait placeholder — swap in a real photo in Phase C.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
