"use client";

import { useState, useEffect } from "react";
import { getScrollProgress } from "@/lib/gsap/zones";

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setProgress(getScrollProgress(window.scrollY));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
