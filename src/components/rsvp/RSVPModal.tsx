'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRSVPStore } from '@/lib/rsvp/store';
import { GlassCard } from '@/components/ui';

export function RSVPModal() {
  const t = useTranslations('rsvp');
  const { 
    closeModal, 
    currentStep, 
    nextStep, 
    prevStep, 
    goToStep,
    formData, 
    setFormData,
    reset 
  } = useRSVPStore();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    reset();
    closeModal();
  };

  const totalSteps = 5;

  const handleAttendance = (attending: boolean) => {
    setFormData({ attending });
    if (attending) {
      nextStep();
    } else {
      goToStep(totalSteps);
    }
  };

  const handleHeadcount = (count: number) => {
    setFormData({ headcount: count });
    nextStep();
  };

  const handleBusTo = (useBus: boolean) => {
    setFormData({ busTo: useBus });
    nextStep();
  };

  const handleBusFrom = (option: 'same_day' | 'next_morning' | 'self') => {
    setFormData({ busFrom: option });
    nextStep();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-bg/85 backdrop-blur-2xl"
        onClick={handleClose}
      />
      
      <div className="relative z-10 w-full max-w-[360px] mx-4">
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 text-dim hover:text-bright transition"
        >
          ✕ Close
        </button>

        <div className="flex justify-center gap-2 mb-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i + 1 <= currentStep ? 'bg-green' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        <GlassCard className="min-h-[300px] flex flex-col justify-center">
          {currentStep === 1 && (
            <div className="text-center space-y-6">
              <h2 className="text-xl text-bright">{t('attendance')}</h2>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleAttendance(true)}
                  className="w-full py-4 rounded-xl bg-green/20 border border-green/30 text-bright hover:bg-green/30 transition"
                >
                  🎉 {t('yes')}
                </button>
                <button
                  onClick={() => handleAttendance(false)}
                  className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-dim hover:bg-white/10 transition"
                >
                  😢 {t('no')}
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center space-y-6">
              <h2 className="text-xl text-bright">{t('headcount')}</h2>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((count) => (
                  <button
                    key={count}
                    onClick={() => handleHeadcount(count)}
                    className={`py-4 rounded-xl border text-lg transition ${
                      formData.headcount === count
                        ? 'bg-cyan/20 border-cyan/30 text-bright'
                        : 'bg-white/5 border-white/10 text-dim hover:bg-white/10'
                    }`}
                  >
                    {count}{count === 4 && '+'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center space-y-6">
              <h2 className="text-xl text-bright">{t('bus_to')}</h2>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleBusTo(true)}
                  className="w-full py-4 rounded-xl bg-amber/20 border border-amber/30 text-bright hover:bg-amber/30 transition"
                >
                  🚌 {t('use_bus')}
                </button>
                <button
                  onClick={() => handleBusTo(false)}
                  className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-dim hover:bg-white/10 transition"
                >
                  🚗 {t('self')}
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center space-y-6">
              <h2 className="text-xl text-bright">{t('bus_from')}</h2>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleBusFrom('same_day')}
                  className="w-full py-4 rounded-xl bg-amber/20 border border-amber/30 text-bright hover:bg-amber/30 transition"
                >
                  {t('same_day')}
                </button>
                <button
                  onClick={() => handleBusFrom('next_morning')}
                  className="w-full py-4 rounded-xl bg-purple/20 border border-purple/30 text-bright hover:bg-purple/30 transition"
                >
                  {t('next_morning')}
                </button>
                <button
                  onClick={() => handleBusFrom('self')}
                  className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-dim hover:bg-white/10 transition"
                >
                  {t('self')}
                </button>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center space-y-6">
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-2xl text-bright">{t('complete')}</h2>
              <p className="text-dim">
                {formData.attending 
                  ? '결혼식에서 뵙겠습니다!' 
                  : '다음에 꼭 뵙겠습니다.'}
              </p>
              <div className="flex flex-col gap-2 pt-4">
                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl bg-cyan/20 border border-cyan/30 text-bright hover:bg-cyan/30 transition"
                >
                  {t('view_invitation')}
                </button>
              </div>
            </div>
          )}

          {currentStep > 1 && currentStep < 5 && (
            <button
              onClick={prevStep}
              className="mt-6 text-sm text-dim hover:text-bright transition"
            >
              ← Back
            </button>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
