export type VariantType = 'A' | 'B' | 'C'

export interface BlockData {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  type?: 'foundation' | 'elevator-floor' | 'car' | 'pipe' | 'wire' | 'standard';
  shape?: 'box' | 'cylinder';
}

export function generateStructure(phase: number, variant: VariantType = 'A'): BlockData[] {
  if (phase <= 0 || phase >= 6) {
    return []
  }

  const blocks: BlockData[] = []

  // -------------------------------------------------------------
  // FASE 1: TÉRREO & FUNDAÇÃO (Comum a todas as variantes)
  // -------------------------------------------------------------
  if (phase >= 1) {
    // Bloco central de fundação (preserva contrato: position [0, 1, 0], size [4, 2, 4])
    blocks.push({
      id: 'foundation-base',
      position: [0, 1, 0],
      size: [4, 2, 4],
      color: '#718096',
      type: 'foundation',
    })

    // Meio-fio / Calçada inferior
    blocks.push({
      id: 'foundation-sidewalk',
      position: [0, 0.05, 0],
      size: [5.2, 0.1, 5.2],
      color: '#4a5568',
      type: 'foundation',
    })

    // Pórtico e Porta Dupla de Entrada (Térreo comercial)
    blocks.push(
      {
        id: 'foundation-door-frame',
        position: [0, 0.85, 2.05],
        size: [1.2, 1.7, 0.1],
        color: '#2d3748',
        type: 'foundation',
      },
      {
        id: 'foundation-door-glass-left',
        position: [-0.25, 0.85, 2.08],
        size: [0.45, 1.5, 0.05],
        color: '#63b3ed',
        type: 'foundation',
      },
      {
        id: 'foundation-door-glass-right',
        position: [0.25, 0.85, 2.08],
        size: [0.45, 1.5, 0.05],
        color: '#63b3ed',
        type: 'foundation',
      }
    )

    // Janelas frontais do Térreo
    blocks.push(
      {
        id: 'foundation-win-fl-frame',
        position: [-1.3, 1.1, 2.05],
        size: [0.9, 1.1, 0.08],
        color: '#edf2f7',
        type: 'foundation',
      },
      {
        id: 'foundation-win-fl-glass',
        position: [-1.3, 1.1, 2.08],
        size: [0.75, 0.95, 0.05],
        color: '#63b3ed',
        type: 'foundation',
      },
      {
        id: 'foundation-win-fr-frame',
        position: [1.3, 1.1, 2.05],
        size: [0.9, 1.1, 0.08],
        color: '#edf2f7',
        type: 'foundation',
      },
      {
        id: 'foundation-win-fr-glass',
        position: [1.3, 1.1, 2.08],
        size: [0.75, 0.95, 0.05],
        color: '#63b3ed',
        type: 'foundation',
      }
    )

    // Laje divisória / Cornija
    blocks.push({
      id: 'foundation-cornice',
      position: [0, 2.05, 0],
      size: [4.3, 0.15, 4.3],
      color: '#e2e8f0',
      type: 'foundation',
    })
  }

  // -------------------------------------------------------------
  // FASE 2: 2º ANDAR (Escritórios + Elevador OCP)
  // -------------------------------------------------------------
  if (phase >= 2) {
    blocks.push(
      {
        id: 'floor2-left',
        position: [-1.5, 3, 0],
        size: [1, 2, 4],
        color: '#e2e8f0',
        type: 'elevator-floor',
      },
      {
        id: 'floor2-right',
        position: [1.5, 3, 0],
        size: [1, 2, 4],
        color: '#e2e8f0',
        type: 'elevator-floor',
      }
    )

    // Janelas de escritório no 2º Andar
    blocks.push(
      {
        id: 'floor2-win-front-left',
        position: [-1.5, 3.1, 2.05],
        size: [0.8, 1.1, 0.08],
        color: '#63b3ed',
        type: 'elevator-floor',
      },
      {
        id: 'floor2-win-front-right',
        position: [1.5, 3.1, 2.05],
        size: [0.8, 1.1, 0.08],
        color: '#63b3ed',
        type: 'elevator-floor',
      },
      {
        id: 'floor2-win-back-left',
        position: [-1.5, 3.1, -2.05],
        size: [0.8, 1.1, 0.08],
        color: '#63b3ed',
        type: 'elevator-floor',
      },
      {
        id: 'floor2-win-back-right',
        position: [1.5, 3.1, -2.05],
        size: [0.8, 1.1, 0.08],
        color: '#63b3ed',
        type: 'elevator-floor',
      }
    )

    // Vigas de aço cortadas expostas no buraco do elevador
    blocks.push(
      {
        id: 'floor2-exposed-beam-left',
        position: [-0.75, 3, 0],
        size: [0.15, 2, 0.2],
        color: '#e53e3e',
        type: 'elevator-floor',
      },
      {
        id: 'floor2-exposed-beam-right',
        position: [0.75, 3, 0],
        size: [0.15, 2, 0.2],
        color: '#e53e3e',
        type: 'elevator-floor',
      }
    )

    // Lajes do teto do 2º Andar
    blocks.push(
      {
        id: 'floor2-top-slab-left',
        position: [-1.5, 4.05, 0],
        size: [1.2, 0.15, 4.2],
        color: '#cbd5e0',
        type: 'elevator-floor',
      },
      {
        id: 'floor2-top-slab-right',
        position: [1.5, 4.05, 0],
        size: [1.2, 0.15, 4.2],
        color: '#cbd5e0',
        type: 'elevator-floor',
      }
    )
  }

  // -------------------------------------------------------------
  // FASES 3 & 4: GERADAS CONFORME A VARIANTE ESCOLHIDA (A, B ou C)
  // -------------------------------------------------------------
  if (variant === 'B') {
    generateVariantB(phase, blocks)
  } else if (variant === 'C') {
    generateVariantC(phase, blocks)
  } else {
    // Padrão: Variante A (Pilotis & Laje Coberta)
    generateVariantA(phase, blocks)
  }

  return blocks
}

