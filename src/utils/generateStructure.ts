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

  return blocks
}
