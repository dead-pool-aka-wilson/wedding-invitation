"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { GlassCard } from "@/components/ui";
import { RSVPFormData } from "@/lib/rsvp/schema";
import { submitRSVP } from "@/lib/rsvp/api";

type Step = "contact" | "attendance" | "headcount" | "busTo" | "busFrom" | "complete";

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

const STEPS_FOR_ATTENDING: Step[] = ["contact", "attendance", "headcount", "busTo", "busFrom", "complete"];
const STEPS_FOR_NOT_ATTENDING: Step[] = ["contact", "attendance", "complete"];

export function RSVPModal({ isOpen, onClose, onComplete }: RSVPModalProps) {
  const t = useTranslations("rsvp");
  const [currentStep, setCurrentStep] = useState<Step>("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<RSVPFormData>>({
    guestCount: 1,
  });

  const steps = formData.attendance === "no" ? STEPS_FOR_NOT_ATTENDING : STEPS_FOR_ATTENDING;
  const currentStepIndex = steps.indexOf(currentStep);
  const totalSteps = steps.length - 1;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const goToNextStep = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  }, [currentStepIndex, steps]);

  const goToPrevStep = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  }, [currentStepIndex, steps]);

  const handleSubmit = useCallback(async () => {
    if (!formData.name || !formData.phone || !formData.side || !formData.attendance) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitRSVP(formData as RSVPFormData);
      if (response.success) {
        setCurrentStep("complete");
        onComplete?.();
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onComplete]);

  const handleClose = useCallback(() => {
    setCurrentStep("contact");
    setFormData({ guestCount: 1 });
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-testid="rsvp-modal"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[rgba(6,8,13,0.85)] backdrop-blur-[24px] cursor-default"
        onClick={handleClose}
        aria-label="Close modal"
      />

      <GlassCard className="relative z-10 w-full max-w-md mx-4 p-6">
        {currentStep !== "complete" && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-white/90">{t("title")}</h2>
            <button
              type="button"
              onClick={handleClose}
              className="text-white/50 hover:text-white/90 transition-colors text-xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}

        {currentStep !== "complete" && (
          <div className="flex gap-2 mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= currentStepIndex ? "bg-green-400" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        )}

        {currentStep === "contact" && (
          <ContactStep
            formData={formData}
            onChange={setFormData}
            onNext={goToNextStep}
            t={t}
          />
        )}

        {currentStep === "attendance" && (
          <AttendanceStep
            formData={formData}
            onChange={setFormData}
            onNext={goToNextStep}
            onPrev={goToPrevStep}
            onSubmit={formData.attendance === "no" ? handleSubmit : undefined}
            isSubmitting={isSubmitting}
            t={t}
          />
        )}

        {currentStep === "headcount" && (
          <HeadcountStep
            formData={formData}
            onChange={setFormData}
            onNext={goToNextStep}
            onPrev={goToPrevStep}
            t={t}
          />
        )}

        {currentStep === "busTo" && (
          <BusToStep
            formData={formData}
            onChange={setFormData}
            onNext={goToNextStep}
            onPrev={goToPrevStep}
            t={t}
          />
        )}

        {currentStep === "busFrom" && (
          <BusFromStep
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onPrev={goToPrevStep}
            isSubmitting={isSubmitting}
            t={t}
          />
        )}

        {currentStep === "complete" && (
          <CompleteStep onClose={handleClose} t={t} />
        )}
      </GlassCard>
    </div>
  );
}

interface StepProps {
  formData: Partial<RSVPFormData>;
  onChange: (data: Partial<RSVPFormData>) => void;
  t: (key: string) => string;
}

function ContactStep({ formData, onChange, onNext, t }: StepProps & { onNext: () => void }) {
  const isValid = formData.name && formData.phone && formData.side;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="rsvp-name" className="block text-sm text-white/70 mb-1">{t("name")}</label>
        <input
          id="rsvp-name"
          type="text"
          value={formData.name || ""}
          onChange={(e) => onChange({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white/90 placeholder:text-white/30 focus:outline-none focus:border-white/30"
          placeholder={t("name")}
        />
      </div>
      <div>
        <label htmlFor="rsvp-phone" className="block text-sm text-white/70 mb-1">{t("phone")}</label>
        <input
          id="rsvp-phone"
          type="tel"
          value={formData.phone || ""}
          onChange={(e) => onChange({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white/90 placeholder:text-white/30 focus:outline-none focus:border-white/30"
          placeholder="010-0000-0000"
        />
      </div>
      <div>
        <span className="block text-sm text-white/70 mb-1">{t("side")}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...formData, side: "groom" })}
            className={`flex-1 py-2 rounded-lg border transition-colors ${
              formData.side === "groom"
                ? "bg-white/10 border-white/30 text-white/90"
                : "bg-white/5 border-white/10 text-white/50"
            }`}
          >
            {t("groomSide")}
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...formData, side: "bride" })}
            className={`flex-1 py-2 rounded-lg border transition-colors ${
              formData.side === "bride"
                ? "bg-white/10 border-white/30 text-white/90"
                : "bg-white/5 border-white/10 text-white/50"
            }`}
          >
            {t("brideSide")}
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={onNext}
        disabled={!isValid}
        className="w-full py-3 mt-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-500/30 transition-colors"
      >
        →
      </button>
    </div>
  );
}

function AttendanceStep({
  formData,
  onChange,
  onNext,
  onPrev,
  onSubmit,
  isSubmitting,
  t,
}: StepProps & {
  onNext: () => void;
  onPrev: () => void;
  onSubmit?: () => void;
  isSubmitting: boolean;
}) {
  const handleSelect = (attendance: "yes" | "no") => {
    onChange({ ...formData, attendance });
  };

  const handleContinue = () => {
    if (formData.attendance === "no" && onSubmit) {
      onSubmit();
    } else {
      onNext();
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-center text-white/90 text-lg mb-6">{t("attendance")}</p>
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => handleSelect("yes")}
          className={`py-4 rounded-lg border text-lg transition-colors ${
            formData.attendance === "yes"
              ? "bg-green-500/20 border-green-500/30 text-green-400"
              : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
          }`}
        >
          🎉 {t("yes")}
        </button>
        <button
          type="button"
          onClick={() => handleSelect("no")}
          className={`py-4 rounded-lg border text-lg transition-colors ${
            formData.attendance === "no"
              ? "bg-red-500/20 border-red-500/30 text-red-400"
              : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
          }`}
        >
          😢 {t("no")}
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-3 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
        >
          ←
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!formData.attendance || isSubmitting}
          className="flex-1 py-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-500/30 transition-colors"
        >
          {isSubmitting ? "..." : "→"}
        </button>
      </div>
    </div>
  );
}

function HeadcountStep({
  formData,
  onChange,
  onNext,
  onPrev,
  t,
}: StepProps & { onNext: () => void; onPrev: () => void }) {
  const counts = [1, 2, 3, 4];

  return (
    <div className="space-y-4">
      <p className="text-center text-white/90 text-lg mb-6">{t("headcount")}</p>
      <div className="grid grid-cols-4 gap-2">
        {counts.map((count) => (
          <button
            key={count}
            type="button"
            onClick={() => onChange({ ...formData, guestCount: count })}
            className={`py-4 rounded-lg border text-xl transition-colors ${
              formData.guestCount === count
                ? "bg-white/10 border-white/30 text-white/90"
                : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
            }`}
          >
            {count}{count === 4 ? "+" : ""}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-3 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
        >
          ←
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 py-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 font-medium hover:bg-green-500/30 transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
}

function BusToStep({
  formData,
  onChange,
  onNext,
  onPrev,
  t,
}: StepProps & { onNext: () => void; onPrev: () => void }) {
  return (
    <div className="space-y-4">
      <p className="text-center text-white/90 text-lg mb-6">{t("busTo")}</p>
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onChange({ ...formData, busToVenue: "use" })}
          className={`py-4 rounded-lg border text-lg transition-colors ${
            formData.busToVenue === "use"
              ? "bg-white/10 border-white/30 text-white/90"
              : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
          }`}
        >
          🚌 {t("yes")}
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...formData, busToVenue: "self" })}
          className={`py-4 rounded-lg border text-lg transition-colors ${
            formData.busToVenue === "self"
              ? "bg-white/10 border-white/30 text-white/90"
              : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
          }`}
        >
          🚗 {t("self")}
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-3 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
        >
          ←
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!formData.busToVenue}
          className="flex-1 py-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-500/30 transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
}

function BusFromStep({
  formData,
  onChange,
  onSubmit,
  onPrev,
  isSubmitting,
  t,
}: StepProps & { onSubmit: () => void; onPrev: () => void; isSubmitting: boolean }) {
  return (
    <div className="space-y-4">
      <p className="text-center text-white/90 text-lg mb-6">{t("busFrom")}</p>
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onChange({ ...formData, busFromVenue: "sameDay" })}
          className={`py-4 rounded-lg border text-lg transition-colors ${
            formData.busFromVenue === "sameDay"
              ? "bg-white/10 border-white/30 text-white/90"
              : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
          }`}
        >
          🌙 {t("sameDay")}
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...formData, busFromVenue: "nextMorning" })}
          className={`py-4 rounded-lg border text-lg transition-colors ${
            formData.busFromVenue === "nextMorning"
              ? "bg-white/10 border-white/30 text-white/90"
              : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
          }`}
        >
          ☀️ {t("nextMorning")}
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...formData, busFromVenue: "self" })}
          className={`py-4 rounded-lg border text-lg transition-colors ${
            formData.busFromVenue === "self"
              ? "bg-white/10 border-white/30 text-white/90"
              : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
          }`}
        >
          🚗 {t("self")}
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-3 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
        >
          ←
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!formData.busFromVenue || isSubmitting}
          className="flex-1 py-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-500/30 transition-colors"
        >
          {isSubmitting ? "..." : t("submit")}
        </button>
      </div>
    </div>
  );
}

function CompleteStep({ onClose, t }: { onClose: () => void; t: (key: string) => string }) {
  return (
    <div className="text-center py-8">
      <div className="text-5xl mb-4">✓</div>
      <h3 className="text-xl font-medium text-white/90 mb-2">{t("success")}</h3>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white/90 hover:bg-white/20 transition-colors"
      >
        ×
      </button>
    </div>
  );
}
