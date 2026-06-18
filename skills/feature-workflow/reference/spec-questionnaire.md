# Cuestionario de especificación (obligatorio antes del SPEC)

Antes de crear **cualquier archivo** en `docs/_wip/`, el agente debe cubrir las
categorías aplicables al requerimiento. Usar `AskQuestion` cuando la plataforma
lo permita.

## Reglas

1. **Mínimo dos rondas temáticas** de preguntas, salvo requerimiento ya
   exhaustivo acordado por el usuario.
2. **Una sola ronda no basta** para requerimientos con UI, listados, búsqueda,
   formularios, permisos o API nueva.
3. No confundir **mención en el prompt** con **decisión cerrada**: si el usuario
   dijo «paginación» o «botón buscar», aún hay que detallar UX y comportamiento.
4. Cada categoría queda en una de tres estados:
   - **Cerrada** — decisión tomada (registrar en SPEC).
   - **N/A** — no aplica a esta feature (justificar en una línea).
   - **Diferida** — se decidirá en implementación/UI (solo con OK explícito del
     usuario; registrar en «Qué quedó para implementación»).

5. Al terminar las rondas, rellenar la tabla **Cobertura del cuestionario** (en
   el resumen pre-SPEC y luego en SPEC.md).

---

## Rondas temáticas sugeridas

| Ronda | Foco | Cuándo |
|-------|------|--------|
| **1** | Alcance, persona, permisos, dónde vive la feature | Siempre |
| **2** | UX, layout, **patrones existentes en el repo**, interacción, estados | Si hay UI |
| **3** | Datos, API, paginación, rendimiento, casos límite | Si hay backend o listados |
| **4** | Copy, accesibilidad, regresiones, fuera de alcance | Si quedan huecos |

No pasar a la siguiente ronda si la anterior dejó categorías **sin cerrar ni
marcar N/A** entre las obligatorias de abajo.

---

## Categorías obligatorias

Marcar cada fila antes del gate pre-SPEC.

### A — Alcance y valor

| ID | Pregunta guía | Obligatoria |
|----|---------------|-------------|
| A1 | ¿Quién usa la feature (rol/persona)? | Sí |
| A2 | ¿Dónde vive en el producto (menú, ruta, modal, pantalla)? | Si hay UI |
| A3 | ¿Qué problema resuelve y qué queda fuera de alcance? | Sí |
| A4 | ¿Profesor, admin u otros roles ven o hacen lo mismo? | Si hay roles |

### B — UX y aspecto visual

| ID | Pregunta guía | Obligatoria |
|----|---------------|-------------|
| B1 | ¿Layout (página, drawer, modal, sección embebida)? | Si hay UI |
| B2 | ¿Qué pantallas/componentes **del repo** sirven de modelo? (obligatorio buscar) | Si hay UI |
| B3 | ¿Qué ve el usuario en la lista/tabla antes de actuar? | Si hay listado |
| B4 | ¿Qué pasa al seleccionar un ítem (detalle, navegación, panel)? | Si hay selección |
| B5 | ¿Estados vacío, cargando y error (copy y comportamiento)? | Si hay UI |
| B6 | ¿Responsive / móvil relevante? | Si hay UI pública |

### C — Interacción y búsqueda

| ID | Pregunta guía | Obligatoria |
|----|---------------|-------------|
| C1 | ¿Disparador (botón, Enter, enlace)? | Si hay formulario |
| C2 | ¿Tiempo real vs búsqueda explícita? | Si hay búsqueda |
| C3 | ¿Mínimo de caracteres o validaciones del input? | Si hay búsqueda |
| C4 | ¿Limpiar / resetear búsqueda y resultados? | Si hay búsqueda |
| C5 | ¿Orden de resultados (relevancia, fecha, nombre)? | Si hay listado |

### D — Paginación y volumen

