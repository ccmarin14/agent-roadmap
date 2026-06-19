# Importación de Issue existente (modo `issue`)

Usar cuando el usuario invoca `feature-workflow issue` con una Issue ya redactada
(texto pegado o ruta a archivo). Es **alternativa** a `spec`, no un atajo que
omite el cuestionario ni el `SPEC.md`.

---

## Entrada aceptada

| Forma | Ejemplo |
|-------|---------|
| **Texto pegado** | Tras `feature-workflow issue`, el usuario pega la Issue en el chat |
| **Archivo** | `feature-workflow issue ruta/relativa/issue.md` o ruta absoluta |

Si la ruta no existe o el contenido está vacío, detenerse y pedir la Issue.

---

## Paso 1 — Leer y analizar

1. Cargar el contenido completo de la Issue.
2. Identificar secciones existentes (aunque no usen emojis ni el formato exacto).
3. Extraer título, descripción, objetivos, criterios, técnico, QA, notas.
4. **No alterar el fondo** acordado en la Issue; solo normalizar estructura al
   exportar a `ISSUE.md`.

---

## Paso 2 — Nombre del desarrollador (obligatorio)

- **Preguntar siempre** el nombre del desarrollador para el título
  `# {NOMBRE DESARROLLADOR} - {Título}`.
- No usar `Por asignar` sin haber preguntado.
- Si la Issue ya incluye un nombre en el título, confirmar con el usuario.

---

## Paso 3 — Slug WIP

- Proponer `{feature-slug}` en kebab-case a partir del título de la Issue.
- El usuario **confirma** antes de crear `docs/_wip/{slug}/` (igual que en `spec`).

---

## Paso 4 — Mapeo al cuestionario (pre-preguntas)

Antes de las rondas de preguntas, rellenar borrador de **Cobertura del
cuestionario** ([spec-questionnaire.md](spec-questionnaire.md), categorías **A–H**):

| Si la Issue ya cubre… | Marcar |
|-----------------------|--------|
| Explícitamente y sin ambigüedad | **Cerrada** (referencia: «según Issue, §…») |
| No aplica a la feature | **N/A** |
| Mencionado pero vago | **Abierto** → incluir en rondas de preguntas |
| Ausente | **Abierto** |

La Issue **no sustituye** el cuestionario: reduce preguntas pero **no elimina**
rondas mínimas ni categorías obligatorias aplicables.

---

## Paso 5 — Descubrimiento del repo

Igual que modo `spec`: [discovery-checklist.md](discovery-checklist.md) y
[reuse-patterns-checklist.md](reuse-patterns-checklist.md) **antes** de cerrar
huecos solo con la Issue.

---

## Paso 6 — Rondas de preguntas (huecos + patrones)

- Completar categorías **A–H** aún abiertas.
- **Mínimo dos rondas** si hay UI, listados, búsqueda, API o permisos — aunque la
  Issue sea larga.
- Mostrar patrones existentes del repo («en X ya se hace así; ¿replicamos?»).
- Registrar **nuevas decisiones solo en SPEC** (no en el log del agente como fuente
  de decisiones de negocio).

---

## Paso 7 — Gate pre-WIP (igual que S2.5 en `spec`)

**STOP.** No crear archivos en `docs/_wip/` hasta:

1. Tabla **Cobertura del cuestionario** completa en el chat.
2. Propuesta **1 vs N** HU confirmada.
3. **OK explícito** del usuario para generar artefactos WIP.

---

## Paso 8 — Escribir artefactos WIP

Orden recomendado:

### 8.1 — `SPEC.md` (misma plantilla y rol que en `spec`)

- Sección **«Cómo se construyó esta especificación»**: importación desde Issue +
  rondas de preguntas para huecos.
- Incluir Issue original o enlace/resumen en «Punto de partida».
- **Misma funcionalidad** que en modo `spec`: decisiones, HU, criterios, escenarios,
  patrones repo, cobertura cuestionario, etc.
- La Issue del usuario es **entrada**, no reemplazo del SPEC.

### 8.2 — Issue(s) (formato del usuario)

Usar [templates/ISSUE.md](../templates/ISSUE.md).

**Regla 1 Issue = 1 HU** (igual que S4 en modo `spec`):

| Historias | Archivos |
|-----------|----------|
| 1 HU | `ISSUE.md` |
| N > 1 | `issues/HU-01.md`, `issues/HU-02.md`, … + índice en SPEC |

Formato de cada Issue:

```markdown
# {NOMBRE DESARROLLADOR} - {Título}
### 📌 Descripción
### 🎯 Objetivos
### ✅ Criterios de aceptación
### 🛠️ Consideraciones técnicas
### 🧪 QA / Pruebas
### 📎 Notas adicionales
```

- Basarse en la Issue importada (normalmente **1 HU** → `ISSUE.md`); si N > 1,
  repartir alcance entre `issues/HU-XX.md` según SPEC.
- Incorporar criterios u objetivos **añadidos** en el cuestionario para alinear
  Issue y SPEC (sin reescribir el espíritu de la Issue original).
- Metadatos WIP solo al inicio del archivo local.

### 8.3 — `PROMPT.md` y `USER_SUMMARY.md`

Igual que modo `spec`. En `USER_SUMMARY.md`: estado «Issue importada — especificación
cerrada — implementación pendiente».

---

## Paso 9 — Gate antes de `implement` (S7)

**STOP.** Esperar OK explícito del usuario antes de invocar
`feature-workflow implement` (igual que al cerrar `spec`).

---

## Comparación rápida `spec` vs `issue`

| Aspecto | `spec` | `issue` |
|---------|--------|---------|
| Entrada | Requerimiento vago | Issue existente |
| Punto de partida en SPEC | Requerimiento literal | Issue importada + huecos |
| Issue(s) | `ISSUE.md` si 1 HU; `issues/HU-XX.md` si N > 1 | Igual en ambos modos |
| Cuestionario A–H | Completo | Completo (ítems pre-cerrados si la Issue los cubre) |
| Gate pre-WIP | S2.5 | Igual |
| Siguiente paso | `implement` | `implement` |

---

## Exportar Issue al gestor

Igual que en `spec`: un solo bloque Markdown, sin metadatos WIP ni instrucciones
del agente.
