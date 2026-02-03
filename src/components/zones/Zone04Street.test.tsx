/**
 * @vitest-environment jsdom
 */
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Zone04Street } from "./Zone04Street";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      gallery: {
        title: "갤러리",
      },
      accounts: {
        title: "축의금 안내",
        groomSide: "신랑측 계좌",
        brideSide: "신부측 계좌",
        copy: "복사",
        copied: "복사되었습니다",
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

vi.mock("@/components/gallery", () => ({
  CloudinaryGallery: () => <div data-testid="cloudinary-gallery">Gallery</div>,
}));

describe("Zone04Street", () => {
  test("renders gallery title", () => {
    render(<Zone04Street />);

    expect(screen.getByText("갤러리")).toBeInTheDocument();
  });

  test("renders accounts title", () => {
    render(<Zone04Street />);

    expect(screen.getByText("축의금 안내")).toBeInTheDocument();
  });

  test("renders groom and bride side account sections", () => {
    render(<Zone04Street />);

    expect(screen.getByText("신랑측 계좌")).toBeInTheDocument();
    expect(screen.getByText("신부측 계좌")).toBeInTheDocument();
  });

  test("renders cloudinary gallery component", () => {
    render(<Zone04Street />);

    expect(screen.getByTestId("cloudinary-gallery")).toBeInTheDocument();
  });

  test("renders two glass cards for gallery and accounts", () => {
    render(<Zone04Street />);

    const cards = screen.getAllByTestId("glass-card");
    expect(cards).toHaveLength(2);
  });

  test("renders parallax layers for street assets", () => {
    render(<Zone04Street />);

    const layers = screen.getAllByTestId("parallax-layer");
    expect(layers.length).toBeGreaterThanOrEqual(7);
  });

  test("renders all required street images", () => {
    render(<Zone04Street />);

    const images = screen.getAllByTestId("next-image");
    const srcs = images.map((img) => img.getAttribute("src"));

    expect(srcs).toContain("/assets/zones/z04-street/street_buildings_deep.png");
    expect(srcs).toContain("/assets/zones/z04-street/neon_layer_back.png");
    expect(srcs).toContain("/assets/zones/z04-street/neon_layer_front.png");
    expect(srcs).toContain("/assets/zones/z04-street/neon_glow_map.png");
    expect(srcs).toContain("/assets/zones/z04-street/tram_tracks.png");
    expect(srcs).toContain("/assets/zones/z04-street/wet_asphalt_reflection.png");
    expect(srcs).toContain("/assets/zones/z04-street/street_pole_fg.png");
  });

  test("section has correct height based on ZONES.STREET", () => {
    const { container } = render(<Zone04Street />);

    const section = container.querySelector("section");
    expect(section).toHaveStyle({ height: "2300px" });
  });
});
