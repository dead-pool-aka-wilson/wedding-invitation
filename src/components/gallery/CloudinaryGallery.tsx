"use client";

import { useState } from "react";
import { CldImage } from "next-cloudinary";

export interface GalleryImage {
  publicId: string;
  alt: string;
}

interface CloudinaryGalleryProps {
  images: GalleryImage[];
  layout?: "grid" | "carousel";
  className?: string;
}

export function CloudinaryGallery({
  images,
  layout = "grid",
  className = "",
}: CloudinaryGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (layout === "carousel") {
    return (
      <div className={`relative w-full ${className}`}>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {images.map((image) => (
              <div
                key={image.publicId}
                className="w-full flex-shrink-0 px-2"
              >
                <div className="neon-frame">
                  <CldImage
                    src={image.publicId}
                    alt={image.alt}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover warm-tint"
                    crop="fill"
                    gravity="auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex
                  ? "bg-amber-400 shadow-[0_0_8px_rgba(255,176,32,0.6)]"
                  : "bg-white/20"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {images.map((image) => (
        <div key={image.publicId} className="neon-frame">
          <CldImage
            src={image.publicId}
            alt={image.alt}
            width={300}
            height={400}
            className="w-full h-auto object-cover warm-tint"
            crop="fill"
            gravity="auto"
          />
        </div>
      ))}
    </div>
  );
}
