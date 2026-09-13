# Domain Glossary

Este arquivo mantém o vocabulário unificado para o projeto, mapeando os conceitos da aplicação e garantindo que o código e a comunicação utilizem os mesmos termos.

- **Phase (Fase)**: Um estágio discreto da simulação. O usuário navega entre *Phases*. Cada *Phase* contém um texto narrativo e define o estado do prédio.
- **Story (História)**: O texto lúdico exibido na interface do usuário em uma determinada *Phase*.
- **Block (Bloco)**: A unidade atômica (voxel 3D) gerada proceduralmente. Representa elementos estruturais (ex: fundação, parede, elevador).
- **Structure (Prédio/Estrutura)**: O agregado de *Blocks* empilhados em cena. É a representação visual da arquitetura de software no momento atual. A *Structure* é recriada do zero a cada mudança de *Phase* para garantir um estado físico limpo.
- **Collapse (Desmoronamento)**: O evento físico que ocorre na última *Phase*. Os *Blocks* perdem a fixação e a *Structure* desaba devido à fundação frágil e adições mal planejadas.
- **Retrospective (Retrospectiva)**: A tela de conclusão. Onde a metáfora é traduzida e cada erro da história é explicitamente ligado a um conceito de Engenharia de Software (Dívida Técnica, violações de SOLID e Clean Architecture).
- **NUI (Narrative UI)**: A camada de interface em HTML/React (2D) sobreposta ao canvas 3D. Exibe as *Stories* e controles de navegação. Substitui o uso de termos genéricos como "Sidebar" ou "Overlay".
