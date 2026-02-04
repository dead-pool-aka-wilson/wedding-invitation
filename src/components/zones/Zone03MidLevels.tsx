'use client';

import { useRef } from 'react';
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
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #15202e 0%, #1a2535 50%, #1e2a3a 100%)',
        }}
      />

      <ParallaxLayer speed={0.4} zIndex={1}>
        <div className="absolute inset-0 opacity-90">
          <div
            className="absolute top-0 left-[5%] w-[25%] h-full"
            style={{ background: 'linear-gradient(180deg, #15202e, #1a1e28)' }}
          />
          <div
            className="absolute top-0 right-[5%] w-[25%] h-full"
            style={{ background: 'linear-gradient(180deg, #15202e, #1a1e28)' }}
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.7} zIndex={2}>
        <div
          className="absolute top-0 left-[15%] w-[4px] h-full"
          style={{
            background: 'linear-gradient(180deg, rgba(0,212,255,0.05), rgba(0,212,255,0.2), rgba(0,212,255,0.05))',
            boxShadow: '0 0 8px rgba(0,212,255,0.15)',
          }}
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.7} zIndex={3}>
        <div className="absolute inset-0">
          <div
            className="absolute top-[30%] left-[5%] w-1 h-1 rounded-full"
            style={{ background: 'var(--pink)', boxShadow: '0 0 6px var(--pink)' }}
          />
          <div
            className="absolute top-[55%] right-[10%] w-1 h-1 rounded-full"
            style={{ background: 'var(--amber)', boxShadow: '0 0 6px var(--amber)' }}
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.0} zIndex={4}>
        <div className="absolute bottom-[20%] left-0 right-0 h-[500px]">
          <div className="absolute inset-0 flex gap-4 justify-center px-4">
            <div className="w-[120px] h-full rounded-lg bg-surface-2/50 backdrop-blur-sm" />
            <div className="w-[100px] h-full rounded-lg bg-surface-2/50 backdrop-blur-sm" />
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.4} zIndex={5} className="pointer-events-none">
        <div
          className="absolute top-[60%] left-0 right-0 h-[200px] blur-sm"
          style={{ background: 'linear-gradient(90deg, rgba(255,192,96,0.1), transparent, rgba(255,96,144,0.1))' }}
        />
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
              <span className="text-dim text-sm">Map Placeholder</span>
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
