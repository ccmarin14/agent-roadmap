# Ejemplos de Code Review

## Ejemplo 1: Review Básico

**Usuario**: "Haz un code review rápido de auth.js"

**Agente**: "¿Confirmas que quieres un review básico (sintaxis y errores obvios)?"

**Usuario**: "Sí"

**Agente**: *(analiza el archivo)*

---

### Reporte Generado

```
📋 CODE REVIEW - auth.js

## Resumen
Archivo analyzed. 2 issues encontrados.

## Hallazgos

### 🟢 Estilo
1. **Línea 15**: Variable 'x' no descriptiva
   - Suggestion: Renombrar a 'userId'

### 🔴 Crítico
2. **Línea 42**: Error no manejado
   ```javascript
   // Actual
   db.query(sql)
   
   // Sugerido
   try {
     const result = await db.query(sql)
   } catch (err) {
     logger.error(err)
     throw new Error('Query failed')
   }
```

## Acción
¿Quieres que aplique alguno de estos fixes?
```

---

## Ejemplo 2: Review Profundo de Seguridad

**Usuario**: "Review completo de seguridad del archivo login.js"

**Agente**: "¿Quieres que también incluya análisis de performance y arquitectura?"

**Usuario**: "Sí, por favor"

**Agente**: *(analiza exhaustivamente)*

---

### Reporte Generado

```
🔒 CODE REVIEW PROFUNDO - login.js

## Resumen
5 issues encontrados: 1 crítico, 3 seguridad, 1 performance

---

### 🟠 Seguridad - CRÍTICO

**Línea 23**: SQL Injection vulnerability
```javascript
// ❌ Peligroso
const query = `SELECT * FROM users WHERE email = '${email}'`

// ✅ Seguro
const query = 'SELECT * FROM users WHERE email = $1'
const result = await db.query(query, [email])
```

---

### 🟠 Seguridad

**Línea 45**: Contraseña expuesta en logs
```javascript
// ❌ Peligroso
logger.info(`Login attempt for ${email} with password ${password}`)

// ✅ Seguro
logger.info(`Login attempt for ${email}`)
```

---

### 🟡 Performance

**Línea 78**: Query N+1 potencial
```javascript
// ❌ Ineficiente
for (const user of users) {
  const profile = await db.getProfile(user.id)
}

// ✅ Mejor
const profiles = await db.getProfiles(users.map(u => u.id))
```

---

### 🔵 Arquitectura

**Línea 100**: Funización violada (too many responsibilities)
- La función `validateAndLogin` hace: validación, query, hash, sesión, response
- Suggestion: Separar en validateInput(), authenticateUser(), createSession()

---

## Recomendaciones Prioritarias

1. 🔴 CRÍTICO: Arreglar SQL injection (bloqueante)
2. 🟠 SECURITY: Remover passwords de logs
3. 🟡 PERFORMANCE: Optimizar queries
4. 🔵 ARCH: Refactorizar función grande
```

---

## Ejemplo 3: Review de Múltiples Archivos

**Usuario**: "Review de toda la carpeta /src/api"

**Agente**: "Encontré 12 archivos. ¿Prefieres:
1. Review básico de todos
2. Review profundo solo de los archivos principales
3. Review de seguridad de todos"

**Usuario**: "Opción 2"

**Agente**: *(analiza archivos principales: auth.js, users.js, middleware.js)*

---

### Reporte Generado

```
📋 CODE REVIEW - /src/api (3 archivos principales)

## stats
- Archivos analizados: 3
- Total issues: 8
- Críticos: 2
- Seguridad: 3
- Performance: 2
- Arquitectura: 1

## by Archivo

### auth.js (3 issues)
- 🔴 Línea 12: Unhandled promise rejection
- 🟠 Línea 34: Timing attack vulnerable
- 🟡 Línea 56: Inefficient bcrypt rounds

### users.js (3 issues)
- 🔴 Línea 8: No authorization check
- 🟠 Línea 22: PII en response
- 🔵 Línea 45: Duplicate code

### middleware.js (2 issues)
- 🟠 Línea 15: Weak JWT secret
- 🟡 Línea 28: Missing rate limiting

## Acción
¿Quieres que profundice en algún archivo específico?
```
