import React, { useEffect } from 'react'

export type VariantType = 'A' | 'B' | 'C'

export interface VariantInfo {
  id: VariantType;
  name: string;
  description: string;
}

export const VARIANTS: VariantInfo[] = [
  {
    id: 'A',
    name: 'Variante A: Pilotis & Laje Coberta',
    description: 'Colunas nos 4 cantos e laje intermediária. Os carros ficam abrigados no vão livre e o 4º andar se apoia sobre o teto.',
  },
  {
    id: 'B',
    name: 'Variante B: Terraço Cantilever & Setback',
    description: '4º andar recuado no fundo com porta de acesso. Cria um deck aberto frontal desimpedido para os carros.',
  },
  {
    id: 'C',
    name: 'Variante C: Vigas I de Aço & Mezanino',
    description: 'Vigas de aço vermelhas elevam a cobertura, reforçando a metáfora de gambiarra e dívida técnica.',
  },
]

interface PrototypeSwitcherProps {
  currentVariant: VariantType;
  onSelectVariant: (variant: VariantType) => void;
}

export const PrototypeSwitcher: React.FC<PrototypeSwitcherProps> = ({
  currentVariant,
  onSelectVariant,
}) => {
  const currentIndex = VARIANTS.findIndex((v) => v.id === currentVariant)
  const current = VARIANTS[currentIndex] || VARIANTS[0]

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + VARIANTS.length) % VARIANTS.length
    onSelectVariant(VARIANTS[prevIndex].id)
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % VARIANTS.length
    onSelectVariant(VARIANTS[nextIndex].id)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  return (
    <div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900/90 backdrop-blur-md border border-gray-700/80 rounded-2xl shadow-2xl p-3 px-5 flex flex-col items-center max-w-lg w-[90%]"
      data-testid="prototype-switcher"
    >
      <div className="flex items-center justify-between w-full gap-4">
        <button
          onClick={handlePrev}
          className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-gray-200 transition-colors"
          title="Variante anterior (ou Seta Esquerda)"
          data-testid="prev-variant-btn"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center flex-1">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
            Protótipo de Conexão (Fases 3 & 4)
          </div>
          <div className="text-sm md:text-base font-extrabold text-white mt-0.5">
            {current.name}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-gray-200 transition-colors"
          title="Próxima variante (ou Seta Direita)"
          data-testid="next-variant-btn"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-2 text-center leading-relaxed">
        {current.description}
      </p>
    </div>
  )
}
