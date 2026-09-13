import React from 'react'
import { usePhaseStore } from '../store'

export const RETROSPECTIVE_ITEMS = [
  {
    phase: 'Fase 1',
    concept: 'Dívida Técnica',
    analogy: 'Fundação cimentada às pressas',
    lesson: 'Atalhos arquiteturais no início do projeto parecem acelerar o desenvolvimento inicial, mas criam uma base instável que limita todo o crescimento futuro.',
  },
  {
    phase: 'Fase 2',
    concept: 'Open/Closed Principle (OCP)',
    analogy: 'Elevador aberto na marreta',
    lesson: 'Módulos de software devem estar abertos para extensão, mas fechados para modificação direta. Alterar o núcleo para comportar cada nova feature quebra a integridade do sistema.',
  },
  {
    phase: 'Fase 3',
    concept: 'Single Responsibility & Liskov (SRP / LSP)',
    analogy: 'Carros pesados no 3º andar residencial',
    lesson: 'Sobrecarregar uma classe ou módulo com responsabilidades estranhas ao seu domínio gera comportamentos imprevisíveis e impede que subtipos sejam intercambiáveis.',
  },
  {
    phase: 'Fase 4',
    concept: 'Inversão de Dependência & Acoplamento (DIP)',
    analogy: 'Canos de água com fiação elétrica por dentro',
    lesson: 'Módulos de alto nível não devem depender de detalhes de baixo nível. Alto acoplamento faz com que a menor alteração em uma ponta do sistema quebre funcionalidades não relacionadas.',
  },
  {
    phase: 'Fase 5',
    concept: 'Colapso Sistêmico',
    analogy: 'Queda em cascata do edifício sob vento leve',
    lesson: 'A dívida técnica tem juros compostos. Quando o sistema atinge o ponto crítico de fragilidade, qualquer nova alteração trivial em produção desencadeia falhas em cascata.',
  },
]

export const Retrospective: React.FC = () => {
  const reset = usePhaseStore((state) => state.reset)

  return (
    <div className="p-6 md:p-8 h-full flex flex-col justify-between overflow-y-auto" data-testid="retrospective-panel">
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
            Conclusão da Simulação
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">
            Retrospectiva: Clean Architecture
          </h1>
          <p className="text-gray-300 text-sm mt-2 leading-relaxed">
            Veja como cada decisão apressada na construção do nosso prédio espelha violações críticas de engenharia de software:
          </p>
        </div>

        <div className="space-y-4">
          {RETROSPECTIVE_ITEMS.map((item) => (
            <div 
              key={item.phase} 
              className="p-4 bg-gray-900/60 border border-gray-700/60 rounded-xl hover:border-gray-600 transition-colors"
              data-testid={`retro-item-${item.phase}`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/40">
                  {item.phase}
                </span>
                <span className="text-xs font-bold text-amber-400">
                  {item.concept}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-200 mb-1">
                Metáfora: {item.analogy}
              </div>
              <div className="text-xs text-gray-400 leading-relaxed">
                {item.lesson}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-700/50 flex justify-end">
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-colors text-white font-semibold rounded-lg text-sm shadow-lg shadow-emerald-900/30"
          data-testid="restart-simulation-btn"
        >
          Reiniciar Simulação
        </button>
      </div>
    </div>
  )
}
