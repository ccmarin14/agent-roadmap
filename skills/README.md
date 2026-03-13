# Skills

Colección de skills reutilizables para agentes IA. Cada skill es una carpeta con `SKILL.md` y recursos adicionales.

> **Referencia:** Esta plantilla está basada en la [documentación oficial de Claude Code](https://github.com/anthropics/claude-code/tree/main/plugins/plugin-dev/skills/skill-development).

## Estructuras de Directorios

### Minimal (Básico)
Para skills simples que solo requieren documentación básica.
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
│   └── guide.md
└── examples/
    └── samples.md
```

### Complete (Avanzado)
Para skills complejos con múltiples referencias, ejemplos y scripts.
```
skill-name/
├── SKILL.md
├── references/
│   ├── guide.md
│   └── advanced.md
├── examples/
│   └── samples.md
└── scripts/
    └── validate.sh
```

---

## Plantilla de SKILL.md

### Frontmatter (Metadatos)

```yaml
---
# OBLIGATORIOS
name: skill-identifier
description: Use this skill when the user asks to "phrase 1", "phrase 2". Include exact trigger phrases. Be concrete and specific. Max 1024 chars.

# OPCIONALES
version: 1.0.0
license: MIT
compatibility:
  - Claude Code
  - Cursor
  - OpenCode
allowed-tools:
  - Read
  - Write
  - Bash
  - Grep
  - question
---
```

### Contenido Estructurado

```markdown
---
name: skill-name
description: Use this skill when the user asks to "trigger phrase 1", "trigger phrase 2". Include exact phrases that trigger this skill.
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
Puede mencionar skills relacionadas.

## When to Use
- Cuando el usuario pide "trigger 1"
- Cuando el usuario necesita "trigger 2"
- Cuando el usuario pregunta "trigger 3"

## Instructions

### Paso 1: [Nombre del paso]
Instrucciones detalladas...

### Paso 2: [Nombre del paso]
Más instrucciones...

[Agregar tantos pasos como sea necesario]

## Examples

**Usuario**: "Ejemplo de frase del usuario"
**Agente**: [Cómo responde el agente usando la skill]

## Quick Reference

| Paso | Acción |
|------|--------|
| 1 | Acción del paso 1 |
| 2 | Acción del paso 2 |

## Convenciones
- Formato de nombres
- Estilo de código
- Reglas específicas del dominio

## Notas
- Información adicional importante
- Relacionado con otras skills si aplica
```

---

## Mejores Prácticas

### Al crear una skill

1. **Descripción con triggers específicos**
   - Incluir frases exactas que activarán la skill
   - Ser concreto, no vago

2. **Instrucciones paso a paso**
   - Cada paso debe ser accionable
   - Incluir comandos de ejemplo
   - Agregar tablas de decisión cuando aplique

3. **Detección de contexto**
   - Antes de preguntar, explorar el codebase
   - Usar `find`, `grep` para detectar stack
   - Detectar convenciones del proyecto

4. **Examples realistas**
   - Incluir ejemplos de conversación real
   - Mostrar input del usuario y output del agente

5. **Quick Reference**
   - Tabla resumen de pasos
   - Referencia rápida para usuarios avanzados

### Estructura recomendada

| Sección | Propósito | Obligatoria |
|---------|-----------|-------------|
| Overview | Qué hace la skill | Sí |
| When to Use | Cuándo activarse | Sí |
| Instructions | Pasos detallados | Sí |
| Examples | Ejemplos de uso | Recomendado |
| Quick Reference | Resumen | Recomendado |
| Convenciones | Reglas del dominio | Opcional |
| Notas | Información adicional | Opcional |

---

## Recursos adicionales

- **references/**: Documentación detallada, guías técnicas, referencias de APIs
- **examples/**: Ejemplos de código output, casos de uso completos
- **scripts/**: Scripts ejecutables para validación o automatización

---

## Skills disponibles

| Skill | Descripción | Estructura |
|-------|-------------|------------|
| [code-review](./code-review/) | Análisis exhaustivo de código: bugs, seguridad, performance, arquitectura | Standard |
| [feature-docs](./feature-docs/) | Documentar features del proyecto | Standard |
| [skill-builder](./skill-builder/) | Wizard para crear nuevas skills | Standard |

---

## Usar Skill Builder

Para crear una nueva skill, usa el wizard interactivo:

```
> create a new skill
> skill wizard
> guíame a crear una skill
```

El wizard guiará paso a paso:
1. Propósito
2. Nombre
3. Triggers
4. Estructura (con sugerencia automática)
5. Herramientas
6. Compatibilidad

---

> **Nota:** Los skills se cargan cuando el agente detecta que la tarea coincide con la descripción. Copia los casos de uso al AGENTS.md de tus proyectos.
