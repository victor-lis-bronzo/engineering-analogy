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

  it('retorna os blocos da Fase 1 + blocos da Fase 2 para generateStructure(2)', () => {
    const blocks = generateStructure(2)
    const foundation = blocks.filter((b) => b.type === 'foundation')
    const floor2 = blocks.filter((b) => b.type === 'elevator-floor')

    expect(foundation.length).toBeGreaterThan(0)
    expect(floor2.length).toBeGreaterThan(0)
    expect(blocks.length).toBe(foundation.length + floor2.length)
  })

  it('exclui explicitamente o bloco central do segundo andar (buraco do elevador)', () => {
    const blocks = generateStructure(2)
    const floor2 = blocks.filter((b) => b.type === 'elevator-floor')

    // Nenhum bloco do segundo andar está exatamente no centro [0, y, 0]
    const centerBlock = floor2.find((b) => b.position[0] === 0 && b.position[2] === 0)
    expect(centerBlock).toBeUndefined()
  })
})
