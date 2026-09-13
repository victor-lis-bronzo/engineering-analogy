import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { NUI } from './components/NUI'
import { Structure } from './components/Structure'
import { Retrospective } from './components/Retrospective'
import { Suspense } from 'react'
import { Physics } from '@react-three/rapier'
import { usePhaseStore } from './store'

export default function App() {
  const currentPhase = usePhaseStore((state) => state.phase)
  const isRetrospective = currentPhase === 6

  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-screen bg-gray-900 text-white">
      {/* Narrative UI (NUI) / Retrospective */}
      <div 
        data-testid="nui-container"
        className={`w-full ${isRetrospective ? 'md:w-[45%]' : 'md:w-[30%]'} h-1/2 md:h-full z-10 bg-gray-800 shadow-xl overflow-y-auto transition-all duration-300`}
      >
        {isRetrospective ? <Retrospective /> : <NUI />}
      </div>

      {/* 3D Canvas */}
      <div 
        data-testid="canvas-container"
        className={`w-full ${isRetrospective ? 'md:w-[55%]' : 'md:w-[70%]'} h-1/2 md:h-full relative transition-all duration-300`}
      >
        <Canvas camera={{ position: [11, 10, 11], fov: 45 }}>
          <color attach="background" args={['#171923']} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[12, 16, 8]} intensity={1.2} castShadow />
          <directionalLight position={[-10, 10, -6]} intensity={0.4} />
          
          <Suspense fallback={null}>
            <Physics paused={currentPhase < 5}>
              <Structure />
            </Physics>
          </Suspense>

          <OrbitControls 
            makeDefault 
            target={[0, 3.5, 0]} 
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={5}
            maxDistance={35}
          />
        </Canvas>
      </div>
    </div>
  )
}
