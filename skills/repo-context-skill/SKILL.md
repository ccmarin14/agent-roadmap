---
name: repo-context-skill
description: >
  Analiza un proyecto de software y determina qué archivos de contexto necesita para funcionar bien
  con agentes de IA. Usar esta skill cuando el usuario pregunte cómo preparar su repo para IA,
  qué archivos añadir para agentes, cómo estructurar su repositorio para desarrollo asistido por LLMs,
  o quiera crear archivos como AGENTS.md, AUDIENCE.md, llms.txt, ADR, SECURITY.md, DESIGN.md
  o especificaciones OpenAPI. También activar cuando el usuario diga que su agente "no entiende
  el proyecto", "sigue tomando decisiones incorrectas" o "necesita más contexto". Esta skill evita
  recomendar archivos a ciegas — diagnostica primero y recomienda solo lo que el proyecto realmente necesita.
---

# Skill: Contexto de Repositorio

Esta skill ayuda a preparar un repositorio para que los agentes de IA puedan trabajar en él con
eficacia. El objetivo NO es añadir documentación por añadir. El objetivo es hacer explícito el
contexto implícito, para que los agentes dejen de adivinar y empiecen a trabajar correctamente.

## Principio fundamental

Los archivos de contexto son inversiones. Cada uno requiere tiempo para escribirse y mantenerse.
Solo recomendar archivos donde el valor supera claramente ese coste para este proyecto concreto.

---

## Paso 1: Recopilar señales del proyecto

Antes de recomendar nada, hay que entender el proyecto. Si el usuario ha compartido la estructura
del repo, código o una descripción, extraer señales de ahí. Si no, preguntar.

**NO hacer todas las preguntas a la vez.** Empezar por las más diagnósticas:

```
1. ¿Qué tipo de proyecto es? (web app, API, librería, CLI, pipeline de datos, sitio de docs, monorepo, otro)
2. ¿Es open source o interno/privado?
3. ¿Cuál es su madurez? (nuevo / en desarrollo activo / estable / legado)
```

Luego, según las respuestas, hacer preguntas de seguimiento solo si hacen falta:
- ¿Tiene un producto o UI orientado a usuarios? → señala AUDIENCE.md y DESIGN.md
- ¿Expone endpoints HTTP? → señala OpenAPI
- ¿Se usa IA activamente para trabajar en él (escribir código, generar UI, automatizar tareas)? → señala AGENTS.md
- ¿Tiene documentación pública? → señala llms.txt
- ¿Maneja datos sensibles o tiene consideraciones de seguridad? → señala SECURITY.md
- ¿El equipo ha tomado decisiones arquitectónicas no obvias que podrían reabrirse? → señala ADR

Si el usuario puede compartir la estructura del repo (aunque sea un `ls` o `tree`), es más rápido
que preguntar todo. Buscar pistas: rutas de API, componentes de UI, carpetas de docs, archivos
markdown existentes, archivos de configuración, etc.

---

## Paso 2: Clasificar el proyecto

Mapear las señales a un perfil de proyecto. Ver `references/signal-map.md` para la lógica
completa de decisión. Clasificación de alto nivel:

**Eje tamaño/madurez:**
- `solo-pequeño`: una persona, side project o prototipo inicial
- `solo-creciendo`: una persona, pero volviéndose real (usuarios, complejidad, longevidad)
- `equipo`: varios colaboradores, codebase compartido
- `producto`: tiene usuarios, marca, sistema de diseño o documentación pública

**Eje tipo:**
- `solo-backend`: APIs, servicios, pipelines de datos — sin UI orientada a usuarios
- `frontend`: UI web/móvil, orientado a diseño
- `fullstack`: ambos
- `librería`: importada por otros proyectos, sin UI
- `cli`: herramientas de terminal
- `docs`: sitios de documentación, wikis

**Eje visibilidad:**
- `público`: open source o de cara al exterior
- `privado`: interno o personal

Los tres ejes juntos determinan qué archivos tienen sentido. Un proyecto `solo-pequeño / cli / privado`
necesita casi nada. Un proyecto `equipo / fullstack / público` puede necesitarlos todos.

---

## Paso 3: Recomendar archivos

Usando la clasificación, recomendar archivos en tres niveles:

### Nivel 1 — Esencial
Deben crearse o mejorarse de inmediato. Tienen el mayor impacto.

### Nivel 2 — Recomendado
Aportan valor real para este proyecto. Vale la pena hacerlos pronto.

### Nivel 3 — Opcional / Más adelante
Podrían ayudar, pero la relación coste/beneficio es marginal para este proyecto ahora mismo.
Ser honesto cuando un archivo no merece la pena.

### Archivos fuera de scope
Indicar siempre explícitamente qué archivos del framework NO se necesitan y por qué.
Esto evita documentación por inercia.

---

## Paso 4: Generar los archivos

Para cada archivo de Nivel 1 (y Nivel 2 si el usuario lo pide), generar un primer borrador funcional.

No generar lorem ipsum ni placeholders vacíos. Generar contenido real y específico basado en lo que
se sabe del proyecto. Si falta información para una sección, dejar un comentario claramente marcado
`<!-- TODO: [pregunta específica] -->` para que el usuario sepa exactamente qué completar.

Usar las plantillas de `references/file-templates.md` como punto de partida.
Adaptarlas — nunca copiarlas literalmente.

---

## Formato de respuesta

Estructurar la respuesta así:

```
## Diagnóstico del proyecto
[2–3 frases resumiendo el perfil del proyecto y por qué importa para los archivos de contexto]

## Qué necesita este proyecto

### ✅ Esencial
- **ARCHIVO.md** — [una frase sobre por qué, específica a este proyecto]

### 📋 Recomendado
- **ARCHIVO.md** — [una frase sobre por qué]

### 💡 Opcional
- **ARCHIVO.md** — [una frase sobre por qué, y cuándo pasaría a merecer la pena]

### ❌ No necesario
- **ARCHIVO** — [razón breve]

---

## Borradores

[Contenido generado para cada archivo Esencial, luego Recomendado si se solicita]
```

---

## Antipatrones a evitar

- **No recomendar todos los archivos a todos los proyectos.** Un script que alguien ejecuta en local no necesita SECURITY.md, AUDIENCE.md ni llms.txt.
- **No generar boilerplate genérico.** Un AGENTS.md que dice "ejecuta los tests antes de hacer commit" sin saber el comando concreto es peor que no tener nada — malgasta la atención del agente en ruido.
- **No confundir archivos específicos de herramienta con contexto universal.** Archivos como `.cursor/rules`, `CLAUDE.md` o instrucciones de Copilot son específicos de herramienta y están fuera del scope de esta skill. Centrarse solo en archivos de contexto agnósticos que cualquier agente pueda usar.
- **No recomendar ADRs donde no hay decisiones que registrar.** Proyectos nuevos sin decisiones arquitectónicas aún no necesitan infraestructura ADR.
- **No crear carga de mantenimiento sin valor proporcional.** Cada archivo recomendado deberá mantenerse actualizado.
