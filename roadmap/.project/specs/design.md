# design.md — plantilla de diseño (contratos y tradeoffs)

## Propósito
Registrar el diseño de un cambio de forma **auditable**: decisiones, tradeoffs, riesgos y cómo se valida. Esto evita que el agente (o el equipo) implemente “a ciegas”.

## Campos obligatorios
- **Contexto**: qué problema existe hoy, a quién afecta y por qué importa.
- **Objetivo**: resultado medible.
- **No‑objetivos**: lo que explícitamente no se resolverá.
- **Opciones consideradas**: mínimo 2 (incluyendo “no hacer nada” si aplica).
- **Decisión**: cuál opción se elige y por qué.
- **Contratos**: inputs/outputs, invariantes, errores esperados, compatibilidad.
- **Riesgos**: 3 riesgos + mitigación.
- **Plan de validación**: pruebas, métricas, checklist.
- **Plan de rollout/rollback**: cómo desplegar y cómo volver atrás si algo falla.

## Plantilla

### 1) Contexto
- **Problema actual**:
- **Impacto**:
- **Usuarios/áreas afectadas**:

### 2) Objetivo y no‑objetivos
- **Objetivo**:
- **No‑objetivos**:

### 3) Opciones consideradas
#### Opción A — <nombre>
- Pros:
- Contras:
- Riesgos:

#### Opción B — <nombre>
- Pros:
- Contras:
- Riesgos:

### 4) Decisión
- **Decisión**:
- **Justificación**:
- **Qué estamos descartando**:

### 5) Contratos e interfaces
- **Entradas**:
- **Salidas**:
- **Errores y handling**:
- **Invariantes**:
- **Compatibilidad/migración**:

### 6) Riesgos y mitigaciones
1. Riesgo: … Mitigación: …
2. Riesgo: … Mitigación: …
3. Riesgo: … Mitigación: …

### 7) Plan de implementación (alto nivel)
- Paso 1:
- Paso 2:
- Paso 3:

### 8) Plan de validación
- Tests:
- Checklist:
- Métricas/observabilidad:

### 9) Rollout / rollback
- Rollout:
- Rollback:

