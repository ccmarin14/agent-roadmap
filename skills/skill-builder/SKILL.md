---
name: skill-builder
description: Use this skill when the user asks to "create a new skill", "generate a skill template", "help me build a skill", "make a new AI skill", "wizard for skills", "guíame a crear una skill". This skill provides an interactive step-by-step wizard that asks questions and waits for user responses at each step.
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

# Skill Builder (Wizard Interactivo)

## Overview
Esta skill proporciona un **wizard interactivo paso a paso** que guía al usuario en la creación de una nueva skill. Cada paso requiere respuesta del usuario antes de continuar.

## When to Use
- Cuando el usuario pide "crear una nueva skill"
- Cuando el usuario necesita "generar una plantilla de skill"
- Cuando el usuario pregunta "cómo hacer una skill"
- Cuando el usuario dice "wizard" o "guíame"
- Cuando el usuario quiere "ayuda para crear una skill"

---

## Wizard Flow (Modo Interactivo)

### Paso 0: Saludo Inicial
Al detectar el trigger, dar la bienvenida:
```
🎯 ¡Vamos a crear una nueva skill!

Te guiaré paso a paso. Responde cada pregunta y avanzaremos juntos.
```

### Paso 1: Propósito
**Preguntar:**
```
🎯 PREGUNTA 1 de 6

¿Cuál es el propósito de esta skill?

👉 Describe brevemente qué hace esta skill (ej: "Gestionar autenticación JWT")
```

**Esperar respuesta** → Confirmar:
```
✅ Propósito: {propósito}
```

### Paso 2: Nombre de la Skill
**Preguntar:**
```
📝 PREGUNTA 2 de 6

¿Cómo se llamará tu skill?

👉 Ingresa el nombre en kebab-case (ej: jwt-auth, user-management, api-docs)
```

**Esperar respuesta** → Validar formato kebab-case → Confirmar:
```
✅ Nombre: {nombre}
```

### Paso 3: Triggers (Frases de Activación)
**Preguntar:**
```
🔔 PREGUNTA 3 de 6

¿Qué frases dirá el usuario para activar esta skill?

👉 Ejemplos: "add JWT", "implementar auth", "secure API"

(Ingresa las frases separadas por coma)
```

**Esperar respuesta** → Generar lista de triggers → Confirmar:
```
✅ Triggers:
   - {trigger 1}
   - {trigger 2}
   - {trigger 3}
```

### Paso 4: Estructura

**4a. Analizar el propósito para sugerir estructura:**

Basado en el propósito de la skill (del Paso 1), determina la complejidad sugerida:

| Si el propósito incluye... | Sugerir... |
|---|---|
| "generar", "crear", "construir", "implementar" | Standard (necesita ejemplos) |
| "documentar", "explicar", "guiar" | Standard (necesita referencias) |
| "analizar", "revisar", "auditar" | Minimal (solo instrucciones) |
| "múltiples", "completo", "todo", "sistema" | Complete (múltiples recursos) |
| "simple", "básico", "un" | Minimal |
| Keywords técnicos, configuración, integración | Standard |
| "tests", "validar", "verificar" | Complete (necesita scripts) |

**4b. Preguntar:**
```
📁 PREGUNTA 4 de 6

¿Qué nivel de complejidad necesita la skill?

👉 Basado en tu propósito ("{propósito}"), sugiero: {sugerencia}

   Opciones:
   1. Minimal    → Solo SKILL.md (para skills simples)
   2. Standard  → SKILL.md + references/ + examples/
   3. Complete  → SKILL.md + references/ + examples/ + scripts/

(Ingresa 1, 2 o 3, o modifica la sugerencia)
```

**Esperar respuesta** → Confirmar:
```
✅ Estructura: {estructura}
```

### Paso 5: Herramientas
**Preguntar:**
```
🔧 PREGUNTA 5 de 6

¿Qué herramientas necesitará esta skill?

👉 Herramientas disponibles:
   - Read    (leer archivos)
   - Write   (crear archivos)
   - Edit    (modificar archivos)
   - Bash    (ejecutar comandos)
   - Grep    (buscar en archivos)
   - Glob    (buscar archivos)
   - question (hacer preguntas)

(Ingresa las que necesites, separadas por coma)
```

**Esperar respuesta** → Confirmar:
```
✅ Herramientas: {lista de herramientas}
```

### Paso 6: Compatibilidad
**Preguntar:**
```
🤖 PREGUNTA 6 de 6

¿Para qué agentes será compatible?

👉 Opciones comunes:
   - Claude Code
   - Cursor
   - Windsurf
   - Continue

(Ingresa los agentes, separados por coma)
```

**Esperar respuesta** → Confirmar:
```
✅ Compatibilidad: {lista de agentes}
```

---

### Paso 7: Resumen y Confirmación
Mostrar resumen completo:

```
📋 RESUMEN DE LA SKILL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Propósito:     {propósito}
Nombre:        {nombre}
Triggers:      {triggers}
Estructura:    {estructura}
Herramientas:  {herramientas}
Compatibilidad:{compatibilidad}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ ¿Confirmas para proceder a generar la estructura?
   [Si] → Generar archivos
   [No] → Volver a editar
```

**Esperar confirmación** → Si dice "No", volver al paso correspondiente.

---

### Paso 8: Generar Estructura
Crear directorios según estructura elegida:

```bash
# Minimal
skills/{name}/
└── SKILL.md

# Standard
skills/{name}/
├── SKILL.md
├── references/
└── examples/

# Complete
skills/{name}/
├── SKILL.md
├── references/
├── examples/
└── scripts/
```

