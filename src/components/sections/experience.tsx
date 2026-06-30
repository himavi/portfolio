import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";

const roles = [
  {
    role: "Senior ML Engineer",
    org: "[Company]",
    period: "2023 — Present",
    points: [
      "[Placeholder] Led model training and evaluation for a production NLP system.",
      "[Placeholder] Owned the serving stack and cut p95 inference latency.",
    ],
  },
  {
    role: "Machine Learning Engineer",
    org: "[Company]",
    period: "2021 — 2023",
    points: [
      "[Placeholder] Built data and training pipelines from the ground up.",
      "[Placeholder] Shipped experiments to production with monitoring.",
    ],
  },
];

export function Experience() {
  return (
    <Section id="experience" eyebrow="04 — Path" title="Experience">
      <ol className="relative space-y-10 border-l border-border pl-6">
        {roles.map((role, index) => (
          <li key={`${role.role}-${role.period}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[27px] h-2.5 w-2.5 rounded-full border border-accent bg-background"
            />
            <Reveal delay={index * 0.05}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-lg font-semibold text-fg">
                  {role.role} <span className="text-muted">· {role.org}</span>
                </h3>
                <p className="font-mono text-xs tracking-wide text-muted">
                  {role.period}
                </p>
              </div>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted marker:text-accent">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
