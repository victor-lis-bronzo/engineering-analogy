import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
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

describe('Ticket 07: Physics Engine Wrap (Estático)', () => {
  beforeEach(() => {
    mockRigidBody.mockClear()
    usePhaseStore.getState().reset()
  })

  it('monta a estrutura em fase <= 4 com blocos configurados como RigidBody do tipo "fixed"', () => {
    usePhaseStore.getState().setPhase(4)
    render(<Structure />)

    const floor = screen.getByTestId('rigidbody-floor')
    expect(floor.getAttribute('data-body-type')).toBe('fixed')

    // Na fase 4, todos os blocos devem ter type="fixed" para manter o prédio estático
    const blockBodies = mockRigidBody.mock.calls
    expect(blockBodies.length).toBeGreaterThan(1)

    blockBodies.forEach((call) => {
      expect(call[0].type).toBe('fixed')
    })
  })
})
