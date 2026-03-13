# Skills

Colección de skills reutilizables para agentes IA. Cada skill es una carpeta con `SKILL.md` y recursos adicionales.

> **Referencia:** Esta plantilla está basada en la [documentación oficial de Claude Code](https://github.com/anthropics/claude-code/tree/main/plugins/plugin-dev/skills/skill-development).

## Estructuras de Directorios

### Minimal (Básico)
Para skills simples que solo requieren documentación.

```
skill-name/
└── SKILL.md
```

### Standard (Recomendado)
Para la mayoría de skills que necesitan referencias y ejemplos.

```
skill-name/
├── SKILL.md
├── references/
│   └── detailed-guide.md
└── examples/
    └── working-example.sh
```

### Complete (Avanzado)
Para skills complejos con múltiples referencias y scripts.

```
skill-name/
├── SKILL.md
├── references/
│   ├── patterns.md
│   └── advanced.md
├── examples/
│   ├── example1.sh
│   └── example2.json
└── scripts/
    └── validate.sh
```

## Agregar un nuevo skill

Cada skill debe incluir un archivo `SKILL.md` con frontmatter YAML y contenido estructurado.

### Frontmatter (Metadatos)

```yaml
---
# OBLIGATORIOS
name: skill-identifier
description: Use this skill when the user asks to "phrase 1", "phrase 2". Include exact phrases that should trigger this skill. Be concrete and specific. Max 1024 chars.

# OPCIONALES
version: 1.0.0
license: MIT
# Para compatibilidad multi-agente
compatibility:
  - Claude Code
  - Cursor
# Restringe herramientas disponibles (para seguridad)
allowed-tools:
  - Read
  - Write
  - Bash
  - Bash(git:*)
---
```

#### Campos de Frontmatter

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|--------------|-------------|
| `name` | string | Sí | Identificador único del skill (kebab-case) |
| `description` | string | Sí | Cuándo activar el skill, incluye frases exactas |
| `version` | string | No | Versión semántica (default: 1.0.0) |
| `license` | string | No | Licencia del skill |
| `compatibility` | array | No | Agentes compatibles |
| `allowed-tools` | string/array | No | Herramientas permitidas |

#### Formatos de allowed-tools

```yaml
# Herramienta única
allowed-tools: Read

# Múltiples (comma-separated)
allowed-tools: Read, Write, Edit

# Múltiples (array)
allowed-tools:
  - Read
  - Write
  - Bash(git:*)

# Con filtro de comandos
allowed-tools: Bash(git:*), Bash(npm:*)
```

### Contenido del SKILL.md

```markdown
---
name: skill-name
description: Use this skill when the user asks to "create a new feature", "add authentication". Include exact phrases that trigger this skill.
version: 1.0.0
license: MIT
compatibility:
  - Claude Code
  - Cursor
allowed-tools:
  - Read
  - Write
  - Bash
---

# Nombre del Skill

## Overview
Breve descripción de qué hace este skill y su propósito.

## When to Use
- Cuándo usar este skill (triggers específicos)
- Casos de uso apropiados
- Incluye frases exactas que activan el skill

## Instructions
Instrucciones detalladas para el agente.
Incluye:
- Pasos a seguir
- Consideraciones importantes
- Best practices

## Examples
Ejemplos de uso en conversación:
- Usuario: "Necesito agregar autenticación"
- Agente: [usa el skill para guiar el proceso]

## Quick Reference
Tabla o bullets para referencia rápida:
- Paso 1: ...
- Paso 2: ...
```

## Recursos adicionales

- **references/**: Documentación detallada, guías técnicas, enlaces a APIs
- **examples/**: Ejemplos de código output, snippets funcionales
- **scripts/**: Scripts ejecutables para validación o automatización

## Skills disponibles

- Coming soon...

---

> **Nota:** Los skills se cargan cuando el agente detecta que la tarea coincide con la descripción. Copia los casos de uso al AGENTS.md de tus proyectos.
