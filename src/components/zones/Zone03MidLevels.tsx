"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ParallaxLayer } from "@/components/parallax";
import { GlassCard } from "@/components/ui";
import { ZONES } from "@/lib/gsap/zones";

export function Zone03MidLevels() {
  const t = useTranslations("location");

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: `${ZONES.MIDLEVELS.end - ZONES.MIDLEVELS.start}px` }}
    >
      <div className="midlevels-gradient absolute inset-0" />

      <ParallaxLayer speed={0.1} className="absolute inset-0">
        <Image
          src="/assets/zones/z03-midlevels/midlevel_buildings_bg.png"
          alt=""
          fill
          className="object-cover opacity-50"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.25} className="absolute inset-0">
        <Image
          src="/assets/zones/z03-midlevels/soho_shopfronts.png"
          alt=""
          fill
          className="object-cover object-bottom opacity-40"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.35} className="absolute left-0 top-0 bottom-0 w-1/3">
        <Image
          src="/assets/zones/z03-midlevels/escalator_structure.png"
          alt=""
          fill
          className="object-cover object-right opacity-60"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.3} className="absolute left-0 top-0 bottom-0 w-1/3">
        <Image
          src="/assets/zones/z03-midlevels/escalator_glow.png"
          alt=""
          fill
          className="object-cover opacity-30 mix-blend-screen"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.6} className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/zones/z03-midlevels/escalator_railing_fg.png"
          alt=""
          fill
          className="object-cover opacity-20"
        />
      </ParallaxLayer>

      <div className="streetlight streetlight-1" />
      <div className="streetlight streetlight-2" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-12">
        <GlassCard className="max-w-sm w-full p-6 mb-6">
          <h2 className="text-lg font-medium text-white/90 mb-4 flex items-center gap-2">
            <span>📍</span>
            {t("title")}
          </h2>
          
          <div className="space-y-3 text-sm">
            <p className="text-white/80 font-medium">{t("venue")}</p>
            <p className="text-white/60">{t("address")}</p>
          </div>

          <div className="mt-6 w-full h-48 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
            <span className="text-white/30 text-sm">Map Embed</span>
          </div>
        </GlassCard>

        <GlassCard className="max-w-sm w-full p-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-white/60">
              <span>🚇</span>
              <span>{t("subway")}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <span>🚗</span>
              <span>{t("parking")}</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
