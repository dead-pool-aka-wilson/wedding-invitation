/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  it("renders the wedding invitation heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", {
      name: /wedding invitation/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders main element", () => {
    render(<Home />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });
});
