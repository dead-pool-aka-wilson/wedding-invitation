'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zone01Sky } from '@/components/zones/Zone01Sky';
import { Zone02Skyline } from '@/components/zones/Zone02Skyline';
import { Zone03MidLevels } from '@/components/zones/Zone03MidLevels';
import { Zone04Street } from '@/components/zones/Zone04Street';
import { Zone05Ground } from '@/components/zones/Zone05Ground';
import { FloatingRSVPButton } from '@/components/rsvp/FloatingRSVPButton';
import { RSVPModal } from '@/components/rsvp/RSVPModal';
import { useRSVPStore } from '@/lib/rsvp/store';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isModalOpen } = useRSVPStore();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative w-full">
      <div 
        className="relative w-full"
        style={{ height: '8670px' }}
      >
        <Zone01Sky />
        <Zone02Skyline />
        <Zone03MidLevels />
        <Zone04Street />
        <Zone05Ground />
      </div>
      
      <FloatingRSVPButton />
      {isModalOpen && <RSVPModal />}
    </main>
  );
}
