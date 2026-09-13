import { create } from 'zustand'
import { VariantType } from './utils/generateStructure'

export interface PhaseState {
  phase: number;
  currentPhase: number;
  variant: VariantType;
  setPhase: (phase: number) => void;
  setVariant: (variant: VariantType) => void;
  nextPhase: () => void;
  prevPhase: () => void;
  reset: () => void;
}

const getInitialVariant = (): VariantType => {
  if (typeof window !== 'undefined') {
    const param = new URLSearchParams(window.location.search).get('variant')?.toUpperCase()
    if (param === 'A' || param === 'B' || param === 'C') {
      return param as VariantType
    }
  }
  return 'A'
}

export const usePhaseStore = create<PhaseState>((set) => ({
  phase: 0,
  currentPhase: 0,
  variant: getInitialVariant(),
  setPhase: (phase) => {
    const clamped = Math.max(0, Math.min(6, phase))
    set({ phase: clamped, currentPhase: clamped })
  },
  setVariant: (variant) => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('variant', variant)
      window.history.replaceState({}, '', url.toString())
    }
    set({ variant })
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
