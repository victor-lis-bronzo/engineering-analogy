# 0001: Use Zustand for Global State

## Status
Accepted

## Context
O projeto precisa de um estado global compartilhado para gerenciar a fase atual da simulação (`currentPhase`). Esse estado controla tanto a interface de navegação e textos 2D (a Narrative UI, ou NUI) quanto o estado do canvas 3D (React Three Fiber) e da engine de física (Rapier).
A abordagem padrão seria utilizar a Context API nativa do React. No entanto, qualquer atualização de estado via Context API dispara uma re-renderização completa da árvore de componentes consumidores (re-render). Em um ambiente 3D onde o React Three Fiber busca manter 60fps, re-renders desnecessários de componentes da cena causam sérios gargalos de performance e "engasgos" (stutters) na física.

## Decision
Utilizaremos a biblioteca **Zustand** para o gerenciamento de estado global.

## Consequences
* **Positivas:** 
  * Melhoria drástica na performance da cena 3D.
  * Permite atualizações transientes (transient updates): componentes 3D podem assinar valores de estado e reagir a eles no loop de renderização (useFrame) sem acionar o ciclo completo do React.
  * *Selective reactivity*: componentes do React apenas re-renderizam se as fatias específicas de estado (slices) às quais eles se inscreveram mudarem.
* **Negativas:** 
  * Adiciona uma dependência externa mínima ao projeto.
  * Introduz um padrão ligeiramente diferente da Context API padrão para desenvolvedores não familiarizados.
