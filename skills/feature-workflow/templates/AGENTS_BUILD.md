# Build de implementación — {título de la issue}

Documento **autocontenido** de trabajo del agente. No debe depender de leer
`SPEC.md` en cada turno.

**WIP:** `docs/_wip/{feature-slug}/`  
**Última actualización:** {YYYY-MM-DD}

---

## 1. Historia de usuario (snapshot)

**Como** {persona},  
**quiero** {acción},  
**para** {beneficio}.

### Incluye

- {ítem}

### Fuera de alcance

- {ítem}

---

## 2. Decisiones de producto (resumen)

| # | Tema | Decisión |
|---|------|----------|
| 1 | | |

---

## 3. Criterios de aceptación (snapshot)

### {Bloque}

1. {criterio}

---

## 4. Escenarios QA (Given / When / Then)

| # | Dado | Cuando | Entonces |
|---|------|--------|----------|
| 1 | | | |

---

## 5. Instrucciones de trabajo del agente

### Convenciones del proyecto

| Tema | Valor |
|------|-------|
| Arquitectura | |
| Lint / format | |
| Tests | |
| Commits | |
| Docs | |

### Patrones referencia (del SPEC)

| Área | Archivo modelo | Reutilizar |
|------|----------------|------------|
| | | |

Antes de crear archivos nuevos, contrastar con esta tabla. Si se desvía sin estar
en SPEC, detener y consultar al usuario.

**Fase 2 iterativa:** tras cada ajuste del usuario, actualizar §6, §7 y §9 de este
archivo y la sección «Iteraciones Fase 2» de `USER_SUMMARY.md`; luego preguntar
si hay otro ajuste o se continúa a Fase 3.

### Archivos principales

| Área | Archivo |
|------|---------|
| | |

### Comportamiento / regresiones a evitar

- {qué no debe reaparecer o romperse}

### Git

- Sin `git commit` salvo petición explícita.
- Mensajes en español: `tipo(scope): descripción`.

### Restricciones

- No tocar tests automatizados hasta Fase 4 (si el proyecto los usa).
- No avanzar de fase sin aprobación del usuario.

---

## 6. Pasos (único listado de avance)

| Estado | Paso |
|--------|------|
| [ ] | **1.** Leer prompt, issue y convenciones del repo |
| [ ] | **2.** {spike o verificación inicial si aplica} |
| [ ] | **3.** Implementación — {subtarea} |
| [ ] | **N.** Entregar revisión Fase 2 inicial (`USER_SUMMARY.md`) |
| [ ] | **N+1.** Usuario: ajuste #1 → implementar → actualizar BUILD + SUMMARY |
| [ ] | **N+2.** Preguntar: ¿otro ajuste o Fase 3? |
| [ ] | **…** | Repetir N+1–N+2 por cada ajuste |
| [ ] | **N+k.** Usuario confirma continuar a Fase 3 |
| [ ] | **N+2.** Propuesta pruebas manuales Fase 3 |
| [ ] | **N+3.** Usuario confirma Fase 3 |
| [ ] | **N+4.** Tests automatizados Fase 4 (si aplica) |
| [ ] | **N+5.** Documentación Fase 5 (si aplica) |
| [ ] | **N+6.** Cierre Fase 6 — DoD, limpieza WIP |

**Riesgos abiertos:** {lista}

---

## 7. Archivos modificados

Sincronizar con la tabla «Ruta de cambios por archivo» de `USER_SUMMARY.md`
(Fase 2). Aquí el detalle técnico del **cambio**; en USER_SUMMARY el **por qué**
en lenguaje claro.

| Área | Archivo | Cambio |
|------|---------|--------|
| | | |

**Sin tocar:** {archivos explícitamente excluidos}

---

## 8. Notas de dominio (opcional)

{Tablas o reglas específicas del dominio — ej. variantes por configuración,
idioma, permisos. Omitir sección si no aplica.}

| Condición | Comportamiento esperado |
|-----------|-------------------------|
| | |

---

## 9. Historial del chat (cronológico)

| # | Momento | Qué ocurrió |
|---|---------|-------------|
| 1 | | |

---

## 10. Incidentes (opcional)

### {Título del incidente}

**Síntoma:** {qué reportó el usuario}

**Diagnóstico:** {datos, código, hipótesis}

**Conclusión:** {causa raíz}

**Corrección:** {cambio aplicado o pendiente}

---

## 11. Pruebas manuales (Fase 3)

Marcar OK / KO al probar. Recargar/reiniciar según aplique al proyecto.

| # | Qué hacer | Qué debe pasar | OK/KO |
|---|-----------|----------------|-------|
| 1 | | | |
| 2 | | | |

---

## 12. Cierre (Fase 6)

### DoD

- [ ] Criterios de aceptación cumplidos
- [ ] Fases 2–3 aprobadas por el usuario
- [ ] Tests en verde (si aplica)
- [ ] Lint/format OK

### Limpieza WIP (preguntar al usuario)

| Archivo | ¿Conservar? |
|---------|-------------|
| SPEC.md | |
| ISSUE.md | |
| PROMPT.md | |
| AGENTS_BUILD.md | |
| USER_SUMMARY.md | |
| ACTIVITY.md | |
| Carpeta completa | |

---

## Historial de ediciones de este archivo

| Fecha | Evento |
|-------|--------|
| | Creación del build |
