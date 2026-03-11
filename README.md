# agent-kit

Kit completo para trabajar con agentes de IA en equipos de desarrollo. Contiene todo lo necesario para pasar de cero a orquestación: roadmap interactivo, servidores MCP, skills, configuraciones de agentes y librería de prompts.

---

## Contenido del repositorio

```
agent-kit/
├── roadmap/          # App interactiva de aprendizaje (React + Vite)
├── mcp/              # Servidores MCP propios del equipo
├── skills/           # Skills personalizados para el agente
├── agents/           # Configuraciones AGENTS.md por proyecto y módulo
└── prompts/          # Librería de prompts del equipo por tipo de tarea
```

---

## roadmap

Aplicación web interactiva que guía el aprendizaje de agentes de IA en 4 niveles progresivos. Cada tema tiene contenido detallado y un checklist de criterios concretos para saber cuándo se domina.

**Niveles:**
- **01 Fundamentos** — LLMs, modelos (Claude, GPT, Gemini, DeepSeek, Qwen), qué es un agente, IDE y consola, AGENTS.md
- **02 Herramientas de equipo** — MCP, Skills, documentación técnica, librería de prompts
- **03 Automatización** — hooks, scripts, flujos automatizados, AGENTS.md avanzado
- **04 Orquestación** — agentes especializados, orquestador, pipeline completo de feature

→ Ver [roadmap/README.md](./roadmap/README.md)

---

## mcp

Servidores MCP desarrollados internamente para casos de uso que no cubre ningún servidor público. Cada servidor tiene su propio directorio con código, documentación y guía de instalación.

---

## skills

Skills personalizados que reflejan las decisiones y patrones del equipo. Commiteados al repositorio para que todos los miembros los tengan disponibles automáticamente al clonar.

Instalación en un proyecto:
```bash
npx skills add ./skills/<nombre-del-skill>
```

---

## agents

Configuraciones AGENTS.md organizadas por tipo de proyecto y módulo. Sirven como punto de partida para nuevos proyectos o como referencia para actualizar configuraciones existentes.

---

## prompts

Librería de prompts documentados por tipo de tarea: features, debugging, code review, refactor, generación de tests, migraciones, documentación. Cada entrada incluye el prompt exacto, el modelo recomendado y notas de uso.

---

## Por dónde empezar

Si eres nuevo en el equipo o en el trabajo con agentes, empieza por el roadmap:

```bash
cd roadmap
npm install
npm run dev
```

Abre `http://localhost:5173` y sigue los niveles en orden.

---

## Contribuir

Cada carpeta tiene su propio flujo de contribución, pero la regla general aplica a todo el repositorio: los cambios se proponen via PR, se revisan en equipo y se documentan. El conocimiento que funciona se comparte — si encontraste un prompt que da mejores resultados, un skill que resuelve un problema frecuente o un patrón de AGENTS.md que mejoró la calidad del agente, agrégalo aquí.