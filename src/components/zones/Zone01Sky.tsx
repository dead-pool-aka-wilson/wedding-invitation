"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ParallaxLayer } from "@/components/parallax";
import { ZONES } from "@/lib/gsap/zones";

interface Zone01SkyProps {
  groomName?: string;
  brideName?: string;
  weddingDate?: string;
}

export function Zone01Sky({
  groomName,
  brideName,
  weddingDate,
}: Zone01SkyProps) {
  const t = useTranslations("cover");

  const displayGroomName = groomName || t("groomName");
  const displayBrideName = brideName || t("brideName");
  const displayDate = weddingDate || t("date");

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: `${ZONES.SKY.end - ZONES.SKY.start}px` }}
    >
      <div className="sky-gradient absolute inset-0" />

      <div className="city-glow-gradient absolute inset-0" />

      <ParallaxLayer speed={0.1} className="absolute inset-0">
        <Image
          src="/assets/zones/z01-sky/stars_overlay.png"
          alt=""
          fill
          className="object-cover opacity-60"
          priority
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.3} className="absolute inset-0">
        <Image
          src="/assets/zones/z01-sky/cloud_wisps_01.png"
          alt=""
          fill
          className="object-cover opacity-30 cloud-drift-left"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.2} className="absolute inset-0">
        <Image
          src="/assets/zones/z01-sky/cloud_wisps_02.png"
          alt=""
          fill
          className="object-cover opacity-25 cloud-drift-right"
        />
      </ParallaxLayer>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <p className="text-[10px] tracking-[4px] uppercase text-white/30 mb-8">
          {t("label")}
        </p>

        <h1 className="text-4xl font-light tracking-[3px] text-white/90 glow-text">
          {displayGroomName}
        </h1>

        <span className="text-2xl text-rose-300/80 my-4">♥</span>

        <h1 className="text-4xl font-light tracking-[3px] text-white/90 glow-text">
          {displayBrideName}
        </h1>

        <p className="text-sm text-white/40 tracking-[2px] mt-8">
          {displayDate}
        </p>

        <div className="absolute bottom-12 flex flex-col items-center animate-bounce">
          <span className="text-xs text-white/25 tracking-[1px] mb-2">
            {t("scrollHint")}
          </span>
          <span className="text-white/30">↓</span>
        </div>
      </div>
    </section>
  );
}
