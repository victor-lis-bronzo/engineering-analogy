# 13: Cruzamento em Desnível (Overpass) Cano Azul x Fio Vermelho

**What to build:** Resolver a colisão e Z-fighting decorrentes do cruzamento no mesmo nível entre a tubulação hidráulica azul (`pipe-water-1`) e o condutor elétrico vermelho (`wire-electric-1`), elevando a fiação vermelha sobre cavaletes dedicados para passar por cima do cano d'água com vão livre vertical.

**Blocked by:** 12

**Status:** resolved

## Acceptance criteria (TDD & Metrics)
- [x] Test (Suportes Elevados): `generateStructure(4, 'A')` gera cavaletes de suporte verticais (`wire-sleeper-1` e `wire-sleeper-2`) que sustentam a fiação vermelha acima do nível da laje.
- [x] Test (Disjunção Vertical de Cotas): No ponto de cruzamento perpendicular (X=0, Z=0), a cota superior do cano azul é estritamente menor que a cota inferior do fio vermelho (`pipe.topY < wire.bottomY`).
- [x] Test (Vão Livre): A folga de ar entre os dois dutos é de pelo menos 15cm (`wire.bottomY - pipe.topY >= 0.15`).
- [x] Métrica Visual: Visão superior e lateral 3D desobstruída, sem serrilhado entre azul e vermelho.
