# database.md — plantilla para cambios de base de datos (seguro y reversible)

## Propósito
Definir cambios de BD (schema y datos) con un flujo **seguro, reversible y verificable**, evitando migraciones sin rollback o sin validación.

## Principios
- **Siempre hay rollback** (down / plan de reversión).
- **Validación antes de ejecutar** (schema, constraints, data impact).
- **Evitar sorpresas**: locks, backfills, compatibilidad y tiempos.

## Campos obligatorios
- **Motivación**: por qué se necesita el cambio.
- **Before / After**: schema actual vs propuesto (DDL o descripción).
- **Migración**:
  - Up (cambio)
  - Down (rollback)
- **Impacto en datos**: qué pasa con filas existentes y datos históricos.
- **Backfill**: si aplica, cómo se llena data nueva (batch, idempotencia).
- **Riesgos**: locks, tamaño de tablas, tiempo estimado, compatibilidad.
- **Validación**: queries/controles para confirmar que quedó bien.
- **Plan de ejecución**: pasos y quién aprueba.

## Plantilla

### 1) Motivación
- …

### 2) Before / After
**Before (resumen o DDL):**

**After (resumen o DDL):**

### 3) Migración
**Up:**
- …

**Down (rollback):**
- …

### 4) Impacto en datos
- …

### 5) Backfill (si aplica)
- Estrategia:
- Idempotencia:
- Métrica de progreso:

### 6) Riesgos y mitigaciones
1. …
2. …
3. …

### 7) Validación (antes y después)
- Pre‑checks:
- Post‑checks:

### 8) Plan de ejecución
- Paso 1:
- Paso 2:
- Paso 3:
- **Aprobación requerida**:

