"use client";

import { useState, useEffect } from "react";
import { getZoneByPosition, type ZoneId } from "@/lib/gsap/zones";

export function useZoneDetection(): ZoneId {
  const [currentZone, setCurrentZone] = useState<ZoneId>(1);

  useEffect(() => {
    const handleScroll = () => {
      setCurrentZone(getZoneByPosition(window.scrollY));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return currentZone;
}
