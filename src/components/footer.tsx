import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-xs text-muted">
          © {year} {siteConfig.name}
        </p>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
        >
          <a
            className="text-muted transition-colors hover:text-fg"
            href={siteConfig.socials.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="text-muted transition-colors hover:text-fg"
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="text-muted transition-colors hover:text-fg"
            href={`mailto:${siteConfig.email}`}
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
