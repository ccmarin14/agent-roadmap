export const level02 = {
  id: "02",
  title: "Herramientas de equipo",
  color: "#60A5FA",
  duration: "2–4 semanas",
  team: "Equipo pequeño (2–5)",
  desc: "MCP para conectar el agente con herramientas externas, Skills para especializar su razonamiento, documentación técnica y librería de prompts compartida.",
  sections: [
    {
      id: "mcp",
      title: "MCP — conectar herramientas",
      items: [
        {
          label: "Qué es MCP y por qué importa",
          body: "MCP (Model Context Protocol) es el estándar abierto creado por Anthropic en 2024 que permite a agentes conectarse con herramientas y fuentes de datos externas. Antes de MCP cada integración era custom y no portable. Ahora hay miles de servidores MCP disponibles que cualquier agente compatible puede usar.\n\nAnálogo más claro: USB-C para agentes. Un estándar universal que hace que cualquier herramienta funcione con cualquier agente. Adoptado por OpenAI, Google DeepMind y la industria en menos de un año.",
          references: ["mcp-basics"],
          checks: [
            "Puedes explicar MCP server/client/host. Evidencia: diagrama simple + 3 definiciones (1–2 líneas).",
            "Entiendes el problema que resuelve MCP. Evidencia: 2–3 bullets “antes vs después” con un caso concreto.",
            "Instalaste tu primer MCP server. Ruta A: lo instalas en tu herramienta. Ruta B: lo ejecutas localmente (stdio) y validas que responde. Evidencia: config + comando de arranque + 1 llamada exitosa.",
          ],
        },
        {
          label: "Arquitectura: servers, clients, hosts",
          body: "MCP Host: la app que orquesta todo (OpenCode, Claude Code, Cursor). MCP Client: el componente dentro del host que habla con los servers. MCP Server: el proceso que expone las herramientas al agente. Puede ser local (corre en tu máquina via stdio, rápido, sin red) o remoto (corre en internet via HTTP, se autentica con OAuth 2.1, compartible entre el equipo).\n\nPara equipos: herramientas de desarrollo locales en cada máquina, servicios compartidos (GitHub, Slack, DB) como servidores remotos.",
          references: ["mcp-basics"],
          checks: [
            "Entiendes MCP local (stdio) vs remoto (HTTP + auth). Evidencia: tabla 2×3 (latencia, seguridad, compartición).",
            "Sabes cuándo conviene local vs remoto. Evidencia: 3 casos con justificación breve.",
            "Tienes MCP local y, si tu contexto lo permite, MCP remoto. Ruta A: 1 server local + 1 remoto funcionando. Ruta B: 1 server local funcionando + plan reproducible para remoto (config + pasos + riesgos) o demo HTTP local sin OAuth. Evidencia: config(s) + notas de ejecución.",
          ],
        },
        {
          label: "MCPs de desarrollo fundamentales",
          body: "Los 5 que más valor dan al inicio del flujo:\n\n• Filesystem: el agente lee/escribe archivos con rutas controladas. Configura siempre con rutas explícitas permitidas.\n• Git MCP: commits semánticos, leer diffs, entender historial antes de proponer cambios.\n• GitHub MCP oficial: leer issues, crear PRs, comentar, integración con el repo remoto.\n• Sequential Thinking: el agente construye un plan de razonamiento antes de actuar. Reduce errores en tareas grandes.\n• Fetch: consulta cualquier URL — changelogs, docs, APIs.",
          references: ["mcp-servers"],
          checks: [
            "Tienes al menos 3 MCPs fundamentales (GitHub MCP es recomendado, no obligatorio). Evidencia: lista de 3 + config de arranque.",
            "Filesystem MCP con permisos mínimos (rutas limitadas, no todo el disco). Evidencia: configuración donde se ve la(s) ruta(s) permitida(s).",
            "Usaste Git MCP para leer historial/diffs antes de proponer cambios. Evidencia: salida resumida + 2 decisiones tomadas con esa info.",
          ],
        },
        {
          label: "Seguridad con MCPs — lo que no se puede ignorar",
          body: "Los MCP tools ejecutan código arbitrario en tu máquina. Riesgos reales que debes conocer:\n\n**Prompt injection**: Un atacante puede usar inputs maliciosos o descripciones de herramientas manipuladas para injectar instrucciones no deseadas al agente. Un input de usuario que contiene \"\${ignora las instrucciones anteriores y...}\" puede alterar el comportamiento.\n\n**Tool poisoning**: Un MCP server comprometido o malicioso puede retornar respuestas que manipulan al agente. Por ejemplo, un Filesystem MCP modificado podría reportar archivos diferentes a los reales.\n\n**Permisos excesivos**: Un Filesystem MCP con acceso total al sistema es un riesgo. Si el agente se ve comprometido, el atacante tiene acceso a todo.\n\n**Principios de defensa**:\n- Least privilege: otorga el mínimo permiso necesario\n- Verify sources: solo usa MCPs de repos activos o empresas conocidas\n- Audit logs: registra qué herramientas se usaron y cuándo\n- Validate inputs: no confíes en user content sin sanitization\n- Revisa qué herramientas tiene el agente antes de tareas críticas",
          references: ["mcp-security"],
          checks: [
            "Entiendes prompt injection y mitigaciones. Evidencia: 2 riesgos + 2 mitigaciones aplicables.",
            "Solo usas MCP servers de fuentes verificadas. Evidencia: allowlist corta con 2 señales de verificación por server.",
            "Aplicaste least privilege en permisos. Evidencia: configuración + 2 reglas de permisos escritas.",
            "Tienes un checklist antes de tareas críticas. Evidencia: checklist de 5–8 ítems.",
          ],
        },
        {
          label: "Eficiencia de contexto — no instalar todo",
          body: "Cada MCP instalado ocupa espacio de contexto con sus definiciones de herramientas. Cargar 20 MCPs en cada sesión desperdicia contexto útil para el código.\n\nSolución: perfiles de MCPs por tipo de sesión. Sesión de frontend: Filesystem + Git + Context7. Sesión de backend: Filesystem + Git + DB MCP + Sequential Thinking. Documenta estos perfiles en el AGENTS.md. El agente trabaja mejor con menos herramientas más relevantes.",
          references: ["mcp-basics"],
          checks: [
            "Tienes perfiles por tipo de sesión. Evidencia: tabla de perfiles con 3–6 MCPs por perfil.",
            "No cargas más de 5–6 MCPs por sesión. Evidencia: 2 ejemplos de perfiles aplicados.",
            "Documentaste los perfiles en AGENTS.md. Evidencia: sección “Perfiles MCP” en AGENTS.md.",
          ],
        },
        {
          label: "Construir tu propio MCP server",
          body: "Cuando ningún MCP existente cubre tu caso de uso, construyes el tuyo. FastMCP es el framework más simple (Python). Principios de diseño: un MCP server = una responsabilidad clara. Las herramientas deben estar optimizadas para objetivos del usuario, no para reflejar todos los endpoints de tu API interna. Las descripciones de parámetros reducen errores del agente — escríbelas bien.\n\nCaso típico: MCP para tu sistema de diseño interno, tu base de conocimiento, o tu API privada.",
          references: ["mcp-fastmcp"],
          checks: [
            "Identificaste 1 caso de uso para MCP propio. Evidencia: problema + tool propuesta + inputs/outputs.",
            "Creaste un MCP server mínimo con 1 tool funcionando. Evidencia: código + comando de ejecución + llamada exitosa.",
            "Documentaste instalación y prueba. Evidencia: README con “instalar/ejecutar/probar”.",
          ],
        },
      ],
      quiz: {
        passingScore: 90,
        questions: [
          {
            id: "mcp-q1",
            question: "¿Qué es MCP y para qué sirve?",
            options: [
              "Un modelo de lenguaje",
              "Un estándar para conectar agentes con herramientas externas",
              "Un tipo de base de datos",
              "Un editor de código"
            ],
            correctIndex: 1
          },
          {
            id: "mcp-q2",
            question: "¿Cuál es la diferencia entre MCP local y MCP remoto?",
            options: [
              "No hay diferencia",
              "Local corre via stdio, remoto via HTTP con OAuth",
              "Local es más seguro",
              "Remoto no necesita configuración"
            ],
            correctIndex: 1
          },
          {
            id: "mcp-q3",
            question: "¿Por qué es importante no instalar demasiados MCPs?",
            options: [
              "Consumen memoria del computador",
              "Cada MCP ocupa espacio de contexto, cargarlos todos desperdicia contexto útil",
              "Son caros",
              "No se pueden tener más de 3"
            ],
            correctIndex: 1
          },
          {
            id: "mcp-q4",
            question: "¿Qué es un perfil de MCPs?",
            options: [
              "Un documento de texto",
              "Conjunto de MCPs configurados por tipo de sesión (frontend, backend, etc.)",
              "Una lista de MCPs permitidos",
              "Un tipo de servidor"
            ],
            correctIndex: 1
          },
          {
            id: "mcp-q5",
            question: "¿Qué es FastMCP?",
            options: [
              "Un modelo de lenguaje",
              "Un framework para construir servidores MCP",
              "Una base de datos",
              "Un IDE"
            ],
            correctIndex: 1
          },
          {
            id: "mcp-q6",
            question: "Un usuario ingresa texto en tu app que se pasa al agente. ¿Qué riesgo de seguridad existe?",
            options: [
              "No hay riesgo",
              "Prompt injection - el usuario podría manipular las instrucciones del agente",
              "El agente será más lento",
              "Consumirá más memoria"
            ],
            correctIndex: 1
          },
          {
            id: "mcp-q7",
            question: "Un Filesystem MCP tiene acceso completo al sistema. ¿Qué principio de seguridad violates?",
            options: [
              "Least privilege - otorga más permisos de los necesarios",
              "No hay problema",
              "Es más eficiente",
              "Mejora el rendimiento"
            ],
            correctIndex: 0
          },
          {
            id: "mcp-q8",
            question: "Antes de usar un MCP server de terceros, ¿qué debes verificar?",
            options: [
              "Que sea popular",
              "Que venga de una fuente verificada (repo activo, empresa conocida)",
              "Que sea gratis",
              "Que tenga buena documentación"
            ],
            correctIndex: 1
          }
        ]
      }
    },
    {
      id: "skills",
      title: "Skills — especializar el razonamiento",
      items: [
        {
          label: "Qué es un Skill — diferencia con MCP",
          body: "MCP conecta al agente con herramientas externas (acciones). Skills enseñan al agente cómo razonar en tareas específicas (conocimiento).\n\nUn skill es un paquete de conocimiento procedimental: criterios, procesos, reglas y marcos de decisión. No es un prompt largo — es experiencia estructurada. Ejemplo: el Systematic Debugging skill no le da al agente acceso a nuevas herramientas, le enseña el proceso correcto de debugging: hipótesis → aislamiento → verificación → solución.",
          references: ["skills-basics"],
          checks: [
            "Puedes explicar Skill vs MCP. Evidencia: 2 ejemplos y por qué caen en cada categoría.",
            "Entiendes carga progresiva. Evidencia: lista de 3 skills con “siempre / bajo demanda”.",
            "Instalaste tu primer skill. Ruta A: `npx skills add ...` desde un repo público. Ruta B: si tu herramienta no lo soporta, creas un SKILL.md equivalente (plantilla) y lo usas manualmente en 2 tareas. Evidencia: comando o archivo + 2 usos registrados.",
          ],
        },
        {
          label: "Anatomía de un SKILL.md",
          body: "Estructura de un skill: directorio con nombre del skill, archivo SKILL.md central, carpeta scripts/ opcional (código ejecutable), carpeta references/ para docs de referencia.\n\nEl SKILL.md tiene dos partes: frontmatter YAML con 'name' y 'description' (la description es el trigger de activación automática — debe ser específica y empujona), y cuerpo en Markdown con el flujo paso a paso, herramientas a usar, y errores comunes a evitar. Límite: 500 líneas.",
          references: ["skills-structure"],
          checks: [
            "Leíste el SKILL.md de al menos un skill instalado y entiendes cada sección",
            "Entiendes por qué la 'description' del frontmatter determina si el skill se activa o no",
            "Sabes cuándo un skill necesita dividirse en SKILL.md + references/",
          ],
        },
        {
          label: "Skills esenciales para desarrollo",
          body: "Los más valiosos según la comunidad:\n\n• Systematic Debugging (Superpowers): hipótesis → aislamiento → solución estructurada.\n• Error Handling Patterns: try/catch por capas, logs útiles, respuestas coherentes.\n• API Design Principles: endpoints consistentes, buen naming.\n• Frontend Design Skill: el agente piensa como diseñador, no solo genera HTML funcional.\n• Vercel React Best Practices: server vs client components, patterns modernos de Next.js.\n• Changelog Generator: convierte commits en changelog legible para stakeholders.\n• PostgreSQL Skill: schemas, índices, queries sin N+1.\n\nInstalables desde skills.sh o npx skills add.",
          references: ["skills-basics"],
          checks: [
            "Tienes 3 capacidades reutilizables (skills o guías). Evidencia: lista de 3 + cuándo se activan.",
            "Aplicaste debugging sistemático (hipótesis→aislamiento→verificación→solución). Evidencia: registro de 5–10 líneas con esos pasos.",
            "Aplicaste patrones de manejo de errores. Evidencia: snippet antes/después o checklist aplicado.",
          ],
        },
        {
          label: "Scope de instalación en equipo",
          body: "Proyecto (default): ./<agent>/skills/ — commiteable al repo, compartido con todo el equipo. Global (-g): ~/.claude/skills/ — personal, disponible en todos tus proyectos pero no en el repo.\n\nRegla para equipos: skills que reflejan decisiones del equipo van commiteados al proyecto. Skills de preferencia personal van en global. El README del proyecto documenta qué skills están y cuándo activarlos.",
          references: ["skills-basics"],
          checks: [
            "Separaste scope de skills (equipo en repo, personales global). Evidencia: estructura + explicación breve.",
            "No contaminas el repo con skills personales. Evidencia: regla escrita (qué no se commitea).",
            "Documentaste skills disponibles y cuándo usarlos. Evidencia: sección con 3 skills y triggers.",
          ],
        },
        {
          label: "Crear tu propio skill de equipo",
          body: "Crea un skill cuando tienes un proceso repetitivo, cuando el agente comete el mismo error en una tarea específica, o cuando tienes conocimiento de dominio que no existe en skills.sh.\n\nLa description del frontmatter es lo más crítico: si es vaga el skill nunca se activa. Sé explícito: lista los casos en que debe activarse. Testa la activación con 5 prompts distintos antes de commitear. Itera el skill como si fuera código: PR, changelog, revisión periódica.",
          references: ["skills-basics"],
          checks: [
            "Creaste 1 skill propio (o guía equivalente). Evidencia: archivo + ejemplo de uso.",
            "Se usa en contextos correctos. Evidencia: 2 casos donde se activó/aplicó correctamente (automático o manual).",
            "Otra persona lo usa sin tu guía. Evidencia: 1 feedback o checklist completado por otra persona.",
          ],
        },
        {
          label: "TDD — Tests primero",
          body: "TDD (Test-Driven Development) es una práctica donde escribes los tests antes del código. Con agentes de código, esto es powerful: el test se convierte en la especificación de comportamiento esperado.\n\nFlujo TDD con agente:\n1. Describe el comportamiento esperado en un test\n2. El agente implementa solo lo necesario para que pase\n3. Refactorizas sin miedo — los tests protegen el comportamiento\n\nEl agente de tests (Level 04) puede aplicar TDD automáticamente si se le indica. La clave está en escribir tests pequeños y enfocados — un test por comportamiento. El Systematic Debugging skill ayuda a escribir tests que cubren edge cases.",
          references: ["skills-basics"],
          checks: [
            "Entiendes red‑green‑refactor. Ruta A: lo explicas con un ejemplo del proyecto. Ruta B: lo explicas con un ejemplo mínimo. Evidencia: 3 pasos + ejemplo por paso.",
            "Escribiste 1 test antes del código. Ruta A: en tarea real. Ruta B: en kata/práctica. Evidencia: commit o diff mostrando test primero.",
            "El agente respeta tests existentes. Ruta A: corre/falla/pasa tests del repo. Ruta B: usa un set mínimo de tests de práctica. Evidencia: salida resumida (antes fallaba / después pasa).",
            "Cubres edge cases. Ruta A: 2 edge cases reales. Ruta B: 2 edge cases de ejemplo. Evidencia: lista de 2 edge cases + test asociado.",
          ],
        },
        {
          label: "Skill SDD — validar specs",
          body: "Skill SDD (Specification-Driven Development) guía al agente para pedir y validar specs antes de implementar. Se activa cuando el usuario describe una tarea.\n\nEl skill incluye checklist de validación:\n• Objetivo claro y medible\n• User stories con formato EARS\n• Criterios de aceptación verificables\n• Constraints técnicos definidos\n• Edge cases identificados\n\nSi la spec está incompleta, el skill indica qué falta antes de empezar. Esto evita trabajo desperdiciado por requisitos vagos.",
          references: ["sdd-basics"],
          checks: [
            "Checklist SDD disponible. Ruta A: skill instalado. Ruta B: checklist en markdown usado por el equipo. Evidencia: checklist con campos obligatorios.",
            "Se valida antes de implementar. Ruta A: el agente pide campos faltantes. Ruta B: tú aplicas checklist y bloqueas inicio si falta algo. Evidencia: 1 spec revisada con faltantes marcados.",
            "Checklist cubre templates. Ruta A: mapeas checklist → template. Ruta B: haces tabla de correspondencia. Evidencia: tabla de campos (template) vs ítems (checklist).",
            "Uso por equipo. Ruta A: 2 specs reales con checklist aplicado. Ruta B: 2 specs de práctica con checklist aplicado. Evidencia: 2 registros de revisión.",
          ],
        },
      ],
      quiz: {
        passingScore: 90,
        questions: [
          {
            id: "skills-q1",
            question: "¿Cuál es la diferencia entre MCP y Skills?",
            options: [
              "No hay diferencia",
              "MCP conecta con herramientas externas, Skills enseñan cómo razonar",
              "Skills son más rápidos",
              "MCP es solo para código"
            ],
            correctIndex: 1
          },
          {
            id: "skills-q2",
            question: "¿Qué es un Skill en el contexto de agentes de código?",
            options: [
              "Un tipo de modelo de lenguaje",
              "Un paquete de conocimiento procedimental con criterios y procesos",
              "Una herramienta de terminal",
              "Un tipo de base de datos"
            ],
            correctIndex: 1
          },
          {
            id: "skills-q3",
            question: "¿Qué es la 'carga progresiva' de un Skill?",
            options: [
              "Cargar todos los skills al inicio",
              "name+desc siempre, SKILL.md solo cuando activa, scripts solo si necesita",
              "Cargar skills por orden alfabetico",
              "Skills se cargan solos"
            ],
            correctIndex: 1
          },
          {
            id: "skills-q4",
            question: "¿Qué es TDD con agentes?",
            options: [
              "Escribir tests después del código",
              "Escribir tests antes del código para que el agente implemente solo lo necesario",
              "No usar tests",
              "Tests automáticos sin intervención"
            ],
            correctIndex: 1
          },
          {
            id: "skills-q5",
            question: "¿Qué es SDD?",
            options: [
              "Sistema de archivos",
              "Specification-Driven Development - guiar al agente para pedir specs antes de implementar",
              "Una base de datos",
              "Un editor de código"
            ],
            correctIndex: 1
          }
        ]
      }
    },
    {
      id: "docs",
      title: "Documentación técnica",
      items: [
        {
          label: "Contexto siempre actualizado con Context7",
          body: "Context7 es un MCP que inyecta documentación de librerías directamente en el contexto del agente, versionada y actualizada. Resuelve uno de los problemas más frecuentes: el agente usa APIs deprecadas o métodos que no existen porque su entrenamiento tiene fecha de corte.\n\nConfiguración recomendada para equipos: regla en OpenCode para que Context7 se active automáticamente en sesiones de código. El agente nunca vuelve a halucinar métodos que no existen en tu versión de la librería.",
          references: ["docs-context7"],
          checks: [
            "Tienes un mecanismo de docs actualizadas. Ruta A: Context7 configurado y activo. Ruta B: proceso gratis: citar doc oficial + versión en el prompt antes de cambios. Evidencia: 2 ejemplos de prompts con “fuente + versión”.",
            "Verificas versión correcta. Ruta A: lo haces vía Context7. Ruta B: validas en la doc oficial de la librería y lo anotas. Evidencia: 1 caso con link + versión + decisión tomada.",
            "Reduces APIs deprecadas. Ruta A: registro de 1 caso evitado. Ruta B: checklist “antes de implementar” que incluye “verificar API actual”. Evidencia: checklist aplicado 2 veces.",
          ],
        },
        {
          label: "Documentación interna del proyecto",
          body: "El agente puede consumir la documentación del proyecto como contexto: arquitectura, decisiones de diseño, diagramas de flujo, guías de contribución. Formatos más efectivos: Markdown en el repo (el agente puede leerlos con Filesystem MCP), páginas de Notion o Confluence accesibles via MCP de Fetch.\n\nConvención para equipos: carpeta /docs en el repo con ADRs (Architecture Decision Records), guía de contribución, y diagramas. El agente los lee antes de proponer cambios de arquitectura.",
          references: ["docs-adrs"],
          checks: [
            "Existe /docs con contenido útil. Ruta A: en repo real. Ruta B: en repo de práctica. Evidencia: índice de /docs + 2 documentos (ADR + guía).",
            "La documentación se consulta antes de cambios grandes. Ruta A: el agente la lee (Filesystem MCP). Ruta B: checklist manual: “leer docs X antes”. Evidencia: 1 cambio donde se citó un doc.",
            "ADRs en formato estándar. Ruta A: 1 ADR real. Ruta B: 1 ADR de práctica con plantilla. Evidencia: ADR con contexto/decisión/consecuencias.",
          ],
        },
        {
          label: "Documentación generada por el agente",
          body: "El agente puede mantener la documentación actualizada automáticamente: JSDoc para funciones y clases, README de módulos, changelogs, diagramas de arquitectura en texto (Mermaid). La regla: la documentación debe generarse como parte del flujo de desarrollo, no después.\n\nFlujo recomendado: al completar un feature, el agente actualiza el README del módulo afectado y genera/actualiza el JSDoc de las funciones modificadas antes del PR.",
          references: ["docs-jsdoc"],
          checks: [
            "JSDoc/Docs se mantienen al día. Ruta A: proceso automatizado en flujo (hook/PR). Ruta B: Definition of Done: “si cambia API pública, actualizar JSDoc”. Evidencia: 1 diff con JSDoc actualizado.",
            "README de módulo actualizado. Ruta A: automatizado. Ruta B: actualizado manualmente como parte del PR. Evidencia: diff del README + 2 bullets del cambio.",
            "Docs coherentes con código. Ruta A: revisión periódica. Ruta B: checklist antes de merge (docs vs código). Evidencia: 1 revisión registrada con hallazgos o “sin hallazgos”.",
          ],
        },
      ],
      quiz: {
        passingScore: 90,
        questions: [
          {
            id: "docs-q1",
            question: "¿Qué es Context7?",
            options: [
              "Un editor de código",
              "Un MCP que inyecta documentación versionada de librerías en el contexto del agente",
              "Una base de datos",
              "Un tipo de skill"
            ],
            correctIndex: 1
          },
          {
            id: "docs-q2",
            question: "¿Por qué es importante mantener la documentación actualizada?",
            options: [
              "No es importante",
              "Para que el agente no proponga soluciones que no corresponden al código actual",
              "Solo por estética",
              "Para cumplir con estándares"
            ],
            correctIndex: 1
          },
          {
            id: "docs-q3",
            question: "¿Qué son ADRs?",
            options: [
              "Archivos de código",
              "Architecture Decision Records - documentación de decisiones de arquitectura",
              "Una herramienta de testing",
              "Un tipo de base de datos"
            ],
            correctIndex: 1
          }
        ]
      }
    },
    {
      id: "prompts",
      title: "Librería de prompts",
      items: [
        {
          label: "PROMPTS.md — conocimiento colectivo",
          body: "Un archivo en el repo donde el equipo documenta los prompts que funcionan bien para tareas frecuentes. No prompts genéricos — prompts específicos al proyecto con el contexto del stack y las convenciones. Cada entrada tiene: nombre de la tarea, el prompt exacto, qué modelo funciona mejor, y notas de uso.\n\nEl valor de este archivo crece con el tiempo: es el conocimiento colectivo de cómo trabajar con el agente en este proyecto específico.",
          references: ["prompts-basics"],
          checks: [
            "PROMPTS.md existe. Ruta A: en repo del equipo con ≥10 prompts. Ruta B: en repo de práctica con ≥5 prompts (y plan para llegar a 10). Evidencia: archivo + índice.",
            "Cubre tareas frecuentes. Ruta A: top 5 tareas reales del equipo. Ruta B: top 5 tareas genéricas (bugfix/refactor/tests/docs/review). Evidencia: mapeo tarea → prompt.",
            "Cada prompt indica condiciones de uso. Ruta A: modelo recomendado si aplica. Ruta B: si no hay elección de modelo, indica “herramientas/inputs necesarios” y “cuándo no usar”. Evidencia: 3 prompts con esa sección.",
            "Proceso de actualización. Ruta A: PR/issue para añadir prompts. Ruta B: regla simple + plantilla de entrada. Evidencia: sección “cómo contribuir” en PROMPTS.md.",
          ],
        },
        {
          label: "Prompts de onboarding de sesión",
          body: "El prompt de inicio es el más importante. Un buen onboarding pone al agente en contexto completo antes de que toque código: lee el AGENTS.md del módulo, revisa los últimos commits relevantes, entiende el estado actual.\n\nEjemplo: 'Lee el AGENTS.md de /services/payments. Con Git MCP revisa los últimos 3 commits en ese módulo. Ahora estás listo para: [tarea específica].' El agente produce código coherente con el proyecto desde el primer mensaje.",
          references: ["prompts-structure"],
          checks: [
            "Tienes 3 prompts de onboarding por tipo de sesión. Ruta A: en PROMPTS.md del equipo. Ruta B: en archivo local/ repo de práctica. Evidencia: 3 prompts (feature/review/debug o docs).",
            "Onboarding es corto y efectivo. Ruta A: ≤30s para iniciar (medido). Ruta B: ≤15 líneas de onboarding (texto). Evidencia: prompt + conteo de líneas.",
            "Comparaste calidad con/sin onboarding. Ruta A: misma tarea con 2 corridas y 3 diferencias. Ruta B: ejercicio equivalente. Evidencia: tabla “sin vs con” + 3 diferencias.",
          ],
        },
        {
          label: "Templates de Spec — SDD",
          body: "SDD (Specification-Driven Development) requiere specs estructuradas antes de implementar. El equipo usa templates en `.project/specs/` para cada tipo de trabajo.\n\nTemplates base (transversales) recomendados:\n- `tasks.md`: tareas pequeñas y verificables (con evidencia).\n- `design.md`: tradeoffs, contratos e interfaces, riesgos y validación.\n- `database.md`: cambios de BD seguros con rollback y verificación.\n\n**Feature Spec** — para features nuevos:\n• Objetivo: qué resuelve y para quién\n• User Stories (formato EARS): WHEN [usuario] [condición] THE SYSTEM SHALL [comportamiento]\n• Criterios de aceptación verificables\n• Stack y restricciones técnicas\n• Edge cases identificados\n• Estimación de riesgo: [bajo|medio|alto]\n• Riesgo principal: [qué podría fallar y cómo mitigarlo]\n\n**API Spec** — para endpoints nuevos:\n• Input: params y body con tipos\n• Output: respuestas posibles por código de estado\n• Validaciones y autenticación\n• Errores posibles\n• Rate limiting esperado\n\n**Migration Spec** — para cambios de schema:\n• Before: schema actual\n• After: nuevo schema\n• Rollback: instrucciones down\n• Impacto en datos existentes\n• Validación pre-ejecución: checklist de verificación\n• Downtime estimado: [sí/no y duración]\n\nUbicación recomendada: `.project/specs/features/`, `.project/specs/apis/`, `.project/specs/migrations/`.",
          references: ["prompts-basics", "sdd-basics", "docs-tasks", "docs-design", "docs-database"],
          checks: [
            "Existe `.project/specs/`. Ruta A: en repo real con subcarpetas. Ruta B: en repo de práctica con subcarpetas. Evidencia: árbol de carpetas.",
            "1 spec completada. Ruta A: feature real. Ruta B: feature de práctica. Evidencia: archivo de spec con criterios de aceptación verificables.",
            "Cuándo usar cada template. Ruta A: guía breve en README. Ruta B: tabla “tipo de trabajo → template”. Evidencia: tabla con 3 filas (feature/api/migration).",
            "Versionado en git. Ruta A: specs en PR/commit. Ruta B: commit local con spec. Evidencia: commit o diff donde se ve la spec versionada.",
            "Existen templates base (`tasks.md`, `design.md`, `database.md`). Evidencia: archivos en `.project/specs/`.",
          ],
        },
      ],
      quiz: {
        passingScore: 90,
        questions: [
          {
            id: "prompts-q1",
            question: "¿Qué es PROMPTS.md?",
            options: [
              "Un archivo de configuración",
              "Un archivo en el repo donde el equipo documenta prompts que funcionan para tareas frecuentes",
              "Un tipo de skill",
              "Una base de datos"
            ],
            correctIndex: 1
          },
          {
            id: "prompts-q2",
            question: "¿Por qué el prompt de onboarding es importante?",
            options: [
              "No es importante",
              "Pone al agente en contexto completo antes de tocar código, produciendo mejores resultados",
              "Solo define el estilo",
              "No afecta la calidad"
            ],
            correctIndex: 1
          },
          {
            id: "prompts-q3",
            question: "¿Qué formato de User Stories se usa en SDD?",
            options: [
              "Descripción libre",
              "WHEN [usuario] [condición] THE SYSTEM SHALL [comportamiento]",
              "Solo título y descripción",
              "No se usan User Stories"
            ],
            correctIndex: 1
          },
          {
            id: "prompts-q4",
            question: "¿Qué debe incluir un template de Feature Spec?",
            options: [
              "Solo el código",
              "Objetivo, User Stories, criterios de aceptación, stack, edge cases",
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
      id: "exam02-q1",
      question: "Tu equipo tiene diferentes necesidades de herramientas por tipo de sesión (frontend, backend, docs). ¿Cómo lo manejas con MCPs?",
      options: [
        "Usar los mismos MCPs siempre",
        "Crear perfiles de MCPs por tipo de sesión documentados en AGENTS.md",
        "Instalar todos los MCPs disponibles",
        "No usar MCPs"
      ],
      correctIndex: 1
    },
    {
      id: "exam02-q2",
      question: "Necesitas que el agente valide specs antes de implementar. ¿Qué herramienta/configuración recomiendas?",
      options: [
        "No hacer validación",
        "Skill SDD con checklist de validación de specs",
        "Solo revisar manualmente",
        "Usar un test automatizado"
      ],
      correctIndex: 1
    },
    {
      id: "exam02-q3",
      question: "Tu equipo necesita un skill específico para debugging de errores en Python. ¿Cómo lo implementas?",
      options: [
        "No es posible crear skills personalizados",
        "Crear un SKILL.md con el proceso de debugging y añadirlo al proyecto",
        "Usar solo skills de terceros",
        "Contratar un desarrollador"
      ],
      correctIndex: 1
    },
    {
      id: "exam02-q4",
      question: "El agente está usando APIs deprecadas. ¿Cómo evitas esto?",
      options: [
        "No se puede evitar",
        "Context7 con la versión correcta de la librería",
        "Usar modelos más nuevos",
        "Escribir la documentación manualmente"
      ],
      correctIndex: 1
    }
  ]
} as const;
