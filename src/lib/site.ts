export const siteConfig = {
  name: "Himanshu Kumar Singh",
  shortName: "HKS",
  role: "Full Stack & AI/ML Engineer",
  valueProp:
    "I build end-to-end intelligent systems — production ML pipelines, full-stack web applications, and everything in between.",
  url: "https://example.com",
  email: "himakumarsingh@gmail.com",
  socials: {
    github: "https://github.com/himavi",
    linkedin: "https://www.linkedin.com/in/himakumarsingh",
  },
  resumeHref: "/resume.pdf",
} as const;

export interface NavSection {
  id: string;
  label: string;
}

export const navSections: NavSection[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
