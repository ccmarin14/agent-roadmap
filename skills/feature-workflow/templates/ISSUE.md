# {NOMBRE DESARROLLADOR} - {Título descriptivo de la issue}

> **Metadatos WIP** (no copiar al gestor si no aplica): slug `{feature-slug}` ·
> [SPEC.md](SPEC.md) · estado: {abierta | lista para implementar | cerrada}

### 📌 Descripción

Explica:

* **El problema actual o necesidad.** {Qué ocurre hoy y qué falta.}
* **El impacto para el usuario o sistema.** {Consecuencias para quien usa la
  app y para el sistema técnico.}
* **La razón por la cual se requiere el cambio.** {Por qué ahora; alineación con
  el requerimiento acordado.}

### 🎯 Objetivos

Define los resultados esperados de la implementación.

1. {objetivo medible y verificable}
2. {objetivo}
3. {objetivo}

### ✅ Criterios de aceptación

Incluye condiciones observables y verificables que permitan determinar cuándo la
tarea está completa.

**{Bloque — ej. Acceso, Búsqueda, Visualización}**

- [ ] {criterio verificable}
- [ ] {criterio}

**Reglas de negocio**

- [ ] {criterio}

### 🛠️ Consideraciones técnicas

Incluye aspectos de desarrollo, arquitectura, integración, validaciones,
rendimiento o compatibilidad que deban tenerse en cuenta.

**Arquitectura y capas**

{Convenciones descubiertas en el repo — sin repetir el proceso de la spec.}

| Área | Archivos / notas orientativas |
|------|------------------------------|
| | |

**Integración y API**

- {endpoint nuevo o existente, payload, paginación, etc.}

**Rendimiento y compatibilidad**

- {límites, índices, navegadores, roles}

**Subtareas sugeridas**

{T1 … Tn — referencia breve; detalle en SPEC.}

### 🧪 QA / Pruebas

Describe escenarios concretos para validar el correcto funcionamiento de la
solución.

| # | Escenario | Pasos | Resultado esperado |
|---|-----------|-------|-------------------|
| 1 | Caso feliz | | |
| 2 | Caso límite | | |
| 3 | Regresión | | |

**Automatizado (fase 4 del workflow, no antes):** {comando y rutas de test del
repo, si existen.}

### 📎 Notas adicionales

Incluye aclaraciones, restricciones, dependencias, observaciones funcionales o
técnicas relevantes.

**Fuera de alcance**

- {ítem}

**Dependencias**

- {dependencia}

**Definición de hecho**

- [ ] Criterios de aceptación cumplidos
- [ ] Fases 1–5 del workflow completadas
- [ ] Pruebas manuales verificadas por el usuario
- [ ] Tests automatizados en verde (si el proyecto los usa)
- [ ] Lint/format sin errores en archivos tocados
- [ ] Documentación actualizada solo si aplica

**Observaciones**

- {cualquier aclaración extra}

---

## Instrucciones para el agente (no incluir en la Issue exportada)

Al **derivar** `ISSUE.md` desde `SPEC.md` (modo `spec`):

Al **redactar** `ISSUE.md` en modo `issue`:

1. Basarse en la Issue importada del usuario; normalizar secciones/emojis sin
   cambiar el fondo acordado.
2. Sincronizar con `SPEC.md` si el cuestionario añadió criterios u objetivos.

En **ambos modos**:

1. **Título:** `# {NOMBRE DESARROLLADOR} - {Título}` — sin códigos HU ni IDs internos.
   - Modo `spec`: preguntar nombre del desarrollador; si no se conoce, usar `Por asignar`.
   - Modo `issue`: **preguntar siempre** el nombre del desarrollador.
2. **Secciones:** usar exactamente los encabezados `###` con emojis de esta plantilla.
3. **Contenido:** complementar SPEC sin duplicar el proceso de refinamiento ni
   las tablas de decisiones extensas (modo `spec`); o respetar Issue importada
   y alinear con SPEC (modo `issue`).
4. **Exportar al gestor / chat:** si el usuario pide la Issue para copiar:

   **Formato de respuesta**

   - Devuelve **únicamente** la Issue completa (sin metadatos WIP ni esta sección).
   - La respuesta debe estar contenida **completamente** dentro de un **único**
     bloque de código Markdown.
