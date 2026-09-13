# The Architect's Downfall 🏗️💥
### Uma Parábola 3D Interativa sobre Dívida Técnica, SOLID e Clean Architecture

[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r186-black?logo=threedotjs)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-9.7-blue)](https://docs.pmnd.rs/react-three-fiber)
[![Rapier Physics](https://img.shields.io/badge/Rapier-Physics-orange)](https://rapier.rs/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tests-27%20passed-brightgreen?logo=vitest)](https://vitest.dev/)

---

## 📌 Sumário
1. [Sobre o Projeto](#-sobre-o-projeto)
2. [A Metáfora Central](#-a-metáfora-central)
3. [Roteiro Completo dos Conteúdos (Fase a Fase)](#-roteiro-completo-dos-conteúdos-fase-a-fase)
4. [Guia de Apresentação Oral (Pitch & Demo)](#-guia-de-apresentação-oral-pitch--demo)
5. [Modo Protótipo & Variantes Arquiteturais (`/prototype`)](#-modo-protótipo--variantes-arquiteturais-prototype)
6. [Arquitetura Técnica do Software](#-arquitetura-técnica-do-software)
7. [Como Executar o Projeto](#-como-executar-o-projeto)
8. [Governança e Qualidade](#-governança-e-qualidade)

---

## 🎯 Sobre o Projeto

Conceitos como **Clean Architecture**, princípios **SOLID**, **acoplamento** e **dívida técnica** são fundamentais na formação de qualquer engenheiro de software ou desenvolvedor. No entanto, por serem lecionados quase sempre em nível de código abstrato (diagramas estáticos de classes ou pequenos trechos de código), sua gravidade costuma ser subestimada.

**The Architect's Downfall** transforma esses conceitos em uma **experiência visual e física interativa em 3D**. O usuário assume o papel do arquiteto-chefe de uma startup pressionado por prazos irreais de entrega. Cada atalho tomado resulta em uma "gambiarra" física visível na construção de um edifício estilo voxel. 

O clímax acontece quando a estrutura não suporta mais o peso de suas próprias decisões erradas e **desmorona em tempo real utilizando um motor de física (`@react-three/rapier`)**, culminando em uma tela de retrospectiva técnica que mapeia cada erro da construção ao seu respectivo princípio violado na Engenharia de Software.

---

## 🏢 A Metáfora Central

> *"Se construtores construíssem prédios da mesma forma que programadores escrevem programas, o primeiro pica-pau que aparecesse destruiria a civilização."* — Gerald Weinberg

No software, atalhos arquiteturais não quebram o sistema imediatamente: eles se acumulam silenciosamente como **juros compostos**. Na nossa simulação:
- **Fundação sem estacas** = Falta de abstração inicial e acoplamento precoce ao framework/banco.
- **Marretar lajes para passar elevador** = Violação de Open/Closed Principle (modificação direta no núcleo).
- **Estacionamento pesado no meio do prédio** = Violação de Single Responsibility e Liskov Substitution.
- **Fios elétricos dentro dos canos d'água** = Violação de Dependency Inversion e alto acoplamento bidirecional.
- **Queda catastrófica sob vento leve** = Falha em cascata em produção desencadeada por uma mudança trivial de requisitos.

---

## 📖 Roteiro Completo dos Conteúdos (Fase a Fase)

A aplicação é dividida em **7 fases cronológicas** (Fase 0 à Fase 6). A barra lateral de interface narrativa (**NUI — Narrative UI**) guia o usuário enquanto o canvas 3D renderiza as transformações estruturais correspondentes:

| Fase | Título Narrativo | Metáfora Física no Prédio 3D | Conceito de Software Violado | Lição Aprendida |
| :--- | :--- | :--- | :--- | :--- |
| **0** | **The Architect's Downfall** | Terreno vazio pronto para receber a construção | O Dilema do Arquiteto (Velocidade vs. Sustentabilidade) | Entregar valor rápido sem arquitetura gera passivos impagáveis. |
| **1** | **A Fundação da Pressa** | Base de concreto cimentada sem estacas profundas | **Dívida Técnica Inicial** & Acoplamento à Base | Atalhos na base parecem rápidos, mas impõem limites rígidos a todo crescimento futuro. |
| **2** | **O Elevador Central Forçado** | Concreto do 2º andar arrebentado na marreta e vigas expostas cortadas | **Open/Closed Principle (OCP)** | O código deve estar aberto para extensão, mas fechado para modificação direta nas vigas mestras. |
| **3** | **O Estacionamento Flutuante** | Carros pesados empilhados no 3º andar que transbordam pela borda | **Single Responsibility (SRP)** & **Liskov Substitution (LSP)** | Um módulo não deve assumir múltiplos papéis conflitantes nem violar o contrato de seus subtipos. |
| **4** | **O Labirinto do Acoplamento** | Fiação elétrica vermelha passando por dentro de canos de água azul | **Dependency Inversion Principle (DIP)** & Acoplamento Forte | Módulos de alto nível não devem depender de detalhes mecânicos. Se tudo se conecta a tudo, qualquer toque quebra tudo. |
| **5** | **O Colapso Inevitável** | Toda a estrutura desaba sob gravidade e colisões físicas com Rapier | **Falha Sistêmica em Cascata** & Limite da Dívida Técnica | Uma rajada leve de vento (mudança trivial de requisito) faz o sistema ruir sob o peso de suas más decisões. |
| **6** | **Retrospectiva Arquitetural** | Tela de fechamento técnico e consolidação das analogias | **Princípios de Clean Architecture e SOLID** | Resumo conceitual comparativo conectando a metáfora física à teoria de Engenharia de Software. |

---

## 🎤 Guia de Apresentação Oral (Pitch & Demo)

Se você estiver utilizando este projeto para um seminário universitário, apresentação de disciplina (ex: Análise e Desenvolvimento de Sistemas ou Engenharia de Software) ou tech talk corporativa, siga este roteiro de apresentação:

1. **Introdução (Fase 0 — 1 min)**:
   - Apresente o cenário: *"Imagine uma startup que precisa lançar um produto amanhã. A ordem é não pensar em arquitetura agora, porque 'depois a gente refatora'."*
   - Mostre a tela inicial e aponte para o terreno limpo no 3D.
2. **A Base e a Primeira Modificação (Fases 1 e 2 — 2 min)**:
   - Avance para a **Fase 1**: mostre o térreo com as janelas e portas comerciais. Destaque que, por fora, o sistema parece sólido.
   - Avance para a **Fase 2**: use o botão direito/esquerdo do mouse para rotacionar a câmera e mostre o buraco central e as **vigas de aço cortadas em vermelho**.
   - Conecte: *"O cliente pediu um elevador. Como não havia modularidade (OCP), fomos forçados a rasgar a classe principal."*
3. **A Escalada do Caos (Fases 3 e 4 — 2 min)**:
   - Avance para a **Fase 3**: aponte para os carros amarelos e azuis equilibrados no meio do edifício. Explique SRP e LSP.
   - Avance para a **Fase 4**: aproxime o zoom na cobertura técnica. Aponte para os canos azuis e a fiação vermelha cruzada.
   - Conecte: *"Quem aqui já alterou uma linha no módulo de relatórios e derrubou o módulo de pagamentos? Isso é exatamente o que acontece quando a água e a eletricidade compartilham o mesmo conduto (DIP)."*
4. **O Clímax Físico (Fase 5 — 1.5 min)**:
   - Avance para a **Fase 5**. Espere a reação da plateia ao ver os blocos voando e a estrutura colapsando sob gravidade real.
   - Enfatize: *"Não foi um terremoto de magnitude 9. Foi apenas um vento de 15 km/h. Em produção, isso é aquela feature de 2 horas que o estagiário subiu na sexta-feira à tarde."*
5. **A Retrospectiva (Fase 6 — 1.5 min)**:
   - Mostre o painel de retrospectiva e revise cada princípio SOLID com a turma.
   - Clique em **Reiniciar Simulação** para demonstrar que o estado é limpo e determinístico.

---

## 🧪 Modo Protótipo & Variantes Arquiteturais (`/prototype`)

O projeto inclui um mecanismo de prototipagem arquitetural ativo, projetado para validar diferentes soluções de engenharia para a conexão entre os andares 3 e 4:

### Como Ativar
Adicione o parâmetro `?prototype=true` na URL:
```text
http://localhost:5173/?prototype=true
```

Ao ativar esse parâmetro, uma **barra flutuante inferior (Prototype Switcher)** será exibida, permitindo alternar dinamicamente entre as 3 variantes em tempo de execução sem recarregar a página:

```
[Variante A: Pilotis & Laje (Recomendada)]   [Variante B: Cantilever & Setback]   [Variante C: Vigas I & Mezanino]
```

### Detalhamento das Variantes

* **Variante A (Canônica — Pilotis e Laje Contínua)**:
  - 4 pilotis de concreto nos cantos (`0.4 x 1.3 x 0.4`) e núcleo de elevador para circulação vertical.
  - Laje intermediária de teto em `Y = 6.05`, garantindo pé-direito livre de 1.35m sobre os veículos.
  - Cobertura com janelas panorâmicas, caixa d'água cilíndrica e **Overpass Técnico MEP**: calços estruturais elevando a tubulação azul e cavaletes verticais suspendendo a fiação elétrica vermelha com folga de ar de 20cm, eliminando 100% de Z-fighting.
* **Variante B (Cantilever & Setback)**:
  - Deck de estacionamento frontal aberto com muretas estendidas.
  - Torre habitacional recuada na parte traseira (*setback*) com porta de vidro que dá acesso direto ao terraço.
* **Variante C (Vigas I de Aço & Mezanino)**:
  - 4 pilares metálicos em perfil I vermelho simulando um reforço emergencial de ferro cru.
  - Mezanino elevado sobre o estacionamento, acentuando visualmente o aspecto de "reforma estrutural improvisada".

---

## 🏛️ Arquitetura Técnica do Software

A aplicação foi construída com foco em **desacoplamento**, **testabilidade pura** e **performance de renderização**:

```text
src/
├── components/
│   ├── NUI.tsx                 # Narrative UI (camada 2D com as histórias e controles)
│   ├── Retrospective.tsx       # Tela final de retrospectiva conceitual e mapeamento SOLID
│   ├── Structure.tsx           # Renderizador R3F dos blocos 3D e integração com RigidBody
│   └── PrototypeSwitcher.tsx   # Barra flutuante de prototipagem (Variantes A, B, C)
├── utils/
│   └── generateStructure.ts    # Gerador procedural puro e determinístico (independente de Three.js)
├── store.ts                    # Gerenciador de estado global da simulação via Zustand
├── test/                       # 9 arquivos de teste automatizado (27 testes passando no Vitest)
└── App.tsx                     # Ponto de composição do Canvas 3D e do NUI
```

### Decisões Arquiteturais Chave
1. **Gerador Procedural Puro**: A função `generateStructure(phase, variant)` é uma função pura em TypeScript. Ela recebe apenas inteiros/strings e retorna arrays de dados primitivos (`BlockData[]`). Isso permite testar 100% da geometria e posicionamento no Vitest sem necessidade de instanciar contexto WebGL.
2. **Controle de Física Determinístico**: A física do `@react-three/rapier` permanece pausada (`paused={currentPhase < 5}`) durante as Fases 0 a 4, garantindo estabilidade e permitindo rotação livre da câmera. Na Fase 5, a física é ativada instantaneamente, permitindo que a gravidade e as colisões derrubem o edifício.
3. **Estado Global Unificado**: Implementado via **Zustand** ([store.ts](file:///C:/Área%20de%20Trabalho/Projetos/3d-engineering-analogy/src/store.ts)), mantendo o histórico de fase sincronizado e gravando a variante selecionada na query param da URL via `history.replaceState`. (Consulte a [ADR 0001](file:///C:/Área%20de%20Trabalho/Projetos/3d-engineering-analogy/docs/adr/0001-use-zustand-for-global-state.md)).

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior.
- Gerenciador de pacotes `npm`.

### 1. Clonar e Instalar Dependências
```bash
git clone <url-do-repositorio>
cd 3d-engineering-analogy
npm install
```

### 2. Rodar em Ambiente de Desenvolvimento
```bash
npm run dev
```
Abra `http://localhost:5173` no seu navegador.

### 3. Rodar os Testes Automatizados
```bash
npm test
```
Executa a suíte completa de testes no Vitest (27 testes unitários e de integração cobrindo store, colapso, geração procedural e interfaces).

### 4. Compilação de Produção e Validação Estrita
```bash
npm run build
```
Executa a validação de tipagem estrita com TypeScript (`tsc`) e gera os bundles otimizados com Vite na pasta `dist/`.

### 5. Pré-visualizar o Build de Produção
```bash
npm run preview
```

---

## 🛡️ Governança e Qualidade

O projeto segue padrões rigorosos de governança contínua:
- **Local Issue Tracker**: Gestão rastreada em Markdown na pasta `.scratch/3d-arch/issues/` com ciclo `claimed` -> `resolved` e critérios binários de aceite.
- **Glossário Unificado**: Vocabulário de domínio padronizado em [CONTEXT.md](file:///C:/Área%20de%20Trabalho/Projetos/3d-engineering-analogy/CONTEXT.md).
- **Architecture Decision Records (ADRs)**: Decisões documentadas em `docs/adr/`.
- **Commits Semânticos**: Histórico de commits em inglês seguindo o padrão de commits semânticos (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`).

---

Feito com ☕, TypeScript e Three.js para descomplicar a Engenharia de Software.
