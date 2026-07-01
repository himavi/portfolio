import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";

const roles = [
  {
    role: "Full Stack & AI/ML Engineer",
    org: "Freelance / Independent",
    period: "2023 — Present",
    points: [
      "Designed and shipped production web applications integrating LLM-powered features — from architecture through deployment.",
      "Built an autonomous AI penetration-testing agent (Python, Docker, Hugging Face Spaces) capable of identifying web vulnerabilities and generating actionable security reports.",
      "Developed ExamSense, a full-stack exam management platform, handling both frontend UX and backend API design.",
    ],
  },
  {
    role: "AI/ML Project Developer",
    org: "Academic & Open Source",
    period: "2022 — 2023",
    points: [
      "Built RedSeaCatchAI — automated reef fisheries monitoring using YOLOv11-seg and biomass estimation for marine conservation research.",
      "Developed IntelliDocs — an OpenAI-powered PDF Q&A tool with OCR support for scanned documents.",
      "Completed JP Morgan Advanced Software Engineering programme (Forage), contributing to financial data tooling.",
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
                  {role.role}{" "}
                  <span className="text-muted">· {role.org}</span>
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
