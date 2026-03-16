export const level03 = {
  id: "03",
  title: "Automatización",
  color: "#F59E0B",
  duration: "1–2 meses",
  team: "Equipo de 3–8 devs",
  desc: "Scripts, hooks, flujos automáticos y sesiones especializadas. El agente deja de ser una herramienta de consulta y se convierte en parte del pipeline de desarrollo.",
  sections: [
    {
      id: "hooks",
      title: "Hooks y scripts",
      items: [
        {
          label: "Pre-commit — review automático",
          body: "Al hacer commit, el agente revisa automáticamente el diff: convenciones del AGENTS.md, posibles bugs, patrones de seguridad básicos, consistencia con el resto del proyecto. El hook corre igual en todas las máquinas del equipo garantizando consistencia antes de llegar a CI.\n\nImplementación: husky + script que llama al agente CLI con el diff como contexto. Solo pasa si el agente aprueba. Incluye modo --skip para casos urgentes con justificación.",
          references: ["hooks-config"],
          checks: [
            "Pre-commit hook instalado y compartido en el repo (husky o equivalente)",
            "El hook llama al agente con el diff real, no solo herramientas de lint estáticas",
            "Todo el equipo tiene el hook activo — ningún commit bypasea el review",
            "Existe un modo --skip documentado para casos de emergencia",
          ],
        },
        {
          label: "Post-merge — changelog automático",
          body: "Al mergear a main: el agente lee los commits del merge y genera una entrada en CHANGELOG.md con lenguaje legible para stakeholders no técnicos. Qué cambió, por qué importa, qué impacto tiene para el usuario.\n\nBono: notificación automática al canal del equipo via Slack MCP o webhook con el resumen del merge.",
          references: ["hooks-basics"],
          checks: [
            "Hook post-merge genera CHANGELOG.md automáticamente tras cada merge a main",
            "El changelog es legible para stakeholders no técnicos (PM, diseño, negocio)",
            "El equipo dejó de escribir changelogs manualmente",
          ],
        },
        {
          label: "Scripts compartidos del equipo",
          body: "El agente CLI permite llamar al agente desde bash. Esto habilita scripts del proyecto versionados en el repo que todos usan:\n\n• /scripts/review.sh — toma un archivo, devuelve score de calidad y sugerencias.\n• /scripts/gen-tests.sh — genera tests para un módulo con la cobertura esperada.\n• /scripts/doc-update.sh — actualiza docs post-feature.\n• /scripts/security-check.sh — revisa el diff en busca de patrones de seguridad.\n\nTodos en /scripts/, documentados en el README.",
          references: ["hooks-basics"],
          checks: [
            "Al menos 3 scripts de equipo que usan el agente CLI están en /scripts/ del repo",
            "Los scripts están documentados con su propósito y uso en el README",
            "El equipo usa estos scripts en su flujo diario, no solo quien los escribió",
          ],
        },
        {
          label: "Skills Hooks — automatización por eventos",
          body: "Claude Code y Cline soportan hooks en el ciclo de vida del agente: pre-task (antes de empezar), post-commit (tras un commit), post-session (al terminar).\n\nHook más valioso para equipos: post-session que genera un resumen estructurado de lo que hizo el agente — qué archivos modificó, qué decisiones tomó, qué sigue. Va directo al canal de Slack o al PR como comentario automático.",
          references: ["hooks-basics"],
          checks: [
            "Al menos un hook activo en el ciclo de vida del agente",
            "El equipo recibe visibilidad automática de las acciones del agente en cada sesión",
            "Los hooks están documentados en el AGENTS.md del proyecto",
          ],
        },
        {
          label: "Hook de sugerencia de spec",
          body: "En esta fase el equipo puede usar un hook que sugiere crear una spec antes de iniciar trabajo significativo. Cuando el usuario inicia una sesión con una tarea grande, el hook pregunta: '¿Tienes una spec para esto? Si no, quieres generar una?'.\n\nEsto introduce SDD gradualmente sin obligatoriedad. El hook no bloquea el trabajo — solo sugiere y facilita crear la spec usando los templates. Ideal para equipos en transición hacia SDD.",
          references: ["sdd-basics"],
          checks: [
            "El hook de sugerencia de spec está activo",
            "El hook usa los templates de .project/specs/ para generar specs",
            "El equipo entiende que usar specs es recomendado pero no obligatorio en Level 03",
          ],
        },
      ],
      quiz: {
        passingScore: 90,
        questions: [
          {
            id: "hooks-q1",
            question: "¿Qué hace el pre-commit hook con el agente?",
            options: [
              "Ejecuta tests automáticamente",
              "El agente revisa automáticamente el diff antes del commit",
              "Genera documentación",
              "Compila el código"
            ],
            correctIndex: 1
          },
          {
            id: "hooks-q2",
            question: "¿Qué hace el hook post-merge?",
            options: [
              "Ejecuta tests",
              "Genera CHANGELOG.md automáticamente tras cada merge",
              "Hace backup",
              "Envía emails"
            ],
            correctIndex: 1
          },
          {
            id: "hooks-q3",
            question: "¿Qué son los Skills Hooks?",
            options: [
              "Automatización por eventos en el ciclo de vida del agente",
              "Un tipo de skill",
              "Una herramienta de testing",
              "Un servidor MCP"
            ],
            correctIndex: 0
          },
          {
            id: "hooks-q4",
            question: "¿Para qué sirve el hook de sugerencia de spec?",
            options: [
              "Para hacer commits",
              "Sugiere crear una spec antes de iniciar trabajo significativo",
              "Para ejecutar tests",
              "Para generar documentación"
            ],
            correctIndex: 1
          }
        ]
      }
    },
    {
      id: "flows",
      title: "Flujos automatizados",
      items: [
        {
          label: "Flujo Issue → PR automatizado",
          body: "El flujo completo con MCPs: el agente lee el issue en GitHub MCP → entiende contexto y criterios de aceptación → usa Sequential Thinking para proponer un plan → implementa con Filesystem MCP → hace commits con Git MCP → genera PR description con referencia al issue y explicación de decisiones → el equipo solo hace review humano.\n\nEste flujo transforma la velocidad de un equipo. El tiempo entre issue y PR listo se mide en minutos para features medianos.",
          references: ["mcp-basics"],
          checks: [
            "Completaste al menos 3 features usando el flujo issue → código → PR",
            "El agente siempre referencia el issue en el PR y explica las decisiones",
            "El equipo definió qué tipos de issues son aptos para automatización vs cuáles necesitan más discusión",
          ],
        },
        {
          label: "Flujo de migraciones de base de datos",
          body: "Proceso seguro con agente: describes el cambio en lenguaje natural → el agente lee el schema actual → Sequential Thinking valida que no rompe datos existentes → genera la migración con up y down → tú apruebas antes de ejecutar.\n\nNunca ejecutar migraciones sin el down. Nunca sin revisar primero. El agente puede equivocarse en relaciones complejas — la revisión humana es el paso que no se saltea.",
          references: ["mcp-basics"],
          checks: [
            "El flujo siempre incluye: leer schema → generar up → generar down → validar → aprobar",
            "Nunca se ejecuta una migración sin que el agente haya generado el rollback",
            "Al menos un caso donde el agente detectó un problema en la migración antes de ejecutar",
          ],
        },
        {
          label: "Sesiones especializadas por propósito",
          body: "Tipos de sesión que el equipo debería tener documentados:\n\n• Feature: contexto acotado al módulo, acceso a Filesystem + Git + Context7.\n• Review: instrucción de solo leer y reportar, nunca modificar. El agente es reviewer, no developer.\n• Debug: Systematic Debugging skill activo, ChromeDevTools si es frontend.\n• Investigación: solo buscar opciones y presentar tradeoffs, no implementar.\n• Documentación: leer código y actualizar docs, nunca modificar lógica.\n\nContexto limpio por sesión = respuestas más precisas.",
          references: ["console-claude-code"],
          checks: [
            "El equipo tiene al menos 4 tipos de sesión documentados con sus prompts de inicio",
            "Las sesiones de review nunca producen modificaciones de código",
            "Los prompts de onboarding para cada tipo de sesión están en PROMPTS.md",
          ],
        },
        {
          label: "Métricas del agente en tu flujo",
          body: "4 métricas que importan para mejorar tu setup:\n\n**Task Completion Rate**: Porcentaje de tareas que el agente completa sin ayuda humana directa. Meta: más del 70% en tareas rutinarias.\n\n**Revision Rate**: Cuántas veces corriges al agente por sesión. Meta: menos de 3 correcciones por tarea compleja. Si es más, ajusta el prompt o el contexto.\n\n**Costo por Task**: (tokens usados × precio del modelo) / tareas completadas. Monitorea para evitar desperdicio. Modelos más baratos pueden ser suficientes para tareas simples.\n\n**Tiempo Ahorrado**: Tiempo que tardas con agente vs tiempo que tardaría sin él. No siempre menor es mejor — a veces vale más la consistencia.\n\n**Cómo medir**: Al final de cada sesión, anota: ¿completó? ¿cuántas correcciones? ¿cuánto costaste? Semanalmente revisa tendencias y ajusta configuración.",
          references: ["agents-metrics"],
          checks: [
            "Mides al menos 2 de las 4 métricas en tu flujo",
            "Tienes una meta clara para task completion rate",
            "Ajustas configuración (modelo, prompts, MCPs) basado en datos"
          ],
        },
      ],
      quiz: {
        passingScore: 90,
        questions: [
          {
            id: "flows-q1",
            question: "¿En qué consiste el flujo Issue → PR automatizado?",
            options: [
              "El agente crea issues automáticamente",
              "El agente lee el issue, implementa, hace commits y genera PR automáticamente",
              "Solo hace commits",
              "Solo crea documentación"
            ],
            correctIndex: 1
          },
          {
            id: "flows-q2",
            question: "¿Qué pasos incluye el flujo seguro de migraciones?",
            options: [
              "Solo generar la migración",
              "Leer schema, generar up, generar down, validar, aprobar",
              "Ejecutar directamente",
              "Solo hacer backup"
            ],
            correctIndex: 1
          },
          {
            id: "flows-q3",
            question: "¿Por qué es importante tener sesiones especializadas?",
            options: [
              "No es importante",
              "Contexto limpio por sesión = respuestas más precisas",
              "Son más rápidas",
              "Consumen menos memoria"
            ],
            correctIndex: 1
          },
          {
            id: "flows-q4",
            question: "¿Qué tipo de sesión debe tener la instrucción de 'solo leer y reportar, nunca modificar'?",
            options: [
              "Feature",
              "Review",
              "Debug",
              "Investigación"
            ],
            correctIndex: 1
          },
          {
            id: "flows-q5",
            question: "Tu agente completa el 40% de las tareas sin ayuda. revision rate de 8 correcciones por tarea. ¿Qué debería hacer el equipo?",
            options: [
              "Seguir igual",
              "Reducir autonomía, mejorar prompts, o cambiar de modelo",
              "Usar modelos más caros",
              "Añadir más MCPs"
            ],
            correctIndex: 1
          },
          {
            id: "flows-q6",
            question: "¿Cuál es la métrica más importante para tareas rutinarias?",
            options: [
              "Tiempo ahorrado",
              "Costo por task",
              "Task completion rate (>70% objetivo)",
              "Revision rate"
            ],
            correctIndex: 2
          },
          {
            id: "flows-q7",
            question: "Si el costo por task es muy alto, ¿qué ajuste tiene más impacto?",
            options: [
              "Usar modelo más potente",
              "Cambiar a modelo más económico para tareas simples",
              "Añadir más skills",
              "Usar más MCPs"
            ],
            correctIndex: 1
          }
        ]
      }
    },
    {
      id: "advanced_agents_md",
      title: "AGENTS.md avanzado",
      items: [
        {
          label: "Plan-Act-Reflect en el flujo del agente",
          body: "Instrucción para el AGENTS.md: el agente siempre propone un plan explícito antes de ejecutar cambios que afecten más de 3 archivos. El plan incluye: qué archivos toca, qué cambios hace en cada uno, qué riesgos identifica. El equipo puede aprobar o ajustar el plan antes de ejecutar.\n\nAl terminar: el agente genera un resumen de decisiones tomadas. Este resumen va en el PR description. El code review humano se vuelve mucho más eficiente.",
          references: ["agents-basics"],
          checks: [
            "AGENTS.md incluye instrucción de proponer plan antes de actuar en tareas grandes",
            "El agente genera el resumen de decisiones al finalizar tareas complejas",
            "El equipo usa los resúmenes del agente como base del PR description",
          ],
        },
        {
          label: "Overrides por squad o módulo",
          body: "En equipos con squads distintos (frontend, backend, infra), cada módulo tiene su AGENTS.md propio con overrides. El squad de pagos tiene reglas más estrictas de seguridad. El squad de frontend tiene patrones de componentes específicos.\n\nHerencia clara: AGENTS.md raíz → módulo → squad. Cada nivel solo documenta diferencias. El agente construye el contexto combinando todos los AGENTS.md del árbol de directorios.",
          references: ["agents-md"],
          checks: [
            "Cada squad tiene su AGENTS.md local con reglas específicas del dominio",
            "Los AGENTS.md locales son cortos: solo diferencias respecto al nivel superior",
            "El proceso de actualizar el AGENTS.md de un squad está acordado dentro del squad",
          ],
        },
      ],
      quiz: {
        passingScore: 90,
        questions: [
          {
            id: "advanced-q1",
            question: "¿Qué es el patrón Plan-Act-Reflect?",
            options: [
              "Un tipo de test",
              "El agente propone un plan antes de ejecutar, actúa, y genera un resumen de decisiones",
              "Una herramienta de CI",
              "Un tipo de base de datos"
            ],
            correctIndex: 1
          },
          {
            id: "advanced-q2",
            question: "¿Cómo funciona la herencia de AGENTS.md en equipos con squads?",
            options: [
              "Solo existe uno global",
              "AGENTS.md raíz → módulo → squad, cada nivel solo documenta diferencias",
              "No hay herencia",
              "Solo el raíz importa"
            ],
            correctIndex: 1
          },
          {
            id: "advanced-q3",
            question: "¿Qué debe incluir el plan que propone el agente antes de actuar?",
            options: [
              "Solo el código a escribir",
              "Qué archivos toca, qué cambios hace, qué riesgos identifica",
              "Solo la descripción",
              "Solo los tests"
            ],
            correctIndex: 1
          }
        ]
      }
    },
  ],
  examQuestions: [
    {
      id: "exam03-q1",
      question: "Tu equipo quiere que el agente revise automáticamente cada commit antes de hacer push. ¿Qué implementas?",
      options: [
        "No es posible",
        "Pre-commit hook que llama al agente con el diff",
        "Solo usar lint",
        "Hacer review manualmente"
      ],
      correctIndex: 1
    },
    {
      id: "exam03-q2",
      question: "Necesitas automatizar el flujo completo de un feature: desde el issue hasta PR. ¿Qué herramientas usas?",
      options: [
        "Solo GitHub MCP",
        "GitHub MCP + Sequential Thinking + Filesystem MCP + Git MCP",
        "Solo CLI",
        "Solo el editor de código"
      ],
      correctIndex: 1
    },
    {
      id: "exam03-q3",
      question: "Tu squad de pagos necesita reglas de seguridad más estrictas que el squad de frontend. ¿Cómo lo manejas?",
      options: [
        "Usar el mismo AGENTS.md para todos",
        "AGENTS.md con overrides por módulo/squad",
        "Crear otro proyecto",
        "No es posible"
      ],
      correctIndex: 1
    },
    {
      id: "exam03-q4",
      question: "Antes de hacer una migración de base de datos, ¿cuál es el proceso seguro con agente?",
      options: [
        "Ejecutar directamente",
        "Leer schema → generar up → generar down → validar → aprobar",
        "Solo hacer backup",
        "No usar agente para migraciones"
      ],
      correctIndex: 1
    }
  ]
} as const;

