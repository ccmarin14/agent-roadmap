# feature-workflow

Skill portable para especificar e implementar features con aprobación humana en
cada fase. Funciona en **Cursor** y **OpenCode** con el mismo paquete.

## Instalación

### Cursor (personal)

El paquete vive en:

```text
~/.cursor/skills/feature-workflow/
```

Cursor descubre la skill por el `name` del frontmatter en `SKILL.md`.

### OpenCode / skills CLI

Misma estructura en:

```text
~/.agents/skills/feature-workflow/
```

Compatible con el ecosistema [skills CLI](https://skills.sh/):

```bash
npx skills add <tu-repo-o-ruta-local>
```

Para instalación manual, copia la carpeta completa a ambas rutas anteriores.

## Invocación

Invocación **explícita** (no auto-descubrimiento):

```text
feature-workflow spec
<requerimiento>

feature-workflow issue
<issue-pegada-o-ruta-a-archivo.md>

feature-workflow implement
<slug-o-ruta-wip>
```

Ejemplos:

- «Usa feature-workflow spec: el modal debe mostrar X y Y siempre visibles»
- «feature-workflow issue docs/borrador-mi-feature.md»
- «feature-workflow implement ayuda-expresion-modal»

## Artefactos en el repo

Durante el trabajo, el agente crea:

```text
docs/_wip/{feature-slug}/
├── SPEC.md
├── ISSUE.md
├── PROMPT.md
├── AGENTS_BUILD.md
├── USER_SUMMARY.md
└── ACTIVITY.md
```

| Tipo | Archivos |
|------|----------|
| **Temporales** | SPEC, PROMPT, AGENTS_BUILD, USER_SUMMARY, ACTIVITY (según cierre) |
| **Permanentes** | ISSUE (si se conserva), código, docs de producto actualizadas |

Commitear el WIP es **opcional**. Al cerrar la feature, la Fase 6 pregunta qué
conservar o borrar.

## Estructura del paquete

```text
feature-workflow/
├── SKILL.md              # Entrada Cursor / OpenCode
├── WORKFLOW.md           # Flujo canónico
├── README.md             # Este archivo
├── templates/            # Plantillas genéricas
└── reference/            # Descubrimiento, cuestionario, import issue y fases
```

## Tres modos de entrada

| Modo | Comando | Cuándo |
|------|---------|--------|
| **spec** | `feature-workflow spec` | Requerimiento desde cero |
| **issue** | `feature-workflow issue` | Ya tienes la Issue (texto o archivo) |
| **implement** | `feature-workflow implement` | WIP con `PROMPT.md` listo |

En modo **issue**, el `SPEC.md` tiene la **misma función** que en `spec`; el
cuestionario **A–H** se mantiene completo (la Issue solo pre-llena ítems).
Ver [reference/issue-import-checklist.md](reference/issue-import-checklist.md).

## Modo spec / issue: no ir demasiado rápido

Antes de crear `docs/_wip/`, el agente debe:

- Hacer **al menos dos rondas** de preguntas si hay UI, búsqueda o API.
- Completar [reference/spec-questionnaire.md](reference/spec-questionnaire.md).
- Obtener **OK explícito** en el gate pre-SPEC (tabla de cobertura en el chat).

No basta con que el requerimiento inicial mencione «paginación» o «buscador».

## Reutilizar patrones existentes

Antes del SPEC y en Fase 1, buscar en el repo pantallas y capas análogas. Ver
[reference/reuse-patterns-checklist.md](reference/reuse-patterns-checklist.md).

## Temporales vs permanentes

| Temporal | Permanente |
|----------|------------|
| Spec de trabajo | Issue (`ISSUE.md` si se conserva) |
| Prompt y build del agente | Cambios en el repositorio |
| Resumen para usuario | Documentación de producto acordada |
| Actividades de sesión | — (primera persona del usuario en `ACTIVITY.md`) |

La skill **no** referencia rutas de features pasadas ni exige que los temporales
permanezcan en el repo.

## Requisitos

- Agente con acceso al repositorio y herramientas de edición.
- `AskQuestion` recomendado en modos `spec` e `issue` (si la plataforma lo soporta).
- OpenCode: versión reciente con soporte de skills en `~/.agents/skills/`.
