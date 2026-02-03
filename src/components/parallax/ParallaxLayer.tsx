"use client";

import { ReactNode, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  zIndex?: number;
}

export function ParallaxLayer({
  children,
  speed = 1,
  className = "",
  zIndex = 0,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: layer,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const yOffset = self.progress * 100 * (1 - speed);
        gsap.set(layer, { y: `${yOffset}%` });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [speed]);

  return (
    <div
      ref={layerRef}
      className={`absolute inset-0 will-change-transform ${className}`}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
}
