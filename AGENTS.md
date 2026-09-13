## Agent skills

### Issue tracker

Local markdown tracking under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default label strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context documentation layout. See `docs/agents/domain.md`.

### Prototype & Feature Workflow

Todo novo `/prototype`, ajuste ou feature deve seguir o fluxo completo de governança do projeto:
1. **Plano de Implementação**: Criar plano detalhado e aguardar aprovação expressa do usuário.
2. **Docs & Spec**: Atualizar ou criar a especificação em `.scratch/<feature>/spec.md` e registrar no `map.md`.
3. **Tickets no Issue Tracker**: Criar tickets numerados em `.scratch/<feature>/issues/<NN>-<slug>.md` com critérios de aceite binários (TDD e métricas visuais), com ciclo `claimed` -> `resolved`.
4. **TDD & Testes Automatizados**: Desenvolver testes no Vitest validando rigorosamente o comportamento antes/durante a entrega.
5. **Verificação de Qualidade**: Garantir `npm test` (100% de sucesso) e `npm run build` (0 erros/warnings).
6. **Commits Semânticos**: Commits atômicos em inglês com escopo coerente (`feat:`, `fix:`, `test:`, `docs:`), sugerindo os nomes ao final e realizando o push.
7. **Walkthrough**: Registrar as entregas e histórico em `walkthrough.md`.

