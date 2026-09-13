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

  it('retorna todas as fases anteriores + blocos da Fase 3 com marcadores de tipo "carro"', () => {
    const blocks = generateStructure(3)
    const cars = blocks.filter((b) => b.type === 'car')
    const foundation = blocks.filter((b) => b.type === 'foundation')
    const floor2 = blocks.filter((b) => b.type === 'elevator-floor')

    expect(foundation.length).toBeGreaterThan(0)
    expect(floor2.length).toBeGreaterThan(0)
    expect(cars.length).toBeGreaterThan(0)

    // Verifica bloco que excede a borda da base (base tem x: [-2.5, 2.5])
    const overflowCar = cars.find((c) => Math.abs(c.position[0]) > 2.5)
    expect(overflowCar).toBeDefined()
  })

  it('retorna os blocos da Fase 4 com canos (azul) e fios (vermelho) intercalados', () => {
    const blocks = generateStructure(4)
    const pipes = blocks.filter((b) => b.type === 'pipe')
    const wires = blocks.filter((b) => b.type === 'wire')

    expect(pipes.length).toBeGreaterThan(0)
    expect(wires.length).toBeGreaterThan(0)

    // Cores distintas presentes no topo
    const hasBlue = pipes.some((p) => p.color.includes('b0') || p.color.includes('ce'))
    const hasRed = wires.some((w) => w.color.includes('30') || w.color.includes('3e'))
    expect(hasBlue).toBe(true)
    expect(hasRed).toBe(true)
  })

  it('Variante A: inclui 4 pilotis, laje intermediária e núcleo de elevador sem clipagem nos carros', () => {
    const blocks = generateStructure(3, 'A')
    
    // 4 pilotis nos cantos
    const pilotis = blocks.filter((b) => b.id.startsWith('pilotis-'))
    expect(pilotis.length).toBe(4)

    // Laje intermediária de teto
    const roofSlab = blocks.find((b) => b.id === 'floor3-roof-slab')
    expect(roofSlab).toBeDefined()

    // Núcleo de elevador vertical
    const elevatorShaft = blocks.find((b) => b.id === 'floor3-elevator-shaft')
    expect(elevatorShaft).toBeDefined()

    // Verificação de vão livre: todos os carros devem estar totalmente abaixo do teto
    const cars = blocks.filter((b) => b.type === 'car')
    const roofBottomY = (roofSlab?.position[1] ?? 6.05) - (roofSlab?.size[1] ?? 0.2) / 2

    cars.forEach((car) => {
      const carTopY = car.position[1] + car.size[1] / 2
      expect(carTopY).toBeLessThan(roofBottomY)
    })
  })

  it('Variante A: na Fase 4 apoia a cobertura perfeitamente sobre a laje intermediária', () => {
    const blocks = generateStructure(4, 'A')
    const roofSlab = blocks.find((b) => b.id === 'floor3-roof-slab')
    const penthouse = blocks.find((b) => b.id === 'floor4-penthouse')

    expect(roofSlab).toBeDefined()
    expect(penthouse).toBeDefined()

    const roofTopY = (roofSlab?.position[1] ?? 6.05) + (roofSlab?.size[1] ?? 0.2) / 2
    const penthouseBottomY = (penthouse?.position[1] ?? 7.1) - (penthouse?.size[1] ?? 1.9) / 2

    // A base da cobertura deve estar em ou acima do topo da laje intermediária
    expect(penthouseBottomY).toBeGreaterThanOrEqual(roofTopY - 0.01)
  })

  it('Anti-Z-Fighting: calços de apoio elevam o cano azul e a fiação vermelha acima da platibanda', () => {
    const blocks = generateStructure(4, 'A')
    const parapet = blocks.find((b) => b.id === 'floor4-roof-parapet')
    const pipeWater = blocks.find((b) => b.id === 'pipe-water-1')
    const wireElectric = blocks.find((b) => b.id === 'wire-electric-1')
    const pipeSleepers = blocks.filter((b) => b.id.startsWith('pipe-sleeper-'))

    expect(parapet).toBeDefined()
    expect(pipeWater).toBeDefined()
    expect(wireElectric).toBeDefined()
    expect(pipeSleepers.length).toBeGreaterThanOrEqual(2)

    const parapetTopY = (parapet?.position[1] ?? 8.1) + (parapet?.size[1] ?? 0.2) / 2
    const pipeBottomY = (pipeWater?.position[1] ?? 8.55) - (pipeWater?.size[1] ?? 0.5) / 2
    const wireBottomY = (wireElectric?.position[1] ?? 8.55) - (wireElectric?.size[1] ?? 0.5) / 2

    // O fundo do cano e dos fios deve estar estritamente elevado acima do topo da platibanda (sem coplanaridade)
    expect(pipeBottomY).toBeGreaterThan(parapetTopY)
    expect(wireBottomY).toBeGreaterThan(parapetTopY)
  })
})


