Status: ready-for-agent
Type: spec

# Spec: 3D Architecture Analogy

## Problem Statement

O usuário (aluno de Análise e Desenvolvimento de Sistemas) precisa demonstrar, de forma lúdica e visual, os efeitos de uma má estruturação de arquitetura de software (focando em Clean Architecture e SOLID) para um trabalho da faculdade. Atualmente, os conceitos são abstratos e difíceis de visualizar, o que dificulta o engajamento e a compreensão de métricas como "dívida técnica" e "acoplamento".

## Solution

Uma aplicação web interativa em 3D estilo voxel. A aplicação conta a história da construção de um prédio fase a fase. A cada andar, um problema de planejamento (como esquecer um elevador ou passar canos de água pela elétrica) é introduzido, atuando como uma metáfora visual para violações de SOLID e Clean Architecture. O prédio eventualmente desaba usando um motor de física (`@react-three/rapier`), e uma tela final traduz toda a metáfora para os conceitos reais de engenharia de software.

## User Stories

1. As an aluno apresentador, I want to controlar a apresentação clicando em "Próxima Fase", so that I can explicar cada etapa no meu próprio tempo para a turma.
2. As an aluno apresentador, I want to poder clicar em "Fase Anterior" para retroceder, so that I can revisar algum detalhe caso a turma faça perguntas.
3. As a viewer, I want to ver o texto da história (Story) em uma interface limpa HTML ao lado do canvas 3D, so that I can ler claramente o contexto do que está acontecendo na estrutura.
4. As a viewer, I want to ver blocos (Blocks) sendo empilhados proceduralmente a cada fase, so that I can visualizar a Structure crescendo e as "gambiarras" acontecendo (ex: elevador faltando, canos cruzados).
5. As a viewer, I want to ver a estrutura desmoronar fisicamente na Fase 5, so that the impact of technical debt (dívida técnica acumulada) seja óbvio e memorável.
6. As a viewer, I want to ler uma "Retrospective" final, so that I can entender exatamente qual princípio do SOLID foi violado em cada etapa da construção.
7. As an aluno apresentador, I want the aplicação rodando na Web (React, Vite), so that I can easily open it on any browser without installing software during the presentation.

## Implementation Decisions

- **Framework**: O projeto usará React via Vite com TypeScript.
- **3D Engine**: `@react-three/fiber` para renderização 3D, com `@react-three/drei` para utilitários de câmera e cena.
- **Física**: `@react-three/rapier` para simular a gravidade e colisões no momento do Collapse (Desmoronamento).
- **Styling**: TailwindCSS para a interface 2D lateral.
- **Estado**: Um simples hook baseado em Reducer ou Zustand para controlar o `currentPhase` (0 a 6).
- **Procedural Generation**: Uma função determinística receberá o `currentPhase` e retornará os `Blocks` que devem ser renderizados. A física só será ativada via props dinâmicas do Rapier no momento do colapso.
- **Transição Arquitetônica Andares 3 e 4 (Variante A)**:
  - 3º Andar (Estacionamento): 4 pilotis de concreto nos cantos (`0.4 x 1.3 x 0.4`), muretas de proteção perimetral, laje intermediária de teto em Y = 6.05 (pé-direito livre de 1.35m sobre os carros) e shaft de continuidade do elevador do 2º andar.
  - 4º Andar (Cobertura Residencial): Volume habitacional assentado sobre a laje intermediária, com janelas panorâmicas reflexivas, platibanda superior, caixa d'água cilíndrica e mastro de antena.
- **Instalações Técnicas Prediais (MEP) e Anti-Z-Fighting**:
  - Calços de apoio estruturais (*pipe sleepers*) elevando a tubulação azul a Y = 8.50 (base Y = 8.30) para garantir não-coplanaridade e zero Z-fighting com a platibanda do telhado (Y_top = 8.20).
  - Cruzamento em desnível (*Overpass*): A fiação elétrica vermelha cruza perpendicularmente sobre a tubulação hidráulica a Y = 9.10 apoiada em cavaletes técnicos verticais, com vão livre de ar de mais de 20cm (zero colisão física e zero Z-fighting).

## Testing Decisions

- **O que faz um bom teste**: Testes focarão no comportamento externo da aplicação (seams) sem acoplar com a implementação interna (framework 3D ou re-renders).
- **Módulos que serão testados**:
  - `Phase Store / Reducer`: Testado via testes unitários puros para garantir que as transições de fase são seguras e não vazam os limites (0 a 6).
  - `Procedural Generator`: Testado unitariamente para garantir que para a `Phase 4`, a estrutura gerada contenha exatamente a contagem de blocos e posições esperadas (sem envolver Three.js).
- **Prior Art**: O projeto usará ferramentas comuns do ecossistema Vite (Vitest) e Testing Library para eventuais testes de integração da UI (botões Avançar/Voltar).

## Out of Scope

- Modelagem manual de assets 3D (Tudo será gerado via código/primitivas).
- Autenticação de usuários, banco de dados, ou backend de persistência.
- Personagens animados na cena 3D andando pelo prédio.
- Suporte complexo para celular (focaremos em rodar no desktop para a apresentação em tela grande).

## Further Notes
- Todo o vocabulário (Phase, Story, Block, Structure, Collapse, Retrospective) deve seguir estritamente o `CONTEXT.md` na raiz do projeto.
