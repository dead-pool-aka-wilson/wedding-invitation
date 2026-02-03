/**
 * @vitest-environment jsdom
 */
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Zone05Ground } from "./Zone05Ground";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      closing: {
        message: "결혼식에서 뵙겠습니다",
        thanks: "참석해 주시기로 해서 감사합니다",
      },
      rsvp: {
        button: "참석 의사 전달",
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

describe("Zone05Ground", () => {
  test("renders section with correct test id", () => {
    render(<Zone05Ground />);

    expect(screen.getByTestId("zone-05-ground")).toBeInTheDocument();
  });

  test("renders closing message for new guests by default", () => {
    render(<Zone05Ground />);

    expect(screen.getByText("결혼식에서 뵙겠습니다")).toBeInTheDocument();
  });

  test("renders RSVP button for new guests", () => {
    render(<Zone05Ground />);

    expect(screen.getByText("참석 의사 전달")).toBeInTheDocument();
  });

  test("renders thanks message for returning guests", () => {
    render(<Zone05Ground hasRsvped />);

    expect(screen.getByText("참석해 주시기로 해서 감사합니다")).toBeInTheDocument();
  });

  test("does not render RSVP button for returning guests", () => {
    render(<Zone05Ground hasRsvped />);

    expect(screen.queryByText("참석 의사 전달")).not.toBeInTheDocument();
  });

  test("calls onRsvpClick when RSVP button is clicked", () => {
    const handleRsvpClick = vi.fn();
    render(<Zone05Ground onRsvpClick={handleRsvpClick} />);

    fireEvent.click(screen.getByText("참석 의사 전달"));

    expect(handleRsvpClick).toHaveBeenCalledTimes(1);
  });

  test("renders parallax layers for ground assets", () => {
    render(<Zone05Ground />);

    const layers = screen.getAllByTestId("parallax-layer");
    expect(layers.length).toBeGreaterThanOrEqual(7);
  });

  test("renders all required ground images", () => {
    render(<Zone05Ground />);

    const images = screen.getAllByTestId("next-image");
    const srcs = images.map((img) => img.getAttribute("src"));

    expect(srcs).toContain("/assets/zones/z05-ground/pavement_tiles.png");
    expect(srcs).toContain("/assets/zones/z05-ground/manhole_cover.png");
    expect(srcs).toContain("/assets/zones/z05-ground/stall_structure.png");
    expect(srcs).toContain("/assets/zones/z05-ground/stall_lights_signs.png");
    expect(srcs).toContain("/assets/zones/z05-ground/puddle_base.png");
    expect(srcs).toContain("/assets/zones/z05-ground/puddle_reflection.png");
    expect(srcs).toContain("/assets/zones/z05-ground/ground_debris_fg.png");
  });

  test("section has correct height based on ZONES.GROUND", () => {
    const { container } = render(<Zone05Ground />);

    const section = container.querySelector("section");
    expect(section).toHaveStyle({ height: "1200px" });
  });

  test("renders glass card for content", () => {
    render(<Zone05Ground />);

    expect(screen.getByTestId("glass-card")).toBeInTheDocument();
  });
});
