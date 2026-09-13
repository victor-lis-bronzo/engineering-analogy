import { describe, it, expect, beforeEach } from 'vitest'
import { usePhaseStore } from '../store'

describe('usePhaseStore', () => {
  beforeEach(() => {
    usePhaseStore.getState().reset()
  })

  it('incrementa de 0 para 1 ao chamar nextPhase()', () => {
    expect(usePhaseStore.getState().phase).toBe(0)
    usePhaseStore.getState().nextPhase()
    expect(usePhaseStore.getState().phase).toBe(1)
    expect(usePhaseStore.getState().currentPhase).toBe(1)
  })

  it('não permite avançar além da fase máxima (6)', () => {
    usePhaseStore.getState().setPhase(6)
    expect(usePhaseStore.getState().phase).toBe(6)
    usePhaseStore.getState().nextPhase()
    expect(usePhaseStore.getState().phase).toBe(6)
  })

  it('não permite voltar abaixo da fase 0', () => {
    expect(usePhaseStore.getState().phase).toBe(0)
    usePhaseStore.getState().prevPhase()
    expect(usePhaseStore.getState().phase).toBe(0)
  })
})
