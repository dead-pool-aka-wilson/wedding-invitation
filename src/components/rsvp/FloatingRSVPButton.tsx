'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRSVPStore } from '@/lib/rsvp/store';

export function FloatingRSVPButton() {
  const t = useTranslations('rsvp');
  const { openModal } = useRSVPStore();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);

      if (y > 2400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (y > 6800) {
        setIsPulsing(true);
      } else {
        setIsPulsing(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const opacity = scrollY > 4500 ? 1 : 0.7;

  return (
    <button
      onClick={openModal}
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-50
        px-6 py-3 rounded-full
        backdrop-blur-xl bg-green/20 border border-green/30
        text-bright font-medium text-sm
        transition-all duration-300
        hover:bg-green/30 hover:scale-105
        ${isPulsing ? 'animate-pulse shadow-lg shadow-green/30' : ''}
      `}
      style={{ opacity }}
    >
      {t('button')}
    </button>
  );
}
