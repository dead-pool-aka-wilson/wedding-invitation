'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { ParallaxLayer } from '@/components/parallax';
import { GlassCard } from '@/components/ui';

gsap.registerPlugin(ScrollTrigger);

export function Zone04Street() {
  const t = useTranslations();
  const zoneRef = useRef<HTMLDivElement>(null);
  const tramRef = useRef<HTMLDivElement>(null);
  const taxiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!zoneRef.current || !tramRef.current || !taxiRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        tramRef.current,
        { x: '-150%' },
        {
          x: '150%',
          ease: 'none',
          scrollTrigger: {
            trigger: zoneRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        taxiRef.current,
        { x: '150%' },
        {
          x: '-150%',
          ease: 'none',
          scrollTrigger: {
            trigger: zoneRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );
    }, zoneRef);

    return () => ctx.revert();
  }, []);

  const galleryImages = [1, 2, 3, 4, 5, 6];

  return (
    <section
      ref={zoneRef}
      className="absolute left-0 w-full overflow-hidden"
      style={{ top: '4880px', height: '2490px' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1e2a3a 0%, #12161e 30%, #1a1e28 100%)',
        }}
      />

      <ParallaxLayer speed={0.4} zIndex={1}>
        <div className="absolute inset-0 opacity-80">
          <div
            className="absolute top-0 left-0 right-0 h-[60%]"
            style={{ background: 'linear-gradient(180deg, #12161e, #1a1e28)' }}
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.85} zIndex={2}>
        <div className="absolute top-[20%] left-0 right-0 h-[400px] opacity-60">
          {['當', '藥房', '裁縫', '麻雀'].map((text, i) => (
            <div
              key={i}
              className="absolute font-mono text-lg"
              style={{
                left: `${15 + i * 20}%`,
                top: `${20 + (i % 2) * 30}%`,
                color: ['#ff4040', '#2dda6e', '#00d4ff', '#ffe066'][i],
                textShadow: `0 0 10px currentColor`,
                opacity: 0.6,
                filter: 'blur(1px)',
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.0} zIndex={3}>
        <div className="absolute top-[30%] left-0 right-0 flex justify-between px-4">
          <div className="space-y-4">
            <div
              className="font-mono text-xl font-bold px-2 py-1"
              style={{ color: '#ff4040', textShadow: '0 0 15px #ff4040' }}
            >
              茶餐廳
            </div>
            <div
              className="font-mono text-lg font-bold px-2 py-1"
              style={{ color: '#ffb020', textShadow: '0 0 12px #ffb020' }}
            >
              金行
            </div>
          </div>
          <div className="space-y-4">
            <div
              className="font-mono text-xl font-bold px-2 py-1"
              style={{ color: '#00d4ff', textShadow: '0 0 15px #00d4ff' }}
            >
              BAR
            </div>
            <div
              className="font-mono text-lg font-bold px-2 py-1"
              style={{ color: '#2dda6e', textShadow: '0 0 12px #2dda6e' }}
            >
              押
            </div>
          </div>
        </div>
      </ParallaxLayer>

      <div
        ref={tramRef}
        className="absolute top-[55%] left-0 w-[110px] h-[150px] z-20"
      >
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0 rounded-lg"
            style={{ background: '#8b0000', border: '2px solid #f5f5dc' }}
          />
          <div className="absolute top-2 left-2 right-2 h-[60%] bg-yellow-100/20 rounded" />
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-3 rounded"
            style={{ background: '#ffe066', boxShadow: '0 0 10px #ffe066' }}
          />
        </div>
      </div>

      <div
        ref={taxiRef}
        className="absolute top-[65%] right-0 w-[65px] h-[38px] z-20"
      >
        <div
          className="w-full h-full rounded"
          style={{ background: '#ff0000', boxShadow: '0 0 8px rgba(255,0,0,0.5)' }}
        />
      </div>

      <ParallaxLayer speed={1.0} zIndex={5}>
        <div className="absolute bottom-[10%] left-0 right-0 h-[55px]">
          <div className="flex justify-center gap-[100px]">
            <div className="w-full h-[2px] bg-gray-600" />
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.05} zIndex={6}>
        <div
          className="absolute bottom-0 left-0 right-0 h-[300px]"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.3))',
          }}
        >
          <div className="absolute inset-0 opacity-40">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-[60px] w-[2px]"
                style={{
                  left: `${5 + i * 5}%`,
                  bottom: 0,
                  background: `linear-gradient(180deg, transparent, ${
                    ['#ff4040', '#00d4ff', '#ffb020', '#2dda6e'][i % 4]
                  }20)`,
                }}
              />
            ))}
          </div>
        </div>
      </ParallaxLayer>

      <div className="absolute inset-0 z-10 flex flex-col items-center px-6">
        <div className="mt-[200px] w-full max-w-[340px]">
          <h3 className="font-mono text-xs tracking-widest text-amber uppercase text-center mb-6">
            {t('gallery.title')}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {galleryImages.map((num) => (
              <div
                key={num}
                className="aspect-square rounded-lg bg-surface-2 flex items-center justify-center"
                style={{
                  border: '2px solid',
                  borderColor: ['var(--cyan)', 'var(--pink)', 'var(--amber)'][num % 3],
                  boxShadow: `0 0 15px ${['rgba(0,212,255,0.3)', 'rgba(255,61,138,0.3)', 'rgba(255,176,32,0.3)'][num % 3]}`,
                }}
              >
                <span className="text-dim text-sm">Photo {num}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[400px] w-full max-w-[320px]">
          <GlassCard>
            <h3 className="font-mono text-xs tracking-widest text-amber uppercase text-center mb-4">
              {t('account.title')}
            </h3>
            
            <div className="space-y-4">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
                  <span className="text-bright">{t('account.groom_side')}</span>
                  <span className="text-dim group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 p-3 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-dim">◯◯은행 123-456-789</span>
                    <button className="text-cyan text-xs hover:underline">
                      {t('account.copy')}
                    </button>
                  </div>
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
                  <span className="text-bright">{t('account.bride_side')}</span>
                  <span className="text-dim group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 p-3 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-dim">◯◯은행 987-654-321</span>
                    <button className="text-cyan text-xs hover:underline">
                      {t('account.copy')}
                    </button>
                  </div>
                </div>
              </details>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
