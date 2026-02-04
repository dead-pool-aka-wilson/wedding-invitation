'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ParallaxLayer } from '@/components/parallax';
import { GlassCard } from '@/components/ui';

export function Zone02Skyline() {
  const t = useTranslations();
  const zoneRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={zoneRef}
      className="absolute left-0 w-full overflow-hidden"
      style={{ top: '870px', height: '1730px' }}
    >
      <div className="absolute inset-0">
        <Image
          src="/images/zones/z02-skyline/z02-01-kowloon-skyline.png"
          alt="Kowloon Skyline"
          fill
          className="object-cover"
          priority
        />
      </div>

      <ParallaxLayer speed={0.2} zIndex={1}>
        <div className="absolute inset-0">
          <Image
            src="/images/zones/z02-skyline/z02-02-hk-towers.png"
            alt="HK Towers"
            fill
            className="object-cover object-bottom"
          />
          <div className="absolute inset-0 mix-blend-screen">
            <Image
              src="/images/zones/z02-skyline/z02-06-window-lights.png"
              alt="Window Lights"
              fill
              className="object-cover object-bottom"
            />
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.4} zIndex={2}>
        <div className="absolute inset-0 opacity-60">
          <Image
            src="/images/zones/z02-skyline/z02-05-haze.png"
            alt="Haze"
            fill
            className="object-cover"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.6} zIndex={3}>
        <div className="absolute bottom-0 left-0 w-[40%] h-[90%]">
          <Image
            src="/images/zones/z02-skyline/z02-03-left-building.png"
            alt="Left Building"
            fill
            className="object-contain object-bottom-left"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-[40%] h-[90%]">
          <Image
            src="/images/zones/z02-skyline/z02-04-right-building.png"
            alt="Right Building"
            fill
            className="object-contain object-bottom-right"
          />
        </div>
      </ParallaxLayer>

      <div className="absolute bottom-0 left-0 right-0 h-[400px] z-20 pointer-events-none">
        <Image
          src="/images/zones/z02-skyline/z02-07-transition.png"
          alt="Transition"
          fill
          className="object-cover object-bottom"
        />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center px-6">
        <div className="mt-[200px] w-full max-w-[320px]">
          <GlassCard className="text-center">
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              {t('greeting.message')}
            </p>
            <div className="text-xs text-white/30 font-mono leading-loose">
              <p>{t('greeting.groom_parents')} 지훈</p>
              <p>{t('greeting.bride_parents')} 수진</p>
            </div>
          </GlassCard>
        </div>

        <div className="mt-[400px] w-full max-w-[320px]">
          <GlassCard className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">📅</span>
              <h3 className="font-mono text-xs tracking-widest text-cyan uppercase">
                {t('datetime.title')}
              </h3>
            </div>
            <p className="text-lg text-bright mb-2">{t('datetime.date')}</p>
            <p className="text-bright">{t('datetime.time')}</p>
            <p className="text-sm text-white/50 mt-2">{t('datetime.venue')}</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
