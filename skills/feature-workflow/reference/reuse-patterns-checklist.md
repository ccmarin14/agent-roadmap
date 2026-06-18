# Reutilización de patrones existentes

Antes de **proponer diseño**, **preguntar al usuario** o **implementar**, el agente
debe buscar en el repo funcionalidad **análoga** ya resuelta. La feature nueva
debe **alinearse** con esos patrones salvo decisión explícita de desviarse.

## Principio

> **No inventar UI, flujos ni capas si ya existe un precedente en la aplicación.**

Si se implementa distinto, debe quedar **documentado y justificado** (SPEC,
pregunta al usuario o nota en Fase 2).

---

## Cuándo ejecutar

| Momento | Acción |
|---------|--------|
| **Modo spec** (S0–S1) | Buscar analogías; preguntar reutilización vs desvío |
| **Gate pre-SPEC** | Tabla de patrones reutilizados o N/A justificado |
| **Fase 1 implementación** | Releer analogías; copiar estructura antes de crear archivos nuevos |
| **Fase 2** | Explicar qué se reutilizó y qué se desvió (y por qué) |

---

## Qué buscar (según el tipo de feature)

Adaptar las búsquedas al dominio; ejemplos de preguntas al código:

### UI y navegación

- [ ] ¿Hay **páginas similares** (listados, buscadores, dashboards) en el mismo rol/menú?
- [ ] ¿Cómo se añaden ítems al **menú** y rutas en este proyecto?
- [ ] ¿Existen **layouts** de página reutilizables (cabecera, tabs, breadcrumbs)?
- [ ] ¿Hay **modales** o drawers con el mismo patrón de detalle?

**Búsqueda sugerida:** rutas del menú, `routes`, páginas del mismo módulo (profesor,
admin, etc.), componentes `*Page.vue`, `*Modal.vue`.

### Listados, tablas y paginación

- [ ] ¿Cómo paginan **otras listas** (componente, API `page/per_page`, cursor)?
- [ ] ¿Se usa **DataTable**, `q-table`, lista custom u otro?
- [ ] ¿Patrón de **búsqueda con botón** vs tiempo real en otro sitio?
- [ ] ¿Estados vacío, cargando y error ya tienen copy/componente?

**Búsqueda sugerida:** `paginat`, `DataTable`, `search`, `per_page`, `q-table`.

### Formularios y filtros

- [ ] ¿Inputs, selects y validaciones iguales en formularios hermanos?
- [ ] ¿Mensajes de error desde i18n/`lang` existentes?

### API y backend

- [ ] ¿Endpoints de **búsqueda o listado** similares (controller, FormRequest, Service)?
- [ ] ¿Misma forma de **autorización** por rol?
- [ ] ¿Paginación Laravel estándar del proyecto (`paginate`, Resource, macro respuesta)?

**Búsqueda sugerida:** `Search`, `index`, `FormRequest`, controllers del mismo dominio.

### Arquitectura front (capas)

- [ ] ¿Flujo **Repository → UseCase → Controller → Service → Composable → Page** ya usado en una feature parecida?
- [ ] ¿Registro en **DI** (`providers`, `boot`) siguiendo un ejemplo cercano?
- [ ] ¿**Mapper** o DTO ya existe para entidades relacionadas?

**Búsqueda sugerida:** feature completa similar (no solo el componente final).

### Permisos y roles

- [ ] ¿Mismo patrón que otras pantallas de profesor/admin (middleware, guards, menú condicional)?

---

## Registro obligatorio

### En SPEC.md (modo spec)

Sección **«Patrones existentes en el repo»**:

```markdown
## Patrones existentes en el repo

| Área | Referencia en código | Qué reutilizar |
|------|---------------------|----------------|
| Paginación | `{archivo}` | Mismo componente/API que… |
| Modal detalle | `{archivo}` | Mismo layout que… |

### Desvíos acordados (si los hay)

| Aspecto | Patrón existente | Decisión en esta feature | Motivo |
|---------|------------------|--------------------------|--------|
| | | | |
```

Si no hay analogía: documentar **qué se buscó** y por qué es feature nueva.

### En preguntas al usuario (modo spec)

Incluir en ronda UX (categoría B / H del cuestionario):

- «En `{pantalla similar}` ya se hace así: `{descripción}`. ¿Replicamos el mismo patrón?»
- Opciones: **Reutilizar igual** / **Adaptar** / **Diferente (explicar por qué)**

### En AGENTS_BUILD.md (Fase 1)

Antes de codificar:

- [ ] Listar archivos **referencia** copiados como modelo.
- [ ] Confirmar que componentes compartidos (`DataTable`, modales, etc.) se usan
  antes de crear equivalentes nuevos.

### En USER_SUMMARY.md (Fase 2)

- Tabla por archivo: columna opcional **«Patrón de referencia»** si aplica.
- Subsección **«Consistencia con la app»**: qué se alineó y qué se desvió.

---

## Señales de que se saltó este paso

- Nueva página sin revisar páginas del mismo menú/rol.
- Paginación o búsqueda con UX distinta a otras listas sin preguntar.
- Nuevos archivos en todas las capas cuando una feature vecina ya tiene el mismo esqueleto.
- Modal o tabla con estilos/comportamiento inventados sin analogía.

Si ocurre en implementación ya iniciada: **detener**, documentar desvío, preguntar al
usuario si refactorizar hacia el patrón existente.

---

## Categoría del cuestionario (spec)

Ver IDs **H1–H4** en [spec-questionnaire.md](spec-questionnaire.md).
