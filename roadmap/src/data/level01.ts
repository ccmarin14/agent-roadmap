export const level01 = {
  id: "01",
  title: "Fundamentos",
  color: "#34D399",
  duration: "1–2 semanas",
  team: "Individual",
  desc: "Entender qué es un LLM, qué es un agente, cómo configurar tu entorno y cómo guiar al agente con un buen AGENTS.md.",
  sections: [
    {
      id: "llm",
      title: "¿Qué es un LLM?",
      items: [
        {
          label: "Cómo funciona un modelo de lenguaje",
          body: "Un LLM (Large Language Model) es una red neuronal entrenada con enormes volúmenes de texto que aprende a predecir la continuación de una secuencia de palabras. No 'entiende' en el sentido humano — genera la respuesta más probable dado un contexto. Esto explica por qué puede alucinar: no consulta una base de datos de verdades, sino que infiere a partir de patrones.\n\nConceptos clave: tokens (unidades de texto, ~4 caracteres en promedio), ventana de contexto (cuánto texto puede 'recordar' en una conversación), temperatura (qué tan determinístico o creativo es el output).",
          references: ["llm-tokens"],
          checks: [
            "Puedes explicar qué es un token y por qué el costo de los modelos se mide en tokens",
            "Entiendes qué significa 'ventana de contexto' y cómo afecta conversaciones largas",
            "Sabes qué es la temperatura y cuándo quieres valores altos vs bajos",
            "Entiendes por qué los LLMs alucinan y cómo reducir ese riesgo",
          ],
        },
        {
          label: "Modelos de Anthropic — Claude",
          body: "Claude Haiku: modelo rápido y barato, ideal para tareas repetitivas, formateo, generación de nombres, comentarios de código. Claude Sonnet: el caballo de batalla diario, mejor balance costo/calidad para código, refactor y debug. Claude Opus: para decisiones arquitectónicas pesadas y análisis de sistemas complejos. Regla práctica: empieza con Sonnet, sube a Opus solo cuando Sonnet falle repetidamente en una tarea.",
          references: ["llm-anthropic"],
          checks: [
            "Conoces los 3 modelos de Claude (Haiku, Sonnet, Opus) y su caso de uso principal",
            "Tienes un criterio claro para escalar de Sonnet a Opus",
            "Probaste Haiku para al menos una tarea repetitiva y comparaste el resultado con Sonnet",
          ],
        },
        {
          label: "Modelos de OpenAI — GPT y o-series",
          body: "GPT-4.1 y su familia (mini, nano) destacan en tareas de código y multimodal. La o-series (o3, o4-mini) usa razonamiento extendido — el modelo 'piensa' antes de responder, lo que mejora matemáticas y lógica compleja. o4-mini ofrece calidad sorprendente a bajo costo para problemas algorítmicos. GPT-5 cuando necesitas el techo de OpenAI. Todos disponibles en OpenCode.",
          references: ["llm-openai"],
          checks: [
            "Entiendes la diferencia entre GPT-4.1 y la o-series (razonamiento extendido)",
            "Probaste un modelo o-series para un problema de razonamiento complejo",
            "Configuraste al menos un modelo de OpenAI en tu entorno de trabajo",
          ],
        },
        {
          label: "Modelos de Google — Gemini",
          body: "Gemini 2.5 Pro tiene una ventana de contexto de 1 millón de tokens — puedes cargar codebases completos de una sola vez. Útil para análisis de arquitectura, detección de inconsistencias en proyectos grandes, o refactors que abarcan muchos archivos. Gemini Flash para respuestas rápidas y económicas. Disponible en OpenCode con tu API key de Google AI Studio.",
          references: ["llm-gemini"],
          checks: [
            "Entiendes el caso de uso principal de la ventana de 1M tokens de Gemini",
            "Tienes configurado Gemini en tu entorno de trabajo",
            "Probaste cargar un proyecto completo o archivo grande y analizarlo con Gemini 2.5 Pro",
          ],
        },
        {
          label: "Modelos chinos — DeepSeek y Qwen",
          body: "DeepSeek R1: modelo de razonamiento open-source, muy competitivo para debugging complejo y problemas algorítmicos. Extremadamente barato por token comparado con equivalentes occidentales. DeepSeek V3: modelo base de alta calidad para generación general.\n\nQwen3-Coder (Alibaba): diseñado específicamente para agentes de código, con buen soporte de herramientas. Qwen3 480B el más potente de la familia. Ambos disponibles via OpenRouter o directamente. Alternativas serias de bajo costo.",
          references: ["llm-deepseek"],
          checks: [
            "Tienes configurada la API de DeepSeek o acceso via OpenRouter",
            "Probaste DeepSeek R1 en un problema de razonamiento y comparaste con Claude/GPT",
            "Conoces Qwen3-Coder como alternativa especializada en coding agentic",
            "El equipo evaluó cuándo usar modelos de bajo costo vs modelos premium",
          ],
        },
        {
          label: "OpenCode Zen — modelos curados",
          body: "OpenCode Zen es la lista de modelos testeados y verificados específicamente para tareas de coding agentic por el equipo de OpenCode. Incluye acceso a Qwen3-Coder 480B, Kimi K2, y otros validados para uso con agentes. Ventaja: no tienes que probar qué modelos funcionan bien para agentes — ya fue evaluado por el equipo. Ideal para empezar sin configurar múltiples APIs.",
          references: ["ide-opencode"],
          checks: [
            "Tienes cuenta en OpenCode y API key de Zen configurada",
            "Probaste al menos 2 modelos distintos de Zen en la misma tarea para comparar",
            "Entiendes qué diferencia a los modelos de Zen de los modelos generales de los mismos proveedores",
          ],
        },
      ],
      quiz: {
        passingScore: 90,
        questions: [
          {
            id: "llm-q1",
            question: "¿Qué es un token en el contexto de LLMs?",
            options: [
              "Una palabra completa",
              "Una unidad de texto de aproximadamente 4 caracteres",
              "Una frase completa",
              "Un párrafo entero"
            ],
            correctIndex: 1
          },
          {
            id: "llm-q2",
            question: "¿Qué es la 'ventana de contexto' en un LLM?",
            options: [
              "La interfaz de chat",
              "La cantidad de texto que el modelo puede 'recordar' en una conversación",
              "El tamaño del archivo de entrada",
              "La memoria del computador"
            ],
            correctIndex: 1
          },
          {
            id: "llm-q3",
            question: "¿Qué efecto tiene aumentar la 'temperatura' de un LLM?",
            options: [
              "El modelo responde más rápido",
              "El modelo se vuelve más determinístico y preciso",
              "El modelo genera respuestas más creativas y diversas",
              "El modelo usa menos memoria"
            ],
            correctIndex: 2
          },
          {
            id: "llm-q4",
            question: "¿Cuál es la regla práctica para usar los modelos de Claude?",
            options: [
              "Siempre usar Opus por ser el más potente",
              "Empezar con Sonnet y subir a Opus solo cuando falle repetidamente",
              "Usar Haiku para todo",
              "No importa cuál uses"
            ],
            correctIndex: 1
          },
          {
            id: "llm-q5",
            question: "¿Cuál es la ventaja principal de Gemini 2.5 Pro?",
            options: [
              "Es el más barato",
              "Su ventana de contexto de 1 millón de tokens",
              "Es más rápido que Claude",
              "No tiene límites de uso"
            ],
            correctIndex: 1
          },
          {
            id: "llm-q6",
            question: "¿Qué modelo chino es recomendado específicamente para coding agentic?",
            options: [
              "DeepSeek V3",
              "Qwen3-Coder",
              "Gemini",
              "GPT-4"
            ],
            correctIndex: 1
          },
          {
            id: "llm-q7",
            question: "¿Qué es OpenCode Zen?",
            options: [
              "Un modelo de lenguaje",
              "Una lista de modelos curados y testados específicamente para coding agentic",
              "Un IDE",
              "Un lenguaje de programación"
            ],
            correctIndex: 1
          },
          {
            id: "llm-q8",
            question: "¿Cuál es la diferencia principal entre GPT-4.1 y la o-series?",
            options: [
              "GPT-4.1 es más barato",
              "La o-series usa razonamiento extendido - el modelo 'piensa' antes de responder",
              "No hay diferencia",
              "GPT-4.1 tiene mayor contexto"
            ],
            correctIndex: 1
          }
        ]
      }
    },
    {
      id: "agents",
      title: "¿Qué es un agente?",
      items: [
        {
          label: "De chat a agente — la diferencia real",
          body: "Un chatbot responde. Un agente actúa. La diferencia técnica: un agente tiene acceso a herramientas (tools) que puede invocar para leer archivos, ejecutar código, buscar en internet, consultar bases de datos. El flujo es: recibe tarea → razona → elige herramienta → ejecuta → observa resultado → razona de nuevo → repite hasta completar.\n\nEsto cambia todo: el agente puede tomar múltiples pasos autónomos para completar una tarea compleja, no solo generar texto.",
          references: ["agents-basics"],
          checks: [
            "Puedes explicar la diferencia entre un chatbot y un agente con herramientas",
            "Entiendes el ciclo razonar → actuar → observar → repetir (ReAct pattern)",
            "Sabes qué es un 'tool call' y cómo el agente decide cuándo usar qué herramienta",
          ],
        },
        {
          label: "Tipos de agentes y sus roles",
          body: "Agente de tarea única: resuelve una tarea específica con un conjunto limitado de herramientas. Más predecible, más fácil de confiar. Agente de propósito general: puede usar muchas herramientas, aborda tareas diversas. Más poderoso, más difícil de controlar.\n\nPara equipos de desarrollo los más valiosos son agentes especializados: uno para tests, uno para review, uno para documentación. Cada uno con herramientas y contexto acotados. La especialización es lo que hace que los agentes sean confiables.",
          references: ["agents-basics"],
          checks: [
            "Entiendes la diferencia entre agentes de propósito general y agentes especializados",
            "Reconoces cuándo conviene un agente especializado vs uno general para una tarea",
            "Conoces al menos 3 tipos de agentes útiles en un flujo de desarrollo",
          ],
        },
        {
          label: "Alucinaciones, límites y confianza",
          body: "Los agentes heredan los problemas de los LLMs: pueden alucinar herramientas, inventar código que no existe, o tomar acciones no intencionadas. Reglas para confiar de forma segura: da al agente el contexto mínimo necesario (no toda la codebase si no la necesita), revisa siempre los cambios propuestos antes de aplicarlos, empieza con tareas de bajo riesgo, aumenta autonomía gradualmente según ganes confianza en ese agente específico.",
          references: ["agents-basics"],
          checks: [
            "Entiendes los principales riesgos de delegar tareas a un agente",
            "Tienes el hábito de revisar los cambios propuestos antes de aplicarlos",
            "Empezaste con tareas de bajo riesgo y aumentas la autonomía gradualmente",
          ],
        },
        {
          label: "Patrones de razonamiento del agente",
          body: "Más allá del patrón ReAct, existen otros modelos de razonamiento:\n\n**Reflexion**: El agente se auto-evalúa después de cada acción. Si el resultado no es el esperado, ajusta su approach. Útil para tareas donde el feedback es diferido, como debugging o código complejo donde los errores se ven después de ejecutar.\n\n**Self-Ask**: El agente se hace preguntas intermedias antes de actuar. \"¿Qué necesito saber antes de resolver esto?\" Reduce saltos lógicos incorrectos. Ideal para investigación o análisis donde hay dependencias de información.\n\n**Planning Jerárquico**: Descompone tareas grandes en sub-tareas primero, luego ejecuta. Similar a cómo un PM trabaja. Usa este patrón para features nuevos o refactors grandes.\n\n**Cuándo usar cada uno**:\n- ReAct: tareas simples con feedback inmediato\n- Reflexion: debugging, código complejo donde errores se ven después\n- Self-Ask: investigación, análisis donde hay dependencias de información\n- Planning: features nuevos, refactors grandes",
          references: ["agents-reasoning"],
          checks: [
            "Entiendes la diferencia entre ReAct, Reflexion y Self-Ask",
            "Sabes cuándo aplicar planning jerárquico vs ejecución directa",
            "Identificas qué patrón usar según el tipo de tarea"
          ],
        },
      ],
      quiz: {
        passingScore: 90,
        questions: [
          {
            id: "agents-q1",
            question: "¿Cuál es la diferencia principal entre un chatbot y un agente?",
            options: [
              "Los chatbots son más rápidos",
              "Los agentes tienen acceso a herramientas para actuar en el sistema",
              "Los chatbots usan IA más avanzada",
              "No hay diferencia significativa"
            ],
            correctIndex: 1
          },
          {
            id: "agents-q2",
            question: "¿Qué es el patrón ReAct en agentes?",
            options: [
              "Un tipo de modelo de lenguaje",
              "Razonar → Actuar → Observar → Repetir",
              "Una herramienta de desarrollo",
              "Un formato de archivo"
            ],
            correctIndex: 1
          },
          {
            id: "agents-q3",
            question: "¿Por qué es mejor usar agentes especializados que agentes de propósito general?",
            options: [
              "Son más rápidos",
              "Son más predecibles y fáciles de confiar con herramientas y contexto acotados",
              "Son más baratos",
              "No hay diferencia"
            ],
            correctIndex: 1
          },
          {
            id: "agents-q4",
            question: "¿Cuál es la regla para confiar de forma segura en un agente?",
            options: [
              "Dar acceso completo a todo el proyecto",
              "Dar contexto mínimo necesario, revisar siempre cambios, empezar con tareas de bajo riesgo",
              "Nunca revisar lo que hace",
              "Dejar que haga lo que quiera"
            ],
            correctIndex: 1
          },
          {
            id: "agents-q5",
            question: "¿Qué tipo de agente es más valioso para equipos de desarrollo?",
            options: [
              "Agentes de propósito general",
              "Agentes especializados (tests, review, documentación)",
              "Agentes de chat",
              "No hay diferencia"
            ],
            correctIndex: 1
          },
          {
            id: "agents-q6",
            question: "Tienes un bug complejo donde el error aparece horas después de ejecutar. ¿Qué patrón de razonamiento es más apropiado?",
            options: [
              "ReAct - ejecución directa con feedback inmediato",
              "Reflexion - auto-evaluación después de cada acción",
              "Self-Ask - hacerse preguntas antes de actuar",
              "Planning jerárquico - decompose en subtareas"
            ],
            correctIndex: 1
          },
          {
            id: "agents-q7",
            question: "Necesitas investigar diferentes opciones técnicas para un feature nuevo y presentar tradeoffs. ¿Qué patrón es mejor?",
            options: [
              "ReAct",
              "Reflexion",
              "Self-Ask - hacerse preguntas intermedias sobre qué saber",
              "Planning jerárquico"
            ],
            correctIndex: 2
          }
        ]
      }
    },
    {
      id: "env",
      title: "IDE y Consola",
      items: [
        {
          label: "IDEs agentizados — Cursor, Windsurf, Kiro",
          body: "Cursor y Windsurf: IDEs que integran el agente directamente en el editor, con acceso al codebase completo, autocompletado agentizado y chat contextual.\n\nKiro (AWS): el único IDE built around Spec-Driven Development. A diferencia de los demás, Kiro obliga a trabajar con specs estructuradas (requirements → design → tasks) antes de escribir código. Ideal para equipos que quieren adoptar SDD desde el inicio. Soporta steering files, hooks, y MCP.\n\nPara el entorno de equipo: Cursor/Windsurf son más amigables para quienes prefieren no salir del editor. Kiro para quienes quieren spec-driven desde el IDE.",
          references: ["ide-cursor", "ide-windsurf", "sdd-basics"],
          checks: [
            "Tienes instalado y configurado al menos un IDE agentizado (Cursor, Windsurf o Kiro)",
            "Completaste una tarea de desarrollo real de principio a fin con el agente",
            "Si usas Kiro, experimentaste el flujo spec → design → tasks",
          ],
        },
        {
          label: "Agentes desde consola — OpenCode, Claude Code, Gemini CLI",
          body: "OpenCode: agente de código open-source que corre en terminal. Soporta múltiples proveedores (Claude, OpenAI, Gemini, DeepSeek, Qwen). Ideal para automatización por su flexibilidad en terminal.\n\nClaude Code: el agente de Anthropic para terminal. Corre directamente en bash, puede ejecutar comandos, leer/escribir archivos, interactuar con git. Ideal para automatización y scripting. Gemini CLI: equivalente de Google, también en terminal con ventana de contexto grande.\n\nLa consola permite encadenar el agente en scripts bash, integrar en CI/CD, crear flujos automatizados. La flexibilidad del terminal supera a cualquier IDE para automatización.",
          references: ["ide-opencode", "console-claude-code"],
          checks: [
            "Instalaste OpenCode, Claude Code o Gemini CLI y ejecutaste una tarea desde terminal",
            "Entiendes cómo llamar al agente desde un script bash (ej: claude -p 'prompt' archivo.ts)",
            "Probaste encadenar el agente con pipes o redirecciones en terminal",
          ],
        },
        {
          label: "Gestionar múltiples sesiones",
          body: "Cada sesión es un contexto fresco — el agente no recuerda sesiones anteriores. Para equipos esto es ventaja y riesgo al mismo tiempo: ventaja porque cada sesión parte limpia, riesgo porque hay que re-contextualizar en cada sesión.\n\nBuenas prácticas: define el propósito de cada sesión antes de empezar, usa sesiones cortas y específicas en lugar de una sesión larga y mezclada, nunca mezcles features distintos en la misma sesión. Sesiones largas degradan la calidad de respuestas.",
          references: ["console-claude-code"],
          checks: [
            "Tienes el hábito de definir el propósito de cada sesión antes de empezar",
            "Usas sesiones cortas y específicas en lugar de sesiones largas generales",
            "Sabes cómo retomar contexto en una nueva sesión sin repetir todo desde cero",
          ],
        },
        {
          label: "Prompts que funcionan — estructura básica",
          body: "El prompt es la interfaz con el agente. Un prompt bien estructurado tiene cuatro partes: Contexto (quién eres, qué proyecto es, qué módulo se toca), Tarea (qué se necesita, específico y accionable), Restricciones (qué no hacer, límites, convenciones del equipo), Output esperado (formato, extensión, qué incluir).\n\nError más común: dar solo la tarea sin contexto ni restricciones. El agente llena los vacíos con suposiciones que frecuentemente no coinciden con lo que el equipo espera.",
          references: ["prompts-basics"],
          checks: [
            "Tus prompts tienen siempre las 4 partes: contexto, tarea, restricciones, output",
            "Dejaste de recibir respuestas que no cumplen con las convenciones del proyecto",
            "Tienes guardados al menos 5 prompts reutilizables para tareas frecuentes",
          ],
        },
      ],
      quiz: {
        passingScore: 90,
        questions: [
          {
            id: "env-q1",
            question: "¿Cuál es la ventaja principal de usar OpenCode en terminal sobre un IDE?",
            options: [
              "Es más rápido",
              "Facilita la automatización y scripts",
              "Es gratis",
              "Tiene mejor autocompletado"
            ],
            correctIndex: 1
          },
          {
            id: "env-q2",
            question: "¿Por qué es mejor usar sesiones cortas con el agente?",
            options: [
              "El agente responde más rápido",
              "Las sesiones largas degradan la calidad de respuestas",
              "Es más barato",
              "No hay diferencia"
            ],
            correctIndex: 1
          },
          {
            id: "env-q3",
            question: "¿Cuántas partes debe tener un prompt bien estructurado?",
            options: [
              "2 partes",
              "3 partes",
              "4 partes: contexto, tarea, restricciones, output esperado",
              "5 partes"
            ],
            correctIndex: 2
          },
          {
            id: "env-q4",
            question: "¿Qué es Claude Code?",
            options: [
              "Un IDE",
              "El agente de Anthropic para terminal que puede ejecutar comandos y leer/escribir archivos",
              "Un modelo de lenguaje",
              "Un navegador"
            ],
            correctIndex: 1
          },
          {
            id: "env-q5",
            question: "¿Por qué es importante definir el propósito de cada sesión antes de empezar?",
            options: [
              "Para que el agente trabaje más rápido",
              "Para mantener el contexto claro y no mezclar tareas",
              "Es lo mismo siempre",
              "No tiene importancia"
            ],
            correctIndex: 1
          },
          {
            id: "env-q6",
            question: "¿Cuál es el error más común al escribir prompts?",
            options: [
              "Ser muy largo",
              "Dar solo la tarea sin contexto ni restricciones",
              "Usar muy pocas palabras",
              "No usar mayúsculas"
            ],
            correctIndex: 1
          }
        ]
      }
    },
    {
      id: "agents_md",
      title: "AGENTS.md",
      items: [
        {
          label: "Para qué sirve el AGENTS.md",
          body: "AGENTS.md es el archivo que lee el agente automáticamente al iniciar una sesión en tu proyecto. Es el equivalente al onboarding de un nuevo desarrollador: le dice al agente qué proyecto es, cómo está organizado, qué convenciones seguir y qué está prohibido. Sin él, el agente trabaja con suposiciones genéricas que rara vez coinciden con lo que el equipo espera.",
          references: ["agents-md"],
          checks: [
            "Tienes un AGENTS.md en la raíz del proyecto",
            "El agente usa las convenciones del proyecto sin que tengas que recordárselas en cada sesión",
            "Comparaste la calidad del código generado con y sin AGENTS.md",
          ],
        },
        {
          label: "Estructura mínima que funciona",
          body: "Cuatro secciones que ningún AGENTS.md debería omitir:\n\n1. Rol del agente: qué se espera de él en este proyecto específico.\n2. Stack con versiones exactas: no 'React', sino 'React 18.3.1 con TypeScript 5.4'. El agente usa la documentación correcta.\n3. Comandos del proyecto: dev, build, test, lint con sus flags exactos. El agente los ejecuta sin preguntarte.\n4. Prohibiciones explícitas: 'no usar console.log en producción', 'no instalar librerías sin aprobación', 'no modificar archivos en /config'. Tan importante como lo que sí hacer.",
          references: ["agents-md"],
          checks: [
            "AGENTS.md tiene las 4 secciones: rol, stack exacto, comandos, prohibiciones",
            "Todas las versiones de librerías son exactas, no generales",
            "La sección de prohibiciones tiene al menos 5 reglas basadas en errores reales del agente",
          ],
        },
        {
          label: "Convenciones de código del equipo",
          body: "La sección más valiosa para equipos: naming de variables y funciones, estructura de carpetas, patrones preferidos (custom hooks sí, clases no), manejo de errores, formato de commits. Incluye ejemplos de código real del proyecto, no abstractos. Con esto el agente genera código que parece escrito por el equipo.\n\nTip: empieza con los patrones que más frecuentemente corriges en code review. Esos son los que más valor aporta documentar.",
          references: ["agents-md"],
          checks: [
            "El agente genera código que sigue los patrones del equipo sin correcciones frecuentes",
            "Hay ejemplos de código real (no abstracto) para los patrones principales",
            "La sección fue revisada y tiene consenso de todo el equipo",
          ],
        },
        {
          label: "Contexto de negocio y decisiones tomadas",
          body: "Documenta qué hace la app, quién la usa y las decisiones de arquitectura importantes con su justificación. Ejemplo: 'Usamos Zod para validación porque necesitamos runtime type safety' o 'Elegimos tRPC sobre REST porque el equipo es full-stack TypeScript'.\n\nMás valioso aún: sección 'por qué NO usamos X' para evitar que el agente proponga soluciones que el equipo ya descarta. Cada decisión con su contexto evita debates repetidos.",
          references: ["agents-md"],
          checks: [
            "Las últimas 5 decisiones técnicas importantes están documentadas con su justificación",
            "Hay una sección 'por qué no usamos X' con al menos 3 entradas",
            "El agente nunca propone soluciones que contradicen las decisiones documentadas",
          ],
        },
        {
          label: "AGENTS.md jerárquico por módulo",
          body: "Para proyectos multi-módulo: cada subdirectorio puede tener su propio AGENTS.md con reglas locales. El agente lee el más cercano en el árbol de directorios primero. services/payments/ puede tener restricciones de seguridad distintas a services/notifications/. Regla: el AGENTS.md local solo documenta diferencias respecto al global, no repite todo.",
          references: ["agents-md"],
          checks: [
            "El AGENTS.md raíz tiene solo reglas globales del proyecto",
            "Los módulos con reglas específicas tienen su propio AGENTS.md local",
            "Los AGENTS.md locales son cortos — solo documentan lo que difiere del global",
          ],
        },
        {
          label: "Ciclo de actualización y mantenimiento",
          body: "AGENTS.md es código, no documentación estática. Vive en el repositorio con historial de git. Tiene PRs y code review. Se actualiza cuando el equipo descubre un error recurrente del agente, cuando se toma una decisión nueva de arquitectura, o cuando una convención cambia.\n\nRevision mensual obligatoria: eliminar secciones desactualizadas. Un AGENTS.md viejo es peor que no tener — le da información incorrecta al agente. Límite práctico: ~150 instrucciones. Más que eso y el agente empieza a ignorar las últimas.",
          references: ["agents-md"],
          checks: [
            "AGENTS.md está en el repo con historial de cambios (git blame funciona sobre él)",
            "El equipo tiene un proceso para proponer cambios (PR o issue)",
            "Hiciste al menos una revisión de limpieza para eliminar secciones desactualizadas",
            "El AGENTS.md tiene menos de 150 instrucciones con sentido",
          ],
        },
      ],
      quiz: {
        passingScore: 90,
        questions: [
          {
            id: "agentsmd-q1",
            question: "¿Qué es el AGENTS.md?",
            options: [
              "Un archivo de configuración del IDE",
              "Un archivo que el agente lee automáticamente al iniciar sesión con información del proyecto",
              "Un archivo de logs",
              "Un archivo de dependencias"
            ],
            correctIndex: 1
          },
          {
            id: "agentsmd-q2",
            question: "¿Cuántas secciones mínimas debe tener un AGENTS.md?",
            options: [
              "1 sección",
              "2 secciones",
              "4 secciones: rol, stack exacto, comandos, prohibiciones",
              "6 secciones"
            ],
            correctIndex: 2
          },
          {
            id: "agentsmd-q3",
            question: "¿Por qué es importante incluir 'por qué NO usamos X' en el AGENTS.md?",
            options: [
              "Para documentar errores",
              "Para evitar que el agente proponga soluciones que el equipo ya descarta",
              "Para justificar decisiones pasadas",
              "No es importante"
            ],
            correctIndex: 1
          },
          {
            id: "agentsmd-q4",
            question: "¿Cuál es el límite práctico recomendado de instrucciones en un AGENTS.md?",
            options: [
              "50 instrucciones",
              "100 instrucciones",
              "~150 instrucciones",
              "200 instrucciones"
            ],
            correctIndex: 2
          }
        ]
      }
    },
  ],
  examQuestions: [
    {
      id: "exam01-q1",
      question: "Un cliente te pide que automatices la generación de documentación técnica. ¿Qué herramientas y enfoque usarías?",
      options: [
        "Usar solo un LLM sin contexto adicional",
        "Usar Context7 para documentación actualizada + agente con skill de documentación",
        "Crear un MCP personalizado desde cero",
        "Usar solo el CLI del agente"
      ],
      correctIndex: 1
    },
    {
      id: "exam01-q2",
      question: "Tu agente está proponiendo código que usa una librería que ya no existe. ¿Cuál es la causa más probable y cómo la resuelves?",
      options: [
        "El agente está alucinando",
        "El agente no tiene acceso a documentación actualizada - usar Context7",
        "Necesitas más contexto",
        "El código está bien, la librería sí existe"
      ],
      correctIndex: 1
    },
    {
      id: "exam01-q3",
      question: "Necesitas que el agente tome decisiones arquitectónicas importantes. ¿Qué modelo y configuración recomiendas?",
      options: [
        "Haiku por ser el más rápido",
        "Claude Sonnet con temperatura baja",
        "Claude Opus con temperatura alta para más creatividad",
        "Cualquier modelo funciona igual"
      ],
      correctIndex: 2
    },
    {
      id: "exam01-q4",
      question: "En tu AGENTS.md tienes 200 instrucciones. El agente no las sigue. ¿Qué haces?",
      options: [
        "Añadir más instrucciones",
        "Reducir a ~150 instrucciones con las más importantes y usar habilidades específicas",
        "Cambiar de modelo",
        "Usar otro agente"
      ],
      correctIndex: 1
    }
  ]
} as const;
