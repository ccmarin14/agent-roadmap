# agent-kit

Kit para trabajar con agentes de IA en equipos de desarrollo.

---

## Contenido

```
agent-kit/
├── roadmap/          # App interactiva de aprendizaje (React + Vite)
├── mcp/              # Documentación de servidores MCP
├── skills/           # Plantilla para skills del equipo
├── agents/           # Plantilla para agentes especializados
└── prompts/         # Plantilla para librería de prompts
```

---

## Estado del proyecto

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| roadmap | ✅ Listo | App React con 4 niveles de aprendizaje |
| mcp | ✅ Listo | Documentación de servidores |
| skills | ✅ Listo | Skills personalizados |
| agents | 🔄 Plantilla | Estructura lista, sin agentes |
| prompts | 🔄 Plantilla | Estructura lista, sin prompts |

---

## Roadmap (listo)

App web interactiva que guía el aprendizaje de agentes de IA en 4 niveles progresivos. Cada tema tiene contenido detallado y un checklist de criterios concretos para saber cuándo se domina.

**Niveles:**
- **01 Fundamentos** — LLMs, modelos (Claude, GPT, Gemini, DeepSeek, Qwen), qué es un agente, IDE y consola, AGENTS.md
- **02 Herramientas de equipo** — MCP, Skills, documentación técnica, librería de prompts
- **03 Automatización** — hooks, scripts, flujos automatizados, AGENTS.md avanzado
- **04 Orquestación** — agentes especializados, orquestador, pipeline completo de feature

### Demo online: 
https://test-web.master2000.net/agentforge/

### Para ejecutar la app:
```bash
cd roadmap
npm install
npm run dev
```

Abre `http://localhost:5173`.

→ Ver [roadmap/README.md](./roadmap/README.md)

---

## mcp

Documentación de servidores MCP disponibles para usar en proyectos.

Cada archivo es una guía de configuración y uso para un servidor específico.

→ Ver [mcp/README.md](./mcp/README.md)

---

## skills

Skills personalizados que reflejan las decisiones y patrones del equipo.

La carpeta contiene la estructura y plantillas para crear skills. Los skills se copian manualmente a cada proyecto.

→ Ver [skills/README.md](./skills/README.md)

---

## agents

Configuraciones de agentes especializados organizados por tipo de tarea.

La carpeta contiene la estructura y plantillas para definir agentes. Cada agente incluye su propio AGENT.md con instrucciones, herramientas disponibles y workflow.

→ Ver [agents/README.md](./agents/README.md)

---

## prompts

Librería de prompts documentados por tipo de tarea: features, debugging, code review, refactor, generación de tests, migraciones, documentación.

La carpeta contiene la estructura y plantillas para crear prompts.

→ Ver [prompts/README.md](./prompts/README.md)

---

## Por dónde empezar

Si eres nuevo en el equipo o en el trabajo con agentes, empieza por el roadmap:

```bash
cd roadmap
npm install
npm run dev
```

---

## Contribuir

Agregar nuevo contenido:

- **mcp**: Crear un archivo `.md` con la documentación del servidor
- **skills**: Crear una carpeta con `SKILL.md` y recursos
- **agents**: Crear una carpeta con `AGENT.md` y configuración
- **prompts**: Crear un archivo `.md` con la plantilla de prompt

Ver el README de cada módulo para más detalles.