// -----------------------------------------------------------------
// VARIANTE A: PILOTIS E LAJE COBERTA (Abordagem Arquitetônica Canônica)
// -----------------------------------------------------------------
function generateVariantA(phase: number, blocks: BlockData[]) {
  if (phase >= 3) {
    // Laje de piso do estacionamento
    blocks.push({
      id: 'floor3-slab',
      position: [0, 4.45, 0],
      size: [5.2, 0.5, 5.2],
      color: '#4a5568',
      type: 'standard',
    })

    // 4 Pilotis / Colunas estruturais nos cantos sustentando o teto
    blocks.push(
      {
        id: 'pilotis-fl',
        position: [-2.1, 5.35, 2.1],
        size: [0.4, 1.3, 0.4],
        color: '#cbd5e0',
        type: 'standard',
      },
      {
        id: 'pilotis-fr',
        position: [2.1, 5.35, 2.1],
        size: [0.4, 1.3, 0.4],
        color: '#cbd5e0',
        type: 'standard',
      },
      {
        id: 'pilotis-bl',
        position: [-2.1, 5.35, -2.1],
        size: [0.4, 1.3, 0.4],
        color: '#cbd5e0',
        type: 'standard',
      },
      {
        id: 'pilotis-br',
        position: [2.1, 5.35, -2.1],
        size: [0.4, 1.3, 0.4],
        color: '#cbd5e0',
        type: 'standard',
      }
    )

    // Núcleo de circulação vertical (continuidade do elevador do 2º andar)
    blocks.push({
      id: 'floor3-elevator-shaft',
      position: [0, 5.35, -1.8],
      size: [1.4, 1.3, 0.8],
      color: '#4a5568',
      type: 'standard',
    })

    // Muretas perimetrais baixas
    blocks.push(
      {
        id: 'parking-guardrail-back',
        position: [0, 4.85, -2.45],
        size: [4.4, 0.3, 0.15],
        color: '#a0aec0',
        type: 'standard',
      },
      {
        id: 'parking-guardrail-left',
        position: [-2.45, 4.85, 0],
        size: [0.15, 0.3, 4.4],
        color: '#a0aec0',
        type: 'standard',
      },
      {
        id: 'parking-guardrail-front',
        position: [-1.1, 4.85, 2.45],
        size: [2.2, 0.3, 0.15],
        color: '#a0aec0',
        type: 'standard',
      }
    )

    // Carros estacionados no vão livre (confortavelmente abaixo da laje de teto)
    blocks.push(
      {
        id: 'car-1',
        position: [-0.9, 4.9, -0.8],
        size: [1.6, 0.4, 0.9],
        color: '#e53e3e',
        type: 'car',
      },
      {
        id: 'car-1-cabin',
        position: [-0.9, 5.25, -0.8],
        size: [0.95, 0.3, 0.75],
        color: '#fed7d7',
        type: 'car',
      },
      {
        id: 'car-2',
        position: [0.8, 4.9, 0.1],
        size: [1.6, 0.45, 0.9],
        color: '#3182ce',
        type: 'car',
      },
      {
        id: 'car-2-cabin',
        position: [0.8, 5.3, 0.1],
        size: [1.0, 0.35, 0.75],
        color: '#bee3f8',
        type: 'car',
      },
      {
        id: 'car-overflow',
        position: [2.6, 4.9, 1.2],
        size: [1.6, 0.4, 0.9],
        color: '#d69e2e',
        type: 'car',
      },
      {
        id: 'car-overflow-cabin',
        position: [2.6, 5.25, 1.2],
        size: [0.95, 0.3, 0.75],
        color: '#fefcbf',
        type: 'car',
      }
    )

    // Laje intermediária de teto do estacionamento
    blocks.push({
      id: 'floor3-roof-slab',
      position: [0, 6.05, 0],
      size: [5.2, 0.2, 5.2],
      color: '#e2e8f0',
      type: 'standard',
    })
  }

  if (phase >= 4) {
    // 4º Andar (Penthouse) apoiado perfeitamente sobre a laje intermediária
    blocks.push({
      id: 'floor4-penthouse',
      position: [0, 7.1, 0],
      size: [3.8, 1.9, 3.8],
      color: '#edf2f7',
      type: 'standard',
    })

    // Janelas panorâmicas do 4º Andar
    blocks.push(
      {
        id: 'floor4-win-front',
        position: [0, 7.2, 1.92],
        size: [2.4, 1.0, 0.08],
        color: '#63b3ed',
        type: 'standard',
      },
      {
        id: 'floor4-win-back',
        position: [0, 7.2, -1.92],
        size: [2.4, 1.0, 0.08],
        color: '#63b3ed',
        type: 'standard',
      }
    )

    // Platibanda da cobertura
    blocks.push({
      id: 'floor4-roof-parapet',
      position: [0, 8.1, 0],
      size: [4.0, 0.2, 4.0],
      color: '#cbd5e0',
      type: 'standard',
    })

    // Caixa d'água cilíndrica e antena
    blocks.push(
      {
        id: 'roof-water-tank-base',
        position: [0.9, 8.3, 0.9],
        size: [1.2, 0.2, 1.2],
        color: '#4a5568',
        type: 'standard',
      },
      {
        id: 'roof-water-tank-cylinder',
        position: [0.9, 8.95, 0.9],
        size: [1.1, 1.1, 1.1],
        color: '#2b6cb0',
        type: 'standard',
        shape: 'cylinder',
      },
      {
        id: 'roof-antenna-mast',
        position: [-0.9, 9.15, -0.9],
        size: [0.1, 2.0, 0.1],
        color: '#a0aec0',
        type: 'standard',
      }
    )

    // Calços estruturais de apoio da tubulação e fiação (eliminam Z-fighting sobre a laje)
    blocks.push(
      {
        id: 'pipe-sleeper-1',
        position: [-1.8, 8.25, 0],
        size: [0.35, 0.1, 0.35],
        color: '#4a5568',
        type: 'standard',
      },
      {
        id: 'pipe-sleeper-2',
        position: [-0.3, 8.25, 0],
        size: [0.35, 0.1, 0.35],
        color: '#4a5568',
        type: 'standard',
      },
      {
        id: 'wire-sleeper-1',
        position: [0, 8.56, -1.8],
        size: [0.25, 0.72, 0.25],
        color: '#4a5568',
        type: 'standard',
      },
      {
        id: 'wire-sleeper-2',
        position: [0, 8.56, -0.4],
        size: [0.25, 0.72, 0.25],
        color: '#4a5568',
        type: 'standard',
      }
    )

    // Canos e Fios entrelaçados (cruzamento em desnível: fio vermelho passa sobre o cano azul)
    blocks.push(
      {
        id: 'pipe-water-1',
        position: [-1, 8.50, 0],
        size: [3, 0.40, 0.40],
        color: '#2b6cb0',
        type: 'pipe',
      },
      {
        id: 'wire-electric-1',
        position: [0, 9.10, -1],
        size: [0.35, 0.35, 3],
        color: '#c53030',
        type: 'wire',
      },
      {
        id: 'pipe-water-2',
        position: [1, 8.9, 1],
        size: [0.6, 1.8, 0.6],
        color: '#3182ce',
        type: 'pipe',
      },
      {
        id: 'wire-electric-2',
        position: [-0.5, 9.1, 0.5],
        size: [2, 0.35, 0.35],
        color: '#e53e3e',
        type: 'wire',
      },
      {
        id: 'pipe-water-facade',
        position: [-1.95, 5.5, 1.0],
        size: [0.25, 4.8, 0.25],
        color: '#3182ce',
        type: 'pipe',
      },
      {
        id: 'wire-electric-facade',
        position: [1.95, 5.5, -0.8],
        size: [0.2, 4.8, 0.2],
        color: '#c53030',
        type: 'wire',
      }
    )
  }
}

