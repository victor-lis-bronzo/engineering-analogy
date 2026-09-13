import React from 'react'
import { RigidBody } from '@react-three/rapier'
import { usePhaseStore } from '../store'
import { generateStructure, BlockData } from '../utils/generateStructure'

export const Block: React.FC<{ data: BlockData; isDynamic?: boolean }> = ({ data, isDynamic = false }) => {
  return (
    <RigidBody 
      colliders="cuboid" 
      type={isDynamic ? 'dynamic' : 'fixed'}
      data-testid={`rigidbody-${data.id}`}
    >
      <mesh position={data.position}>
        <boxGeometry args={data.size} />
        <meshStandardMaterial color={data.color} />
      </mesh>
    </RigidBody>
  )
}

export const Floor: React.FC = () => {
  return (
    <RigidBody type="fixed" colliders="cuboid" data-testid="rigidbody-floor">
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[20, 1, 20]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </RigidBody>
  )
}

const StructureContent: React.FC<{ phase: number }> = ({ phase }) => {
  const blocks = generateStructure(phase)
  const isDynamic = phase === 5

  return (
    <group data-testid="structure-group">
      <Floor />
      {blocks.map((block) => (
        <Block 
          key={block.id} 
          data={block} 
          isDynamic={isDynamic} 
        />
      ))}
    </group>
  )
}

export const Structure: React.FC = () => {
  const currentPhase = usePhaseStore((state) => state.phase)

  return <StructureContent key={currentPhase} phase={currentPhase} />
}
