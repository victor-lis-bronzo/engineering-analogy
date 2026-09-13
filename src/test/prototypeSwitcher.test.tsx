import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PrototypeSwitcher, VARIANTS } from '../components/PrototypeSwitcher'
import { generateStructure } from '../utils/generateStructure'

describe('PrototypeSwitcher & Connection Variants', () => {
  it('renderiza o nome e descrição da variante atual', () => {
    const onSelect = vi.fn()
    render(<PrototypeSwitcher currentVariant="A" onSelectVariant={onSelect} />)

    expect(screen.getByText(VARIANTS[0].name)).toBeDefined()
    expect(screen.getByText(VARIANTS[0].description)).toBeDefined()
  })

  it('permite ciclar para a próxima variante ao clicar no botão direito', () => {
    const onSelect = vi.fn()
    render(<PrototypeSwitcher currentVariant="A" onSelectVariant={onSelect} />)

    const nextBtn = screen.getByTestId('next-variant-btn')
    fireEvent.click(nextBtn)

    expect(onSelect).toHaveBeenCalledWith('B')
  })

  it('permite ciclar para a variante anterior ao clicar no botão esquerdo', () => {
    const onSelect = vi.fn()
    render(<PrototypeSwitcher currentVariant="A" onSelectVariant={onSelect} />)

    const prevBtn = screen.getByTestId('prev-variant-btn')
    fireEvent.click(prevBtn)

    expect(onSelect).toHaveBeenCalledWith('C')
  })

  it('todas as 3 variantes (A, B, C) geram estruturas válidas para a Fase 3 e Fase 4', () => {
    const variants = ['A', 'B', 'C'] as const

    variants.forEach((v) => {
      const blocksF3 = generateStructure(3, v)
      const cars = blocksF3.filter((b) => b.type === 'car')
      expect(cars.length).toBeGreaterThanOrEqual(3)

      const blocksF4 = generateStructure(4, v)
      const pipes = blocksF4.filter((b) => b.type === 'pipe')
      const wires = blocksF4.filter((b) => b.type === 'wire')
      expect(pipes.length).toBeGreaterThan(0)
      expect(wires.length).toBeGreaterThan(0)
    })
  })
})
