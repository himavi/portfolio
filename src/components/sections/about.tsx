import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="About me">
      <Reveal>
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted">
          <p>
            Hi, I&apos;m{" "}
            <span className="font-semibold text-fg">Himanshu Kumar Singh</span>.
            I&apos;m a Full Stack and AI/ML Engineer who enjoys turning
            ambitious ideas into products that actually work in production. I
            move across the entire stack: system design, model training, API
            development, and building interfaces people enjoy using.
          </p>
          <p>
            My work sits where machine learning meets software engineering.
            Whether it&apos;s an LLM powered web tool, an automated security
            agent, or a real time exam platform, I care about reliability,
            performance, and clean user experiences.
          </p>
          <p>
            I&apos;m actively looking for roles where I can take ownership of
            hard problems from start to finish, ideally at a team that moves
            fast and values both research depth and engineering quality.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
