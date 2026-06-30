import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";

const groups = [
  { label: "Languages", items: ["Python", "TypeScript", "SQL", "C++"] },
  {
    label: "ML / DL",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face"],
  },
  { label: "MLOps", items: ["Docker", "Kubernetes", "MLflow", "W&B"] },
  { label: "Platform", items: ["AWS", "FastAPI", "PostgreSQL", "Ray"] },
];

export function Skills() {
  return (
    <Section id="skills" eyebrow="02 — Stack" title="Skills & tooling">
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
