# tasks.md — plantilla de tareas verificables

## Propósito
Convertir una spec o una necesidad en una lista de tareas **pequeñas, verificables y auditables**, aptas para delegar a un agente (o a una persona) sin ambigüedad.

## Regla de oro
Cada tarea debe tener **resultado observable**. Si no puedes describir la evidencia, la tarea está incompleta.

## Campos obligatorios por tarea
- **Título**: verbo + objeto + alcance (p. ej. “Agregar validación Zod a /api/payments”).
- **Contexto mínimo**: 2–4 bullets con el “por qué” y restricciones clave.
- **Entrada**: qué información necesita (archivos, rutas, endpoints, ejemplos).
- **Salida esperada**: qué artefacto produce (diff, archivo, comando, reporte).
- **Criterios de aceptación**: 2–5 checks verificables.
- **Evidencia**: cómo se prueba/observa (p. ej. `npm test`, screenshot, log, diff).
- **Riesgo**: bajo/medio/alto + 1 mitigación.
- **Límites**: qué NO tocar (p. ej. “no cambiar API pública”).

## Plantilla

### Meta
- **Objetivo**:
- **No‑objetivos**:
- **Restricciones**:

### Tareas

#### Tarea 1 — <título>
- **Contexto**:
- **Entrada**:
- **Salida esperada**:
- **Criterios de aceptación**:
  - [ ] …
  - [ ] …
- **Evidencia**:
- **Riesgo**:
- **Límites**:

#### Tarea 2 — <título>
- …

## Checklist de calidad (antes de ejecutar)
- [ ] Cada tarea cabe en 1–3 archivos o un cambio acotado.
- [ ] Cada tarea tiene evidencia concreta (comando/archivo/diff).
- [ ] Los límites están claros (qué no se toca).
- [ ] Hay una forma de “detenerse y pedir ayuda” si aparece un bloqueo.

