export interface BlockData {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  type?: 'foundation' | 'elevator-floor' | 'car' | 'pipe' | 'wire' | 'standard';
}

export function generateStructure(phase: number): BlockData[] {
  if (phase <= 0 || phase >= 6) {
    return []
  }

  const blocks: BlockData[] = []

  // Phase 1: Foundation blocks
  if (phase >= 1) {
    blocks.push({
      id: 'foundation-base',
      position: [0, 1, 0],
      size: [4, 2, 4],
      color: '#888888',
      type: 'foundation',
    })
  }

  // Phase 2: Second floor with intentional elevator hole in the center
  if (phase >= 2) {
    blocks.push(
      {
        id: 'floor2-left',
        position: [-1.5, 3, 0],
        size: [1, 2, 4],
        color: '#aaaaaa',
        type: 'elevator-floor',
      },
      {
        id: 'floor2-right',
        position: [1.5, 3, 0],
        size: [1, 2, 4],
        color: '#aaaaaa',
        type: 'elevator-floor',
      }
    )
  }

  // Phase 3: Overflowing parking floor with cars
  if (phase >= 3) {
    blocks.push(
      {
        id: 'floor3-slab',
        position: [0, 4.5, 0],
        size: [5, 1, 5],
        color: '#666666',
        type: 'standard',
      },
      {
        id: 'car-1',
        position: [-1, 5.4, -1],
        size: [1.6, 0.8, 1],
        color: '#e53e3e',
        type: 'car',
      },
      {
        id: 'car-2',
        position: [1, 5.4, 0],
        size: [1.6, 0.8, 1],
        color: '#3182ce',
        type: 'car',
      },
      {
        id: 'car-overflow',
        position: [2.6, 5.4, 1.5],
        size: [1.6, 0.8, 1],
        color: '#d69e2e',
        type: 'car',
      }
    )
  }

  // Phase 4: Tangled pipes (water) and wires (electric)
  if (phase >= 4) {
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
      }
    )
  }

  return blocks
}
