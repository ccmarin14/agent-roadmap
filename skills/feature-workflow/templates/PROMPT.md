# Prompt de implementación — {título de la issue}

**WIP:** `docs/_wip/{feature-slug}/`  
**Issue:** [ISSUE.md](ISSUE.md) · **Build:** [AGENTS_BUILD.md](AGENTS_BUILD.md)

Al iniciar implementación, crear `AGENTS_BUILD.md` desde la plantilla y copiar
ahí el snapshot mínimo de contexto (HU, decisiones, criterios, escenarios) para
trabajar sin reabrir SPEC.

---

## Tarea

Implementa la issue **«{título descriptivo}»** siguiendo este prompt y
[reference/phase-gates.md](../reference/phase-gates.md) (en el paquete skill).

Lee `ISSUE.md` y el snapshot en `AGENTS_BUILD.md` antes de escribir código.

---

## Flujo obligatorio (checklist)

No avances de fase sin aprobación del usuario:

1. **Implementación** — código listo; **sin tests automatizados**.
2. **Revisión** — `USER_SUMMARY.md` + `AGENTS_BUILD.md`; bucle de ajustes: tras
   cada cambio actualizar ambos archivos y preguntar «¿otro ajuste o Fase 3?»;
   espera OK explícito para continuar.
3. **Pruebas manuales** — propuesta concreta; usuario valida; espera OK.
4. **Tests automatizados** — solo tras OK en 2 y 3; solo si el proyecto los usa.
5. **Documentación** — solo si hace falta; seguir convenciones del repo.
6. **Cierre** — commit opcional; preguntar qué conservar del WIP.

Detalle de cada fase: ver `phase-gates.md` del paquete skill.

---

## Alcance funcional

- {ítem verificable}
- {ítem}

---

## Fuera de alcance

- {ítem}

---

## Arquitectura y convenciones

{Descubiertas en el repo — capas, comandos lint/test, política de commits.}

**Patrones referencia (obligatorio):** listar archivos del repo usados como modelo
(página similar, paginación, modal, controller, capas). Ver
`reuse-patterns-checklist.md`.

| Patrón | Archivo referencia |
|--------|-------------------|
| | |

| Tema | Valor |
|------|-------|
| Lint | |
| Format | |
| Tests | |
| Commits | |

---

## Archivos principales (orientativo)

| Área | Archivo / nota |
|------|----------------|
| | |

---

## Entregables por fase

| Fase | Entregable |
|------|------------|
| 1 | Código; lint/format OK; sin tests automatizados |
| 2 | `USER_SUMMARY.md` — revisión + tabla «Por qué se tocó» por archivo; chat con ruta por capas |
| 3 | Tabla de pruebas manuales en `AGENTS_BUILD.md` |
| 4 | Tests actualizados; suite en verde (si aplica) |
| 5 | Docs de producto del repo (si aplica) |
| 6 | Cierre; limpieza WIP según usuario |

---

## Git

No hacer `git commit` salvo petición explícita del usuario. Mensajes en español:
`tipo(scope): descripción`.

---

## Restricciones

- No modificar tests automatizados hasta Fase 4 (si el proyecto los usa).
- No avanzar de fase sin aprobación del usuario.
- Actualizar `AGENTS_BUILD.md` (pasos, archivos, historial) y `USER_SUMMARY.md`
  en cada hito relevante y **tras cada ajuste de Fase 2**.
- Tras cada ajuste en Fase 2: preguntar si hay otro ajuste o si se continúa a Fase 3.
