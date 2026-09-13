# 12: Resolução de Z-Fighting no Telhado / Tubulação Azul

**What to build:** Eliminar a coplanaridade entre a platibanda da cobertura (`floor4-roof-parapet`, Y_top = 8.20) e a tubulação de água azul (`pipe-water-1`, Y_top = 8.20), introduzindo calços de suporte estruturais (*pipe sleepers*) para elevar a tubulação acima da laje impermeabilizada.

**Blocked by:** 11

**Status:** resolved

## Acceptance criteria (TDD & Metrics)
- [x] Test (Calços Estruturais): `generateStructure(4, 'A')` gera calços de apoio (`pipe-sleeper-1` e `pipe-sleeper-2`) assentados sobre a laje.
- [x] Test (Não-Coplanaridade / Anti-Z-Fighting): A face inferior de `pipe-water-1` é estritamente maior que a face superior de `floor4-roof-parapet` (`pipe.bottomY > parapet.topY`), mantendo pelo menos 10cm de vão livre.
- [x] Métrica Visual: Ausência de serrilhados ou costura de polígonos no encontro entre o tubo azul e a laje de cobertura.
