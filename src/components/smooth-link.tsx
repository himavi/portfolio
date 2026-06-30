"use client";

import type { AnchorHTMLAttributes } from "react";
import { useSmoothScroll } from "@/components/smooth-scroll-provider";

type SmoothLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/**
 * Anchor that routes in-page (#section) clicks through Lenis smooth scroll when
 * active, and falls back to native anchor behavior under reduced motion.
 */
export function SmoothLink({
  href,
  onClick,
  children,
  ...rest
}: SmoothLinkProps) {
  const smooth = useSmoothScroll();

  return (
    <a
      href={href}
      onClick={(event) => {
        if (href.startsWith("#")) {
          smooth?.scrollTo(href, event.nativeEvent);
        }
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
