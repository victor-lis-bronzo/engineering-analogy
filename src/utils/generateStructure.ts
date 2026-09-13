export interface BlockData {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  type?: 'foundation' | 'elevator-floor' | 'car' | 'pipe' | 'wire' | 'standard';
  shape?: 'box' | 'cylinder';
}

export function generateStructure(phase: number): BlockData[] {
  if (phase <= 0 || phase >= 6) {
    return []
  }

  const blocks: BlockData[] = []

  // -------------------------------------------------------------
  // FASE 1: TÉRREO & FUNDAÇÃO (Arquitetura Modelo Maquete)
  // -------------------------------------------------------------
  if (phase >= 1) {
    // Bloco central de fundação (preserva contrato de teste: position [0, 1, 0], size [4, 2, 4])
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

    // Janelas frontais do Térreo (moldura + vidro azul)
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

    // Laje divisória / Cornija entre Térreo e 2º Andar
    blocks.push({
      id: 'foundation-cornice',
      position: [0, 2.05, 0],
      size: [4.3, 0.15, 4.3],
      color: '#e2e8f0',
      type: 'foundation',
    })
  }

  // -------------------------------------------------------------
  // FASE 2: 2º ANDAR (Escritórios com Janelas + Fenda do Elevador OCP)
  // -------------------------------------------------------------
  if (phase >= 2) {
    // Ala Esquerda e Ala Direita (buraco central do elevador em x=0, z=0)
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

    // Janelas de escritório no 2º Andar (emolduradas com vidros)
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

    // Vigas de aço cortadas e expostas no buraco do elevador (metáfora OCP)
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

    // Lajes do teto do 2º Andar (com abertura do elevador no centro)
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
  // FASE 3: 3º ANDAR (Estacionamento com Guarda-corpo e Carros Low-Poly)
  // -------------------------------------------------------------
  if (phase >= 3) {
    // Laje principal do estacionamento
    blocks.push({
      id: 'floor3-slab',
      position: [0, 4.5, 0],
      size: [5, 0.6, 5],
      color: '#4a5568',
      type: 'standard',
    })

    // Mureta / Guarda-corpo de proteção do estacionamento
    blocks.push(
      {
        id: 'parking-guardrail-back',
        position: [0, 5.0, -2.4],
        size: [5, 0.45, 0.2],
        color: '#cbd5e0',
        type: 'standard',
      },
      {
        id: 'parking-guardrail-left',
        position: [-2.4, 5.0, 0],
        size: [0.2, 0.45, 4.8],
        color: '#cbd5e0',
        type: 'standard',
      },
      {
        id: 'parking-guardrail-front',
        position: [-1.2, 5.0, 2.4],
        size: [2.5, 0.45, 0.2],
        color: '#cbd5e0',
        type: 'standard',
      }
    )

    // Carro Vermelho (Sedan)
    blocks.push(
      {
        id: 'car-1',
        position: [-1, 5.05, -1],
        size: [1.6, 0.45, 0.95],
        color: '#e53e3e',
        type: 'car',
      },
      {
        id: 'car-1-cabin',
        position: [-1, 5.4, -1],
        size: [0.95, 0.35, 0.8],
        color: '#fed7d7',
        type: 'car',
      }
    )

    // Carro Azul (SUV)
    blocks.push(
      {
        id: 'car-2',
        position: [1, 5.05, 0],
        size: [1.6, 0.55, 0.95],
        color: '#3182ce',
        type: 'car',
      },
      {
        id: 'car-2-cabin',
        position: [1, 5.45, 0],
        size: [1.05, 0.4, 0.8],
        color: '#bee3f8',
        type: 'car',
      }
    )

    // Carro Amarelo (Transbordando para fora da laje - Metáfora SRP)
    blocks.push(
      {
        id: 'car-overflow',
        position: [2.6, 5.05, 1.4],
        size: [1.6, 0.45, 0.95],
        color: '#d69e2e',
        type: 'car',
      },
      {
        id: 'car-overflow-cabin',
        position: [2.6, 5.4, 1.4],
        size: [0.95, 0.35, 0.8],
        color: '#fefcbf',
        type: 'car',
      }
    )
  }

  // -------------------------------------------------------------
  // FASE 4: 4º ANDAR (Cobertura Residencial, Caixa D'Água e Tubulações / DIP)
  // -------------------------------------------------------------
  if (phase >= 4) {
    // Andar residencial superior com janelas
    blocks.push({
      id: 'floor4-penthouse',
      position: [0, 6.2, 0],
      size: [3.8, 1.8, 3.8],
      color: '#edf2f7',
      type: 'standard',
    })

    // Janelas da cobertura
    blocks.push(
      {
        id: 'floor4-win-front',
        position: [0, 6.3, 1.92],
        size: [2.2, 1.0, 0.08],
        color: '#63b3ed',
        type: 'standard',
      },
      {
        id: 'floor4-win-back',
        position: [0, 6.3, -1.92],
        size: [2.2, 1.0, 0.08],
        color: '#63b3ed',
        type: 'standard',
      }
    )

    // Platibanda / Parapeito da cobertura
    blocks.push({
      id: 'floor4-roof-parapet',
      position: [0, 7.15, 0],
      size: [4.0, 0.2, 4.0],
      color: '#cbd5e0',
      type: 'standard',
    })

    // Caixa d'água cilíndrica no topo
    blocks.push(
      {
        id: 'roof-water-tank-base',
        position: [0.9, 7.35, 0.9],
        size: [1.2, 0.2, 1.2],
        color: '#4a5568',
        type: 'standard',
      },
      {
        id: 'roof-water-tank-cylinder',
        position: [0.9, 8.0, 0.9],
        size: [1.1, 1.1, 1.1],
        color: '#2b6cb0',
        type: 'standard',
        shape: 'cylinder',
      }
    )

    // Antena de transmissão no topo
    blocks.push({
      id: 'roof-antenna-mast',
      position: [-0.9, 8.2, -0.9],
      size: [0.1, 2.0, 0.1],
      color: '#a0aec0',
      type: 'standard',
    })

    // Canos e Fios entrelaçados (preservando contratos dos testes existentes)
    blocks.push(
      {
        id: 'pipe-water-1',
        position: [-1, 7, 0],
        size: [3, 0.6, 0.6],
        color: '#2b6cb0',
        type: 'pipe',
      },
      {
        id: 'wire-electric-1',
        position: [0, 7.5, -1],
        size: [0.6, 0.6, 3],
        color: '#c53030',
        type: 'wire',
      },
      {
        id: 'pipe-water-2',
        position: [1, 8, 1],
        size: [0.6, 1.8, 0.6],
        color: '#3182ce',
        type: 'pipe',
      },
      {
        id: 'wire-electric-2',
        position: [-0.5, 8.2, 0.5],
        size: [2, 0.5, 0.5],
        color: '#e53e3e',
        type: 'wire',
      },
      // Tubulação descendo pela fachada lateral
      {
        id: 'pipe-water-facade',
        position: [-1.95, 4.5, 1.0],
        size: [0.25, 4.8, 0.25],
        color: '#3182ce',
        type: 'pipe',
      },
      // Eletroduto vermelho descendo pela fachada
      {
        id: 'wire-electric-facade',
        position: [1.95, 4.5, -0.8],
        size: [0.2, 4.8, 0.2],
        color: '#c53030',
        type: 'wire',
      }
    )
  }

  return blocks
}
