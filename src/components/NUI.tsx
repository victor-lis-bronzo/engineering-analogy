import React from 'react'
import { useSimulationStore } from '../store'

const PHASES_STORY = [
  { title: 'Introdução', content: 'Bem-vindo ao The Architect\'s Downfall. Vamos construir um prédio, mas ignorando a arquitetura limpa.' },
  { title: 'Fase 1: Fundação Rápida', content: 'Jogamos uma fundação rápida sem pensar no futuro.' },
  { title: 'Fase 2: O Elevador', content: 'Decidimos que precisamos de um elevador, quebrando a estrutura central.' },
  { title: 'Fase 3: Os Carros', content: 'Colocamos carros onde não cabiam, entortando as vigas.' },
  { title: 'Fase 4: A Fiação e os Canos', content: 'Cruzamos energia e água caoticamente. Um emaranhado.' },
  { title: 'Fase 5: O Colapso', content: 'O sistema não aguenta o próprio peso (Dívida Técnica).' },
  { title: 'Retrospectiva', content: 'O que aprendemos com a quebra de SOLID e Arquitetura Limpa?' },
]

export const NUI: React.FC = () => {
  const currentPhase = useSimulationStore((state) => state.currentPhase)
  const nextPhase = useSimulationStore((state) => state.nextPhase)
  const prevPhase = useSimulationStore((state) => state.prevPhase)
  const story = PHASES_STORY[currentPhase]

  return (
    <div className="p-6 h-full flex flex-col justify-between">
      <div>
        <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-1" data-testid="phase-indicator">
          Fase {currentPhase}
        </div>
        <h1 className="text-2xl font-bold mb-4">{story.title}</h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          {story.content}
        </p>
      </div>

      <div className="flex justify-between mt-6">
        <button 
          onClick={prevPhase} 
          disabled={currentPhase === 0}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button 
          onClick={nextPhase}
          disabled={currentPhase === PHASES_STORY.length - 1}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  )
}
