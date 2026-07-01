import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { siteConfig } from "@/lib/site";

export function Contact() {
  return (
    <Section id="contact" eyebrow="05 — Contact" title="Let's talk">
      <Reveal>
        <div className="max-w-xl">
          <p className="text-lg leading-relaxed text-muted">
            I&apos;m actively looking for full-stack and AI/ML engineering
            roles. If you&apos;re building something ambitious and want someone
            who can own it end-to-end — let&apos;s talk.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Email me
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
