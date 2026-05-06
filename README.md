# agent-kit

Kit para trabajar con agentes de IA en equipos de desarrollo.

---

## Contenido

```
agent-kit/
├── roadmap/          # App interactiva de aprendizaje (React + Vite)
├── mcp/              # Documentación de servidores MCP
├── skills/           # Skills del equipo para agentes IA
├── agents/           # Configuraciones de agentes especializados
├── prompts/          # Librería de prompts reutilizables
├── AGENTS.md         # Guía para agentes IA
├── SECURITY.md       # Guía de seguridad
├── AUDIENCE.md       # Definición de audiencias
├── llms.txt          # Contexto para LLMs
└── DESIGN.md         # Sistema de diseño del roadmap
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

## Documentación para Agentes IA

Este repositorio incluye documentación especializada para que agentes de IA puedan trabajar efectivamente en el proyecto:

- **[AGENTS.md](./AGENTS.md)** — Guía completa para agentes IA (convenciones, reglas, estructura de módulos)
- **[SECURITY.md](./SECURITY.md)** — Manejo de secretos, visibilidad mixta y consideraciones de seguridad
- **[AUDIENCE.md](./AUDIENCE.md)** — Definición de audiencias por módulo (usuarios finales, desarrolladores, agentes IA)
- **[llms.txt](./llms.txt)** — Contexto estructurado para LLMs que interactúan con el repositorio
- **[DESIGN.md](./DESIGN.md)** — Sistema de diseño del roadmap (tokens de color, patrones UI)

---

## Contribuir

Agregar nuevo contenido:

- **mcp**: Crear un archivo `.md` con la documentación del servidor
- **skills**: Crear una carpeta con `SKILL.md` y recursos
- **agents**: Crear una carpeta con `AGENT.md` y configuración
- **prompts**: Crear un archivo `.md` con la plantilla de prompt

Ver el README de cada módulo para más detalles.
