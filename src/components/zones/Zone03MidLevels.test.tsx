/**
 * @vitest-environment jsdom
 */
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Zone03MidLevels } from "./Zone03MidLevels";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "오시는 길",
      venue: "◯◯웨딩홀",
      address: "대구 ◯◯구 ◯◯로 123",
      subway: "◯◯역 3번 출구 5분",
      parking: "주차 가능",
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

vi.mock("@/components/ui", () => ({
  GlassCard: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="glass-card">{children}</div>
  ),
}));

describe("Zone03MidLevels", () => {
  test("renders location title", () => {
    render(<Zone03MidLevels />);

    expect(screen.getByText("오시는 길")).toBeInTheDocument();
  });

  test("renders venue info", () => {
    render(<Zone03MidLevels />);

    expect(screen.getByText("◯◯웨딩홀")).toBeInTheDocument();
    expect(screen.getByText("대구 ◯◯구 ◯◯로 123")).toBeInTheDocument();
  });

  test("renders transport info", () => {
    render(<Zone03MidLevels />);

    expect(screen.getByText("◯◯역 3번 출구 5분")).toBeInTheDocument();
    expect(screen.getByText("주차 가능")).toBeInTheDocument();
  });

  test("renders map placeholder", () => {
    render(<Zone03MidLevels />);

    expect(screen.getByText("Map Embed")).toBeInTheDocument();
  });

  test("renders two glass cards for location and transport", () => {
    render(<Zone03MidLevels />);

    const cards = screen.getAllByTestId("glass-card");
    expect(cards).toHaveLength(2);
  });

  test("renders parallax layers for midlevel assets", () => {
    render(<Zone03MidLevels />);

    const layers = screen.getAllByTestId("parallax-layer");
    expect(layers.length).toBeGreaterThanOrEqual(5);
  });

  test("renders all required midlevel images", () => {
    render(<Zone03MidLevels />);

    const images = screen.getAllByTestId("next-image");
    const srcs = images.map((img) => img.getAttribute("src"));

    expect(srcs).toContain("/assets/zones/z03-midlevels/midlevel_buildings_bg.png");
    expect(srcs).toContain("/assets/zones/z03-midlevels/escalator_structure.png");
    expect(srcs).toContain("/assets/zones/z03-midlevels/escalator_glow.png");
    expect(srcs).toContain("/assets/zones/z03-midlevels/soho_shopfronts.png");
    expect(srcs).toContain("/assets/zones/z03-midlevels/escalator_railing_fg.png");
  });

  test("renders streetlights", () => {
    const { container } = render(<Zone03MidLevels />);

    const light1 = container.querySelector(".streetlight-1");
    const light2 = container.querySelector(".streetlight-2");

    expect(light1).toBeInTheDocument();
    expect(light2).toBeInTheDocument();
  });

  test("section has correct height based on ZONES.MIDLEVELS", () => {
    const { container } = render(<Zone03MidLevels />);

    const section = container.querySelector("section");
    expect(section).toHaveStyle({ height: "2100px" });
  });
});
