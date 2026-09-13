import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { NUI } from '../components/NUI'
import { usePhaseStore } from '../store'

describe('NUI (Narrative UI)', () => {
  beforeEach(() => {
    usePhaseStore.getState().reset()
  })

  it('renderiza texto "Fase 0" e botões clicáveis que alteram o número na tela', () => {
    render(<NUI />)
    
    const indicator = screen.getByTestId('phase-indicator')
    expect(indicator.textContent).toContain('Fase 0')
    
    const nextButton = screen.getByRole('button', { name: /Próxima/i })
    fireEvent.click(nextButton)
    
    expect(indicator.textContent).toContain('Fase 1')
  })
})
