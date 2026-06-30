"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of the section currently most in view, using a
 * single IntersectionObserver. `sectionIds` is reduced to a stable string key
 * so the effect only re-runs when the set of ids actually changes.
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = sectionIds.join(",");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const ids = key.split(",").filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [key]);

  return activeId;
}
