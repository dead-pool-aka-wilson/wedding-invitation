'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { ParallaxLayer } from '@/components/parallax';
import { GlassCard } from '@/components/ui';

gsap.registerPlugin(ScrollTrigger);

export function Zone05Ground() {
  const t = useTranslations();
  const tClosing = useTranslations('closing');
  const tCover = useTranslations('cover');
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
      <div className="absolute inset-0">
        <Image
          src="/images/zones/z05-ground/z05-01-dai-pai-dong.png"
          alt="Dai Pai Dong"
          fill
          className="object-cover"
        />
      </div>

      <ParallaxLayer speed={0.7} zIndex={1}>
        <div className="absolute top-0 left-0 right-0 h-[500px]">
          <Image
            src="/images/zones/z05-ground/z05-02-cha-chaan-teng.png"
            alt="Cha Chaan Teng"
            fill
            className="object-contain object-top"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.0} zIndex={2}>
        <div className="absolute inset-0 opacity-60">
          <Image
            src="/images/zones/z05-ground/z05-03-pavement.png"
            alt="Pavement"
            fill
            className="object-cover"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.0} zIndex={4}>
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[300px] h-[180px]">
          <Image
            src="/images/zones/z05-ground/z05-04-puddle.png"
            alt="Puddle"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 mix-blend-overlay opacity-50">
            <Image
              src="/images/zones/z05-ground/z05-05-puddle-reflection.png"
              alt="Puddle Reflection"
              fill
              className="object-contain"
            />
          </div>
          <div
            ref={rippleRef}
            className="absolute inset-0 rounded-full border border-white/20"
            style={{ transform: 'scale(0.8)' }}
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.6} zIndex={6} className="pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[200px]">
          <Image
            src="/images/zones/z05-ground/z05-06-debris.png"
            alt="Debris"
            fill
            className="object-cover object-bottom"
          />
        </div>
      </ParallaxLayer>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-[320px] text-center">
          <GlassCard className="mb-8">
            <h2 className="text-2xl text-bright mb-4">{tClosing('title')}</h2>
            <p className="text-white/60">{tClosing('message')}</p>
          </GlassCard>

          <p className="text-sm text-white/30 font-mono">
            💕 {tCover('date')}
          </p>
        </div>
      </div>
    </section>
  );
}
