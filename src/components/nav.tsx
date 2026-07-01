"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navSections, siteConfig } from "@/lib/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { useReducedMotionPref } from "@/components/providers/reduced-motion-provider";
import { SmoothLink } from "@/components/smooth-link";
import { cn } from "@/lib/utils";

export function Nav() {
  const sectionIds = useMemo(() => navSections.map((s) => s.id), []);
  const active = useActiveSection(sectionIds);
  const reduced = useReducedMotionPref();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8"
      >
        <SmoothLink
          href="#hero"
          className="font-display text-sm font-semibold tracking-tight text-fg"
        >
          {siteConfig.shortName}
          <span className="sr-only"> — {siteConfig.name}, back to top</span>
        </SmoothLink>

        <ul className="hidden items-center gap-8 md:flex">
          {navSections.map((s) => (
            <li key={s.id}>
              <SmoothLink
                href={`#${s.id}`}
                aria-current={active === s.id ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors hover:text-fg",
                  active === s.id ? "text-fg" : "text-muted",
                )}
              >
                {s.label}
              </SmoothLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.resumeHref}
            className="hidden rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent md:inline-flex"
          >
            Resume
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg transition-colors hover:bg-surface md:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              {open ? (
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-md md:hidden"
          >
            <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4">
              {navSections.map((s) => (
                <li key={s.id}>
                  <SmoothLink
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === s.id ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-2 py-2 text-base transition-colors hover:bg-surface",
                      active === s.id ? "text-fg" : "text-muted",
                    )}
                  >
                    {s.label}
                  </SmoothLink>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.resumeHref}
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-md px-2 py-2 text-base font-medium text-accent"
                >
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
