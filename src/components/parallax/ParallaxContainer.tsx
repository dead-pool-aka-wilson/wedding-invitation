"use client";

import { ReactNode, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TOTAL_HEIGHT } from "@/lib/gsap/zones";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
}

export function ParallaxContainer({
  children,
  className = "",
}: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: `${TOTAL_HEIGHT}px` }}
    >
      {children}
    </div>
  );
}
