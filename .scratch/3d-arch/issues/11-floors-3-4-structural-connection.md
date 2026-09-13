# 11: Reestruturação da Conexão dos Andares 3 e 4 (Variante A)

**What to build:** Reformular a transição entre o 3º andar (Estacionamento) e o 4º andar (Cobertura), implementando a arquitetura canônica com 4 pilotis nos cantos, pé-direito livre desimpedido sobre os veículos, laje intermediária de teto a Y = 6.05 e continuidade do poço do elevador do 2º andar.

**Blocked by:** 06

**Status:** resolved

## Acceptance criteria (TDD & Metrics)
- [x] Test (Geometria): `generateStructure(3, 'A')` inclui 4 pilotis (`pilotis-fl`, `pilotis-fr`, `pilotis-bl`, `pilotis-br`) e a laje de teto intermediária (`floor3-roof-slab`).
- [x] Test (Continuidade): `generateStructure(3, 'A')` inclui o bloco do núcleo de circulação vertical (`floor3-elevator-shaft`).
- [x] Test (Ausência de Clipagem): O pé-direito livre é de no mínimo 1.35m e a face superior de todos os veículos (`car.y + size.y/2`) fica estritamente abaixo da face inferior da laje intermediária.
- [x] Test (Apoio da Cobertura): A base do bloco da cobertura (`floor4-penthouse`) assenta-se perfeitamente sobre a laje intermediária sem penetração desordenada.
