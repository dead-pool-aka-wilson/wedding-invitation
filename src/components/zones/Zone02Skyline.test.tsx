/**
 * @vitest-environment jsdom
 */
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Zone02Skyline } from "./Zone02Skyline";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      greeting: {
        message: "서로의 마음을 확인하고\n한 길을 함께 걸으려 합니다",
        groomParents: "◯◯◯ · ◯◯◯의 아들 지훈",
        brideParents: "◯◯◯ · ◯◯◯의 딸 수진",
      },
      dateTime: {
        fullDate: "2025년 4월 4일 토요일",
        time: "오후 2시",
        venue: "◯◯◯ 웨딩홀",
      },
    };
    return translations[namespace]?.[key] || key;
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

describe("Zone02Skyline", () => {
  test("renders greeting message", () => {
    render(<Zone02Skyline />);

    expect(screen.getByText(/서로의 마음을 확인하고/)).toBeInTheDocument();
  });

  test("renders parents info", () => {
    render(<Zone02Skyline />);

    expect(screen.getByText("◯◯◯ · ◯◯◯의 아들 지훈")).toBeInTheDocument();
    expect(screen.getByText("◯◯◯ · ◯◯◯의 딸 수진")).toBeInTheDocument();
  });

  test("renders date time info", () => {
    render(<Zone02Skyline />);

    expect(screen.getByText("2025년 4월 4일 토요일")).toBeInTheDocument();
    expect(screen.getByText("오후 2시")).toBeInTheDocument();
    expect(screen.getByText("◯◯◯ 웨딩홀")).toBeInTheDocument();
  });

  test("renders two glass cards for greeting and datetime", () => {
    render(<Zone02Skyline />);

    const cards = screen.getAllByTestId("glass-card");
    expect(cards).toHaveLength(2);
  });

  test("renders parallax layers for skyline assets", () => {
    render(<Zone02Skyline />);

    const layers = screen.getAllByTestId("parallax-layer");
    expect(layers.length).toBeGreaterThanOrEqual(6);
  });

  test("renders all required skyline images", () => {
    render(<Zone02Skyline />);

    const images = screen.getAllByTestId("next-image");
    const srcs = images.map((img) => img.getAttribute("src"));

    expect(srcs).toContain("/assets/zones/z02-skyline/skyline_far_silhouette.png");
    expect(srcs).toContain("/assets/zones/z02-skyline/skyline_mid_towers.png");
    expect(srcs).toContain("/assets/zones/z02-skyline/haze_band.png");
    expect(srcs).toContain("/assets/zones/z02-skyline/building_close_left.png");
    expect(srcs).toContain("/assets/zones/z02-skyline/building_close_right.png");
    expect(srcs).toContain("/assets/zones/z02-skyline/window_glow_overlay.png");
  });

  test("renders aviation lights", () => {
    const { container } = render(<Zone02Skyline />);

    const light1 = container.querySelector(".aviation-light-1");
    const light2 = container.querySelector(".aviation-light-2");

    expect(light1).toBeInTheDocument();
    expect(light2).toBeInTheDocument();
  });

  test("section has correct height based on ZONES.SKYLINE", () => {
    const { container } = render(<Zone02Skyline />);

    const section = container.querySelector("section");
    expect(section).toHaveStyle({ height: "1600px" });
  });
});
