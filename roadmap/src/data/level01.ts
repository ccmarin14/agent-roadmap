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
            "Sabes cuándo conviene escalar de Sonnet a Opus (y que Opus requiere suscripción Pro)",
            "Entiendes que Haiku está disponible en el free tier de Claude"
          ],
        },
        {
          label: "Modelos de OpenAI — GPT y o-series",
          body: "GPT-4.1 y su familia (mini, nano) destacan en tareas de código y multimodal. La o-series (o3, o4-mini) usa razonamiento extendido — el modelo 'piensa' antes de responder, lo que mejora matemáticas y lógica compleja. o4-mini ofrece calidad sorprendente a bajo costo para problemas algorítmicos. GPT-5 cuando necesitas el techo de OpenAI. Todos disponibles en OpenCode.\n\n**Nota de acceso gratuito:** La API de OpenAI requiere pago. Puedes usar OpenRouter que ofrece algunos modelos gratuitos o acceder via servicios que tengan API keys propias.",
          references: ["llm-openai"],
          checks: [
            "Entiendes la diferencia conceptual entre GPT-4.1 y la o-series (razonamiento extendido)",
            "Sabes que la API de OpenAI requiere pago y conoces alternativas gratuitas"
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
          body: "DeepSeek R1: modelo de razonamiento open-source, muy competitivo para debugging complejo y problemas algorítmicos. Extremadamente barato por token comparado con equivalentes occidentales. DeepSeek V3: modelo base de alta calidad para generación general.\n\nQwen3-Coder (Alibaba): diseñado específicamente para agentes de código, con buen soporte de herramientas. Qwen3 480B el más potente de la familia. Ambos disponibles via OpenRouter o directamente. Alternativas serias de bajo costo.\n\n**Alternativa gratuita:** Ollama permite correr estos modelos 100% local en tu máquina sin costo alguno.",
          references: ["llm-deepseek"],
          checks: [
            "Entiendes que DeepSeek y Qwen son alternativas de bajo costo (API barata, no gratuitas)",
            "Conoces Ollama como opción 100% local y gratuita para estos modelos",
            "Conoces Qwen3-Coder como alternativa especializada en coding agentic"
          ],
        },
        {
          label: "OpenCode — Go vs Zen",
          body: "**OpenCode Go** es open-source y gratuito. Usa tus propias API keys de cualquier proveedor (Claude, Gemini, OpenAI, etc.). Tú controlas qué modelo usar y cuánto gastas.\n\n**OpenCode Zen** es el servicio de modelos curados y verificados por el equipo de OpenCode. Requiere $20 de prepago y ofrece modelos optimizados para coding agentic sin configuración adicional.\n\n**Recomendación:** Empieza con OpenCode Go + API keys propias (Gemini es gratis en AI Studio). Zen es para cuando quieras simplificar la configuración.",
          references: ["ide-opencode"],
          checks: [
            "Entiendes que OpenCode Go es gratuito y Zen requiere pago ($20 prepago)",
            "Tienes OpenCode Go funcionando con al menos un modelo configurado",
            "Sabes qué escenario justifica usar Zen sobre Go"
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
          references: ["agents-basics", "agents-tool-use"],
          checks: [
            "Puedes explicar la diferencia entre chatbot y agente (con herramientas). Ruta A: lo explicas con un ejemplo real de tu proyecto. Ruta B: lo explicas con un ejemplo simple (buscar, leer archivo, ejecutar comando). Evidencia: 5–8 líneas escritas con el ejemplo.",
            "Entiendes el ciclo ReAct (razonar → actuar → observar → repetir). Ruta A: describes 1 tarea real en 4 pasos ReAct. Ruta B: describes una tarea de ejemplo (p. ej. “encontrar dónde se usa una función”) en 4 pasos. Evidencia: lista numerada de 4 pasos.",
            "Sabes qué es un tool call y cuándo usar una herramienta. Ruta A: identificas 2 herramientas que usarías en tu proyecto y por qué. Ruta B: identificas 2 herramientas genéricas (leer archivo / buscar / ejecutar) y por qué. Evidencia: 2 bullets por herramienta (cuándo sí / cuándo no).",
          ],
        },
        {
          label: "Tipos de agentes y sus roles",
          body: "Agente de tarea única: resuelve una tarea específica con un conjunto limitado de herramientas. Más predecible, más fácil de confiar. Agente de propósito general: puede usar muchas herramientas, aborda tareas diversas. Más poderoso, más difícil de controlar.\n\nPara equipos de desarrollo los más valiosos son agentes especializados: uno para tests, uno para review, uno para documentación. Cada uno con herramientas y contexto acotados. La especialización es lo que hace que los agentes sean confiables.",
          references: ["agents-basics"],
          checks: [
            "Entiendes generalista vs especializado. Ruta A: lo explicas usando roles reales de tu equipo (tests/review/docs). Ruta B: lo explicas con roles genéricos (investigación/implementación/revisión). Evidencia: comparación en 3 bullets (capacidad, riesgos, control).",
            "Sabes cuándo conviene especializado vs general. Ruta A: eliges el tipo correcto para 2 tareas reales del repo. Ruta B: eliges el tipo para 2 tareas ejemplo (bug, refactor). Evidencia: 2 casos con “elige X porque…”.",
            "Conoces al menos 3 tipos de agentes útiles. Ruta A: nombras 3 agentes (tests/review/seguridad o docs) y su input/output. Ruta B: nombras 3 agentes y su contrato (entrada/salida) en 1 línea cada uno. Evidencia: lista de 3 contratos.",
          ],
        },
        {
          label: "Alucinaciones, límites y confianza",
          body: "Los agentes heredan los problemas de los LLMs: pueden alucinar herramientas, inventar código que no existe, o tomar acciones no intencionadas. Reglas para confiar de forma segura: da al agente el contexto mínimo necesario (no toda la codebase si no la necesita), revisa siempre los cambios propuestos antes de aplicarlos, empieza con tareas de bajo riesgo, aumenta autonomía gradualmente según ganes confianza en ese agente específico.",
          references: ["agents-basics"],
          checks: [
            "Entiendes 3 riesgos principales (alucinación, permisos excesivos, acciones no intencionadas). Ruta A: los explicas con ejemplos del repo. Ruta B: los explicas con ejemplos genéricos. Evidencia: 3 riesgos + 1 mitigación cada uno.",
            "Revisas antes de aplicar. Ruta A: haces review de un diff/cambio propuesto y anotas 2 cosas a verificar. Ruta B: haces review de un cambio pequeño (1 archivo) y anotas 2 verificaciones. Evidencia: checklist de 2–4 puntos.",
            "Aumentas autonomía gradualmente. Ruta A: defines 3 niveles de riesgo (bajo/medio/alto) con ejemplos del proyecto. Ruta B: defines 3 niveles con ejemplos genéricos. Evidencia: tabla o lista con ejemplos por nivel.",
          ],
        },
        {
          label: "Patrones de razonamiento del agente",
          body: "Más allá del patrón ReAct, existen otros modelos de razonamiento:\n\n**Reflexion**: El agente se auto-evalúa después de cada acción. Si el resultado no es el esperado, ajusta su approach. Útil para tareas donde el feedback es diferido, como debugging o código complejo donde los errores se ven después de ejecutar.\n\n**Self-Ask**: El agente se hace preguntas intermedias antes de actuar. \"¿Qué necesito saber antes de resolver esto?\" Reduce saltos lógicos incorrectos. Ideal para investigación o análisis donde hay dependencias de información.\n\n**Planning Jerárquico**: Descompone tareas grandes en sub-tareas primero, luego ejecuta. Similar a cómo un PM trabaja. Usa este patrón para features nuevos o refactors grandes.\n\n**Cuándo usar cada uno**:\n- ReAct: tareas simples con feedback inmediato\n- Reflexion: debugging, código complejo donde errores se ven después\n- Self-Ask: investigación, análisis donde hay dependencias de información\n- Planning: features nuevos, refactors grandes",
          references: ["agents-reasoning"],
          checks: [
            "Entiendes la diferencia entre ReAct, Reflexion y Self‑Ask. Ruta A: das 1 ejemplo del repo por patrón. Ruta B: das 1 ejemplo genérico por patrón. Evidencia: 3 ejemplos (uno por patrón) en 1–2 líneas.",
            "Sabes cuándo usar planning jerárquico vs ejecución directa. Ruta A: eliges para 1 tarea real grande y 1 pequeña del proyecto. Ruta B: eliges para 1 tarea grande y 1 pequeña de ejemplo. Evidencia: 2 casos con justificación breve.",
            "Identificas el patrón adecuado según tarea. Ruta A: clasificas 3 tareas reales (feature/debug/investigación). Ruta B: clasificas 3 tareas de ejemplo. Evidencia: lista de 3 tareas → patrón elegido → por qué.",
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
            "Tienes un entorno de trabajo para usar agente. Ruta A: IDE agentizado (Cursor/Windsurf/Kiro) configurado. Ruta B: herramienta gratuita equivalente (CLI o local) lista para trabajar. Evidencia: captura o nota con el comando/pantalla de inicio.",
            "Completaste 1 tarea real de principio a fin con el agente. Ruta A: en un repo real (diff o commit). Ruta B: en un repo de práctica (cambio pequeño en 1–3 archivos). Evidencia: diff/commit + 2 bullets (qué cambió y por qué).",
            "Flujo spec → design → tasks. Ruta A: lo haces en una herramienta que lo soporte. Ruta B: lo haces en un markdown (spec corta + diseño + lista de tareas). Evidencia: spec de 15–30 líneas o captura del flujo.",
          ],
        },
        {
          label: "Agentes desde consola — OpenCode, Claude Code, Gemini CLI",
          body: "OpenCode: agente de código open-source que corre en terminal. Soporta múltiples proveedores (Claude, OpenAI, Gemini, DeepSeek, Qwen). Ideal para automatización por su flexibilidad en terminal.\n\nClaude Code: el agente de Anthropic para terminal. Corre directamente en bash, puede ejecutar comandos, leer/escribir archivos, interactuar con git. Ideal para automatización y scripting. Gemini CLI: equivalente de Google, también en terminal con ventana de contexto grande.\n\nLa consola permite encadenar el agente en scripts bash, integrar en CI/CD, crear flujos automatizados. La flexibilidad del terminal supera a cualquier IDE para automatización.",
          references: ["ide-opencode", "console-claude-code"],
          checks: [
            "Ejecutaste 1 tarea desde terminal con un agente. Ruta A: con la CLI que uses. Ruta B: con un agente gratuito/local (o modo “print”/batch si existe). Evidencia: comando usado + salida resumida (3–5 líneas).",
            "Puedes automatizar una llamada (modo script). Ruta A: comando tipo `-p` o equivalente. Ruta B: script mínimo que toma entrada y devuelve salida (aunque sea solo texto). Evidencia: snippet del comando/script (5–10 líneas).",
            "Probaste encadenar entrada/salida. Ruta A: pipe/redirección real con archivo o logs. Ruta B: si tu herramienta no soporta pipes, demuestras el mismo concepto con “archivo de entrada → ejecución → archivo de salida”. Evidencia: comando(s) y nombres de archivos.",
          ],
        },
        {
          label: "Gestionar múltiples sesiones",
          body: "Cada sesión es un contexto fresco — el agente no recuerda sesiones anteriores. Para equipos esto es ventaja y riesgo al mismo tiempo: ventaja porque cada sesión parte limpia, riesgo porque hay que re-contextualizar en cada sesión.\n\nBuenas prácticas: define el propósito de cada sesión antes de empezar, usa sesiones cortas y específicas en lugar de una sesión larga y mezclada, nunca mezcles features distintos en la misma sesión. Sesiones largas degradan la calidad de respuestas.",
          references: ["console-claude-code"],
          checks: [
            "Defines propósito antes de empezar. Ruta A: plantilla de inicio usada en 2 sesiones reales. Ruta B: plantilla usada en 2 ejercicios (texto). Evidencia: 2 prompts de onboarding guardados.",
            "Usas sesiones cortas y específicas. Ruta A: 2 sesiones con 1 objetivo cada una (registradas). Ruta B: 2 sesiones simuladas con 1 objetivo cada una. Evidencia: lista con objetivo + resultado por sesión.",
            "Retomas contexto sin repetir todo. Ruta A: escribes un handoff corto para retomar (qué se hizo/qué sigue). Ruta B: mismo handoff para un ejercicio. Evidencia: handoff de 8–15 líneas.",
          ],
        },
        {
          label: "Prompts que funcionan — estructura básica",
          body: "El prompt es la interfaz con el agente. Un prompt bien estructurado tiene cuatro partes: Contexto (quién eres, qué proyecto es, qué módulo se toca), Tarea (qué se necesita, específico y accionable), Restricciones (qué no hacer, límites, convenciones del equipo), Output esperado (formato, extensión, qué incluir).\n\nError más común: dar solo la tarea sin contexto ni restricciones. El agente llena los vacíos con suposiciones que frecuentemente no coinciden con lo que el equipo espera.",
          references: ["prompts-structure"],
          checks: [
            "Tus prompts incluyen 4 partes (contexto/tarea/restricciones/output). Ruta A: 3 prompts reales del proyecto. Ruta B: 3 prompts de ejemplo. Evidencia: 3 prompts (copiados) con las 4 secciones marcadas.",
            "Mejoras consistencia del output. Ruta A: mismo prompt antes/después (sin y con restricciones) y comparas resultados. Ruta B: igual en un ejemplo. Evidencia: 2 salidas + 3 diferencias observables.",
            "Tienes 5 prompts reutilizables. Ruta A: guardados en un archivo del repo. Ruta B: guardados localmente. Evidencia: lista de 5 títulos + 1–2 líneas de propósito cada uno.",
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
            "Tienes un AGENTS.md/CLAUDE.md en la raíz. Ruta A: en un repo real. Ruta B: en repo de práctica. Evidencia: archivo creado + 4 secciones mínimas.",
            "El agente sigue convenciones sin recordarlas cada vez. Ruta A: 1 sesión donde se ve que aplica 2 reglas del AGENTS.md. Ruta B: 1 sesión simulada donde validas contra 2 reglas. Evidencia: 2 reglas + resultado observado.",
            "Comparaste calidad con y sin AGENTS.md. Ruta A: misma tarea, dos corridas (sin/con) y registras 3 diferencias. Ruta B: igual con una tarea de ejemplo. Evidencia: tabla pequeña con “sin/con” y 3 diferencias.",
          ],
        },
        {
          label: "Estructura mínima que funciona",
          body: "Cuatro secciones que ningún AGENTS.md debería omitir:\n\n1. Rol del agente: qué se espera de él en este proyecto específico.\n2. Stack con versiones exactas: no 'React', sino 'React 18.3.1 con TypeScript 5.4'. El agente usa la documentación correcta.\n3. Comandos del proyecto: dev, build, test, lint con sus flags exactos. El agente los ejecuta sin preguntarte.\n4. Prohibiciones explícitas: 'no usar console.log en producción', 'no instalar librerías sin aprobación', 'no modificar archivos en /config'. Tan importante como lo que sí hacer.",
          references: ["agents-md"],
          checks: [
            "AGENTS.md tiene 4 secciones (rol, stack exacto, comandos, prohibiciones). Ruta A: en el repo real. Ruta B: en repo de práctica. Evidencia: encabezados presentes y completos.",
            "Versiones son exactas cuando aplica. Ruta A: incluyes 3 versiones reales del proyecto. Ruta B: incluyes 3 versiones ejemplo (Node/TS/React). Evidencia: lista de 3 dependencias con versión exacta.",
            "Prohibiciones accionables (≥5). Ruta A: basadas en errores reales del equipo. Ruta B: basadas en errores comunes del agente. Evidencia: 5 reglas + ejemplo de “qué evitar” por regla.",
          ],
        },
        {
          label: "Convenciones de código del equipo",
          body: "La sección más valiosa para equipos: naming de variables y funciones, estructura de carpetas, patrones preferidos (custom hooks sí, clases no), manejo de errores, formato de commits. Incluye ejemplos de código real del proyecto, no abstractos. Con esto el agente genera código que parece escrito por el equipo.\n\nTip: empieza con los patrones que más frecuentemente corriges en code review. Esos son los que más valor aporta documentar.",
          references: ["agents-md"],
          checks: [
            "Convenciones claras y aplicables. Ruta A: 2 convenciones del equipo aplicadas en 1 cambio. Ruta B: 2 convenciones aplicadas en un ejemplo. Evidencia: convención → ejemplo de aplicación (antes/después o snippet).",
            "Hay ejemplos de código real o referencia concreta. Ruta A: enlazas 2 archivos del repo como ejemplo. Ruta B: enlazas 2 snippets cortos dentro del AGENTS.md. Evidencia: 2 ejemplos con explicación de 1 línea.",
            "Consenso del equipo. Ruta A: 1 revisión (PR o issue) donde se aceptan cambios. Ruta B: checklist firmado por 2 personas (texto). Evidencia: referencia a PR/issue o registro de acuerdo.",
          ],
        },
        {
          label: "Contexto de negocio y decisiones tomadas",
          body: "Documenta qué hace la app, quién la usa y las decisiones de arquitectura importantes con su justificación. Ejemplo: 'Usamos Zod para validación porque necesitamos runtime type safety' o 'Elegimos tRPC sobre REST porque el equipo es full-stack TypeScript'.\n\nMás valioso aún: sección 'por qué NO usamos X' para evitar que el agente proponga soluciones que el equipo ya descarta. Cada decisión con su contexto evita debates repetidos.",
          references: ["agents-md"],
          checks: [
            "Decisiones técnicas documentadas con justificación. Ruta A: 3–5 decisiones reales del proyecto. Ruta B: 3–5 decisiones ejemplo. Evidencia: lista con “decisión → por qué”.",
            "Sección “por qué no usamos X” (≥3). Ruta A: basada en decisiones reales. Ruta B: basada en tradeoffs comunes. Evidencia: 3 entradas con 2–3 líneas cada una.",
            "El agente no contradice decisiones. Ruta A: 1 sesión donde el agente elige una opción consistente con una decisión. Ruta B: validación manual contra 1 decisión. Evidencia: decisión citada + resultado observado.",
          ],
        },
        {
          label: "AGENTS.md jerárquico por módulo",
          body: "Para proyectos multi-módulo: cada subdirectorio puede tener su propio AGENTS.md con reglas locales. El agente lee el más cercano en el árbol de directorios primero. services/payments/ puede tener restricciones de seguridad distintas a services/notifications/. Regla: el AGENTS.md local solo documenta diferencias respecto al global, no repite todo.",
          references: ["agents-md"],
          checks: [
            "Separación global vs local. Ruta A: AGENTS.md raíz + 1 AGENTS.md en subcarpeta. Ruta B: misma estructura en repo de práctica. Evidencia: 2 archivos y qué reglas viven en cada uno.",
            "Reglas específicas por módulo cuando aplica. Ruta A: 1 módulo con 3 reglas específicas. Ruta B: 1 módulo de ejemplo con 3 reglas. Evidencia: lista de 3 diferencias vs global.",
            "Locales cortos. Ruta A: ≤30–60 líneas con solo diferencias. Ruta B: igual. Evidencia: conteo aproximado de líneas y justificación de 1 línea.",
          ],
        },
        {
          label: "Ciclo de actualización y mantenimiento",
          body: "AGENTS.md es código, no documentación estática. Vive en el repositorio con historial de git. Tiene PRs y code review. Se actualiza cuando el equipo descubre un error recurrente del agente, cuando se toma una decisión nueva de arquitectura, o cuando una convención cambia.\n\nRevision mensual obligatoria: eliminar secciones desactualizadas. Un AGENTS.md viejo es peor que no tener — le da información incorrecta al agente. Límite práctico: ~150 instrucciones. Más que eso y el agente empieza a ignorar las últimas.",
          references: ["agents-md"],
          checks: [
            "AGENTS.md vive en el repo. Ruta A: hay historial (git blame) y 1 cambio registrado. Ruta B: simulas historial con 1 commit local. Evidencia: commit o referencia a cambio.",
            "Proceso de cambios. Ruta A: PR/issue. Ruta B: checklist de propuesta (pasos) en markdown. Evidencia: enlace al PR/issue o documento del proceso.",
            "Revisión de limpieza. Ruta A: remueves 1 sección desactualizada con justificación. Ruta B: haces una revisión y marcas 3 secciones “vigente/no vigente”. Evidencia: registro de revisión (lista).",
            "Tamaño manejable. Ruta A: ≤150 instrucciones o modularizado. Ruta B: ≤150 o dividido en archivos. Evidencia: número aproximado + dónde está dividido.",
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
