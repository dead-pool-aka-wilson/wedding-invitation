/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GlassCard } from "./GlassCard";

describe("GlassCard", () => {
  it("renders children", () => {
    render(<GlassCard>Test Content</GlassCard>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies backdrop blur style", () => {
    const { container } = render(<GlassCard>Content</GlassCard>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("backdrop-blur");
  });

  it("applies custom className", () => {
    const { container } = render(<GlassCard className="custom-class">Content</GlassCard>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("custom-class");
  });

  it("applies highlight variant styles", () => {
    const { container } = render(<GlassCard variant="highlight">Content</GlassCard>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("bg-white/[0.08]");
  });
});
