import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("Home page", () => {
  it("mounts and shows the name and role", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: /himavi/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/ai\/ml engineer/i)).toBeInTheDocument();
  });
});
