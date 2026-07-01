import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title?: string;
  eyebrow?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

/**
 * Standard content section: capped width, generous padding, scroll-margin so
 * sticky-nav anchor jumps land correctly, and an accessible labelled heading.
 */
export function Section({
  id,
  title,
  eyebrow,
  className,
  containerClassName,
  children,
}: SectionProps) {
  const headingId = title ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-24 border-t border-border/60", className)}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-4 py-16 sm:px-8 sm:py-24 lg:py-32",
          containerClassName,
        )}
      >
        {(eyebrow || title) && (
          <header className="mb-12 max-w-2xl sm:mb-16">
            {eyebrow && (
              <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={headingId}
                className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
              >
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