| ID | Pregunta guía | Obligatoria |
|----|---------------|-------------|
| D1 | ¿Tamaño de página (fijo, configurable)? | Si hay listado o API paginada |
| D2 | ¿Controles (anterior/siguiente, números, «cargar más»)? | Si hay paginación |
| D3 | ¿Total de resultados visible para el usuario? | Si hay paginación |
| D4 | ¿Comportamiento con 0 resultados o un solo resultado? | Si hay listado |

### E — Datos y API

| ID | Pregunta guía | Obligatoria |
|----|---------------|-------------|
| E1 | ¿Endpoint nuevo o existente? | Si hay backend |
| E2 | ¿Qué entidades/campos se consultan o modifican? | Si hay backend |
| E3 | ¿Reglas de coincidencia (contiene, exacto, idioma, acentos)? | Si hay búsqueda |
| E4 | ¿Filtros por contexto (grado, módulo, curso)? | Si aplica dominio |
| E5 | ¿Riesgos de rendimiento o límites conocidos? | Si hay listados grandes |

### F — Permisos y reglas de negocio

| ID | Pregunta guía | Obligatoria |
|----|---------------|-------------|
| F1 | ¿Quién puede ver/ejecutar la acción? | Si hay roles |
| F2 | ¿Solo lectura o también editar/eliminar desde la feature? | Si hay acciones |
| F3 | ¿Auditoría, logging o métricas requeridas? | Si aplica |

### G — Calidad y cierre de spec

| ID | Pregunta guía | Obligatoria |
|----|---------------|-------------|
| G1 | ¿1 vs N historias de usuario (con justificación)? | Sí |
| G2 | ¿Casos límite y regresiones plausibles identificados? | Sí |
| G3 | ¿Escenarios GWT trazables a decisiones? | Sí |
| G4 | ¿Copy o textos visibles acordados o pendientes? | Si hay UI |

### H — Reutilización y consistencia con la app

| ID | Pregunta guía | Obligatoria |
|----|---------------|-------------|
| H1 | ¿Qué pantallas o flujos **análogos** existen? (listar archivos referencia) | Si hay UI o API similar |
| H2 | ¿Paginación, búsqueda, tablas y modales igual que en `{referencia}`? | Si hay listado/búsqueda |
| H3 | ¿Misma estructura de capas que feature vecina (repo → use case → página)? | Si hay feature full-stack |
| H4 | Si el diseño **difiere** del patrón existente: ¿motivo y OK del usuario? | Si H1 encontró analogía |

Ver detalle de búsqueda en [reuse-patterns-checklist.md](reuse-patterns-checklist.md).

---

## Plantilla: cobertura del cuestionario (pre-SPEC)

Presentar al usuario **en el chat** antes de crear archivos WIP:

```markdown
## Cobertura del cuestionario — {feature}

| ID | Estado | Decisión / N/A / Diferida |
|----|--------|---------------------------|
| A1 | Cerrada | … |
| B1 | Cerrada | … |
| D2 | Diferida | … (OK usuario: sí/no) |
| … | | |

### Huecos conscientes (si los hay)
- {ítem}

### ¿Genero SPEC.md y artefactos WIP?
Esperando tu OK explícito.
```

---

## Señales de que NO toca escribir el SPEC aún

- Solo se hizo **una** ronda de preguntas y hay UI o listados.
- Paginación, layout o permisos están **mencionados** pero no **decididos**.
- No hay tabla de cobertura o el usuario no confirmó el resumen pre-SPEC.
- Quedan categorías obligatorias sin Cerrada, N/A o Diferida con OK.

---

## Ejemplo: buscador en menú profesor

Categorías que suelen faltar si se va rápido:

| ID | Tema fácil de olvidar |
|----|------------------------|
| B1–B4 | Pantalla vs drawer; columnas de la lista; panel de detalle |
| C3–C4 | Mínimo de caracteres; botón limpiar |
| D1–D3 | 20 fijos; controles de página; mostrar total |
| E3–E4 | Acentos/mayúsculas; buscar en ES+EN; filtros por grado |
| B5 | Sin resultados / cargando |
| F1 | Profesor vs administrador |
