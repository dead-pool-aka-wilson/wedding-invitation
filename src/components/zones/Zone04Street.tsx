"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ParallaxLayer } from "@/components/parallax";
import { GlassCard } from "@/components/ui";
import { CloudinaryGallery, type GalleryImage } from "@/components/gallery";
import { ZONES } from "@/lib/gsap/zones";

interface AccountInfo {
  bank: string;
  holder: string;
  number: string;
}

interface Zone04StreetProps {
  galleryImages?: GalleryImage[];
  groomAccounts?: AccountInfo[];
  brideAccounts?: AccountInfo[];
}

const defaultGalleryImages: GalleryImage[] = [
  { publicId: "wedding/photo1", alt: "Wedding photo 1" },
  { publicId: "wedding/photo2", alt: "Wedding photo 2" },
  { publicId: "wedding/photo3", alt: "Wedding photo 3" },
  { publicId: "wedding/photo4", alt: "Wedding photo 4" },
];

export function Zone04Street({
  galleryImages = defaultGalleryImages,
  groomAccounts = [],
  brideAccounts = [],
}: Zone04StreetProps) {
  const tGallery = useTranslations("gallery");
  const tAccounts = useTranslations("accounts");
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: `${ZONES.STREET.end - ZONES.STREET.start}px` }}
    >
      <div className="street-gradient absolute inset-0" />

      <ParallaxLayer speed={0.1} className="absolute inset-0">
        <Image
          src="/assets/zones/z04-street/street_buildings_deep.png"
          alt=""
          fill
          className="object-cover opacity-40"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.2} className="absolute inset-0">
        <Image
          src="/assets/zones/z04-street/neon_layer_back.png"
          alt=""
          fill
          className="object-cover object-center opacity-50"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.3} className="absolute inset-0">
        <Image
          src="/assets/zones/z04-street/neon_layer_front.png"
          alt=""
          fill
          className="object-cover object-center opacity-70"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.25} className="absolute inset-0">
        <Image
          src="/assets/zones/z04-street/neon_glow_map.png"
          alt=""
          fill
          className="object-cover opacity-30 mix-blend-screen"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.4} className="absolute bottom-0 left-0 right-0 h-1/3">
        <Image
          src="/assets/zones/z04-street/tram_tracks.png"
          alt=""
          fill
          className="object-cover object-top opacity-60"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.45} className="absolute bottom-0 left-0 right-0 h-1/4">
        <Image
          src="/assets/zones/z04-street/wet_asphalt_reflection.png"
          alt=""
          fill
          className="object-cover opacity-50 mix-blend-overlay"
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.6} className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/zones/z04-street/street_pole_fg.png"
          alt=""
          fill
          className="object-cover opacity-15"
        />
      </ParallaxLayer>

      <div className="relative z-10 flex flex-col items-center h-full px-6 py-12">
        <GlassCard className="max-w-sm w-full p-6 mb-8">
          <h2 className="text-lg font-medium text-white/90 mb-4 flex items-center gap-2">
            <span>📸</span>
            {tGallery("title")}
          </h2>
          <CloudinaryGallery images={galleryImages} layout="grid" />
        </GlassCard>

        <GlassCard className="max-w-sm w-full p-6">
          <h2 className="text-lg font-medium text-white/90 mb-4 flex items-center gap-2">
            <span>🏦</span>
            {tAccounts("title")}
          </h2>

          <details className="mb-4">
            <summary className="cursor-pointer text-sm text-white/70 hover:text-white/90 transition-colors">
              {tAccounts("groomSide")}
            </summary>
            <div className="mt-3 space-y-2">
              {groomAccounts.length === 0 ? (
                <p className="text-xs text-white/40">No accounts configured</p>
              ) : (
                groomAccounts.map((acc, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-white/5 p-2 rounded">
                    <div>
                      <p className="text-white/60">{acc.bank}</p>
                      <p className="text-white/80">{acc.holder}</p>
                      <p className="text-white/50 font-mono">{acc.number}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(acc.number, `groom-${i}`)}
                      className="px-2 py-1 text-xs bg-white/10 hover:bg-white/20 rounded transition-colors"
                    >
                      {copiedAccount === `groom-${i}` ? tAccounts("copied") : tAccounts("copy")}
                    </button>
                  </div>
                ))
              )}
            </div>
          </details>

          <details>
            <summary className="cursor-pointer text-sm text-white/70 hover:text-white/90 transition-colors">
              {tAccounts("brideSide")}
            </summary>
            <div className="mt-3 space-y-2">
              {brideAccounts.length === 0 ? (
                <p className="text-xs text-white/40">No accounts configured</p>
              ) : (
                brideAccounts.map((acc, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-white/5 p-2 rounded">
                    <div>
                      <p className="text-white/60">{acc.bank}</p>
                      <p className="text-white/80">{acc.holder}</p>
                      <p className="text-white/50 font-mono">{acc.number}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(acc.number, `bride-${i}`)}
                      className="px-2 py-1 text-xs bg-white/10 hover:bg-white/20 rounded transition-colors"
                    >
                      {copiedAccount === `bride-${i}` ? tAccounts("copied") : tAccounts("copy")}
                    </button>
                  </div>
                ))
              )}
            </div>
          </details>
        </GlassCard>
      </div>
    </section>
  );
}
