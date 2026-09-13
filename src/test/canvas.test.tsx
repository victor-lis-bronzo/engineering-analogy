import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

// Mock Canvas and heavy 3D components for jsdom
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: any) => <div data-testid="r3f-canvas">{children}</div>,
}))

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
}))

vi.mock('@react-three/rapier', () => ({
  Physics: ({ children }: any) => <div data-testid="rapier-physics">{children}</div>,
  RigidBody: ({ children }: any) => <div>{children}</div>,
}))

describe('Ticket 02: 3D Canvas & Environment Layout', () => {
  it('renderiza o layout dividido entre NUI e 3D Canvas usando Tailwind', () => {
    render(<App />)

    const nuiContainer = screen.getByTestId('nui-container')
    const canvasContainer = screen.getByTestId('canvas-container')

    expect(nuiContainer).toBeDefined()
    expect(canvasContainer).toBeDefined()

    // Verificando classes responsivas do Tailwind
    expect(nuiContainer.className).toContain('md:w-[30%]')
    expect(canvasContainer.className).toContain('md:w-[70%]')
  })

  it('monta o container R3F com OrbitControls', () => {
    render(<App />)
    expect(screen.getByTestId('r3f-canvas')).toBeDefined()
    expect(screen.getByTestId('orbit-controls')).toBeDefined()
  })
})
