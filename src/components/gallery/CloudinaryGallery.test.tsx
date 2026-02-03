/**
 * @vitest-environment jsdom
 */
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CloudinaryGallery, type GalleryImage } from "./CloudinaryGallery";

vi.mock("next-cloudinary", () => ({
  CldImage: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="cld-image" />
  ),
}));

const mockImages: GalleryImage[] = [
  { publicId: "wedding/photo1", alt: "Photo 1" },
  { publicId: "wedding/photo2", alt: "Photo 2" },
  { publicId: "wedding/photo3", alt: "Photo 3" },
];

describe("CloudinaryGallery", () => {
  describe("grid layout", () => {
    test("renders all images in a 2-column grid", () => {
      render(<CloudinaryGallery images={mockImages} layout="grid" />);

      const images = screen.getAllByTestId("cld-image");
      expect(images).toHaveLength(3);
    });

    test("applies neon-frame class to each image container", () => {
      const { container } = render(<CloudinaryGallery images={mockImages} layout="grid" />);

      const frames = container.querySelectorAll(".neon-frame");
      expect(frames).toHaveLength(3);
    });

    test("applies warm-tint class to images", () => {
      render(<CloudinaryGallery images={mockImages} layout="grid" />);

      const images = screen.getAllByTestId("cld-image");
      images.forEach((img) => {
        expect(img.className).toContain("warm-tint");
      });
    });

    test("applies grid-cols-2 class for 2-column layout", () => {
      const { container } = render(<CloudinaryGallery images={mockImages} layout="grid" />);

      const grid = container.firstChild;
      expect(grid).toHaveClass("grid-cols-2");
    });
  });

  describe("carousel layout", () => {
    test("renders all images in carousel", () => {
      render(<CloudinaryGallery images={mockImages} layout="carousel" />);

      const images = screen.getAllByTestId("cld-image");
      expect(images).toHaveLength(3);
    });

    test("renders navigation dots for each image", () => {
      render(<CloudinaryGallery images={mockImages} layout="carousel" />);

      const dots = screen.getAllByRole("button");
      expect(dots).toHaveLength(3);
    });

    test("changes active image when dot is clicked", () => {
      const { container } = render(<CloudinaryGallery images={mockImages} layout="carousel" />);

      const dots = screen.getAllByRole("button");
      fireEvent.click(dots[1]);

      const slider = container.querySelector(".flex.transition-transform");
      expect(slider).toHaveStyle({ transform: "translateX(-100%)" });
    });

    test("highlights active dot with amber glow", () => {
      render(<CloudinaryGallery images={mockImages} layout="carousel" />);

      const dots = screen.getAllByRole("button");
      expect(dots[0].className).toContain("bg-amber-400");
      expect(dots[1].className).toContain("bg-white/20");
    });
  });

  test("defaults to grid layout when layout prop is not provided", () => {
    const { container } = render(<CloudinaryGallery images={mockImages} />);

    const grid = container.firstChild;
    expect(grid).toHaveClass("grid");
  });

  test("accepts custom className", () => {
    const { container } = render(
      <CloudinaryGallery images={mockImages} className="custom-class" />
    );

    const root = container.firstChild;
    expect(root).toHaveClass("custom-class");
  });
});
