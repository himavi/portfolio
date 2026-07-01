import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";

const groups = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "HTML/CSS"],
  },
  {
    label: "AI / ML",
    items: [
      "PyTorch",
      "Hugging Face",
      "LangChain",
      "OpenAI API",
      "scikit-learn",
      "YOLO",
    ],
  },
  {
    label: "Full Stack",
    items: ["Next.js", "React", "Node.js", "FastAPI", "REST APIs", "MongoDB"],
  },
  {
    label: "DevOps & Cloud",
    items: ["Docker", "Vercel", "Hugging Face Spaces", "Git", "Linux"],
  },
];

export function Skills() {
  return (
    <Section id="skills" eyebrow="Stack" title="Skills & tooling">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group, index) => (
          <Reveal key={group.label} delay={index * 0.05}>
            <h3 className="font-display text-sm font-semibold tracking-wide text-fg">
              {group.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
