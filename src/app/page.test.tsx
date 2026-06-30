import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("Home page", () => {
  it("mounts and shows the name and role", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: /himanshu kumar singh/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/ai\/ml engineer/i).length).toBeGreaterThan(0);
  });
});
