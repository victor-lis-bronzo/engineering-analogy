import React from 'react'
import { RigidBody } from '@react-three/rapier'
import { usePhaseStore } from '../store'
import { generateStructure, BlockData } from '../utils/generateStructure'

export const Block: React.FC<{ data: BlockData; isDynamic?: boolean }> = ({ data, isDynamic = false }) => {
  const isCylinder = data.shape === 'cylinder'
  const isGlass = data.color === '#63b3ed' || data.color === '#90cdf4' || data.color === '#bee3f8'

  return (
    <RigidBody 
      colliders={isCylinder ? 'hull' : 'cuboid'} 
      type={isDynamic ? 'dynamic' : 'fixed'}
      linearDamping={isDynamic ? 0.2 : 0}
      restitution={isDynamic ? 0.3 : 0}
      data-testid={`rigidbody-${data.id}`}
    >
      <mesh position={data.position}>
        {isCylinder ? (
          <cylinderGeometry args={[data.size[0] / 2, data.size[0] / 2, data.size[1], 16]} />
        ) : (
          <boxGeometry args={data.size} />
        )}
        <meshStandardMaterial 
          color={data.color} 
          roughness={isGlass ? 0.1 : 0.6}
          metalness={isGlass ? 0.4 : 0.1}
          opacity={isGlass ? 0.85 : 1}
          transparent={isGlass}
        />
      </mesh>
    </RigidBody>
  )
}

export const Floor: React.FC = () => {
  return (
    <RigidBody type="fixed" colliders="cuboid" data-testid="rigidbody-floor">
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[26, 1, 26]} />
        <meshStandardMaterial color="#2d3748" roughness={0.9} />
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
