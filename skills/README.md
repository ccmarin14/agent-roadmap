# Skills

Colección de skills reutilizables para agentes IA. Cada skill es una carpeta con `SKILL.md` y recursos adicionales.

## Estructura

```
skills/
├── README.md
├── skill-name/
│   ├── SKILL.md
│   ├── references/
│   ├── examples/
│   └── scripts/
└── ...
```

## Agregar un nuevo skill

Cada skill debe seguir el formato SKILL.md:

```markdown
---
name: [skill-name]
description: [Qué hace el skill y cuándo activarse. Max 1024 chars.]
license: MIT
compatibility:
  - Claude Code
  - Cursor
  - [otros...]
allowed-tools:
  - Bash
  - Read
  - Write
---

# [Nombre del Skill]

## Overview
Breve descripción de qué hace este skill.

## When to Use
- Cuándo usar este skill (triggers específicos)
- Casos de uso apropiados

## Instructions
Instrucciones detalladas para el agente.

## Examples
Ejemplos de uso en conversación.

## Quick Reference
Tabla o bullets para referencia rápida.
```

## Recursos adicionales

- **references/**: Documentación, enlaces a APIs, notas técnicas
- **examples/**: Ejemplos de código output
- **scripts/**: Scripts ejecutables si aplica

## Skills disponibles

- Coming soon...
```

> **Nota:** Los skills se cargan cuando el agente detecta que la tarea coincide con la descripción. Copia los casos de uso al AGENTS.md de tus proyectos.
