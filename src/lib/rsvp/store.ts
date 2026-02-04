import { create } from 'zustand';
import { TOTAL_STEPS } from './constants';

interface RSVPState {
  isModalOpen: boolean;
  currentStep: number;
  formData: {
    attending: boolean | null;
    headcount: number;
    busTo: boolean | null;
    busFrom: 'same_day' | 'next_morning' | 'self' | null;
  };
  openModal: () => void;
  closeModal: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  setFormData: (data: Partial<RSVPState['formData']>) => void;
  reset: () => void;
}

const initialFormData = {
  attending: null,
  headcount: 1,
  busTo: null,
  busFrom: null,
};

export const useRSVPStore = create<RSVPState>((set) => ({
  isModalOpen: false,
  currentStep: 1,
  formData: initialFormData,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  nextStep: () => set((state) => ({ currentStep: Math.min(TOTAL_STEPS, state.currentStep + 1) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
  goToStep: (step: number) => set({ currentStep: step }),
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data },
  })),
  reset: () => set({ currentStep: 1, formData: initialFormData }),
}));
