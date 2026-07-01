import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";

export function About() {
  return (
    <Section id="about" eyebrow="01 — About" title="About me">
      <Reveal>
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted">
          <p>
            Hi, I&apos;m{" "}
            <span className="font-semibold text-fg">Himanshu Kumar Singh</span>{" "}
            — a Full Stack and AI/ML Engineer who loves turning ambitious ideas
            into polished, production-ready products. I work across the entire
            stack: designing systems, training models, building APIs, and
            shipping interfaces that people actually enjoy using.
          </p>
          <p>
            My work sits at the intersection of machine learning and software
            engineering. Whether it&apos;s an LLM-powered web tool, an
            automated red-team security agent, or a real-time exam platform, I
            care deeply about reliability, performance, and clean user
            experiences.
          </p>
          <p>
            I&apos;m actively looking for roles where I can own challenging
            problems end-to-end — ideally at a team that moves fast and values
            both research depth and engineering craft.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
