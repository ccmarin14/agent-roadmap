# Agents

Colección de agentes IA especializados para diferentes tareas. Formato compatible con AGENTS.md.

## Estructura

```
agents/
├── README.md
├── agent-name/
│   ├── AGENT.md
│   └── ...
└── ...
```

## Agregar un nuevo agent

Cada agent debe seguir el formato:

```markdown
---
name: [agent-name]
description: Rol y especialización del agente
tools:
  - [herramientas que puede usar]
---

# [Nombre del Agent]

## Role
Descripción del rol del agente.

## Expertise
- Áreas de especialización
- Tecnologías que domina

## Commands
Comandos que el agente puede ejecutar.

## Workflow
Flujo de trabajo típico.

## Code Style
Convenciones de código que sigue.

## Testing
Requisitos de testing.

## Project Knowledge
- Tech stack
- Estructura del proyecto
- Convenciones del equipo
```

## Cuándo usar

- `@agent-name` - Invocar al agente directamente en conversación
- Referenciar en AGENTS.md de proyectos

## Agents disponibles

- Coming soon...
```

> **Nota:** Copia la configuración del agente al AGENTS.md de tus proyectos para que el agente se use automáticamente en esos escenarios.