// -----------------------------------------------------------------
// VARIANTE B: TERRAÇO CANTILEVER & SETBACK (Deck Aberto com Recuo)
// -----------------------------------------------------------------
function generateVariantB(phase: number, blocks: BlockData[]) {
  if (phase >= 3) {
    // Laje do estacionamento ampliada para a frente
    blocks.push({
      id: 'floor3-slab',
      position: [0, 4.45, 0.2],
      size: [5.2, 0.5, 5.6],
      color: '#4a5568',
      type: 'standard',
    })

    // Guarda-corpo contornando o terraço aberto
    blocks.push(
      {
        id: 'parking-guardrail-back',
        position: [0, 4.85, -2.45],
        size: [5.0, 0.35, 0.15],
        color: '#cbd5e0',
        type: 'standard',
      },
      {
        id: 'parking-guardrail-left',
        position: [-2.5, 4.85, 0.2],
        size: [0.15, 0.35, 5.4],
        color: '#cbd5e0',
        type: 'standard',
      },
      {
        id: 'parking-guardrail-front',
        position: [-1.2, 4.85, 2.85],
        size: [2.6, 0.35, 0.15],
        color: '#cbd5e0',
        type: 'standard',
      }
    )

    // Carros posicionados na ampla área frontal do terraço
    blocks.push(
      {
        id: 'car-1',
        position: [-1.1, 4.9, 1.3],
        size: [1.6, 0.4, 0.9],
        color: '#e53e3e',
        type: 'car',
      },
      {
        id: 'car-1-cabin',
        position: [-1.1, 5.25, 1.3],
        size: [0.95, 0.3, 0.75],
        color: '#fed7d7',
        type: 'car',
      },
      {
        id: 'car-2',
        position: [0.9, 4.9, 1.3],
        size: [1.6, 0.45, 0.9],
        color: '#3182ce',
        type: 'car',
      },
      {
        id: 'car-2-cabin',
        position: [0.9, 5.3, 1.3],
        size: [1.0, 0.35, 0.75],
        color: '#bee3f8',
        type: 'car',
      },
      {
        id: 'car-overflow',
        position: [2.7, 4.9, 1.6],
        size: [1.6, 0.4, 0.9],
        color: '#d69e2e',
        type: 'car',
      },
      {
        id: 'car-overflow-cabin',
        position: [2.7, 5.25, 1.6],
        size: [0.95, 0.3, 0.75],
        color: '#fefcbf',
        type: 'car',
      }
    )
  }

  if (phase >= 4) {
    // 4º Andar recuado na parte traseira (setback), liberando o terraço frontal
    blocks.push({
      id: 'floor4-penthouse',
      position: [0, 5.85, -0.9],
      size: [3.8, 2.3, 2.8],
      color: '#edf2f7',
      type: 'standard',
    })

    // Porta conectando o interior do 4º andar ao deck de estacionamento
    blocks.push(
      {
        id: 'floor4-terrace-door-frame',
        position: [0, 5.4, 0.52],
        size: [1.0, 1.5, 0.08],
        color: '#2d3748',
        type: 'standard',
      },
      {
        id: 'floor4-terrace-door-glass',
        position: [0, 5.4, 0.55],
        size: [0.8, 1.3, 0.05],
        color: '#63b3ed',
        type: 'standard',
      }
    )

    // Janelas da torre recuada
    blocks.push(
      {
        id: 'floor4-win-front',
        position: [-1.1, 6.2, 0.52],
        size: [0.9, 0.9, 0.06],
        color: '#63b3ed',
        type: 'standard',
      },
      {
        id: 'floor4-win-back',
        position: [0, 6.2, -2.32],
        size: [2.4, 1.0, 0.06],
        color: '#63b3ed',
        type: 'standard',
      }
    )

    // Platibanda superior
    blocks.push({
      id: 'floor4-roof-parapet',
      position: [0, 7.05, -0.9],
      size: [4.0, 0.15, 3.0],
      color: '#cbd5e0',
      type: 'standard',
    })

    // Caixa d'água na cobertura recuada
    blocks.push(
      {
        id: 'roof-water-tank-base',
        position: [0.8, 7.25, -1.0],
        size: [1.1, 0.2, 1.1],
        color: '#4a5568',
        type: 'standard',
      },
      {
        id: 'roof-water-tank-cylinder',
        position: [0.8, 7.85, -1.0],
        size: [1.0, 1.0, 1.0],
        color: '#2b6cb0',
        type: 'standard',
        shape: 'cylinder',
      },
      {
        id: 'roof-antenna-mast',
        position: [-0.9, 8.0, -1.0],
        size: [0.1, 1.8, 0.1],
        color: '#a0aec0',
        type: 'standard',
      }
    )

    // Canos e fios (preservando testes)
    blocks.push(
      {
        id: 'pipe-water-1',
        position: [-1, 6.8, -0.9],
        size: [3, 0.6, 0.6],
        color: '#2b6cb0',
        type: 'pipe',
      },
      {
        id: 'wire-electric-1',
        position: [0, 7.3, -1.5],
        size: [0.6, 0.6, 2.5],
        color: '#c53030',
        type: 'wire',
      },
      {
        id: 'pipe-water-2',
        position: [1, 7.8, -0.5],
        size: [0.6, 1.8, 0.6],
        color: '#3182ce',
        type: 'pipe',
      },
      {
        id: 'wire-electric-2',
        position: [-0.5, 8.0, -0.5],
        size: [2, 0.5, 0.5],
        color: '#e53e3e',
        type: 'wire',
      }
    )
  }
}

