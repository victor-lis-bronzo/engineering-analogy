import { create } from 'zustand'

export interface PhaseState {
  phase: number;
  currentPhase: number;
  setPhase: (phase: number) => void;
  nextPhase: () => void;
  prevPhase: () => void;
  reset: () => void;
}

export const usePhaseStore = create<PhaseState>((set) => ({
  phase: 0,
  currentPhase: 0,
  setPhase: (phase) => {
    const clamped = Math.max(0, Math.min(6, phase))
    set({ phase: clamped, currentPhase: clamped })
  },
  nextPhase: () =>
    set((state) => {
      const next = Math.min(state.phase + 1, 6)
      return { phase: next, currentPhase: next }
    }),
  prevPhase: () =>
    set((state) => {
      const prev = Math.max(state.phase - 1, 0)
      return { phase: prev, currentPhase: prev }
    }),
  reset: () => set({ phase: 0, currentPhase: 0 }),
}))

export const useSimulationStore = usePhaseStore
