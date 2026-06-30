"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotionPref } from "@/components/providers/reduced-motion-provider";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Fade + rise into view on scroll. Renders statically under reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: RevealProps) {
  const reduced = useReducedMotionPref();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Mask slide-up reveal for headings. The text stays a single real text node
 * (good for screen readers); only its transform animates. No-ops under
 * reduced motion.
 */
export function TextReveal({
  children,
  className,
  delay = 0,
}: TextRevealProps) {
  const reduced = useReducedMotionPref();

  if (reduced) {
    return <span className={cn("inline-block", className)}>{children}</span>;
  }

  return (
    <span className={cn("inline-block overflow-hidden pb-[0.1em]", className)}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
