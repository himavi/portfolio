import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Nav } from "@/components/nav";
import { useActiveSection } from "@/hooks/use-active-section";

vi.mock("@/hooks/use-active-section", () => ({
  useActiveSection: vi.fn(),
}));
vi.mock("@/components/providers/reduced-motion-provider", () => ({
  useReducedMotionPref: () => false,
}));

const mockActive = vi.mocked(useActiveSection);

beforeEach(() => {
  mockActive.mockReturnValue(null);
});

describe("Nav", () => {
  it("renders the primary navigation with all section links and resume", () => {
    render(<Nav />);

    expect(
      screen.getByRole("navigation", { name: /primary/i }),
    ).toBeInTheDocument();

    for (const label of [
      "About",
      "Skills",
      "Projects",
      "Experience",
      "Contact",
    ]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }

    expect(
      screen.getAllByRole("link", { name: /resume/i }).length,
    ).toBeGreaterThan(0);
  });

  it("marks the active section link with aria-current", () => {
    mockActive.mockReturnValue("projects");
    render(<Nav />);

    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
