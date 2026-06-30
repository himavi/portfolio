export const siteConfig = {
  name: "Himanshu Kumar Singh",
  shortName: "HKS",
  role: "AI/ML Engineer",
  valueProp:
    "I design and ship machine-learning systems — from research notebooks to production inference at scale.",
  // TODO(user): set to the real Vercel/custom domain once deployed.
  url: "https://example.com",
  // TODO(user): replace with a real, monitored inbox before launch.
  email: "hello@example.com",
  socials: {
    github: "https://github.com/himavi",
    // TODO(user): replace with your real LinkedIn handle.
    linkedin: "https://www.linkedin.com/in/your-handle",
  },
  // TODO(user): add public/resume.pdf (or update this path).
  resumeHref: "/resume.pdf",
} as const;

export interface NavSection {
  id: string;
  label: string;
}

/** Sections that appear in the nav and drive scroll-spy / scroll-to. */
export const navSections: NavSection[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
