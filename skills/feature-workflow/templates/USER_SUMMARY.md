# Resumen para el usuario — {título de la feature}

Documento en lenguaje claro. Se actualiza en especificación, revisión (Fase 2),
pruebas manuales (Fase 3) y cuando hay ajustes relevantes.

**WIP:** `docs/_wip/{feature-slug}/`  
**Última actualización:** {YYYY-MM-DD}

---

## Estado actual

| Campo | Valor |
|-------|--------|
| **Fase** | {especificación | implementación Fase N | cerrada} |
| **Próximo paso** | {acción concreta para el usuario o el agente} |
| **Bloqueos** | {ninguno | descripción} |

---

## Resumen ejecutivo

{Un párrafo: qué se busca o qué se hizo, sin jerga innecesaria.}

---

## Qué se decidió (en breve)

| Tema | Decisión |
|------|----------|
| | |

{Solo extracto legible; el detalle y el proceso viven en SPEC.md.}

---

## Revisión de cambios (Fase 2)

Completar tras la Fase 1 de implementación. Esta sección debe permitir revisar
**sin abrir el diff** qué se hizo y **por qué** se tocó cada archivo.

### Qué problema resuelve

{1–2 frases}

### Qué cambió para el usuario

- {comportamiento visible}

### Ruta de cambios por capa (resumen)

Recorrido breve en lenguaje sencillo — **complementa** la tabla de archivos, no
la sustituye.

1. **{Capa — ej. API, dominio, UI}:** {qué se añadió o cambió y para qué.}
2. **{Capa}:** {…}

### Ruta de cambios por archivo (obligatorio)

**Una fila por cada archivo creado o modificado** en la Fase 1. Explicar el
**por qué** (razón de negocio o técnica en lenguaje claro), no el diff ni el
código.

| Archivo | Capa / área | Por qué se tocó | Patrón de referencia |
|---------|-------------|-----------------|----------------------|
| `{ruta/ejemplo.php}` | API | {motivo} | `{archivo similar}` o «nuevo» |
| `{ruta/ejemplo.vue}` | UI | {motivo} | `{Page.vue existente}` |

{Columna «Patrón de referencia»: archivo o pantalla del repo copiada como modelo.
Si es diseño nuevo sin analogía, indicar «sin precedente» y motivo.}

### Consistencia con la app

{Qué comportamientos visuales o técnicos se alinearon con features existentes.}

- **Alineado con:** {ej. paginación como en X, menú como en Y}
- **Desvíos deliberados:** {solo si están en SPEC o acordados con el usuario}

### Qué se eliminó o dejó de hacer

- {ítem}

### Riesgos o limitaciones conocidas

- {ítem}

### Aprobación Fase 2

- [ ] Usuario confirmó **continuar a Fase 3** (tras cero o más iteraciones de ajuste)
- [ ] Última pregunta respondida: «¿otro ajuste o Fase 3?» → continuó a Fase 3

---

## Iteraciones Fase 2 (ajustes tras revisión)

Registrar **cada vuelta** cuando el usuario pide cambios antes de aprobar Fase 3.
Actualizar esta tabla y las secciones superiores (tabla de archivos, comportamiento
visible) en la misma iteración.

| # | Fecha | Qué pidió el usuario | Qué cambió (para el usuario) | Archivos afectados |
|---|-------|---------------------|------------------------------|-------------------|
| 1 | | | | |
| 2 | | | | |

{Iteración 0 = entrega inicial de Fase 2, opcional como fila o solo en «Revisión de cambios».}

---

## Pruebas manuales (Fase 3)

| # | Prueba | Resultado |
|---|--------|-----------|
| 1 | | OK / KO / pendiente |

### Aprobación Fase 3

- [ ] Usuario confirmó que las pruebas son satisfactorias

---

## Iteraciones y ajustes (otras fases)

| Fecha | Fase | Qué pidió el usuario | Qué se hizo | Archivos afectados |
|-------|------|---------------------|-------------|-------------------|
| | Fase 3+ | | | |

---

## Cierre

### Resultado final

{Qué quedó entregado}

### Pendiente (si algo)

- {ítem}

### Commit

{Mensaje sugerido o «pendiente de petición del usuario»}

---

## Historial

| Fecha | Evento |
|-------|--------|
| | Documento iniciado |

---

## Instrucciones para el agente (no copiar al usuario como bloque)

**Al entregar Fase 2:**

1. Completar **toda** la sección «Revisión de cambios», en especial la tabla
   **Ruta de cambios por archivo** (una fila por archivo, sin omisiones).
2. En el **chat**, además del resumen narrativo:
   - Explicar la **ruta de cambios por capas** (API → dominio → UI, etc.).
   - Indicar cuántos archivos se tocaron y que el detalle archivo a archivo
     está en `USER_SUMMARY.md`.
   - Si son **≤ 8 archivos**, puede pegarse la tabla completa también en el chat.
   - Si son **más**, el chat debe recorrer cada capa mencionando los archivos
     clave y remitir a la tabla del summary para el listado exhaustivo.
3. **Prohibido** entregar Fase 2 solo con bullets genéricos («API», «App») sin
   justificar cada archivo.
4. Completar **Consistencia con la app**: qué patrones existentes se siguieron;
   desvíos solo si estaban en SPEC o acordados.
5. **Prohibido** haber implementado UI/API distinta a otras pantallas similares
   sin haberlo buscado, preguntado o documentado en spec.
6. Obtener la lista de archivos desde el diff / `AGENTS_BUILD.md` §7 y
   contrastar que la tabla del summary está completa antes de pedir OK.

**Tras cada ajuste en Fase 2:**

1. Actualizar `AGENTS_BUILD.md` (§6, §7, §9) y esta sección «Iteraciones Fase 2».
2. Resumir el ajuste en el chat.
3. **Preguntar obligatoriamente:** «¿Otro ajuste o continuamos a Fase 3?»
4. No pasar a Fase 3 hasta respuesta explícita de continuar.
