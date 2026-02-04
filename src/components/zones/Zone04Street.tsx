'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { ParallaxLayer } from '@/components/parallax';
import { GlassCard } from '@/components/ui';

gsap.registerPlugin(ScrollTrigger);

export function Zone04Street() {
  const t = useTranslations();
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = async (account: string) => {
    try {
      await navigator.clipboard.writeText(account);
      setCopiedAccount(account);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
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
      <div className="absolute inset-0">
        <Image
          src="/images/zones/z04-street/z04-01-building-upper.png"
          alt="Building Upper"
          fill
          className="object-cover"
        />
      </div>

      <ParallaxLayer speed={0.4} zIndex={1}>
        <div className="absolute inset-0 opacity-80">
          <Image
            src="/images/zones/z04-street/z04-02-far-neon.png"
            alt="Far Neon"
            fill
            className="object-cover"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.85} zIndex={2}>
        <div className="absolute inset-0">
          <Image
            src="/images/zones/z04-street/z04-03-near-neon-hero.png"
            alt="Near Neon Hero"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 mix-blend-screen">
            <Image
              src="/images/zones/z04-street/z04-04-neon-glow.png"
              alt="Neon Glow"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </ParallaxLayer>

      <div
        ref={tramRef}
        className="absolute top-[55%] left-0 w-[300px] h-[400px] z-20"
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/zones/z04-street/z04-05-tram.png"
            alt="Tram"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 mix-blend-screen">
            <Image
              src="/images/zones/z04-street/z04-06-tram-headlight.png"
              alt="Tram Headlight"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div
        ref={taxiRef}
        className="absolute top-[65%] right-0 w-[250px] h-[150px] z-20"
      >
        <Image
          src="/images/zones/z04-street/z04-07-taxi.png"
          alt="Taxi"
          fill
          className="object-contain"
        />
      </div>

      <ParallaxLayer speed={1.0} zIndex={5}>
        <div className="absolute bottom-[10%] left-0 right-0 h-[200px]">
          <Image
            src="/images/zones/z04-street/z04-08-tram-tracks.png"
            alt="Tram Tracks"
            fill
            className="object-cover object-bottom"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.05} zIndex={6}>
        <div className="absolute bottom-0 left-0 right-0 h-[400px]">
          <Image
            src="/images/zones/z04-street/z04-09-wet-road.png"
            alt="Wet Road"
            fill
            className="object-cover object-bottom"
          />
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
                <span className="text-dim text-sm">{t('gallery.photo', { num })}</span>
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
                    <button 
                      type="button" 
                      onClick={() => handleCopy('123-456-789')}
                      className="text-cyan text-xs hover:underline"
                    >
                      {copiedAccount === '123-456-789' ? t('account.copied') : t('account.copy')}
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
                    <button 
                      type="button" 
                      onClick={() => handleCopy('987-654-321')}
                      className="text-cyan text-xs hover:underline"
                    >
                      {copiedAccount === '987-654-321' ? t('account.copied') : t('account.copy')}
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
