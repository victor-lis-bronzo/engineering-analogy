import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Structure } from '../components/Structure'
import { usePhaseStore } from '../store'

const mockRigidBody = vi.fn(({ children, type, 'data-testid': testId }: any) => (
  <div data-testid={testId} data-body-type={type}>
    {children}
  </div>
))

vi.mock('@react-three/rapier', () => ({
  Physics: ({ children }: any) => <div data-testid="physics-provider">{children}</div>,
  RigidBody: (props: any) => mockRigidBody(props),
}))

describe('Ticket 08: Phase 5 - The Collapse and Reset', () => {
  beforeEach(() => {
    mockRigidBody.mockClear()
    usePhaseStore.getState().reset()
  })

  it('ao atingir phase === 5, os blocos tornam-se dynamic para permitir o colapso', () => {
    usePhaseStore.getState().setPhase(5)
    render(<Structure />)

    const blockCalls = mockRigidBody.mock.calls.filter(
      (call) => call[0]['data-testid']?.startsWith('rigidbody-') && call[0]['data-testid'] !== 'rigidbody-floor'
    )

    expect(blockCalls.length).toBeGreaterThan(0)
    blockCalls.forEach((call) => {
      expect(call[0].type).toBe('dynamic')
    })
  })

  it('ao voltar para a Fase 4, reinicia perfeitamente os blocos como estáticos (type="fixed")', () => {
    // 1. Simula fase 5 (colapso)
    usePhaseStore.getState().setPhase(5)
    const { rerender } = render(<Structure />)

    // 2. Volta para a Fase 4 (reset)
    usePhaseStore.getState().setPhase(4)
    mockRigidBody.mockClear()
    rerender(<Structure />)

    const blockCalls = mockRigidBody.mock.calls.filter(
      (call) => call[0]['data-testid']?.startsWith('rigidbody-') && call[0]['data-testid'] !== 'rigidbody-floor'
    )

    expect(blockCalls.length).toBeGreaterThan(0)
    blockCalls.forEach((call) => {
      expect(call[0].type).toBe('fixed')
    })
  })
})
