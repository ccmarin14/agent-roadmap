# Plantillas para Skills

Esta referencia contiene las plantillas estándar para crear diferentes tipos de skills.

---

## Plantilla Minimal

Para skills simples que solo requieren documentación básica.

```markdown
---
name: skill-name
description: Use this skill when the user asks to "phrase 1", "phrase 2". Include exact phrases that trigger this skill.
version: 1.0.0
license: MIT
---

# Nombre del Skill

## Overview
Breve descripción de qué hace este skill.

## When to Use
- Trigger 1
- Trigger 2

## Instructions
Instrucciones detalladas.

## Quick Reference
- Punto 1
- Punto 2
```

---

## Plantilla Standard

Para skills que necesitan referencias y ejemplos.

### SKILL.md
```markdown
---
name: skill-name
description: Use this skill when the user asks to "phrase 1", "phrase 2". Include exact phrases that trigger this skill.
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
Breve descripción de qué hace este skill.

## When to Use
- Trigger 1: cuando el usuario pide...
- Trigger 2: cuando el usuario necesita...

## Instructions
Instrucciones detalladas para el agente.

## Examples
- Usuario: "Necesito hacer X"
- Agente: [cómo responde]

## Quick Reference
| Comando | Descripción |
|---------|-------------|
| Step 1 | Descripción |
| Step 2 | Descripción |
```

### references/detailed-guide.md
```markdown
# Guía Detallada

## Sección 1
Contenido detallado...

## Sección 2
Contenido adicional...
```

### examples/example.sh
```bash
#!/bin/bash
# Ejemplo de script
echo "Ejemplo"
```

---

## Plantilla Complete

Para skills complejos con múltiples recursos.

### SKILL.md
```markdown
---
name: skill-name
description: Use this skill when the user asks to "phrase 1", "phrase 2". Include exact phrases that trigger this skill.
version: 1.0.0
license: MIT
compatibility:
  - Claude Code
  - Cursor
allowed-tools:
  - Read
  - Write
  - Bash
  - Grep
  - Glob
---

# Nombre del Skill

## Overview
Descripción completa del propósito del skill.

## When to Use
- Cuando el usuario pide X
- Cuando el usuario necesita Y
- En contextos de Z

## Instructions
### Paso 1: Preparación
...

### Paso 2: Ejecución
...

### Paso 3: Validación
...

## Edge Cases
- Caso 1: cómo manejar
- Caso 2: cómo manejar

## Examples
### Ejemplo 1
**Input:** El usuario dice...
**Output:** El agente responde...

### Ejemplo 2
**Input:** El usuario dice...
**Output:** El agente responde...

## Quick Reference
1. Verificar...
2. Ejecutar...
3. Validar...
```

### references/patterns.md
```markdown
# Patterns Comunes

## Pattern 1
Descripción y ejemplo...

## Pattern 2
Descripción y ejemplo...
```

### references/advanced.md
```markdown
# Técnicas Avanzadas

## Técnica 1
Descripción detallada...
```

### examples/example1.sh
```bash
#!/bin/bash
# Ejemplo funcional
```

### examples/example2.json
```json
{
  "example": "JSON output"
}
```

### scripts/validate.sh
```bash
#!/bin/bash
# Script de validación
```

---

## Trigger Phrases (Frases de Activación)

Ejemplos de frases que deben incluirse en la descripción:

- "create a new skill"
- "generate a skill template"
- "help me build a skill"
- "add authentication to"
- "create a component"
- "set up testing for"
- "migrate database"
- "refactor this code"

---

## Frontmatter fields Reference

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|--------------|-------------|
| `name` | string | Sí | Identificador (kebab-case) |
| `description` | string | Sí | Triggers + propósito |
| `version` | string | No | Semver (default: 1.0.0) |
| `license` | string | No | Licencia |
| `compatibility` | array | No | Agentes compatibles |
| `allowed-tools` | array | No | Herramientas permitidas |
