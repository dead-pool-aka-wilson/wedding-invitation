import { describe, it, expect, beforeEach } from 'vitest';
import { useRSVPStore } from './store';

describe('useRSVPStore', () => {
  beforeEach(() => {
    useRSVPStore.getState().reset();
  });

  it('initializes with default values', () => {
    const state = useRSVPStore.getState();
    expect(state.isModalOpen).toBe(false);
    expect(state.currentStep).toBe(1);
    expect(state.formData.attending).toBe(null);
  });

  it('opens and closes modal', () => {
    const { openModal, closeModal } = useRSVPStore.getState();
    
    openModal();
    expect(useRSVPStore.getState().isModalOpen).toBe(true);
    
    closeModal();
    expect(useRSVPStore.getState().isModalOpen).toBe(false);
  });

  it('navigates through steps', () => {
    const { nextStep, prevStep } = useRSVPStore.getState();
    
    nextStep();
    expect(useRSVPStore.getState().currentStep).toBe(2);
    
    nextStep();
    expect(useRSVPStore.getState().currentStep).toBe(3);
    
    prevStep();
    expect(useRSVPStore.getState().currentStep).toBe(2);
  });

  it('does not go below step 1', () => {
    const { prevStep } = useRSVPStore.getState();
    
    prevStep();
    expect(useRSVPStore.getState().currentStep).toBe(1);
  });

  it('updates form data', () => {
    const { setFormData } = useRSVPStore.getState();
    
    setFormData({ attending: true, headcount: 3 });
    
    const { formData } = useRSVPStore.getState();
    expect(formData.attending).toBe(true);
    expect(formData.headcount).toBe(3);
  });

  it('resets to initial state', () => {
    const { nextStep, setFormData, reset } = useRSVPStore.getState();
    
    nextStep();
    nextStep();
    setFormData({ attending: true, headcount: 2 });
    
    reset();
    
    const state = useRSVPStore.getState();
    expect(state.currentStep).toBe(1);
    expect(state.formData.attending).toBe(null);
    expect(state.formData.headcount).toBe(1);
  });
});
