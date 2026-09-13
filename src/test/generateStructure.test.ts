import { describe, it, expect } from 'vitest'
import { generateStructure } from '../utils/generateStructure'

describe('Ticket 03: Phase 1 Foundation Generator', () => {
  it('retorna um array contendo os dados dos blocos (x, y, z) da fundação para a fase 1', () => {
    const blocks = generateStructure(1)
    expect(blocks.length).toBeGreaterThan(0)
    
    const foundation = blocks.find((b) => b.type === 'foundation')
    expect(foundation).toBeDefined()
    expect(foundation?.position).toEqual([0, 1, 0])
    expect(foundation?.size).toEqual([4, 2, 4])
  })

  it('retorna array vazio para a fase 0 (blocos desaparecem na fase 0)', () => {
    const blocks = generateStructure(0)
    expect(blocks).toEqual([])
  })
})
