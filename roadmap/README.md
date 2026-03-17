# Agent Forge — Roadmap de Agentes de IA

Hoja de ruta interactiva para aprender a trabajar con agentes de IA, desde los fundamentos hasta la orquestación multi-agente en un entorno de equipo colaborativo.

---

## ¿Qué es esto?

Agent Forge es una herramienta de aprendizaje autoguiada construida como una app en React. Cubre todo lo necesario para pasar de entender qué es un LLM a ejecutar un pipeline completo de orquestación con agentes especializados trabajando en paralelo.

Cada nivel tiene explicaciones detalladas por tema, quizzes integrados y un checklist de criterios concretos — avanzas cuando puedes demostrar el aprendizaje, no solo cuando lo has leído.

---

## Características

- **Autenticación**: Login con email/password (Supabase) o modo invitado
- **Quizzes**: Preguntas de opción múltiple en cada sección (90% para aprobar)
- **Exámenes**: Exámenes por nivel para desbloquear el siguiente
- **Referencias**: Recursos externos integrados en cada tema
- **Progreso**: Persistido en Supabase (usuarios) y LocalStorage (invitados)

---

## Roadmap

### Nivel 01 — Fundamentos `1–2 semanas · Individual`

La capa base. Antes de tocar cualquier herramienta, necesitas un modelo mental sólido de con qué estás trabajando.

- **Qué es un LLM** — tokens, ventana de contexto, temperatura, por qué ocurren las alucinaciones
- **Modelos** — Anthropic (Claude Haiku / Sonnet / Opus), OpenAI (GPT-4.1, o-series), Google (Gemini 2.5 Pro), DeepSeek (R1, V3), Qwen (Qwen3-Coder), OpenCode Zen
- **Qué es un agente** — la diferencia entre un chatbot y un agente, el ciclo ReAct, patrones de razonamiento (Reflexion, Self-Ask, Planning Jerárquico), confianza y riesgos
- **IDE y Consola** — Cursor, Windsurf, Kiro (AWS), OpenCode, Claude Code, Gemini CLI, gestión de sesiones, estructura de prompts
- **AGENTS.md** — qué es, estructura mínima viable, convenciones de equipo, contexto de negocio, overrides jerárquicos, ciclo de actualización

---

### Nivel 02 — Herramientas de equipo `2–4 semanas · Equipo pequeño (2–5)`

La capa donde los flujos individuales se convierten en flujos de equipo.

- **MCP (Model Context Protocol)** — qué es y por qué importa, arquitectura server/client/host, servidores locales vs remotos, los 5 MCPs fundamentales para desarrollo, seguridad (prompt injection, tool poisoning), eficiencia de contexto, construir tu propio MCP server
- **Skills** — diferencia entre Skills y MCP, anatomía de un SKILL.md, carga progresiva, skills esenciales para desarrollo, scope de proyecto vs global, crear skills propios del equipo
- **Documentación técnica** — mantener docs sincronizadas con Context7, documentación interna del proyecto y ADRs, documentación generada por el agente
- **Librería de prompts** — PROMPTS.md como conocimiento colectivo, prompts de onboarding de sesión, prompts por tipo de tarea

---

### Nivel 03 — Automatización `1–2 meses · Equipo de 3–8`

El agente deja de ser una herramienta de consulta y se convierte en parte del pipeline de desarrollo.

- **Hooks y scripts** — review pre-commit, changelog post-merge, scripts CLI compartidos, hooks del ciclo de vida de Skills
- **Flujos automatizados** — pipeline Issue → PR, flujo de migraciones de base de datos, sesiones especializadas por propósito
- **AGENTS.md avanzado** — patrón Plan-Act-Reflect, overrides por squad o módulo

---

### Nivel 04 — Orquestación `2–3 meses · Equipo de 5–15`

Múltiples agentes especializados trabajando en coordinación. El orquestador gestiona el ciclo de vida completo de un feature.

