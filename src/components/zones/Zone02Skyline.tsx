'use client';

import { useRef } from 'react';
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
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0a1628 0%, #0f1f3a 40%, #15202e 100%)',
        }}
      />

      <ParallaxLayer speed={0.3} zIndex={1}>
        <div className="absolute bottom-0 left-0 right-0 h-[65%] opacity-80">
          <div
            className="absolute bottom-0 left-0 w-[18%] h-[70%]"
            style={{ background: 'linear-gradient(180deg, #0d1520, #152030)' }}
          />
          <div
            className="absolute bottom-0 left-[20%] w-[12%] h-[90%]"
            style={{ background: 'linear-gradient(180deg, #0d1520, #152030)' }}
          />
          <div
            className="absolute bottom-0 right-[14%] w-[14%] h-[75%]"
            style={{ background: 'linear-gradient(180deg, #0d1520, #152030)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-[14%] h-[85%]"
            style={{ background: 'linear-gradient(180deg, #0d1520, #152030)' }}
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.5} zIndex={2}>
        <div className="absolute top-[20%] left-0 right-0 h-[220px] opacity-40">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(180,160,140,0.15), transparent)',
            }}
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.5} zIndex={3}>
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[3px] h-[2px] rounded-sm"
              style={{
                left: `${5 + Math.random() * 90}%`,
                top: `${30 + Math.random() * 60}%`,
                background: Math.random() > 0.8 ? '#aaccff' : '#ffe066',
                boxShadow: `0 0 ${2 + Math.random() * 3}px currentColor`,
                opacity: 0.4 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>
      </ParallaxLayer>

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