// -----------------------------------------------------------------
// VARIANTE C: VIGAS I DE AÇO & MEZANINO (Gambiarra Estrutural Visível)
// -----------------------------------------------------------------
function generateVariantC(phase: number, blocks: BlockData[]) {
  if (phase >= 3) {
    // Laje de estacionamento
    blocks.push({
      id: 'floor3-slab',
      position: [0, 4.45, 0],
      size: [5.2, 0.5, 5.2],
      color: '#4a5568',
      type: 'standard',
    })

    // 4 Vigas I de aço vermelhas elevando a cobertura
    blocks.push(
      {
        id: 'beam-fl',
        position: [-1.8, 5.55, 1.8],
        size: [0.25, 1.7, 0.25],
        color: '#c53030',
        type: 'standard',
      },
      {
        id: 'beam-fr',
        position: [1.8, 5.55, 1.8],
        size: [0.25, 1.7, 0.25],
        color: '#c53030',
        type: 'standard',
      },
      {
        id: 'beam-bl',
        position: [-1.8, 5.55, -1.8],
        size: [0.25, 1.7, 0.25],
        color: '#c53030',
        type: 'standard',
      },
      {
        id: 'beam-br',
        position: [1.8, 5.55, -1.8],
        size: [0.25, 1.7, 0.25],
        color: '#c53030',
        type: 'standard',
      }
    )

    // Mureta
    blocks.push(
      {
        id: 'parking-guardrail-back',
        position: [0, 4.85, -2.45],
        size: [4.8, 0.35, 0.15],
        color: '#cbd5e0',
        type: 'standard',
      },
      {
        id: 'parking-guardrail-left',
        position: [-2.45, 4.85, 0],
        size: [0.15, 0.35, 4.8],
        color: '#cbd5e0',
        type: 'standard',
      },
      {
        id: 'parking-guardrail-front',
        position: [-1.1, 4.85, 2.45],
        size: [2.4, 0.35, 0.15],
        color: '#cbd5e0',
        type: 'standard',
      }
    )

    // Carros sob o mezanino
    blocks.push(
      {
        id: 'car-1',
        position: [-0.9, 4.9, -0.6],
        size: [1.6, 0.4, 0.9],
        color: '#e53e3e',
        type: 'car',
      },
      {
        id: 'car-1-cabin',
        position: [-0.9, 5.25, -0.6],
        size: [0.95, 0.3, 0.75],
        color: '#fed7d7',
        type: 'car',
      },
      {
        id: 'car-2',
        position: [0.9, 4.9, 0.2],
        size: [1.6, 0.45, 0.9],
        color: '#3182ce',
        type: 'car',
      },
      {
        id: 'car-2-cabin',
        position: [0.9, 5.3, 0.2],
        size: [1.0, 0.35, 0.75],
        color: '#bee3f8',
        type: 'car',
      },
      {
        id: 'car-overflow',
        position: [2.6, 4.9, 1.3],
        size: [1.6, 0.4, 0.9],
        color: '#d69e2e',
        type: 'car',
      },
      {
        id: 'car-overflow-cabin',
        position: [2.6, 5.25, 1.3],
        size: [0.95, 0.3, 0.75],
        color: '#fefcbf',
        type: 'car',
      }
    )
  }

  if (phase >= 4) {
    // 4º Andar elevado sobre a estrutura metálica
    blocks.push({
      id: 'floor4-penthouse',
      position: [0, 7.35, 0],
      size: [3.8, 1.9, 3.8],
      color: '#edf2f7',
      type: 'standard',
    })

    // Laje base do mezanino
    blocks.push({
      id: 'floor4-mezzanine-base',
      position: [0, 6.35, 0],
      size: [4.2, 0.2, 4.2],
      color: '#c53030',
      type: 'standard',
    })

    // Janelas
    blocks.push(
      {
        id: 'floor4-win-front',
        position: [0, 7.45, 1.92],
        size: [2.4, 1.0, 0.08],
        color: '#63b3ed',
        type: 'standard',
      },
      {
        id: 'floor4-win-back',
        position: [0, 7.45, -1.92],
        size: [2.4, 1.0, 0.08],
        color: '#63b3ed',
        type: 'standard',
      }
    )

    // Cobertura e caixa d'água
    blocks.push(
      {
        id: 'floor4-roof-parapet',
        position: [0, 8.35, 0],
        size: [4.0, 0.15, 4.0],
        color: '#cbd5e0',
        type: 'standard',
      },
      {
        id: 'roof-water-tank-base',
        position: [0.9, 8.55, 0.9],
        size: [1.2, 0.2, 1.2],
        color: '#4a5568',
        type: 'standard',
      },
      {
        id: 'roof-water-tank-cylinder',
        position: [0.9, 9.15, 0.9],
        size: [1.1, 1.1, 1.1],
        color: '#2b6cb0',
        type: 'standard',
        shape: 'cylinder',
      },
      {
        id: 'roof-antenna-mast',
        position: [-0.9, 9.35, -0.9],
        size: [0.1, 1.8, 0.1],
        color: '#a0aec0',
        type: 'standard',
      }
    )

    // Canos e fios (elevados com cruzamento em desnível)
    blocks.push(
      {
        id: 'pipe-water-1',
        position: [-1, 8.70, 0],
        size: [3, 0.40, 0.40],
        color: '#2b6cb0',
        type: 'pipe',
      },
      {
        id: 'wire-electric-1',
        position: [0, 9.30, -1],
        size: [0.35, 0.35, 3],
        color: '#c53030',
        type: 'wire',
      },
      {
        id: 'pipe-water-2',
        position: [1, 9.1, 1],
        size: [0.6, 1.8, 0.6],
        color: '#3182ce',
        type: 'pipe',
      },
      {
        id: 'wire-electric-2',
        position: [-0.5, 9.3, 0.5],
        size: [2, 0.5, 0.5],
        color: '#e53e3e',
        type: 'wire',
      }
    )
  }
}
