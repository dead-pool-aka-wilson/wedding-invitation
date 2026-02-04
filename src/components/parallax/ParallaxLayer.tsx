'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed: number;
  zIndex?: number;
  className?: string;
  startY?: number;
  endY?: number;
}

export function ParallaxLayer({
  children,
  speed,
  zIndex = 1,
  className = '',
  startY = 0,
  endY,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layerRef.current) return;

    const movement = (endY ?? startY + 500) * speed;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: layerRef.current.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    tl.fromTo(
      layerRef.current,
      { y: -movement / 2 },
      { y: movement / 2, ease: 'none' }
    );

    return () => {
      tl.kill();
    };
  }, [speed, startY, endY]);

  return (
    <div
      ref={layerRef}
      className={`absolute inset-0 ${className}`}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
}
