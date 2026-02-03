/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="next-image" />
  ),
}));

vi.mock("@/components/parallax", () => ({
  ParallaxContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ParallaxLayer: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}));

vi.mock("next-cloudinary", () => ({
  CldImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="cld-image" />
  ),
}));

vi.mock("@/hooks/useScrollY", () => ({
  useScrollY: () => 0,
}));

describe("Home Page", () => {
  it("renders main element", () => {
    render(<Home />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("renders all five zones", () => {
    const { container } = render(<Home />);
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(5);
  });
});
