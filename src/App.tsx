import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { NUI } from './components/NUI'
import { Structure } from './components/Structure'
import { Suspense } from 'react'
import { Physics } from '@react-three/rapier'
import { useSimulationStore } from './store'

export default function App() {
  const currentPhase = useSimulationStore((state) => state.currentPhase)

  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-screen bg-gray-900 text-white">
      {/* Narrative UI (NUI) */}
      <div 
        data-testid="nui-container"
        className="w-full md:w-[30%] h-1/3 md:h-full z-10 bg-gray-800 shadow-xl overflow-y-auto"
      >
        <NUI />
      </div>

      {/* 3D Canvas */}
      <div 
        data-testid="canvas-container"
        className="w-full md:w-[70%] h-2/3 md:h-full relative"
      >
        <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
          <color attach="background" args={['#1a202c']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          
          <Suspense fallback={null}>
            <Physics paused={currentPhase < 5}>
              <Structure />
            </Physics>
          </Suspense>

          <OrbitControls makeDefault />
        </Canvas>
      </div>
    </div>
  )
}
