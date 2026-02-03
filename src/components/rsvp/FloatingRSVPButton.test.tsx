/**
 * @vitest-environment jsdom
 */
import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FloatingRSVPButton } from "./FloatingRSVPButton";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      button: "참석 의사 전달",
    };
    return translations[key] || key;
  },
}));

let mockScrollY = 0;
vi.mock("@/hooks/useScrollY", () => ({
  useScrollY: () => mockScrollY,
}));

describe("FloatingRSVPButton", () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockScrollY = 0;
  });

  test("is hidden when scroll is in Zone 01-02 (0-2400px)", () => {
    mockScrollY = 1000;
    render(<FloatingRSVPButton onClick={mockOnClick} />);
    expect(screen.queryByTestId("floating-rsvp-button")).not.toBeInTheDocument();
  });

  test("is visible when scroll is in Zone 03 (2400-4500px)", () => {
    mockScrollY = 3000;
    render(<FloatingRSVPButton onClick={mockOnClick} />);
    expect(screen.getByTestId("floating-rsvp-button")).toBeInTheDocument();
  });

  test("is visible when scroll is in Zone 04 (4500-6800px)", () => {
    mockScrollY = 5500;
    render(<FloatingRSVPButton onClick={mockOnClick} />);
    expect(screen.getByTestId("floating-rsvp-button")).toBeInTheDocument();
  });

  test("is visible when scroll is in Zone 05 (6800-8000px)", () => {
    mockScrollY = 7000;
    render(<FloatingRSVPButton onClick={mockOnClick} />);
    expect(screen.getByTestId("floating-rsvp-button")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    mockScrollY = 3000;
    render(<FloatingRSVPButton onClick={mockOnClick} />);
    fireEvent.click(screen.getByTestId("floating-rsvp-button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("is hidden when user has already RSVPed", () => {
    mockScrollY = 7000;
    render(<FloatingRSVPButton onClick={mockOnClick} hasRsvped />);
    expect(screen.queryByTestId("floating-rsvp-button")).not.toBeInTheDocument();
  });

  test("has pulse animation in Zone 05", () => {
    mockScrollY = 7000;
    render(<FloatingRSVPButton onClick={mockOnClick} />);
    const button = screen.getByTestId("floating-rsvp-button");
    expect(button.className).toContain("floating-rsvp-pulse");
  });

  test("does not have pulse animation in Zone 03", () => {
    mockScrollY = 3000;
    render(<FloatingRSVPButton onClick={mockOnClick} />);
    const button = screen.getByTestId("floating-rsvp-button");
    expect(button.className).not.toContain("floating-rsvp-pulse");
  });

  test("has lower opacity in Zone 03", () => {
    mockScrollY = 3000;
    render(<FloatingRSVPButton onClick={mockOnClick} />);
    const button = screen.getByTestId("floating-rsvp-button");
    expect(button.className).toContain("opacity-60");
  });

  test("has higher opacity in Zone 04", () => {
    mockScrollY = 5500;
    render(<FloatingRSVPButton onClick={mockOnClick} />);
    const button = screen.getByTestId("floating-rsvp-button");
    expect(button.className).toContain("opacity-80");
  });

  test("has full opacity in Zone 05", () => {
    mockScrollY = 7000;
    render(<FloatingRSVPButton onClick={mockOnClick} />);
    const button = screen.getByTestId("floating-rsvp-button");
    expect(button.className).toContain("opacity-100");
  });

  test("renders button text", () => {
    mockScrollY = 3000;
    render(<FloatingRSVPButton onClick={mockOnClick} />);
    expect(screen.getByText("참석 의사 전달")).toBeInTheDocument();
  });
});
