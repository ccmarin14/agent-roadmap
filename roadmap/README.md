# Agent Forge — Roadmap de Agentes de IA

Hoja de ruta interactiva para aprender a trabajar con agentes de IA, desde los fundamentos hasta la orquestación multi-agente en un entorno de equipo colaborativo.

---

## ¿Qué es esto?

Agent Forge es una herramienta de aprendizaje autoguiado construida como una app en React. Cubre todo lo necesario para pasar de entender qué es un LLM a ejecutar un pipeline completo de orquestación con agentes especializados trabajando en paralelo.

Cada nivel tiene explicaciones detalladas por tema y un checklist de criterios concretos — avanzas cuando puedes demostrar el aprendizaje, no solo cuando lo has leído.

---

## Roadmap

### Nivel 01 — Fundamentos `1–2 semanas · Individual`

La capa base. Antes de tocar cualquier herramienta, necesitas un modelo mental sólido de con qué estás trabajando.

- **Qué es un LLM** — tokens, ventana de contexto, temperatura, por qué ocurren las alucinaciones
- **Modelos** — Anthropic (Claude Haiku / Sonnet / Opus), OpenAI (GPT-4.1, o-series), Google (Gemini 2.5 Pro), DeepSeek (R1, V3), Qwen (Qwen3-Coder), OpenCode Zen
- **Qué es un agente** — la diferencia entre un chatbot y un agente, el ciclo ReAct, confianza y riesgos
- **IDE y Consola** — OpenCode, Cursor, Windsurf, Claude Code, Gemini CLI, gestión de sesiones, estructura de prompts
- **AGENTS.md** — qué es, estructura mínima viable, convenciones de equipo, contexto de negocio, overrides jerárquicos, ciclo de actualización

---

### Nivel 02 — Herramientas de equipo `2–4 semanas · Equipo pequeño (2–5)`

La capa donde los flujos individuales se convierten en flujos de equipo.

- **MCP (Model Context Protocol)** — qué es y por qué importa, arquitectura server/client/host, servidores locales vs remotos, los 5 MCPs fundamentales para desarrollo, seguridad, eficiencia de contexto, construir tu propio MCP server
- **Skills** — diferencia entre Skills y MCP, anatomía de un SKILL.md, carga progresiva, skills esenciales para desarrollo, scope de proyecto vs global, crear skills propios del equipo
- **Documentación técnica** — mantener docs sincronizados con Context7, documentación interna del proyecto y ADRs, documentación generada por el agente
- **Librería de prompts** — PROMPTS.md como conocimiento colectivo, prompts de onboarding de sesión, prompts por tipo de tarea

---

### Nivel 03 — Automatización `1–2 meses · Equipo de 3–8`

El agente deja de ser una herramienta de consulta y se convierte en parte del pipeline de desarrollo.

- **Hooks y scripts** — review pre-commit, changelog post-merge, scripts CLI compartidos, hooks del ciclo de vida de Skills
- **Flujos automatizados** — pipeline Issue → PR, flujo de migraciones de base de datos, sesiones especializadas por propósito
- **AGENTS.md avanzado** — patrón Plan-Act-Reflect, overrides por squad o módulo

---

### Nivel 04 — Orquestación `2–3 meses · Equipo de 5–15`

Múltiples agentes especializados trabajando en coordinación. El orquestador gestiona el ciclo de vida completo de un feature.

- **Agentes especializados** — el principio de especialización, agente de tests, agente de code review, agente de documentación, agente de seguridad
- **Coordinación** — el patrón orquestador (contexto limpio siempre), protocolo de handoff entre agentes, pipeline completo de feature, `context:fork` para análisis aislados

---

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

---

## Estructura del proyecto

```
src/
├── data/
│   ├── index.js          # Exporta el array LEVELS
│   ├── level01.js        # Datos del Nivel 01
│   ├── level02.js        # Datos del Nivel 02
│   └── levels0304.js     # Datos de Niveles 03 y 04
├── components/
│   ├── TopBar.jsx        # Barra de progreso global y selector de tabs
│   ├── Sidebar.jsx       # Navegación por niveles y secciones
│   ├── SectionHeader.jsx # Tabs de sección (solo en vista de contenido)
│   ├── ContentView.jsx   # Acordeones con checklist integrado
│   └── ProgressView.jsx  # Tarjetas de progreso y checklist completo
├── hooks/
│   └── useProgress.js    # Estado de checks y cálculo de estadísticas
├── theme.js              # Tokens de diseño
├── App.jsx               # Componente raíz
├── main.jsx              # Entry point
└── index.css             # Estilos globales
```

---

## Stack

- React 18
- Vite 5
- DM Mono — Google Fonts
