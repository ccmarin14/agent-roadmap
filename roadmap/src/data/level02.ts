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
            "Puedes explicar qué es un MCP server, un MCP client y un MCP host",
            "Entiendes por qué MCP resolvió un problema de integración real",
            "Instalaste tu primer MCP server en tu herramienta de trabajo",
          ],
        },
        {
          label: "Arquitectura: servers, clients, hosts",
          body: "MCP Host: la app que orquesta todo (OpenCode, Claude Code, Cursor). MCP Client: el componente dentro del host que habla con los servers. MCP Server: el proceso que expone las herramientas al agente. Puede ser local (corre en tu máquina via stdio, rápido, sin red) o remoto (corre en internet via HTTP, se autentica con OAuth 2.1, compartible entre el equipo).\n\nPara equipos: herramientas de desarrollo locales en cada máquina, servicios compartidos (GitHub, Slack, DB) como servidores remotos.",
          references: ["mcp-basics"],
          checks: [
            "Entiendes la diferencia entre MCP local (stdio) y MCP remoto (HTTP + OAuth)",
            "Sabes cuándo conviene un servidor local vs uno remoto para cada herramienta",
            "Tienes al menos un MCP local y uno remoto configurados",
          ],
        },
        {
          label: "MCPs de desarrollo fundamentales",
          body: "Los 5 que más valor dan al inicio del flujo:\n\n• Filesystem: el agente lee/escribe archivos con rutas controladas. Configura siempre con rutas explícitas permitidas.\n• Git MCP: commits semánticos, leer diffs, entender historial antes de proponer cambios.\n• GitHub MCP oficial: leer issues, crear PRs, comentar, integración con el repo remoto.\n• Sequential Thinking: el agente construye un plan de razonamiento antes de actuar. Reduce errores en tareas grandes.\n• Fetch: consulta cualquier URL — changelogs, docs, APIs.",
          references: ["mcp-servers"],
          checks: [
            "Tienes instalados al menos 3 de los 5 MCPs fundamentales",
            "Filesystem MCP tiene rutas de acceso limitadas (no acceso total al sistema de archivos)",
            "Usaste Git MCP para que el agente lea el historial antes de proponer un cambio",
          ],
        },
        {
          label: "Seguridad con MCPs — lo que no se puede ignorar",
          body: "Los MCP tools ejecutan código arbitrario en tu máquina. Riesgos reales que existen hoy: prompt injection via descripciones de herramientas maliciosas, permisos excesivos, tool poisoning donde un servidor comprometido inyecta instrucciones al agente.\n\nBuenas prácticas: usa solo servidores de fuentes verificadas (repos activos, empresas conocidas), otorga permisos mínimos en la configuración, revisa siempre qué herramientas tiene disponibles el agente antes de darle tareas críticas.",
          references: ["mcp-basics"],
          checks: [
            "Revisaste los permisos de cada MCP instalado y ajustaste al mínimo necesario",
            "El equipo tiene una lista acordada de MCPs permitidos en el proyecto",
            "Entiendes cómo verificar si un MCP server es de una fuente confiable",
          ],
        },
        {
          label: "Eficiencia de contexto — no instalar todo",
          body: "Cada MCP instalado ocupa espacio de contexto con sus definiciones de herramientas. Cargar 20 MCPs en cada sesión desperdicia contexto útil para el código.\n\nSolución: perfiles de MCPs por tipo de sesión. Sesión de frontend: Filesystem + Git + Context7. Sesión de backend: Filesystem + Git + DB MCP + Sequential Thinking. Documenta estos perfiles en el AGENTS.md. El agente trabaja mejor con menos herramientas más relevantes.",
          references: ["mcp-basics"],
          checks: [
            "Tienes perfiles de MCPs documentados por tipo de sesión",
            "No cargas más de 5-6 MCPs en una misma sesión",
            "Documentaste los perfiles en el AGENTS.md para que el equipo los use igual",
          ],
        },
        {
          label: "Construir tu propio MCP server",
          body: "Cuando ningún MCP existente cubre tu caso de uso, construyes el tuyo. FastMCP es el framework más simple (Python). Principios de diseño: un MCP server = una responsabilidad clara. Las herramientas deben estar optimizadas para objetivos del usuario, no para reflejar todos los endpoints de tu API interna. Las descripciones de parámetros reducen errores del agente — escríbelas bien.\n\nCaso típico: MCP para tu sistema de diseño interno, tu base de conocimiento, o tu API privada.",
          references: ["mcp-servers"],
          checks: [
            "Identificaste al menos un caso de uso interno que justifica un MCP propio",
            "Creaste un MCP server simple con FastMCP o el SDK oficial",
            "El MCP propio está documentado y el equipo puede instalarlo desde el repo",
          ],
        },
      ],
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
            "Puedes explicar la diferencia entre Skill y MCP sin confundirlos",
            "Entiendes qué es carga progresiva (name+desc siempre, SKILL.md solo cuando activa, scripts solo si necesita)",
            "Instalaste tu primer skill con: npx skills add <nombre>",
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
            "Tienes instalados al menos 3 de los skills esenciales",
            "Usaste Systematic Debugging en un bug real y seguiste el proceso del skill",
            "El agente genera código sin errores de manejo de excepciones con Error Handling Patterns activo",
          ],
        },
        {
          label: "Scope de instalación en equipo",
          body: "Proyecto (default): ./<agent>/skills/ — commiteable al repo, compartido con todo el equipo. Global (-g): ~/.claude/skills/ — personal, disponible en todos tus proyectos pero no en el repo.\n\nRegla para equipos: skills que reflejan decisiones del equipo van commiteados al proyecto. Skills de preferencia personal van en global. El README del proyecto documenta qué skills están y cuándo activarlos.",
          references: ["skills-basics"],
          checks: [
            "Los skills del equipo están en el repo (commiteados, aparecen en git status)",
            "Los skills personales están en el scope global y no aparecen en el repo",
            "El README o AGENTS.md documenta los skills disponibles en el proyecto",
          ],
        },
        {
          label: "Crear tu propio skill de equipo",
          body: "Crea un skill cuando tienes un proceso repetitivo, cuando el agente comete el mismo error en una tarea específica, o cuando tienes conocimiento de dominio que no existe en skills.sh.\n\nLa description del frontmatter es lo más crítico: si es vaga el skill nunca se activa. Sé explícito: lista los casos en que debe activarse. Testa la activación con 5 prompts distintos antes de commitear. Itera el skill como si fuera código: PR, changelog, revisión periódica.",
          references: ["skills-basics"],
          checks: [
            "Creaste al menos un skill propio para una tarea frecuente del equipo",
            "El skill se activa automáticamente en los contextos correctos sin pedírselo al agente",
            "Otro miembro del equipo usó el skill exitosamente sin tu guía",
          ],
        },
      ],
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
            "Context7 está configurado y se activa en sesiones de código",
            "Verificaste que el agente usa la documentación de la versión correcta de tus librerías",
            "El equipo dejó de corregir al agente por usar APIs deprecadas",
          ],
        },
        {
          label: "Documentación interna del proyecto",
          body: "El agente puede consumir la documentación del proyecto como contexto: arquitectura, decisiones de diseño, diagramas de flujo, guías de contribución. Formatos más efectivos: Markdown en el repo (el agente puede leerlos con Filesystem MCP), páginas de Notion o Confluence accesibles via MCP de Fetch.\n\nConvención para equipos: carpeta /docs en el repo con ADRs (Architecture Decision Records), guía de contribución, y diagramas. El agente los lee antes de proponer cambios de arquitectura.",
          references: ["docs-context7"],
          checks: [
            "Existe una carpeta /docs en el repo con documentación técnica actualizada",
            "El agente lee la documentación relevante antes de proponer cambios de arquitectura",
            "Los ADRs (decisiones de arquitectura) están documentados en formato estándar",
          ],
        },
        {
          label: "Documentación generada por el agente",
          body: "El agente puede mantener la documentación actualizada automáticamente: JSDoc para funciones y clases, README de módulos, changelogs, diagramas de arquitectura en texto (Mermaid). La regla: la documentación debe generarse como parte del flujo de desarrollo, no después.\n\nFlujo recomendado: al completar un feature, el agente actualiza el README del módulo afectado y genera/actualiza el JSDoc de las funciones modificadas antes del PR.",
          references: ["docs-context7"],
          checks: [
            "El JSDoc del proyecto se mantiene actualizado sin esfuerzo manual del equipo",
            "Los README de módulos se actualizan automáticamente al completar features",
            "El equipo dejó de tener documentación que no corresponde al código actual",
          ],
        },
      ],
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
            "Existe PROMPTS.md en el repo con al menos 10 prompts documentados",
            "Los prompts cubren las tareas más frecuentes del equipo",
            "Cada prompt tiene nota del modelo recomendado para esa tarea",
            "El equipo actualiza PROMPTS.md cuando descubre un prompt nuevo que funciona bien",
          ],
        },
        {
          label: "Prompts de onboarding de sesión",
          body: "El prompt de inicio es el más importante. Un buen onboarding pone al agente en contexto completo antes de que toque código: lee el AGENTS.md del módulo, revisa los últimos commits relevantes, entiende el estado actual.\n\nEjemplo: 'Lee el AGENTS.md de /services/payments. Con Git MCP revisa los últimos 3 commits en ese módulo. Ahora estás listo para: [tarea específica].' El agente produce código coherente con el proyecto desde el primer mensaje.",
          references: ["prompts-basics"],
          checks: [
            "Tienes al menos 3 prompts de onboarding para los tipos de sesión más comunes",
            "El onboarding tarda menos de 30 segundos antes de que el agente empiece a trabajar",
            "Comparaste la calidad del código producido con onboarding vs sin él",
          ],
        },
        {
          label: "Prompts por tipo de tarea",
          body: "Categorías que cubren la mayoría del trabajo diario:\n\n• Nuevo feature: contexto del módulo + criterios de aceptación + restricciones técnicas.\n• Debugging: contexto del error + stack trace + comportamiento esperado vs actual.\n• Code review: instrucción de rol + criterios de calidad + qué NO modificar.\n• Refactor: alcance exacto + qué mantener + qué mejorar.\n• Generación de tests: cobertura esperada + patrones de test del proyecto.\n\nUn buen prompt de review siempre incluye: 'actúa como reviewer senior, no modifiques código directamente'.",
          references: ["prompts-basics"],
          checks: [
            "Tienes prompts documentados para al menos 4 de los 5 tipos de tarea",
            "Los prompts de review nunca producen modificaciones directas de código",
            "El equipo usa los prompts del PROMPTS.md en lugar de escribirlos desde cero cada vez",
          ],
        },
      ],
    },
  ],
} as const;
