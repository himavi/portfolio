import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";

const projects: {
  title: string;
  subtitle?: string;
  summary: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  credentials?: { user: string; pass: string };
}[] = [
  {
    title: "ExamSense",
    summary:
      "A full stack exam management platform for educators. Create, schedule, and auto grade assessments with a RAG powered assistant that answers student queries from course material in real time. Built with a React frontend, Node.js and Express backend, and MongoDB.",
    tags: ["React", "Node.js", "MongoDB", "RAG", "REST API"],
    liveUrl: "https://examsense-six.vercel.app",
    githubUrl: "https://github.com/himavi/examsense",
  },
  {
    title: "Smart Product Pricing",
    subtitle: "Amazon ML Challenge 2025",
    summary:
      "Multimodal ML system for optimal product price prediction. Extracted image embeddings using a Vision Transformer (ViT) for visual pricing cues, generated semantic text embeddings from product titles and descriptions using Sentence T5, then fused both modalities and trained a regression layer. Trained and evaluated on 75k labeled products with price predictions generated for 75k unseen samples under strict evaluation constraints.",
    tags: ["Python", "ViT", "Sentence-T5", "Multimodal ML", "PyTorch"],
    liveUrl: null,
    githubUrl: null,
  },
  {
    title: "AI Web Penetration Tester",
    summary:
      "An autonomous red team agent that runs seven security engines including OWASP ZAP, Nuclei, sqlmap, Nikto and Semgrep against a target. It merges all findings into one unified report and generates plain language explanations and fix suggestions using Groq and Gemini. Runs as a single Docker container on Hugging Face Spaces.",
    tags: ["Python", "FastAPI", "LLM", "OWASP ZAP", "Docker"],
    liveUrl: "https://hkfdihjebfvhdfbvgre-ai-pentester.hf.space/",
    githubUrl: "https://github.com/himavi/webpenetration",
    credentials: { user: "recruiter", pass: "4n57wrlc9cVG" },
  },
];

function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function Projects() {
  return (
    <Section id="projects" eyebrow="Work" title="Selected work">
      <ul className="grid gap-6 sm:grid-cols-2 sm:gap-8">
        {projects.map((project, index) => (
          <li key={project.title}>
            <Reveal delay={index * 0.08}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface/50 p-5 transition-colors hover:border-accent/60 sm:p-7">
                <div>
                  <h3 className="font-display text-xl font-semibold text-fg">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="mt-0.5 font-mono text-xs text-muted">
                      {project.subtitle}
                    </p>
                  )}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  {project.summary}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
                    >
                      Live demo <ExternalIcon />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
                    >
                      GitHub <GithubIcon />
                    </a>
                  )}
                </div>
                {project.credentials && (
                  <div className="mt-4 rounded-lg border border-border bg-background px-4 py-3 font-mono text-xs text-muted">
                    <span className="mb-1 block font-sans text-[11px] uppercase tracking-wider text-muted/70">
                      Demo credentials
                    </span>
                    <span className="text-fg">
                      {project.credentials.user}
                    </span>
                    <span className="mx-1.5 text-border">/</span>
                    <span className="text-fg">
                      {project.credentials.pass}
                    </span>
                  </div>
                )}
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
