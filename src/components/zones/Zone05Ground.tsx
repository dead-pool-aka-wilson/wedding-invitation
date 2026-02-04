'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { ParallaxLayer } from '@/components/parallax';
import { GlassCard } from '@/components/ui';

gsap.registerPlugin(ScrollTrigger);

export function Zone05Ground() {
  const t = useTranslations('closing');
  const zoneRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rippleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(rippleRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: 'power1.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={zoneRef}
      className="absolute left-0 w-full overflow-hidden"
      style={{ top: '7370px', height: '1300px' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1a1e28 0%, #151515 50%, #080808 100%)',
        }}
      />

      <ParallaxLayer speed={0.7} zIndex={1}>
        <div className="absolute top-0 left-0 right-0 h-[500px]">
          <div className="relative w-full h-full flex justify-center">
            <div
              className="w-[300px] h-[400px] rounded-t-lg"
              style={{
                background: 'linear-gradient(180deg, #1a1e28, #12161e)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[80%] h-3 bg-cyan/20 rounded" />
              <div
                className="absolute top-10 left-4 right-4 text-center font-mono text-xs text-green"
                style={{ textShadow: '0 0 8px var(--green)' }}
              >
                雲吞麵 · 粥 · 炒飯
              </div>
            </div>
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.0} zIndex={2}>
        <div className="absolute top-[40%] left-0 right-0 h-[200px]">
          <div className="flex flex-wrap justify-center gap-2 px-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded"
                style={{
                  background: ['#ff6666', '#66ff66', '#ff6666', '#66ff66'][i % 4],
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.1} zIndex={3}>
        <div className="absolute bottom-[30%] left-0 right-0 h-[300px]">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.5))',
              }}
            />
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-full w-[1px]"
                style={{
                  left: `${10 + i * 9}%`,
                  background: 'rgba(255,255,255,0.03)',
                }}
              />
            ))}
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.0} zIndex={4}>
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[200px] h-[120px]">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(30,30,30,0.8), rgba(10,10,10,0.9))',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
            }}
          />
          <div
            ref={rippleRef}
            className="absolute inset-0 rounded-full border border-white/5"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.9} zIndex={5}>
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[180px] h-[100px]">
          <div
            className="absolute inset-0 rounded-full blur-sm opacity-60"
            style={{
              background: 'linear-gradient(180deg, rgba(255,64,64,0.2), rgba(0,212,255,0.2), rgba(255,176,32,0.2))',
              transform: 'scaleY(-1)',
            }}
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.6} zIndex={6} className="pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[100px] blur-[2px] opacity-30">
          <div className="flex justify-around items-end h-full px-4">
            <div className="w-4 h-2 bg-amber/30 rounded" />
            <div className="w-6 h-1 bg-cyan/20 rounded" />
            <div className="w-3 h-3 bg-green/20 rounded" />
          </div>
        </div>
      </ParallaxLayer>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-[320px] text-center">
          <GlassCard className="mb-8">
            <h2 className="text-2xl text-bright mb-4">{t('title')}</h2>
            <p className="text-white/60">{t('message')}</p>
          </GlassCard>

          <p className="text-sm text-white/30 font-mono">
            💕 2025. 4. 4
          </p>
        </div>
      </div>
    </section>
  );
}
