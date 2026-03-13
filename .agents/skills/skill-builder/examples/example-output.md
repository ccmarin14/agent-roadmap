# Ejemplo de Salida - skill-builder

Este documento muestra un ejemplo de lo que genera `skill-builder` cuando el usuario pide crear una nueva skill.

---

## Input del Usuario

> "Quiero crear una skill para autenticación con JWT"

---

## Proceso

1. **Recopilar información:**
   - Nombre: `jwt-auth`
   - Propósito: Implementar autenticación JWT en proyectos
   - Estructura: Standard
   - Herramientas: Read, Write, Edit, Bash
   - Compatibilidad: Claude Code, Cursor

2. **Generar estructura:**
   ```
   skills/jwt-auth/
   ├── SKILL.md
   ├── references/
   │   └── jwt-guide.md
   └── examples/
       └── example-usage.sh
   ```

---

## SKILL.md Generado

```markdown
---
name: jwt-auth
description: Use this skill when the user asks to "add JWT authentication", "implement JWT", "set up token-based auth", "secure API with JWT". Include exact phrases that trigger this skill.
version: 1.0.0
license: MIT
compatibility:
  - Claude Code
  - Cursor
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
---

# JWT Authentication

## Overview
Esta skill guía en la implementación de autenticación JWT (JSON Web Tokens) en aplicaciones backend.

## When to Use
- Cuando el usuario pide "agregar autenticación JWT"
- Cuando el usuario necesita "implementar tokens"
- Cuando el usuario pregunta "cómo securear API con JWT"

## Instructions
### Paso 1: Analizar el proyecto
- Identificar el framework/backend usado
- Verificar dependencias existentes

### Paso 2: Implementar autenticación
- Generar tokens JWT
- Validar tokens en requests
- Manejar expiración

### Paso 3: Proteger endpoints
- Agregar middleware de autenticación
- Configurar rutas protegidas

## Examples
- Usuario: "Necesito agregar JWT a mi API"
- Agente: [usa la skill para guiar implementación]

## Quick Reference
| Paso | Descripción |
|------|-------------|
| 1 | Analizar proyecto |
| 2 | Instalar dependencias |
| 3 | Generar tokens |
| 4 | Validar requests |
```

---

## references/jwt-guide.md Generado

```markdown
# Guía de JWT Authentication

## ¿Qué es JWT?
JSON Web Token es un estándar para crear tokens de acceso.

## Estructura
- Header: tipo de token y algoritmo
- Payload: datos del usuario
- Signature: verificación

## Best Practices
- Usar HS256 o RS256
- Establecer expiración corta
- No almacenar datos sensibles en payload
```

---

## examples/example-usage.sh Generado

```bash
#!/bin/bash
# Ejemplo de generación y validación de JWT

# Generar token
TOKEN=$(jwt.encode '{"user_id": 1}' "secret" "HS256")

# Validar token
jwt.verify "$TOKEN" "secret"
```