- **Agentes especializados** — el principio de especialización, agente de tests, agente de code review, agente de documentación, agente de seguridad
- **Coordinación** — el patrón orquestador (contexto limpio siempre), protocolo de handoff entre agentes, pipeline completo de feature, `context:fork` para análisis aislados

---

## Demo

Consulta la versión online: **https://test-web.master2000.net/agentforge/**

---

## Cómo correrlo

### Clona el repositorio y corre la app localmente:

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

### Build producción:

```bash
npm run build
npm run preview
```

---

## Variables de Entorno

Para configurar la aplicación, crea un archivo `.env`:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_KEY=tu_key_de_supabase
VITE_ALLOW_GUESTS=true
VITE_EXAMS_FOR_USERS=true
VITE_EXAMS_FOR_GUESTS=true
```

---

## Estructura del proyecto

```
src/
├── data/
│   ├── index.ts          # Exporta el array LEVELS
│   ├── level01.ts       # Datos del Nivel 01
│   ├── level02.ts       # Datos del Nivel 02
│   ├── levels0304.ts    # Datos de Niveles 03 y 04
│   ├── references.ts    # Referencias externas
│   └── sampleQuiz.ts   # Ejemplos de quizzes
├── components/
│   ├── TopBar.tsx       # Barra de progreso global y selector de tabs
│   ├── Sidebar.tsx      # Navegación por niveles y secciones
│   ├── SectionHeader.tsx # Tabs de sección
│   ├── ContentView.tsx  # Acordeones con checklist integrado
│   ├── ProgressView.tsx # Tarjetas de progreso y checklist completo
│   ├── ExamsView.tsx    # Vista de exámenes
│   ├── Quiz.tsx         # Componente de quiz
│   ├── Exam.tsx         # Componente de examen
│   ├── Login.tsx        # Pantalla de login
│   └── LevelLock.tsx    # Componente de nivel bloqueado
├── hooks/
│   ├── useProgress.ts   # Estado de checks, quizzes, exámenes
│   └── useAuth.ts       # Autenticación con Supabase
├── lib/
│   └── supabaseClient.ts # Cliente de Supabase
├── utils/
│   ├── unlockLogic.ts   # Lógica de desbloqueo de niveles
│   └── quizHelpers.ts   # Helpers para quizzes
├── config.ts            # Configuración centralizada
├── types.ts             # Tipos de TypeScript
├── theme.ts             # Tokens de diseño
├── App.tsx              # Componente raíz
├── main.tsx             # Entry point
└── index.css            # Estilos globales
```

---

## 🎨 Tema Visual

El roadmap tiene una estética "cyberpunk/dark", utilizando colores personalizados definidos en `src/theme.ts` para mantener la consistencia (ej. `bg: #0F1117`, `surface: #161B27`).

---

## Stack

- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS v4
- Supabase (autenticación + base de datos)
- DM Mono — Google Fonts

---

## Estado

| Nivel | Contenido | Examen |
|-------|-----------|--------|
| 01 Fundamentos | ✅ Completo | ✅ |
| 02 Herramientas | ✅ Completo | ✅ |
| 03 Automatización | ✅ Completo | ✅ |
| 04 Orquestación | ✅ Completo | ✅ |

---

## Sistema de Admin

### Cómo agregar un usuario admin

El sistema de admin usa tablas de base de datos (no password en .env). Para agregar un admin:

1. **Obtén el UUID del usuario** en Supabase Dashboard → Authentication → Users

2. **Ejecuta en SQL Editor:**
   ```sql
   INSERT INTO public.admins (user_id) VALUES ('UUID_DEL_USUARIO');
   ```

3. **Verifica que fue agregado:**
   ```sql
   SELECT * FROM public.admins;
   ```

### Permisos del admin

Un usuario admin puede ver:
- Todos los perfiles de usuarios (incluyendo emails)
- Todo el progreso de usuarios
- Todos los resultados de quizzes y exámenes

### Migraciones

El sistema de admin se crea automáticamente con la migración `supabase/migrations/20260317125500_add_admin_system.sql`. El insert del primer admin está comentado por seguridad - debe ejecutarse manualmente después del despliegue.