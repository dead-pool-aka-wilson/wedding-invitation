'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ParallaxLayer } from '@/components/parallax';

export function Zone01Sky() {
  const t = useTranslations('cover');
  const zoneRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={zoneRef}
      className="absolute top-0 left-0 w-full overflow-hidden"
      style={{ height: '870px' }}
    >
      <div className="absolute inset-0">
        <Image
          src="/images/zones/z01-sky/z01-01-night-sky.png"
          alt="Night Sky"
          fill
          className="object-cover"
          priority
        />
      </div>

      <ParallaxLayer speed={0.05} zIndex={1}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[15%] left-[20%] w-[2px] h-[2px] bg-white/30 rounded-full" />
          <div className="absolute top-[25%] left-[65%] w-[1px] h-[1px] bg-white/20 rounded-full" />
          <div className="absolute top-[10%] left-[45%] w-[1px] h-[1px] bg-white/40 rounded-full" />
          <div className="absolute top-[35%] left-[80%] w-[2px] h-[2px] bg-white/25 rounded-full" />
          <div className="absolute top-[20%] left-[30%] w-[1px] h-[1px] bg-white/35 rounded-full" />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.15} zIndex={2} className="opacity-80">
        <div className="absolute top-[25%] left-[5%] w-[400px] h-[200px]">
          <Image
            src="/images/zones/z01-sky/z01-02-cloud-a.png"
            alt="Cloud A"
            fill
            className="object-contain opacity-60"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.2} zIndex={2} className="opacity-80">
        <div className="absolute top-[35%] right-[5%] w-[350px] h-[180px]">
          <Image
            src="/images/zones/z01-sky/z01-03-cloud-b.png"
            alt="Cloud B"
            fill
            className="object-contain opacity-50"
          />
        </div>
      </ParallaxLayer>

      <div
        className="absolute bottom-0 left-0 right-0 h-[30%] z-3"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(255,176,32,0.06), transparent)',
        }}
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <span className="font-mono text-[9px] tracking-[3px] uppercase text-white/30 mb-8">
          {t('invitation')}
        </span>

        <h1 className="text-3xl font-light tracking-[2px] text-bright mb-2">지훈</h1>
        <span className="text-xl text-rose my-3">♥</span>
        <h1 className="text-3xl font-light tracking-[2px] text-bright mb-6">수진</h1>

        <p className="font-mono text-xs text-white/30 tracking-wide mb-16">
          {t('date')}
        </p>

        <div className="absolute bottom-8 animate-bounce">
          <span className="text-xs text-white/20">↓ {t('scroll')}</span>
        </div>
      </div>
    </section>
  );
}
