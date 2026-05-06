# Mapa de señales — Cuándo recomendar cada archivo

Esta referencia guía la lógica de recomendación del Paso 3 de la skill.
Para cada archivo: las señales que lo justifican y las que argumentan en contra.

---

## README.md

Evaluar siempre este primero. Es la línea de base.

**Recomendar mejorarlo si:**
- No existe
- Está desactualizado (referencias a pasos de instalación, tecnología o equipo antiguo)
- No explica cómo instalar y ejecutar el proyecto
- Falta guía de contribución en un proyecto de equipo

**No crear desde cero si:** Ya existe y cubre lo básico. Solo señalar las carencias.

**Rol único:** Es para humanos Y para agentes. Es el punto de entrada para ambos.
Un buen README reduce la necesidad de algunos otros archivos.

---

## AGENTS.md

**Recomendar (Nivel 1) si:**
- Se usan agentes de IA activamente para escribir código, generar archivos o automatizar tareas en el repo
- El repo tiene una configuración no obvia (gestor de paquetes específico, hooks de pre-commit, comandos de test)
- Varias personas o agentes trabajan en él y la consistencia importa
- Hay carpetas o archivos que un agente nunca debería tocar

**Recomendar (Nivel 2) si:**
- El usuario planea usar agentes de IA pronto
- El repo tiene CI/CD o automatización que un agente podría romper

**No recomendar si:**
- Es un side project en solitario sin uso de agentes
- El README ya cubre todo el contexto operativo

**Contenido clave a generar:**
- Gestor de paquetes y comando de instalación exacto
- Comandos de build, test, lint
- Directorios/archivos protegidos
- Convenciones de commits y PRs
- Fallos conocidos (ej: "no ejecutar migraciones sin backup previo")

---

## AUDIENCE.md

**Recomendar (Nivel 1) si:**
- El proyecto tiene copy, UI o contenido orientado a usuarios
- Se usa IA para generar textos, landing pages, emails, docs o flujos de onboarding
- El producto se dirige a una audiencia específica y no obvia

**Recomendar (Nivel 2) si:**
- Hay un sitio de marketing, README orientado a usuarios externos, o docs públicas
- Varios colaboradores escriben copy con tono inconsistente

**No recomendar si:**
- Es un servicio de backend, CLI o librería sin contenido orientado a usuarios finales
- Es una herramienta interna usada solo por el equipo que la construye
- La audiencia es "todo el mundo" (esto es casi siempre señal de que el archivo no será útil)

**Contenido clave a generar:**
- Audiencia principal (descripción conductual y específica — no demográfica)
- Qué saben ya y qué no saben
- Qué intentan conseguir
- Qué lenguaje/tono encaja vs. qué evitar
- Quién NO es la audiencia

---

## llms.txt

**Recomendar (Nivel 1) si:**
- El proyecto tiene documentación pública repartida en múltiples páginas
- Es un SDK, API o librería que los developers usarán con asistencia de IA
- El sitio de docs tiene mucho ruido (changelogs, versiones archivadas, páginas generadas)

**Recomendar (Nivel 2) si:**
- Es un proyecto open source con sitio de documentación

**No recomendar si:**
- El proyecto es privado o interno
- No hay docs públicas
- Toda la documentación cabe en uno o dos archivos (llms.txt solo los duplicaría)

**Contenido clave a generar:**
- Nombre del proyecto y descripción en una línea
- Lista ordenada de las páginas de documentación más importantes con anotaciones breves
- Qué omitir (changelogs, contenido deprecated, referencias de API auto-generadas si hay un mejor punto de entrada)

---

## OpenAPI

**Recomendar (Nivel 1) si:**
- El proyecto expone endpoints HTTP consumidos por otros servicios o por personas
- Se usan agentes de IA para escribir clientes de API, tests o integraciones
- No existe documentación de la API

**Recomendar (Nivel 2) si:**
- Hay documentación de la API pero es informal (sección en README, Notion, etc.)

