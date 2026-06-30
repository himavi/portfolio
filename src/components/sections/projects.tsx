import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";

const placeholderProjects = [
  {
    title: "Project One",
    summary:
      "[Placeholder] A short outcome-focused summary of an ML project — the problem, the approach, and the result.",
    tags: ["NLP", "PyTorch"],
  },
  {
    title: "Project Two",
    summary:
      "[Placeholder] Real projects (including your ExamSense and web-penetration work) get pulled in during Phase C.",
    tags: ["Computer Vision", "ONNX"],
  },
  {
    title: "Project Three",
    summary:
      "[Placeholder] Card grid with tag filtering and a problem → approach → results detail view arrives in Phase C.",
    tags: ["LLM", "RAG"],
  },
];

export function Projects() {
  return (
    <Section id="projects" eyebrow="03 — Work" title="Selected projects">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderProjects.map((project, index) => (
          <li key={project.title}>
            <Reveal delay={index * 0.05}>
              <article className="h-full rounded-2xl border border-border bg-surface/50 p-6 transition-colors hover:border-accent/50">
                <h3 className="font-display text-lg font-semibold text-fg">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.summary}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-muted">
        Placeholder content — full case studies, filtering, and detail views
        arrive in Phase C.
      </p>
    </Section>
  );
}
