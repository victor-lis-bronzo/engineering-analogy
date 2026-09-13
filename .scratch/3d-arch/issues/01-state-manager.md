# 01: State Manager & Basic UI

**What to build:** O projeto Vite roda. A interface mostra apenas um texto indicando a fase e botões de Avançar/Voltar.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

## Acceptance criteria (TDD & Metrics)
- [ ] Test (Binário): `usePhaseStore` incrementa de 0 para 1 ao chamar `nextPhase()`.
- [ ] Test (Binário): `usePhaseStore` não permite avançar além da fase máxima (6).
- [ ] Test (Binário): `usePhaseStore` não permite voltar abaixo da fase 0.
- [ ] Métrica Visual (Binário): Renderização DOM bem sucedida mostrando texto "Fase 0" e botões clicáveis que alteram o número na tela.
