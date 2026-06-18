# Actividades — {título de la feature}

Registro de sesiones con fecha, hora de inicio y fin. Redactado **como si lo
escribiera el usuario** que realizó el trabajo (primera persona).

**WIP:** `docs/_wip/{feature-slug}/`

---

## Sesión actual

Completar al **iniciar** la sesión (inicio) y al **cerrar** o pausar (fin y lista
de actividades).

#### **Fecha:** {DD/MM/YYYY}
##### **Inicio:** {h:mm am|pm}
##### **Fin:** {h:mm am|pm}

**Actividades**

- {Ej.: Elaboré la especificación y la issue a partir del requerimiento.}
- {Ej.: Programé la pantalla del buscador y el modal de detalle.}
- {Ej.: Revisé en la app con don Gonzalo y pedí ajustes al layout.}
- {Ej.: Validé las pruebas manuales y aprobé la Fase 2.}

---

## Sesiones anteriores

Al abrir una **nueva sesión**, mover el bloque de «Sesión actual» aquí (sin
cambiar su contenido) y crear un bloque nuevo arriba.

### {DD/MM/YYYY}

#### **Fecha:** {DD/MM/YYYY}
##### **Inicio:** {h:mm am|pm}
##### **Fin:** {h:mm am|pm}

**Actividades**

- {actividad en primera persona}

---

## Instrucciones para el agente

### Voz y estilo (obligatorio)

- Redactar **en primera persona**, como un diario del **usuario** que hizo el
  trabajo: *Elaboré…*, *Programé…*, *Revisé…*, *Ajusté…*, *Probé…*, *Aprobé…*.
- El lector debe sentir que **el usuario** escribió la lista al cerrar su jornada.
- **Prohibido:** voz del agente («el agente implementó»), impersonal técnica
  («Implementación API:», «Fase 2 completada»), ni copiar tal cual `AGENTS_BUILD.md`.

| Evitar | Preferir |
|--------|----------|
| Implementación API: `ExpressionSearchService` | Implementé el buscador en la API con búsqueda paginada. |
| Ajustes UI Fase 2: layout tipo informe | Ajusté la pantalla para que el layout sea como el de informes. |
| Tests Vitest: mapper.test.js | Escribí y ejecuté los tests del buscador hasta dejarlos en verde. |
| Fase 3: pruebas 1-13 OK | Probé los 13 casos en la app y confirmé que todo funciona. |

- Lenguaje **claro y humano**; nombres de archivos o clases solo si ayudan al
  recuerdo del usuario, no como inventario técnico.
- Incluir reuniones, decisiones, pruebas en la app y aprobaciones de fases desde
  la perspectiva del usuario.

### Formato y momentos

1. **Inicio de sesión:** registrar fecha e **Inicio**; **Fin** pendiente hasta cierre.
2. **Cierre de sesión o Fase 6:** completar **Fin** y viñetas del día.
3. **Tras iteraciones de Fase 2:** añadir viñetas nuevas en la misma sesión (ej.
   «Pedí que el botón Buscar quedara junto al campo y lo ajusté en la pantalla.»).
4. Encabezados fijos: `#### **Fecha:**`, `##### **Inicio:**`, `##### **Fin:**`,
   `**Actividades**` + lista con guiones.
5. **Horas:** 12 h con am/pm (`8:00 am`, `2:15 pm`). **Fechas:** `DD/MM/YYYY`.
