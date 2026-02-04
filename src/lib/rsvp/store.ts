import { create } from 'zustand';

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
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data },
  })),
  reset: () => set({ currentStep: 1, formData: initialFormData }),
}));