export const level04 = {
  id: "04",
  title: "Orquestación",
  color: "#F87171",
  duration: "2–3 meses",
  team: "Equipo de 5–15 devs",
  desc: "Múltiples agentes especializados trabajando en coordinación. El orquestador gestiona el flujo completo de un feature sin que el equipo intervenga en cada paso.",
  sections: [
    {
      id: "specialized",
      title: "Agentes especializados",
      items: [
        {
          label: "El principio de especialización",
          body: "Un agente que hace todo no hace nada bien. La especialización viene de tres elementos: AGENTS.md con rol explícito y restrictivo, skills específicos cargados para esa tarea, MCPs limitados a los necesarios. El agente de tests no sabe nada de UI. El agente de review no modifica código. La restricción intencional es lo que hace que los agentes sean confiables y predecibles.",
          references: ["orchestration"],
          checks: [
            "Cada sub-agente tiene su propio AGENTS.md con rol y restricciones explícitas",
            "Los sub-agentes no tienen acceso a herramientas que no necesitan para su rol",
            "El equipo tiene documentados al menos 4 sub-agentes especializados",
          ],
        },
        {
          label: "Agente de tests",
          body: "Solo escribe y mantiene tests. Conoce la cobertura actual, los patrones del proyecto (unit, integration, e2e), las convenciones de naming. Nunca toca código de producción — restricción explícita en su AGENTS.md.\n\nEn el flujo del equipo: corre automáticamente después de cada feature completada. El Systematic Debugging skill le ayuda a entender qué casos edge probar.",
          references: ["skills-basics"],
          checks: [
            "El agente de tests nunca modificó código de producción (solo archivos de test)",
            "La cobertura del proyecto mejoró sin esfuerzo manual del equipo",
            "El flujo está automatizado: feature terminada → agente de tests corre sin intervención",
          ],
        },
        {
          label: "Agente de code review",
          body: "Revisa código con perspectiva de senior: patrones incorrectos, violaciones del AGENTS.md, performance, edge cases no manejados, seguridad básica. Es el primer filtro antes del review humano.\n\nInstrucción clave: 'comenta en formato de PR review, nunca modifiques código directamente'. Reduce los comentarios repetitivos en PRs — el agente los detecta antes de que lleguen al review humano.",
          references: ["skills-basics"],
          checks: [
            "El agente de review corre en cada PR antes del review humano",
            "El número de rondas de review humano disminuyó tras implementar el agente de review",
            "El equipo tiene criterio claro: qué findings bloquean el merge vs cuáles son sugerencias",
          ],
        },
        {
          label: "Agente de documentación",
          body: "Lee código y genera/actualiza: JSDoc, README de módulos, diagramas de arquitectura en Mermaid, entradas de changelog. Corre al completar cada feature. La documentación nunca va atrasada respecto al código.\n\nHabilidad clave: distinguir qué merece documentación (interfaz pública, decisiones no obvias) de qué es auto-explicativo. Un agente que documenta todo genera ruido — entrenarlo con ejemplos de tu proyecto mejora la señal.",
          references: ["skills-basics"],
          checks: [
            "La documentación técnica se actualiza automáticamente como parte del flujo de features",
            "El equipo dejó de tener docs que no corresponden al código actual",
            "El agente distingue qué documenta y qué omite — no genera documentación obvia",
          ],
        },
        {
          label: "Agente de seguridad",
          body: "Revisa: dependencias con vulnerabilidades conocidas, patrones inseguros (inyección SQL, XSS, autenticación débil, exposición de secrets), manejo de inputs y validación. Corre en cada PR. Da un reporte accionable con severidad, no solo una lista de hallazgos.\n\nRecomendación: configurar el agente para bloquear merges con hallazgos de severidad alta automáticamente.",
          references: ["skills-basics"],
          checks: [
            "El agente de seguridad corre en cada PR con reporte de severidad",
            "Al menos un hallazgo de seguridad fue detectado antes de llegar a producción",
            "El equipo tiene criterio de qué severidad bloquea el merge automáticamente",
          ],
        },
      ],
      quiz: {
        passingScore: 90,
        questions: [
          {
            id: "specialized-q1",
            question: "¿En qué consiste el principio de especialización de agentes?",
            options: [
              "Un agente hace todo",
              "AGENTS.md restrictivo + skills específicos + MCPs limitados al rol",
              "Solo usar un modelo",
              "Tener un solo agente"
            ],
            correctIndex: 1
          },
          {
            id: "specialized-q2",
            question: "¿Qué hace el agente de tests?",
            options: [
              "Escribe código de producción",
              "Solo escribe y mantiene tests, nunca toca código de producción",
              "Hace code review",
              "Genera documentación"
            ],
            correctIndex: 1
          },
          {
            id: "specialized-q3",
            question: "¿Qué hace el agente de code review?",
            options: [
              "Modifica código directamente",
              "Revisa código y comenta en formato PR, nunca modifica código directamente",
              "Ejecuta tests",
              "Despliega a producción"
            ],
            correctIndex: 1
          },
          {
            id: "specialized-q4",
            question: "¿Qué hace el agente de seguridad?",
            options: [
              "Solo revisa性能的",
              "Revisa dependencias, patrones inseguros, manejo de inputs, y da reporte con severidad",
              "Escribe código",
              "Hace deployment"
            ],
            correctIndex: 1
          },
          {
            id: "specialized-q5",
            question: "¿Qué hace el agente de documentación?",
            options: [
              "Solo genera código",
              "Lee código y genera/actualiza JSDoc, README, diagramas, changelog automáticamente",
              "Ejecuta tests",
              "Hace code review"
            ],
            correctIndex: 1
          }
        ]
      }
    },
    {
      id: "orchestration",
      title: "Coordinación y orquestador",
      items: [
        {
          label: "El orquestador — contexto limpio siempre",
          body: "El orquestador es el agente que coordina a los demás. Regla de oro: nunca lee código directamente. Solo lee resúmenes estructurados que le envían los sub-agentes. Esto mantiene su contexto limpio y le permite gestionar proyectos de cualquier tamaño.\n\nSu AGENTS.md es restrictivo en sentido opuesto a los sub-agentes: 'solo tomas decisiones de alto nivel, descompones tareas, delegas a sub-agentes, nunca implementas código directamente'.",
          references: ["orchestration"],
          checks: [
            "El orquestador tiene AGENTS.md que le prohíbe leer código completo o implementar directamente",
            "El orquestador trabaja exclusivamente con resúmenes de los sub-agentes",
            "Completaste un feature completo con orquestador coordinando al menos 2 sub-agentes",
          ],
        },
        {
          label: "Protocolo de handoff entre agentes",
          body: "Sin un formato estándar de handoff, la orquestación colapsa. Cada sub-agente termina con un resumen estructurado: qué hizo, qué encontró importante, qué decisiones tomó, qué bloqueadores existen, cuál es el siguiente paso recomendado.\n\nEl orquestador puede tomar la siguiente decisión solo leyendo este resumen. El template debe estar en el AGENTS.md del orquestador y todos los sub-agentes deben seguirlo.",
          references: ["orchestration"],
          checks: [
            "Existe un template de handoff documentado en el AGENTS.md del orquestador",
            "Todos los sub-agentes siguen el mismo formato de resumen al terminar",
            "El orquestador puede decidir el siguiente paso leyendo solo el handoff, sin contexto adicional",
          ],
        },
        {
          label: "Pipeline completo de feature",
          body: "El flujo end-to-end:\n1. Orquestador lee el issue, descompone en tareas, crea el plan.\n2. Agente de implementación ejecuta según el plan, hace commits semánticos.\n3. Agentes de tests, review y seguridad corren en paralelo sobre los cambios.\n4. Agente de documentación actualiza docs del módulo afectado.\n5. PR listo con description generada, tests actualizados, docs al día.\n\nEl equipo solo hace el review final. Todo lo demás fue coordinado por los agentes.",
          references: ["orchestration"],
          checks: [
            "El pipeline completo corre en menos de 20 minutos para features medianos",
            "El equipo solo necesita revisar el PR final, sin supervisar cada paso",
            "Tienes métricas del tiempo ahorrado vs el flujo de desarrollo manual anterior",
          ],
        },
        {
          label: "Spec requerida en pipeline orquestado",
          body: "En Level 04, usar spec es obligatorio para el pipeline automatizado. El orquestador verifica que exista una spec antes de iniciar. La spec debe estar en `.project/specs/features/[nombre].md` y debe pasar la validación del skill SDD.\n\nValidación en cada fase:\n• Antes de implementar: la spec tiene todos los campos obligatorios\n• Durante implementación: el agente de tests valida contra criterios de aceptación\n• Durante review: el agente de review verifica que el código cumpla la spec\n• Al cerrar: el handoff incluye qué criterios de aceptación se cumplieron\n\nEsto asegura que el trabajo orquestado tenga objetivos claros y medibles.",
          references: ["sdd-basics"],
          checks: [
            "El orquestador tiene una regla: sin spec no hay pipeline",
            "La spec se versiona junto con el código del feature",
            "Cada fase del pipeline valida contra los criterios de aceptación de la spec",
            "El handoff final indica qué criterios se cumplieron y cuáles no",
          ],
        },
        {
          label: "context:fork para análisis sin contaminación",
          body: "context:fork (Claude Code) permite que un skill o análisis corra en un contexto completamente aislado, sin contaminar la sesión principal. El resultado llega como un resumen limpio.\n\nIdeal para: auditorías de seguridad completas, análisis de arquitectura de todo el proyecto, revisiones de bundle size. Estos análisis generan mucho contexto temporal que no debería afectar las respuestas posteriores del agente principal.",
          references: ["orchestration"],
          checks: [
            "Identificaste qué análisis del equipo se benefician de context:fork",
            "Los análisis pesados usan context:fork para no degradar la calidad de la sesión principal",
            "Comparaste la calidad de respuestas con y sin context:fork en análisis de arquitectura",
          ],
        },
      ],
      quiz: {
        passingScore: 90,
        questions: [
          {
            id: "orch-q1",
            question: "¿Cuál es la regla de oro del orquestador?",
            options: [
              "Lee todo el código",
              "Nunca lee código directamente, solo resúmenes de sub-agentes",
              "Implementa código directamente",
              "Hace tests"
            ],
            correctIndex: 1
          },
          {
            id: "orch-q2",
            question: "¿Qué es el protocolo de handoff entre agentes?",
            options: [
              "Un tipo de test",
              "Formato estándar de resumen que cada sub-agente envía al terminar: qué hizo, decisiones, bloqueadores, siguiente paso",
              "Una herramienta de CI",
              "Un tipo de base de datos"
            ],
            correctIndex: 1
          },
          {
            id: "orch-q3",
            question: "¿Qué es context:fork?",
            options: [
              "Un tipo de skill",
              "Permite análisis en contexto aislado sin contaminar la sesión principal",
              "Una herramienta de deployment",
              "Un tipo de test"
            ],
            correctIndex: 1
          },
          {
            id: "orch-q4",
            question: "¿En el pipeline completo de feature, qué hace el equipo al final?",
            options: [
              "Todo el trabajo",
              "Solo hace el review final",
              "Escribe el código",
              "Ejecuta los tests"
            ],
            correctIndex: 1
          },
          {
            id: "orch-q5",
            question: "¿En Level 04, qué es obligatorio para el pipeline orquestado?",
            options: [
              "Nada",
              "Usar spec, el orquestador verifica que exista antes de iniciar",
              "Usar solo un agente",
              "No usar skills"
            ],
            correctIndex: 1
          }
        ]
      }
    },
  ],
  examQuestions: [
    {
      id: "exam04-q1",
      question: "Tienes un pipeline donde el agente de tests y el de review corren al mismo tiempo. ¿Cómo se llama este patrón?",
      options: [
        "Secuencial",
        "Paralelo",
        "Lineal",
        "No es posible"
      ],
      correctIndex: 1
    },
    {
      id: "exam04-q2",
      question: "El orquestador está sobrecargado de contexto porque lee todo el código. ¿Qué haces?",
      options: [
        "No hay solución",
        "El orquestador solo lee resúmenes de sub-agentes, nunca código directamente",
        "Usar más MCPs",
        "Dividir el proyecto"
      ],
      correctIndex: 1
    },
    {
      id: "exam04-q3",
      question: "Necesitas hacer una auditoría de seguridad completa del proyecto sin afectar la sesión principal. ¿Qué usas?",
      options: [
        "No es posible",
        "context:fork para análisis en contexto aislado",
        "Cerrar la sesión",
        "Hacerlo manualmente"
      ],
      correctIndex: 1
    },
    {
      id: "exam04-q4",
      question: "Un sub-agente termina su tarea. ¿Qué debe hacer para que el orquestador pueda decidir el siguiente paso?",
      options: [
        "Nada especial",
        "Enviar un resumen estructurado con qué hizo, decisiones, bloqueadores y siguiente paso",
        "Cerrar la sesión",
        "Enviar todo el código"
      ],
      correctIndex: 1
    }
  ]
} as const;
