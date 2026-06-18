---
name: feature-docs
description: Use this skill when the user asks to "documentar feature", "crear docs de proyecto", "add project docs", "Documentar funcionalidad". Generates documentation for project features creating files in the docs/ folder and updating the index.
version: 1.0.0
license: MIT
compatibility:
  - Cursor
  - OpenCode
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - question
---

# Feature Documentation

## Overview
Esta skill genera documentación completa de funcionalidades, módulos o features del proyecto. Crea archivos markdown en la carpeta docs/, detecta automáticamente el stack tecnológico, explora el codebase y genera documentación basada en el código existente.

## When to Use
- Cuando el usuario pide "documentar feature"
- Cuando el usuario necesita "crear docs de proyecto"
- Cuando el usuario menciona "add project docs"
- Cuando el usuario quiere "Documentar funcionalidad"
- Cuando se necesita documentar módulos completos del proyecto

## Instructions

### Paso 1: Identificar contexto

Si no está claro en la conversación, preguntar:
- ¿Qué funcionalidad o módulo se va a documentar?
- ¿Dónde vive la documentación del proyecto? (ej: `docs/`, `Documentation/`)
- ¿Qué estructura de documentación usa el proyecto?

Infiere lo que puedas del codebase antes de preguntar.

### Paso 2: Explorar el codebase

**2a. Detectar el stack tecnológico:**
```bash
# Identificar lenguaje y estructura
find . -maxdepth 3 -type f \( -name "*.js" -o -name "*.ts" -o -name "*.py" -o -name "*.go" \) | head -30

# Buscar archivos de configuración
ls -la package.json requirements.txt go.mod 2>/dev/null
```

**2b. Encontrar archivos relacionados:**
```bash
# Buscar por nombre del feature
grep -rl "nombreFeature" --include="*.{js,ts,py,go,java,vue}" . 2>/dev/null

# Listar estructura del proyecto
ls -la src/ app/ lib/ modules/ 2>/dev/null
```

**2c. Identificar componentes:**
- Backend: endpoints, controladores, servicios, modelos
- Frontend: componentes, páginas, rutas
- Base de datos: tablas, queries, migraciones
- Configuración: env, archivos de setup

### Paso 3: Determinar estructura del documento

**3a. Encontrar carpeta de docs:**
```bash
# Buscar carpeta de documentación
ls -la docs/ Documentation/ README.md 2>/dev/null
```

**3b. Seleccionar formato de nombre:**
- PascalCase: `UserAuthentication.md`
- kebab-case: `user-authentication.md`

Mantener consistencia con el proyecto.

### Paso 4: Crear documento

Genera el documento con las secciones relevantes:

```markdown
[volver](../README.md)
# Nombre de la Funcionalidad

## Descripción
Qué hace y para qué sirve.

## Cuándo se Activa
Qué acción del usuario o evento del sistema lo dispara.

## Flujo
1. Paso uno
2. Paso dos
...

## Archivos
| Archivo | Propósito |
|---------|-----------|
```

**3c. Agregar secciones según lo que encuentres:**

| Si encontraras... | Agregar sección... |
|---|---|
| Endpoints API | `## API` |
| Modelos/Entidades | `## Modelos de Datos` |
| Queries SQL | `## Base de Datos` |
| Validaciones | `## Seguridad` |
| Variables de entorno | `## Configuración` |
| Tests | `## Pruebas` |
| UI/Componentes | `## Interfaz` |

### Paso 5: Actualizar índice

Agrega una entrada al `README.md` o índice de docs:
```markdown
- [Nombre del Feature](./docs/nombre-feature.md)
```

### Paso 6: Confirmar

Mostrar al usuario:
- Ruta del archivo creado
- Secciones incluidas
- Preguntar si falta algo

## Examples

**Usuario**: "documentar el módulo de usuarios"
**Agente**: [Explora codebase, detecta estructura, crea docs/UserManagement.md]

**Usuario**: "crear docs del sistema de pagos"
**Agente**: [Busca archivos relacionados, genera documentación completa]

## Quick Reference

| Paso | Acción |
|------|--------|
| 1 | Identificar contexto y preguntar si no está claro |
| 2 | Explorar codebase y detectar stack |
| 3 | Determinar estructura del documento |
| 4 | Crear documento con secciones relevantes |
| 5 | Actualizar índice/README |
| 6 | Confirmar con usuario |

## Convenciones

- **Nombre del archivo**: Mantener consistencia (PascalCase o kebab-case)
- **Código en bloques**: Usar lenguaje explícito según el stack
- **Tablas**: Para listas de archivos, funciones, parámetros
- **Flujos**: Siempre numerados
- **Sin secciones vacías**: Solo incluir lo que aplica
- **Volver al índice**: Incluir link `[volver](../README.md)`

## Notas

- **Documenta módulos/features completos**, no funciones individuales
- **Infiere antes de preguntar**: Explora el codebase antes
- **Detecta stack primero**: Usa find/grep para identificar tecnología
- **Genera contenido real**: Basado en el código existente
- **Actualiza siempre el índice**: Para que los docs no queden huérfanos
- **Flujo previo**: Para especificar e implementar antes de documentar, usar
  [feature-workflow](../feature-workflow/) (`feature-workflow spec` / `implement`)