### Paso 9: Generar SKILL.md

**9a. Generar el SKILL.md con la plantilla completa:**

```markdown
---
name: {name}
description: Use this skill when the user asks to "trigger 1", "trigger 2", "trigger 3". Include exact trigger phrases.
version: 1.0.0
license: MIT
compatibility:
  - {agente 1}
  - {agente 2}
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - question
---

# Nombre del Skill

## Overview
{Propósito de la skill}

## When to Use
- Cuando el usuario pide "{trigger 1}"
- Cuando el usuario necesita "{trigger 2}"
- Cuando el usuario pregunta "{trigger 3}"

## Instructions

### Paso 1: [Nombre del paso]
Instrucciones detalladas...

### Paso 2: [Nombre del paso]
Más instrucciones...

[Agregar pasos según sea necesario]

## Examples

**Usuario**: "Ejemplo de frase"
**Agente**: [Cómo responde]

## Quick Reference

| Paso | Acción |
|------|--------|
| 1 | Acción 1 |
| 2 | Acción 2 |

## Convenciones
- Regla 1
- Regla 2

## Notas
- Nota importante 1
- Nota importante 2
```

**9b. Generar references/guide.md:**

Crear archivo con guía técnica relevante para la skill.

**9c. Generar examples/usage.md:**

Crear archivo con ejemplos prácticos de uso.

**9d. Importante:**
- NO omitir ninguna sección
- Usar la plantilla exactamente como se muestra
- Completar TODOS los campos con la información recopilada
- Verificar que el frontmatter esté completo

### Paso 10: Presentación Final
```
🎉 ¡Skill creada exitosamente!

📁 Estructura:
   skills/{name}/
   ├── SKILL.md
   ├── references/
   └── examples/

📄 Archivos generados:
   ✅ SKILL.md
   ✅ references/guide.md
   ✅ examples/usage.md

💡 Próximos pasos:
   1. Revisa el contenido generado
   2. Personaliza según tus necesidades
   3. Agrega más ejemplos si es necesario
```

---

## Comandos del Wizard

| Comando | Acción |
|---------|--------|
| `create skill` | Iniciar wizard interactivo |
| `skill wizard` | Iniciar wizard |
| `guíame` | Iniciar wizard en español |

---

## Validaciones

### Nombre
- Debe estar en kebab-case
- Solo letras minúsculas, números y guiones
- No puede tener espacios

### Estructura
- minimal: Solo SKILL.md
- standard: SKILL.md + references/ + examples/
- complete: SKILL.md + references/ + examples/ + scripts/

---

## Ejemplo de Conversación

**Usuario**: "create a new skill"
**Wizard**:
```
🎯 ¡Vamos a crear una nueva skill!

Te guiaré paso a paso. Responde cada pregunta y avanzaremos juntos.

🎯 PREGUNTA 1 de 6

¿Cuál es el propósito de esta skill?

👉 Describe brevemente qué hace esta skill
```

**Usuario**: "Generar documentación de APIs"
**Wizard**:
```
✅ Propósito: Generar documentación de APIs

📝 PREGUNTA 2 de 6

¿Cómo se llamará tu skill?

👉 Ingresa el nombre en kebab-case (ej: api-docs, user-management)
```

**Usuario**: "api-docs"
**Wizard**:
```
✅ Nombre: api-docs

🔔 PREGUNTA 3 de 6

¿Qué frases dirá el usuario para activar esta skill?
```

[Continúa preguntando hasta completar los 6 pasos...]

---

## Quick Reference

| Paso | Acción | Espera |
|------|--------|--------|
| 0 | Saludo inicial | - |
| 1 | Preguntar propósito | ✅ Respuesta |
| 2 | Preguntar nombre | ✅ Respuesta |
| 3 | Preguntar triggers | ✅ Respuesta |
| 4 | Preguntar estructura | ✅ Respuesta |
| 5 | Preguntar herramientas | ✅ Respuesta |
| 6 | Preguntar compatibilidad | ✅ Respuesta |
| 7 | Mostrar resumen | ✅ Confirmación |
| 8 | Generar estructura | - |
| 9 | Generar SKILL.md | - |
| 10 | Presentar resultado | - |

## Notas

### Reglas Obligatorias del Wizard

1. **SIEMPRE 6 PREGUNTAS**: Nunca reducir el número de preguntas, aunque parezca innecesario
2. **NUNCA ASUMIR**: No inventar, inferir o asumir valores. Preguntar TODO.
3. **ESPERAR RESPUESTA**: No continuar hasta que el usuario responda
4. **UNA PREGUNTA A LA VEZ**: Nunca preguntar dos cosas al mismo tiempo
5. **CONFIRMAR CADA DATO**: Mostrar lo que entendiste antes de seguir
6. **VALIDAR EN CADA PASO**: Verificar formato antes de confirmar
7. **PERMITIR EDICIÓN**: Si usuario quiere cambiar algo, volver al paso

### Por qué estas reglas son críticas

- **Asumir estructura** → Puede generar skill incompleta o incorrecta
- **Asumir herramientas** → La skill puede no tener permisos necesarios
- **Asumir compatibilidad** → La skill no funciona en el agente del usuario
- **Saltarse preguntas** → Pierde información valiosa del usuario

Si no sabes qué preguntar en un paso, usa valores genéricos PERO PREGUNTA:
- "¿Qué herramientas necesitará?" (aunque propongas Read, Write, Bash)
- "¿Para qué agentes será compatible?" (aunque propongas Claude Code, Cursor)
