'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ParallaxLayer } from '@/components/parallax';
import { GlassCard } from '@/components/ui';

export function Zone03MidLevels() {
  const t = useTranslations('location');
  const zoneRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={zoneRef}
      className="absolute left-0 w-full overflow-hidden"
      style={{ top: '2600px', height: '2280px' }}
    >
      <div className="absolute inset-0">
        <Image
          src="/images/zones/z03-midlevels/z03-01-midlevels-buildings.png"
          alt="Midlevels Buildings"
          fill
          className="object-cover"
        />
      </div>

      <ParallaxLayer speed={0.4} zIndex={1}>
        <div className="absolute inset-0">
          <Image
            src="/images/zones/z03-midlevels/z03-04-soho-shops.png"
            alt="Soho Shops"
            fill
            className="object-cover object-bottom"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.7} zIndex={2}>
        <div className="absolute inset-0">
          <Image
            src="/images/zones/z03-midlevels/z03-02-escalator.png"
            alt="Escalator"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 mix-blend-screen">
            <Image
              src="/images/zones/z03-midlevels/z03-03-escalator-glow.png"
              alt="Escalator Glow"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.4} zIndex={5} className="pointer-events-none">
        <div className="absolute inset-0">
          <Image
            src="/images/zones/z03-midlevels/z03-05-handrail-blur.png"
            alt="Handrail Blur"
            fill
            className="object-cover"
          />
        </div>
      </ParallaxLayer>

      <div className="absolute inset-0 z-10 flex flex-col items-center px-6">
        <div className="mt-[300px] w-full max-w-[320px]">
          <GlassCard>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">📍</span>
              <h3 className="font-mono text-xs tracking-widest text-pink uppercase">
                {t('title')}
              </h3>
            </div>

            <div className="text-center mb-4">
              <p className="text-bright font-medium mb-2">◯◯◯ 웨딩홀</p>
              <p className="text-sm text-white/50">{t('address')}</p>
            </div>

            <div
              className="w-full h-[200px] rounded-lg bg-surface-3 flex items-center justify-center mb-4"
            >
              <span className="text-dim text-sm">{t('map_placeholder')}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-lg bg-white/5">
                <span className="text-lg">🚇</span>
                <p className="text-xs text-dim mt-1">{t('subway')}</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <span className="text-lg">🚌</span>
                <p className="text-xs text-dim mt-1">{t('bus')}</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <span className="text-lg">🚗</span>
                <p className="text-xs text-dim mt-1">{t('parking')}</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
