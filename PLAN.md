# Plano de Implementação: The Architect's Downfall (Analogia 3D de Clean Architecture)

Este documento descreve o plano passo a passo para a construção do projeto interativo 3D, refletindo todas as decisões arquiteturais da fase de *Grilling*.

## 1. Setup Inicial do Projeto
- Inicializar um projeto Vite + React (TypeScript).
- Instalar dependências essenciais:
  - `three` e `@react-three/fiber` (Renderização 3D)
  - `@react-three/drei` (Helpers para 3D, câmera, iluminação)
  - `@react-three/rapier` (Engine de física)
  - `tailwindcss` (Para a construção ágil e responsiva da UI em HTML)
- Configurar layout base responsivo:
  - **Desktop**: Tela dividida em colunas (30% UI lateral esquerda / 70% Canvas 3D lateral direita).
  - **Mobile**: Tela dividida em linhas (UI embaixo ou sobreposta e Canvas em cima).

## 2. Modelagem do Estado e UI
- Criar um estado global (via Context API ou Zustand simples) para controlar o `currentPhase` (0 a 6, onde 0 é a intro, 1-5 as fases de construção/queda e 6 a Retrospectiva).
- Construir o componente `Sidebar` (ou overlay no mobile) contendo:
  - Título da Fase.
  - Texto da História correspondente.
  - Botões de navegação ("Fase Anterior", "Próxima Fase").
- Na Fase 6, a `Sidebar` será substituída pela tela de **Retrospectiva** mapeando as fases aos princípios SOLID e Clean Arch.

## 3. Geração Procedural 3D e Câmera
- Criar a cena básica com iluminação, sombras e chão.
- Implementar controles de câmera (`OrbitControls`) para que os alunos/você possam girar o prédio livremente.
- Criar o componente `Block`, base do nosso sistema de voxel.
- Criar o componente `Structure` que, baseado no `currentPhase`, desenha proceduralmente os andares:
  - **Fase 1**: Blocos largos de fundação (talvez uma cor instável, rachaduras simuladas via cor/textura).
  - **Fase 2**: Segundo andar, com um buraco na estrutura simulando onde o elevador foi forçado.
  - **Fase 3**: Terceiro andar sendo construído, mas os carros (em miniatura) não cabem mais.
  - **Fase 4**: Quarto andar, com "canos" cruzando caoticamente os "fios".

## 4. O Desmoronamento (Fase 5 - Physics)
- Integrar os blocos procedurais gerados com os rigid-bodies do `@react-three/rapier`.
- Durante as fases 1 a 4, os blocos são definidos como estáticos (sem ação da gravidade) ou a engine de física fica pausada.
- Na Fase 5, alterar as propriedades dos rigid-bodies da fundação para dinâmicos (ou aplicar impulsos/forças) e permitir que a gravidade derrube os blocos, simulando o colapso.
- Implementar o "reset": garantir que voltar para a Fase 4 reinicie as posições originais dos blocos e congele a cena.

## 5. Refinamentos Visuais e Conteúdo
- Adicionar cores representativas para cada problema (ex: blocos azuis para água, vermelhos para energia cruzando-se).
- Preencher os textos oficiais de cada Fase (as "Stories").
- Preencher o conteúdo da tela de "Retrospectiva".
- Garantir responsividade perfeita entre o HTML sobreposto e o canvas 3D.
