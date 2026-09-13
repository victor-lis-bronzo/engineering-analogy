import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { usePhaseStore } from '../store'

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: any) => <div data-testid="r3f-canvas">{children}</div>,
}))

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
}))

vi.mock('@react-three/rapier', () => ({
  Physics: ({ children }: any) => <div>{children}</div>,
  RigidBody: ({ children }: any) => <div>{children}</div>,
}))

describe('Ticket 10: Phase 6 - Retrospective Screen', () => {
  beforeEach(() => {
    usePhaseStore.getState().reset()
  })

  it('ao atingir a Fase 6, a NUI padrão é substituída pelo painel largo de retrospectiva', () => {
    usePhaseStore.getState().setPhase(6)
    render(<App />)

    // O painel de retrospectiva está visível e a NUI padrão está oculta
    expect(screen.getByTestId('retrospective-panel')).toBeDefined()
    expect(screen.queryByTestId('nui-wrapper')).toBeNull()

    // O container da esquerda ganha largura expandida (md:w-[45%])
    const container = screen.getByTestId('nui-container')
    expect(container.className).toContain('md:w-[45%]')
  })

  it('o texto relaciona explicitamente: Dívida Técnica (F1), OCP (F2), SRP/Liskov (F3), Acoplamento/DIP (F4) e Colapso Sistêmico (F5)', () => {
    usePhaseStore.getState().setPhase(6)
    render(<App />)

    expect(screen.getAllByText(/Dívida Técnica/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Open\/Closed Principle \(OCP\)/i)).toBeDefined()
    expect(screen.getByText(/Single Responsibility & Liskov \(SRP \/ LSP\)/i)).toBeDefined()
    expect(screen.getByText(/Inversão de Dependência & Acoplamento \(DIP\)/i)).toBeDefined()
    expect(screen.getByText(/Colapso Sistêmico/i)).toBeDefined()
  })
})
