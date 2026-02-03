"use client";

import { useTranslations } from "next-intl";
import { useScrollY } from "@/hooks/useScrollY";
import { ZONES } from "@/lib/gsap/zones";

interface FloatingRSVPButtonProps {
  onClick: () => void;
  hasRsvped?: boolean;
}

export function FloatingRSVPButton({ onClick, hasRsvped = false }: FloatingRSVPButtonProps) {
  const t = useTranslations("rsvp");
  const scrollY = useScrollY();

  const isInZone03 = scrollY >= ZONES.MIDLEVELS.start && scrollY < ZONES.MIDLEVELS.end;
  const isInZone04 = scrollY >= ZONES.STREET.start && scrollY < ZONES.STREET.end;
  const isInZone05 = scrollY >= ZONES.GROUND.start;

  const isVisible = scrollY >= ZONES.MIDLEVELS.start;
  const shouldPulse = isInZone05;

  if (hasRsvped || !isVisible) return null;

  const opacityClass = isInZone03
    ? "opacity-60"
    : isInZone04
      ? "opacity-80"
      : "opacity-100";

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="floating-rsvp-button"
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-40
        px-6 py-3 rounded-full
        bg-white/10 backdrop-blur-md
        border border-white/20
        text-white/90 text-sm font-medium
        transition-all duration-500
        hover:bg-white/20 hover:border-white/30
        ${opacityClass}
        ${shouldPulse ? "floating-rsvp-pulse" : ""}
      `}
    >
      {t("button")}
    </button>
  );
}
