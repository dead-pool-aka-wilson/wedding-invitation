"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ParallaxLayer } from "@/components/parallax";
import { GlassCard } from "@/components/ui";
import { ZONES } from "@/lib/gsap/zones";

interface Zone05GroundProps {
  hasRsvped?: boolean;
  onRsvpClick?: () => void;
}

export function Zone05Ground({ hasRsvped = false, onRsvpClick }: Zone05GroundProps) {
  const tClosing = useTranslations("closing");
  const tRsvp = useTranslations("rsvp");

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: `${ZONES.GROUND.end - ZONES.GROUND.start}px` }}
      data-testid="zone-05-ground"
    >
      <div className="ground-gradient absolute inset-0" />

      <ParallaxLayer speed={0.1} className="absolute inset-0">
        <Image
          src="/assets/zones/z05-ground/pavement_tiles.png"
          alt=""
          fill
          className="object-cover opacity-60"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.15} className="absolute bottom-1/3 left-1/4 w-32 h-32">
        <Image
          src="/assets/zones/z05-ground/manhole_cover.png"
          alt=""
          fill
          className="object-contain opacity-50"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.2} className="absolute inset-0">
        <Image
          src="/assets/zones/z05-ground/stall_structure.png"
          alt=""
          fill
          className="object-cover object-bottom opacity-70"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.25} className="absolute inset-0">
        <Image
          src="/assets/zones/z05-ground/stall_lights_signs.png"
          alt=""
          fill
          className="object-cover object-bottom opacity-80 mix-blend-screen"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.3} className="absolute bottom-0 left-0 right-0 h-1/3">
        <Image
          src="/assets/zones/z05-ground/puddle_base.png"
          alt=""
          fill
          className="object-cover object-top opacity-60"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.35} className="absolute bottom-0 left-0 right-0 h-1/3">
        <div className="relative w-full h-full animate-puddle-shimmer">
          <Image
            src="/assets/zones/z05-ground/puddle_reflection.png"
            alt=""
            fill
            className="object-cover object-top opacity-70 mix-blend-screen"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.5} className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/zones/z05-ground/ground_debris_fg.png"
          alt=""
          fill
          className="object-cover opacity-20"
        />
      </ParallaxLayer>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-12">
        <GlassCard className="max-w-sm w-full p-8 text-center">
          {hasRsvped ? (
            <>
              <div className="text-3xl mb-4">💕</div>
              <p className="text-white/90 text-lg leading-relaxed mb-2">
                {tClosing("thanks")}
              </p>
              <p className="text-white/70 text-sm">
                {tClosing("message")}
              </p>
            </>
          ) : (
            <>
              <p className="text-white/90 text-lg leading-relaxed mb-6">
                {tClosing("message")}
              </p>
              <button
                type="button"
                onClick={onRsvpClick}
                className="rsvp-pulse-button px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 text-sm font-medium transition-all duration-300"
              >
                {tRsvp("button")}
              </button>
            </>
          )}
        </GlassCard>
      </div>

      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-48 h-64 pointer-events-none">
        <div className="steam-rising" />
      </div>
    </section>
  );
}
