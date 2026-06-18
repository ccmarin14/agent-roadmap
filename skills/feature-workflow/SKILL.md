---
name: feature-workflow
description: >-
  Guía un flujo de especificación e implementación de features con gates de
  aprobación humana, artefactos en docs/_wip/ y fases sin tests hasta revisión.
  Usar cuando el usuario invoque feature-workflow spec o feature-workflow implement,
  o pida especificar/implementar una feature con paradas entre fases.
disable-model-invocation: true
---

# Feature Workflow

Flujo portable para pasar de un requerimiento (a menudo vago) a implementación
cerrada con aprobación explícita del usuario en cada fase.

## Invocación

| Modo | Cómo invocar | Entrada |
|------|--------------|---------|
| **Especificación** | `feature-workflow spec` | Requerimiento del usuario (texto libre) |
| **Implementación** | `feature-workflow implement` | Slug WIP o ruta a `docs/_wip/{slug}/` |

Lee [WORKFLOW.md](WORKFLOW.md) como fuente canónica. Usa plantillas en
[templates/](templates/) y referencias en [reference/](reference/).

## Antes de cualquier modo

1. **Descubrimiento obligatorio** del repo — ver
   [reference/discovery-checklist.md](reference/discovery-checklist.md) y
   [reference/reuse-patterns-checklist.md](reference/reuse-patterns-checklist.md).
2. **Reutilizar antes de inventar:** buscar pantallas, componentes y capas análogas;
   no proponer diseño nuevo sin contrastar con lo existente.
3. Registrar convenciones y **patrones referencia** en el artefacto que corresponda.
4. **Idioma por defecto:** español (salvo que el repo o el usuario indiquen otro).
5. **STOP** al final de cada fase hasta confirmación explícita del usuario,
   salvo que indique lo contrario.

## Artefactos WIP

Ruta: `docs/_wip/{feature-slug}/`

El agente propone `{feature-slug}` (kebab-case del título); el usuario confirma
al iniciar. Commitear temporales es **opcional**.

### Jerarquía

```text
SPEC.md              ← raíz: requerimiento, decisiones, HU, diagramas
├── ISSUE.md         ← hijo: issue Markdown complementaria
├── PROMPT.md        ← hijo: prompt autocontenido para implementación
│   └── AGENTS_BUILD.md  ← hijo: traza de implementación (autocontenido)
├── USER_SUMMARY.md  ← hermano: resumen para el usuario (se actualiza siempre)
└── ACTIVITY.md      ← hermano: inicio/fin y actividades por sesión
```

**Regla de decisiones:** las decisiones de negocio viven **solo en SPEC.md**.
Los hijos derivan contenido sin repetir decisiones.

**Actualización continua:** `USER_SUMMARY.md` y `AGENTS_BUILD.md` se alimentan
cuando hay decisiones nuevas, **cada ajuste en Fase 2**, otros cambios de
implementación o cierre de fases.

## Modo Especificación (`spec`)

Seguir [WORKFLOW.md § Especificación](WORKFLOW.md#modo-especificación-spec) y
[reference/spec-questionnaire.md](reference/spec-questionnaire.md).

**Prohibido** crear archivos en `docs/_wip/` tras una sola ronda de preguntas si
la feature tiene UI, listados, búsqueda, formularios, permisos o API nueva.

Resumen:

1. Descubrimiento del repo.
2. Preguntas al usuario en **rondas temáticas** (mínimo 2 si aplica UI/API);
   usar `AskQuestion` cuando exista.
3. **S1.5** — Completar cuestionario (categorías A–G: Cerrada / N/A / Diferida).
4. Proponer **1 vs N historias** con justificación; usuario confirma.
5. **S2.5 Gate pre-SPEC** — tabla de cobertura + OK explícito **antes** de escribir archivos.
6. Crear `SPEC.md` desde [templates/SPEC.md](templates/SPEC.md).
7. Derivar `ISSUE.md` (formato `# Desarrollador - Título`, secciones con emojis)
   y `PROMPT.md` desde sus plantillas.
8. Iniciar `USER_SUMMARY.md`.
9. **STOP** — OK del usuario antes de implementar.

## Modo Implementación (`implement`)

Seguir [WORKFLOW.md § Implementación](WORKFLOW.md#modo-implementación-implement).

Resumen:

1. Localizar `docs/_wip/{slug}/PROMPT.md` (o pedir slug al usuario).
2. Crear o continuar `AGENTS_BUILD.md` y `ACTIVITY.md`.
3. Copiar snapshot mínimo de SPEC (HU, decisiones, criterios, escenarios) en
   `AGENTS_BUILD.md` para que sea **autocontenido** sin reabrir SPEC.
4. Ejecutar fases 1–6 según [reference/phase-gates.md](reference/phase-gates.md).
5. Actualizar `USER_SUMMARY.md` y `AGENTS_BUILD.md` en Fase 2 (cada ajuste), Fase 3 y cierre.
6. Fase 6: ofrecer commit; **no ejecutar** `git` sin petición explícita;
   preguntar qué conservar o borrar del WIP.

## Git

- Commit solo tras Fase 5 (documentación), ofreciendo mensaje + comandos.
- **No ejecutar** `git add` / `git commit` sin petición explícita del usuario.

## Tests automatizados

- Fases 1–3: **prohibido** crear o modificar tests automatizados.
- Fase 4: solo si el proyecto los usa y tras OK en Fases 2 y 3.
- Si el proyecto **no tiene** tests: anotar en `ISSUE.md` / `AGENTS_BUILD.md` y
  **omitir** Fase 4.

## Documentación (Fase 5)

- Solo si es realmente necesario.
- Evaluar qué documentación existe en el repo y seguir sus convenciones.
- No duplicar la Issue entera en el repo.
- No actualizar `SPEC.md` como doc permanente; actualizar docs de producto del
  proyecto si el comportamiento visible cambió.
- Para generar documentación permanente en `docs/`, usar la skill
  [feature-docs](../feature-docs/) cuando corresponda.

## Recursos

| Archivo | Uso |
|---------|-----|
| [WORKFLOW.md](WORKFLOW.md) | Flujo canónico completo |
| [templates/SPEC.md](templates/SPEC.md) | Plantilla especificación |
| [templates/ISSUE.md](templates/ISSUE.md) | Plantilla issue Markdown |
| [templates/PROMPT.md](templates/PROMPT.md) | Plantilla prompt implementación |
| [templates/AGENTS_BUILD.md](templates/AGENTS_BUILD.md) | Plantilla traza agente |
| [templates/USER_SUMMARY.md](templates/USER_SUMMARY.md) | Plantilla resumen usuario |
| [templates/ACTIVITY.md](templates/ACTIVITY.md) | Plantilla actividades |
| [reference/discovery-checklist.md](reference/discovery-checklist.md) | Descubrimiento por repo |
| [reference/spec-questionnaire.md](reference/spec-questionnaire.md) | Cuestionario obligatorio antes del SPEC |
| [reference/reuse-patterns-checklist.md](reference/reuse-patterns-checklist.md) | Patrones existentes a reutilizar |
| [reference/phase-gates.md](reference/phase-gates.md) | Fases 1–6 detalladas |
| [README.md](README.md) | Instalación e invocación |
