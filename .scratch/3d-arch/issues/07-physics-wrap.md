# 07: Physics Engine Wrap (Estático)

**What to build:** O sistema `@react-three/rapier` é envelopado. Os blocos viram `RigidBody` estáticos.

**Blocked by:** 06

**Status:** resolved

## Acceptance criteria (TDD & Metrics)
- [x] Métrica Visual (Binário): O projeto roda com o Provider `<Physics>` encapsulando a estrutura, sem crashes.
- [x] Métrica (Binário): Blocos rodam como `<RigidBody type="fixed">`. O prédio continua estático visualmente igual ao ticket 06.
