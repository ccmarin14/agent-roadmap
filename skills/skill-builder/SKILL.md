---
name: skill-builder
description: Use this skill when the user asks to "create a new skill", "generate a skill template", "help me build a skill", "wizard for skills", "guíame a crear una skill". This skill provides an interactive step-by-step wizard that asks questions and waits for user responses at each step.
version: 1.0.0
license: MIT
compatibility:
  - Claude Code
  - Cursor
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - question
---

# Skill Builder (Wizard)

## Overview
Wizard interactivo para crear nuevas skills. Guía paso a paso con 6 preguntas obligatorias.

## When to Use
- "create a new skill"
- "skill wizard"
- "guíame a crear una skill"

---

## Wizard Flow

### Paso 0: Saludo
```
🎯 ¡Vamos a crear una nueva skill!
Responde cada pregunta y avanzaremos juntos.
```

### Paso 1: Propósito
Preguntar al usuario: "¿Cuál es el propósito de esta skill?"
**Confirmar**: ✅ Propósito: {respuesta}

### Paso 2: Nombre
**Analizar propósito** → Sugerir triggers
Preguntar al usuario: "¿Cómo se llamará esta skill? → Sugerir
**Confirmar**: ✅ Nombre: {respuesta}

### Paso 3: Triggers
**Analizar propósito** → Sugerir triggers
Preguntar al usuario: "¿Qué frases exactas deberían activar esta skill? → Sugerir
**Confirmar**: ✅ Triggers: {lista}

### Paso 4: Estructura
**Analizar propósito** → Sugerir estructura

Preguntar al usuario: "¿Qué estructura debería tener esta skill? 
- **Minimal**: SKILL.md con descripción y pasos básicos
- **Standard**: SKILL.md + estructura de directorios (examples, references)
- **Complete**: SKILL.md + estructura completa con templates, ejemplos y guía técnica

**Confirmar**: ✅ Estructura: {respuesta}

### Paso 5: Herramientas
**Analizar propósito** → Sugerir herramientas necesarias

**Preguntar**: "¿Qué herramientas necesita? 
- Read (para leer archivos)
- Write (para escribir archivos)
- Edit (para editar archivos)
- Bash (para ejecutar comandos de terminal)
- Grep (para buscar patrones en archivos)
- Glob (para coincidir con patrones de nombres de archivos)
- question (para hacer preguntas al usuario durante la ejecución)

**Confirmar**: ✅ Herramientas: {lista}

### Paso 6: Compatibilidad
**Preguntar**: "¿Para qué agentes? (Claude Code, Cursor, OpenCode, etc)"
**Confirmar**: ✅ Compatibilidad: {lista}

### Paso 7: Resumen
```
📋 RESUMEN
Propósito: {propósito}
Nombre: {nombre}
Triggers: {triggers}
Estructura: {estructura}
Herramientas: {herramientas}
Compatibilidad: {compatibilidad}

Preguntar al usuario: "¿Es correcto este resumen? (sí/no)"
Si "no" → Volver al paso correspondiente
Si "sí" → Continuar al siguiente paso
```

### Paso 8: Generar
Crear estructura de directorios y archivos.

### Paso 9: SKILL.md
**USAR ESTA PLANTILLA EXACTA:**

```markdown
---
name: {name}
description: Use this skill when the user asks to "trigger1", "trigger2". Include exact trigger phrases.
version: 1.0.0
license: MIT
compatibility:
  - {agente1}
  - {agente2}
allowed-tools:
  - Read
  - Write
  - {otras herramientas}
---

# Nombre del Skill

## Overview
{Propósito}

## When to Use
- Cuando el usuario "{trigger1}"
- Cuando el usuario "{trigger2}"

## Instructions

### Paso 1: [Nombre]
...

## Examples

**Usuario**: "{ejemplo}"
**Agente**: [respuesta]

## Quick Reference

| Paso | Acción |
|------|--------|
| 1 | ... |

## Convenciones
- Regla 1

## Notas
- Nota importante

## Additional Resources

### Reference Files
- **`references/guide.md`** - Guía técnica

### Examples
- **`examples/usage.md`** - Ejemplos de uso
```

---

## Additional Resources

### Reference Files
- **`references/guide.md`** - Guía técnica completa

### Examples
- **`examples/usage.md`** - Ejemplos de uso
```

### Paso 10: references/guide.md
**USAR** `references/templates.md` como base para generar guía técnica.

### Paso 11: examples/usage.md
**USAR** `examples/example-output.md` como base para generar ejemplos.

### Paso 12: Verificar
**CHECKLIST - NO continuar si falta algo:**
- [ ] Frontmatter con name, description, version, license, compatibility, allowed-tools
- [ ] ## Overview
- [ ] ## When to Use
- [ ] ## Instructions (con pasos numerados)
- [ ] ## Examples
- [ ] ## Quick Reference
- [ ] ## Convenciones
- [ ] ## Notas

---

## Quick Reference

| Paso | Acción |
|------|--------|
| 1 | Propósito |
| 2 | Nombre |
| 3 | Triggers |
| 4 | Estructura |
| 5 | Herramientas |
| 6 | Compatibilidad |
| 7 | Confirmar |
| 8-11 | Generar archivos |
| 12 | Verificar checklist |

## Notas

- **SIEMPRE 6 PREGUNTAS**: Nunca reducir
- **NUNCA ASUMIR**: Preguntar todo
- **USAR PLANTILLA EXACTA**: Del Paso 9
- **VERIFICAR CHECKLIST**: Antes de entregar
