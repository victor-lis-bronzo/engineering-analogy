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

  return blocks
}
