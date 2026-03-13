---
name: code-review
description: Use this skill when the user asks to "revisar código", "code review", "analizar código", "revisar seguridad", "review de este archivo". Realiza análisis de código detectando bugs, problemas de seguridad, performance y arquitectura.
version: 1.0.0
license: MIT
compatibility:
  - cursor
  - opencode
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - question
---

# Code Review

## Overview
Esta skill realiza code reviews exhaustivos de código, analizando según el tipo elegido (básico o profundo). Detecta bugs, problemas de seguridad, performance y arquitectura. Sugiere fixes pero no los aplica automáticamente.

## When to Use
- Cuando el usuario pide "revisar código"
- Cuando el usuario solicita "code review"
- Cuando el usuario necesita "analizar código"
- Cuando el usuario quiere "revisar seguridad"
- Cuando el usuario dice "review de este archivo"

## Instructions

### Paso 1: Selección del Tipo de Review
Preguntar al usuario qué tipo de review desea:
- **Básico**: Revisión rápida de errores obvios, sintaxis y problemas evidentes
- **Profundo**: Análisis exhaustivo incluyendo seguridad, performance, arquitectura y patrones

### Paso 2: Análisis del Código
Para **review básico**:
- Verificar sintaxis y errores de compilación
- Detectar bugs obvios
- Revisar naming y convenciones
- Verificar manejo básico de errores

Para **review profundo**:
- Realizar todas las verificaciones del nivel básico
- Analizar vulnerabilidades de seguridad (SQL injection, XSS, etc.)
- Evaluar performance y optimizaciones
- Revisar arquitectura y patrones de diseño
- Verificar manejo de recursos y memory leaks
- Analizar dependencias y versiones

### Paso 3: Categorización de Hallazgos
Organizar los hallazgos en:
- 🔴 **Críticos**: Bugs que causan crashes o errores graves
- 🟠 **Security**: Vulnerabilidades de seguridad
- 🟡 **Performance**: Problemas de rendimiento
- 🔵 **Architecture**: Mejoras arquitectónicas
- 🟢 **Minor**: Mejoras menores y estilo

### Paso 4: Generar Reporte
Crear un reporte estructurado con:
1. Resumen ejecutivo
2. Hallazgos por categoría
3. Sugerencias de fix para cada problema
4. Priorización de acciones

### Paso 5: Entrega
Presentar el reporte al usuario sin aplicar cambios automáticamente. Ofrecer aplicar fixes específicos si el usuario lo solicita.

## Edge Cases
- **Sin archivo específico**: Preguntar qué archivo o carpeta revisar
- **Múltiples archivos**: Prioritar los más relevantes o preguntar
- **Lenguaje desconocido**: Usar conocimientos generales de programación
- **Proyecto vacío**: Advertir que no hay código para analizar

## Examples

### Ejemplo 1: Review Básico
**Usuario**: "Haz un code review rápido de este archivo"
**Agente**: "Ejecutaré un review básico. ¿Confirmas que es solo análisis rápido de sintaxis y errores obvios?"
**(Usuario confirma)**
Agente analiza y entrega reporte conciso.

### Ejemplo 2: Review Profundo
**Usuario**: "Necesito un code review completo de seguridad"
**Agente**: "Ejecutaré un review profundo enfocado en seguridad. ¿Quieres que también revise performance y arquitectura?"
Agente realiza análisis exhaustivo y entrega reporte detallado.

### Ejemplo 3: Revisión de Seguridad
**Usuario**: "Revisa la seguridad de esta función"
**Agente**: "Analizaré la función buscando vulnerabilidades: SQL injection, XSS, manejo de datos sensibles, etc."
Agente entrega reporte de seguridad.

## Quick Reference

| Paso | Acción |
|------|--------|
| 1 | Confirmar tipo de review (básico/profundo) |
| 2 | Analizar código según tipo seleccionado |
| 3 | Categorizar hallazgos |
| 4 | Generar reporte estructurado |
| 5 | Entregar sin aplicar cambios |

## Convenciones
- Usar emojis para categorizar severidad
- Ser objetivo y constructivo
- Proponer soluciones, no solo señalar problemas
- Priorizar por impacto y riesgo

## Notas
- Esta skill NO modifica código, solo sugiere
- El usuario debe aprobar cada fix
- Adaptar el nivel de detalle al contexto
