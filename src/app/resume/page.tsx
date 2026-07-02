import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume — Himanshu Kumar Singh",
  description:
    "Resume of Himanshu Kumar Singh, Full Stack and AI/ML Engineer.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-neutral-200 pt-8">
      <h2 className="mb-5 text-base font-semibold text-neutral-900">{title}</h2>
      {children}
    </section>
  );
}

function Role({
  title,
  org,
  orgHref,
  period,
  location,
  points,
}: {
  title: string;
  org: string;
  orgHref?: string;
  period: string;
  location?: string;
  points?: string[];
}) {
  return (
    <div className="mb-7">
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="text-sm font-semibold text-neutral-800">
          {title}{" "}
          <span className="font-normal text-neutral-500">@</span>{" "}
          {orgHref ? (
            <a
              href={orgHref}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {org}
            </a>
          ) : (
            <span>{org}</span>
          )}
        </p>
        <p className="text-xs text-neutral-400">
          {period}{location ? ` · ${location}` : ""}
        </p>
      </div>
      {points && points.length > 0 && (
        <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed text-neutral-600">
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Project({
  title,
  href,
  stack,
  points,
}: {
  title: string;
  href?: string;
  stack: string;
  points: string[];
}) {
  return (
    <div className="mb-7">
      <p className="text-sm font-semibold text-neutral-800">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
            {title}
          </a>
        ) : (
          title
        )}{" "}
        <span className="font-normal text-neutral-400">| {stack}</span>
      </p>
      <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed text-neutral-600">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white text-neutral-800">
      <div className="mx-auto max-w-2xl px-6 py-12 sm:px-8 sm:py-16">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-neutral-700"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </Link>

        {/* Header */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Himanshu Kumar Singh
            </h1>
            <p className="mt-0.5 text-sm text-neutral-400">Last updated Jun 2026</p>
          </div>
          <div className="text-sm text-neutral-500 sm:text-right">
            <p>
              <a href="mailto:himakumarsingh@gmail.com" className="text-blue-600 hover:underline">
                himakumarsingh@gmail.com
              </a>
            </p>
            <p>8708537434</p>
            <div className="mt-1 flex gap-3 sm:justify-end">
              <a href="https://www.linkedin.com/in/himakumarsingh" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
              <a href="https://github.com/himavi" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">GitHub</a>
            </div>
          </div>
        </div>

        {/* Education */}
        <Section title="Education">
          <div className="space-y-4">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral-800">
                  B.Tech Computer Science and Engineering @{" "}
                  <span className="text-blue-600">Vellore Institute of Technology, Vellore</span>
                </p>
                <p className="mt-0.5 text-sm text-neutral-500">GPA: 8.56 (Current)</p>
              </div>
              <p className="text-xs text-neutral-400">2022 – Present · Vellore, IN</p>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral-800">Higher Secondary (PCM) @ Army Public School</p>
                <p className="mt-0.5 text-sm text-neutral-500">88.0%</p>
              </div>
              <p className="text-xs text-neutral-400">Jun 2022</p>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral-800">Matriculation @ Army Public School</p>
                <p className="mt-0.5 text-sm text-neutral-500">95%</p>
              </div>
              <p className="text-xs text-neutral-400">May 2020</p>
            </div>
          </div>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <div className="space-y-2 text-sm text-neutral-600">
            <p>
              <span className="font-medium text-neutral-800">Programming Languages:</span>{" "}
              Python, HTML, CSS, JavaScript, SQL, LaTeX
            </p>
            <p>
              <span className="font-medium text-neutral-800">Frameworks / Tools:</span>{" "}
              LLMs (GPT, Claude), LangChain, RAG, Prompt Engineering, FAISS, ChromaDB, NLP, FastAPI, REST APIs, Git, Docker, Cloud Deployment
            </p>
            <p>
              <span className="font-medium text-neutral-800">Certifications:</span>{" "}
              AWS Solution Architect – Associate, GenAI Using IBM Watsonx, Oracle AI Vector Search Certified Professional, JPMorgan Chase & Co. Software Job Simulation
            </p>
          </div>
        </Section>

        {/* Experience */}
        <Section title="Experience">
          <Role
            title="Software Engineering Intern"
            org="Jio Platforms Limited"
            period="Dec 2025 – Feb 2026"
            points={[
              "Built a production-grade Ethereum JSON-RPC load balancer with intelligent routing, circuit breaking, and failover mechanisms.",
              "Implemented Redis-based caching and request deduplication to reduce latency and optimize throughput.",
              "Designed health-check systems with automatic provider monitoring and failure recovery.",
              "Integrated observability using Prometheus and Grafana for real-time metrics and alerting.",
            ]}
          />
          <Role
            title="Full Stack Developer Intern"
            org="IIT Jammu"
            period="May 2025 – Jul 2025"
            location="Jammu, IN"
            points={[
              "Built a MERN stack Lost & Found platform used by 500+ students, enabling real-time item reporting, search, and claim tracking.",
              "Improved frontend responsiveness by 40% using React.js and TailwindCSS; developed 12+ RESTful APIs with secure JWT authentication.",
              "Modeled 5+ MongoDB collections, integrated image uploads via Cloudinary, and automated email notifications with a 95% delivery rate.",
              "Collaborated with IIT Jammu mentors and used Git for version control and production deployment.",
            ]}
          />
        </Section>

        {/* Projects */}
        <Section title="Projects">
          <Project
            title="Smart Product Pricing — Amazon ML Challenge 2025"
            stack="Python, PyTorch, ViT, Sentence-T5, Multimodal ML"
            points={[
              "Extracted image embeddings using a Vision Transformer (ViT) to capture visual cues influencing product pricing.",
              "Generated semantic text embeddings from product titles and descriptions using Sentence-T5 for contextual understanding.",
              "Fused multimodal embeddings and trained a final regression layer to predict optimal product prices.",
              "Trained and evaluated the model on 75k labeled products and generated price predictions for 75k unseen samples under strict evaluation constraints.",
            ]}
          />
          <Project
            title="ExamSense — AI-Powered Study Platform"
            href="https://examsense-six.vercel.app"
            stack="Python, React, Node.js, Express, SQLite, Groq LLM"
            points={[
              "Built a full-stack AI learning platform that converts unstructured study notes into structured topics, interactive quizzes, and personalized learning insights.",
              "Integrated LLM-powered content generation to create topic summaries, unique MCQ assessments, and targeted explanations based on student performance.",
              "Designed a modular REST API and normalized database architecture to manage notes, quizzes, progress tracking, and learning analytics.",
              "Implemented performance analytics that identify weak topics and provide AI-generated recommendations to improve concept retention.",
            ]}
          />
          <Project
            title="AI-Powered Penetration Testing Platform"
            href="https://hkfdihjebfvhdfbvgre-ai-pentester.hf.space/"
            stack="Python, FastAPI, React, Docker, AI"
            points={[
              "Built an end-to-end AI-powered vulnerability assessment platform unifying multiple open-source security tools into a single scanning workflow for web applications and source code.",
              "Designed an asynchronous scan orchestration system with real-time progress tracking, standardized vulnerability reporting, and downloadable executive reports.",
              "Integrated LLM-powered explanations to convert technical findings into actionable remediation guidance with offline fallback support.",
              "Deployed a full-stack application with secure authentication, Dockerized infrastructure, and single-container cloud deployment on Hugging Face Spaces.",
            ]}
          />
        </Section>

        {/* Extracurricular */}
        <Section title="Extracurricular Activities">
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>
              <span className="font-medium text-neutral-800">Content Team Lead, BashCraft Club</span>{" "}
              — Headed content creation and coordination for technical club activities and outreach.
            </li>
            <li>
              <span className="font-medium text-neutral-800">Organizing Committee Member, AdVITya</span>{" "}
              (Annual Techno-Cultural Fest) — Managed event logistics and coordination, contributing to the successful execution of a fest with 11,000+ attendees.
            </li>
          </ul>
        </Section>

        {/* Footer */}
        <p className="mt-12 text-xs text-neutral-300">
          Himanshu Kumar Singh · 2026 · Delhi, IN
        </p>

      </div>
    </div>
  );
}
