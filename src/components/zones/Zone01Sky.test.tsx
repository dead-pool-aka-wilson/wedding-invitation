/**
 * @vitest-environment jsdom
 */
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Zone01Sky } from "./Zone01Sky";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      label: "wedding invitation",
      groomName: "지훈",
      brideName: "수진",
      date: "2025. 4. 4 토요일",
      scrollHint: "scroll",
    };
    return translations[key] || key;
  },
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="next-image" />
  ),
}));

vi.mock("@/components/parallax", () => ({
  ParallaxLayer: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="parallax-layer">{children}</div>
  ),
}));

describe("Zone01Sky", () => {
  test("renders groom and bride names from translations", () => {
    render(<Zone01Sky />);

    expect(screen.getByText("지훈")).toBeInTheDocument();
    expect(screen.getByText("수진")).toBeInTheDocument();
  });

  test("renders wedding date", () => {
    render(<Zone01Sky />);

    expect(screen.getByText("2025. 4. 4 토요일")).toBeInTheDocument();
  });

  test("renders scroll hint", () => {
    render(<Zone01Sky />);

    expect(screen.getByText("scroll")).toBeInTheDocument();
    expect(screen.getByText("↓")).toBeInTheDocument();
  });

  test("renders wedding invitation label", () => {
    render(<Zone01Sky />);

    expect(screen.getByText("wedding invitation")).toBeInTheDocument();
  });

  test("renders heart symbol between names", () => {
    render(<Zone01Sky />);

    expect(screen.getByText("♥")).toBeInTheDocument();
  });

  test("renders parallax layers for stars and clouds", () => {
    render(<Zone01Sky />);

    const layers = screen.getAllByTestId("parallax-layer");
    expect(layers.length).toBeGreaterThanOrEqual(3);
  });

  test("renders star and cloud images", () => {
    render(<Zone01Sky />);

    const images = screen.getAllByTestId("next-image");
    const srcs = images.map((img) => img.getAttribute("src"));

    expect(srcs).toContain("/assets/zones/z01-sky/stars_overlay.png");
    expect(srcs).toContain("/assets/zones/z01-sky/cloud_wisps_01.png");
    expect(srcs).toContain("/assets/zones/z01-sky/cloud_wisps_02.png");
  });

  test("accepts custom groom and bride names", () => {
    render(<Zone01Sky groomName="민수" brideName="영희" />);

    expect(screen.getByText("민수")).toBeInTheDocument();
    expect(screen.getByText("영희")).toBeInTheDocument();
  });

  test("accepts custom wedding date", () => {
    render(<Zone01Sky weddingDate="2025. 5. 5 일요일" />);

    expect(screen.getByText("2025. 5. 5 일요일")).toBeInTheDocument();
  });

  test("section has correct height based on ZONES.SKY", () => {
    const { container } = render(<Zone01Sky />);

    const section = container.querySelector("section");
    expect(section).toHaveStyle({ height: "800px" });
  });
});
