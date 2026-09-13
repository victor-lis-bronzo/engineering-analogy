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

  return blocks
}