**No recomendar si:**
- No hay API HTTP (librería, CLI, frontend puro)
- La API ya está documentada con OpenAPI

**Nota:** No generar la spec completa — requiere conocimiento profundo del código.
En su lugar, generar la estructura y el scaffold, e indicar qué endpoints deben documentarse.
Si el usuario tiene archivos de rutas disponibles, ofrecer leerlos y generar la spec desde el código.

---

## ADR (Architecture Decision Records)

**Recomendar (Nivel 1) si:**
- El equipo tiene más de 2 personas
- El proyecto lleva 6+ meses con decisiones arquitectónicas con peso propio
- Hay decisiones técnicas que alguien nuevo podría cuestionar sin el contexto adecuado
- Se usan agentes de IA que podrían proponer "mejoras" reabriendo debates ya cerrados

**Recomendar (Nivel 2) si:**
- Proyecto en solitario pero creciendo rápido, o con planes de incorporar colaboradores

**No recomendar si:**
- Proyecto nuevo sin decisiones significativas tomadas aún
- Side project en solitario con poca probabilidad de mantenerse a largo plazo
- Todas las decisiones arquitectónicas son obvias o convencionales

**Contenido clave a generar:**
- Plantilla ADR (el estándar es: Título, Estado, Contexto, Decisión, Consecuencias)
- 1–2 ADRs de ejemplo basados en lo que se conoce del proyecto
- Ubicación sugerida: /docs/adr/ o /adr/

---

## SECURITY.md

**Recomendar (Nivel 1) si:**
- Proyecto open source (el ecosistema lo espera)
- Maneja autenticación, datos de usuarios, pagos u otra información sensible
- Tiene expectativas de bug bounty o divulgación responsable pública

**Recomendar (Nivel 2) si:**
- Proyecto interno con datos sensibles o integraciones delicadas
- Proyecto de equipo donde los incidentes de seguridad deben gestionarse de forma privada, no por issues públicos

**No recomendar si:**
- Script personal o side project sin usuarios y sin datos sensibles
- Sitio estático o proyecto de documentación sin superficie de ataque

**Contenido clave a generar:**
- Cómo reportar una vulnerabilidad (canal privado: email, security advisory, etc.)
- Qué está en scope y qué no
- Versiones con soporte (si aplica)
- Tiempo de respuesta esperado

---

## DESIGN.md

**Recomendar (Nivel 1) si:**
- Se usa IA para generar componentes de UI, landing pages, emails o contenido visual
- El proyecto tiene un sistema de diseño o marca establecida
- La inconsistencia visual es un problema real

**Recomendar (Nivel 2) si:**
- Hay frontend pero sin uso actual de IA — puede llegar pronto
- El proyecto tiene design tokens o un sistema Figma no codificado aún

**No recomendar si:**
- Sin UI orientada a usuarios (backend, CLI, librería)
- La UI se genera al 100% desde un sistema de diseño sin componentes personalizados
- No hay guías de marca ni están planeadas

**Contenido clave a generar:**
- Principios visuales (no "que sea bonito" — cosas concretas como "denso sobre espacioso", "sin ilustraciones decorativas")
- Sistema de color y tipografía, o referencia a dónde vive
- Convenciones de componentes
- Patrones a evitar
- Baseline de accesibilidad
- Ejemplos de bien vs. mal (aunque sea descritos con palabras)

---

## Configuración MCP

**Recomendar (Nivel 1) si:**
- El proyecto usa explícitamente agentes compatibles con MCP
- Hay herramientas externas (bases de datos, CRMs, APIs) a las que el agente necesita acceder

**Recomendar (Nivel 2) si:**
- El proyecto avanza hacia la automatización de flujos complejos con agentes

**No recomendar si:**
- Sin tooling MCP en uso ni planeado
- El proyecto no necesita acceso a herramientas externas más allá del propio código

**Nota:** La configuración MCP es a menudo específica de herramienta en su implementación.
Centrarse en documentar qué herramientas externas necesita el proyecto y dejar que el usuario
configure el formato concreto del servidor MCP para su toolchain.
