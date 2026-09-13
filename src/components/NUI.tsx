import React from 'react'
import { usePhaseStore } from '../store'

export interface StoryPhase {
  phase: number;
  title: string;
  subtitle: string;
  content: string;
  warning?: string;
}

export const PHASES_STORY: StoryPhase[] = [
  {
    phase: 0,
    title: 'The Architect\'s Downfall',
    subtitle: 'Uma Parábola 3D sobre Dívida Técnica e Clean Architecture',
    content: 'Você é o arquiteto-chefe encarregado de construir a sede de uma startup bilionária. A liderança pede "agilidade total" e "entregar valor rápido para o mercado". O plano é levantar andar por andar, ignorando cálculos estruturais e princípios arquiteturais consagrados. Acompanhe a jornada e veja o que acontece quando a velocidade atropela os fundamentos da engenharia.',
  },
  {
    phase: 1,
    title: 'A Fundação da Pressa',
    subtitle: 'Fase 1: O Atalho Inicial',
    content: 'Para cumprir o prazo da sprint, a fundação foi cimentada às pressas. Sem isolamento de solo, sem estacas profundas de sustentação. "Depois a gente refatora a base", disseram os investidores. Afinal, por enquanto está de pé e parece sólido aos olhos do usuário.',
    warning: 'Sinal de Perigo: Falta de abstração na base e acoplamento direto com o solo instável.',
  },
  {
    phase: 2,
    title: 'O Elevador Central Forçado',
    subtitle: 'Fase 2: Violando o Princípio Aberto/Fechado (OCP)',
    content: 'O produto exigiu a adição urgente de um elevador panorâmico no centro do edifício. Em vez de termos previsto pontos de extensão modulares, a equipe simplesmente abriu uma marreta no concreto armado do 2º andar. A estrutura original foi violentamente modificada para acomodar o novo requisito.',
    warning: 'Violação: Open/Closed Principle (OCP) - O código deveria estar aberto para extensão, mas fechado para modificação direta nas vigas mestras.',
  },
  {
    phase: 3,
    title: 'O Estacionamento Flutuante',
    subtitle: 'Fase 3: Sobrecarga de Responsabilidades (SRP & Liskov)',
    content: 'Alguém na diretoria teve a ideia genial de colocar um estacionamento de carros pesados no 3º andar. Um andar residencial que agora precisa aguentar veículos que extrapolam a capacidade e vazam pelas beiradas. O módulo agora tem múltiplas razões para quebrar.',
    warning: 'Violação: Single Responsibility Principle (SRP) e Liskov Substitution Principle (LSP) - Esse andar não pode ser tratado como um andar convencional.',
  },
  {
    phase: 4,
    title: 'O Labirinto do Acoplamento',
    subtitle: 'Fase 4: Inversão de Dependência Inexistente (DIP)',
    content: 'No 4º andar, a fiação de alta tensão vermelha foi passada diretamente por dentro dos canos de água azul para "economizar espaço e tempo". Se você mexer no encanamento, toma choque. Se desligar a chave geral, corta a água. Tudo depende de tudo nos menores detalhes concretos.',
    warning: 'Violação: Dependency Inversion Principle (DIP) - Módulos de alto nível fortemente amarrados a detalhes mecânicos de baixo nível.',
  },
  {
    phase: 5,
    title: 'O Colapso Inevitável',
    subtitle: 'Fase 5: O Preço da Dívida Técnica',
    content: 'Não foi necessário um terremoto de magnitude 9. Bastou uma leve rajada de vento (uma simples mudança de requisito em produção). A base frágil e a sobrecarga excêntrica causaram falha catastrófica em cascata. O sistema ruiu por completo sob o peso de suas próprias decisões acumuladas.',
    warning: 'Conclusão Física: A dívida técnica sempre cobra juros compostos. Quando o sistema cai, a reconstrução do zero custa dez vezes mais.',
  },
  {
    phase: 6,
    title: 'Retrospectiva Arquitetural',
    subtitle: 'Fase 6: Lições para a Engenharia de Software',
    content: 'A transição para a tela de retrospectiva detalhada mapeará cada um desses desastres aos princípios fundamentais do SOLID e da Arquitetura Limpa.',
  },
]

export const NUI: React.FC = () => {
  const currentPhase = usePhaseStore((state) => state.phase)
  const nextPhase = usePhaseStore((state) => state.nextPhase)
  const prevPhase = usePhaseStore((state) => state.prevPhase)
  const story = PHASES_STORY[currentPhase] || PHASES_STORY[0]

  return (
    <div className="p-6 h-full flex flex-col justify-between" data-testid="nui-wrapper">
      <div className="space-y-4">
        <div 
          className="text-xs uppercase tracking-widest text-blue-400 font-semibold" 
          data-testid="phase-indicator"
        >
          Fase {currentPhase}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight" data-testid="story-title">
            {story.title}
          </h1>
          <h2 className="text-sm font-medium text-gray-400 mt-1" data-testid="story-subtitle">
            {story.subtitle}
          </h2>
        </div>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed" data-testid="story-content">
          {story.content}
        </p>

        {story.warning && (
          <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-200 text-xs md:text-sm">
            {story.warning}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6 pt-4 border-t border-gray-700/50">
        <button 
          onClick={prevPhase} 
          disabled={currentPhase === 0}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 transition-colors rounded text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button 
          onClick={nextPhase}
          disabled={currentPhase === PHASES_STORY.length - 1}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors rounded text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </div>
  )
}
