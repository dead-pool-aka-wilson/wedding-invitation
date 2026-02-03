"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ParallaxLayer } from "@/components/parallax";
import { GlassCard } from "@/components/ui";
import { ZONES } from "@/lib/gsap/zones";

export function Zone02Skyline() {
  const tGreeting = useTranslations("greeting");
  const tDateTime = useTranslations("dateTime");

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: `${ZONES.SKYLINE.end - ZONES.SKYLINE.start}px` }}
    >
      <div className="skyline-gradient absolute inset-0" />

      <ParallaxLayer speed={0.15} className="absolute inset-0">
        <Image
          src="/assets/zones/z02-skyline/skyline_far_silhouette.png"
          alt=""
          fill
          className="object-cover object-bottom opacity-40"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.25} className="absolute inset-0">
        <Image
          src="/assets/zones/z02-skyline/haze_band.png"
          alt=""
          fill
          className="object-cover opacity-30"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.35} className="absolute inset-0">
        <Image
          src="/assets/zones/z02-skyline/skyline_mid_towers.png"
          alt=""
          fill
          className="object-cover object-bottom opacity-70"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.45} className="absolute inset-0">
        <Image
          src="/assets/zones/z02-skyline/window_glow_overlay.png"
          alt=""
          fill
          className="object-cover opacity-20 mix-blend-screen"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.5} className="absolute left-0 top-0 bottom-0 w-1/4">
        <Image
          src="/assets/zones/z02-skyline/building_close_left.png"
          alt=""
          fill
          className="object-cover object-right opacity-60"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.5} className="absolute right-0 top-0 bottom-0 w-1/4">
        <Image
          src="/assets/zones/z02-skyline/building_close_right.png"
          alt=""
          fill
          className="object-cover object-left opacity-60"
        />
      </ParallaxLayer>

      <div className="aviation-light aviation-light-1" />
      <div className="aviation-light aviation-light-2" />

      <div className="relative z-10 flex flex-col items-center h-full px-6 pt-24 pb-12">
        <GlassCard className="max-w-sm w-full text-center p-8 mb-auto">
          <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line mb-6">
            {tGreeting("message")}
          </p>
          <div className="text-xs text-white/50 space-y-1">
            <p>{tGreeting("groomParents")}</p>
            <p>{tGreeting("brideParents")}</p>
          </div>
        </GlassCard>

        <GlassCard className="max-w-sm w-full text-center p-8 mt-auto">
          <div className="flex items-center justify-center gap-2 text-white/80 mb-4">
            <span>📅</span>
            <span className="text-lg tracking-wide">{tDateTime("fullDate")}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/70 mb-4">
            <span>⏰</span>
            <span>{tDateTime("time")}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/60">
            <span>💒</span>
            <span>{tDateTime("venue")}</span>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
