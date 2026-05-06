# AGENTS.md - Agent Forge & AI Toolkit

Directrices para agentes de IA que operan en este repositorio completo, que incluye una aplicación web (roadmap) y módulos de herramientas para agentes.

---

## 🛠 Módulos del Repositorio

### Roadmap (roadmap/)
Aplicación web React 18 + TypeScript para un roadmap educativo con quizzes y exámenes.

#### Comandos
```bash
npm run dev
npm run build
npm run preview
```

#### Tests
```bash
npx vitest run path/to/test.tsx
```

#### Stack
- React 18 + TypeScript 5
- Vite 5
- Tailwind CSS v4
- Supabase (auth + db)
- React Router DOM
- Recharts

#### Estructura
```
roadmap/src/
├── data/              # Contenido: levels, quizzes, exams
├── components/        # 11 componentes React
├── hooks/            # useProgress, useAuth
├── lib/              # supabaseClient
├── pages/            # AdminDashboard
├── utils/            # unlockLogic, quizHelpers
├── config.ts         # Variables de entorno
├── types.ts          # Interfaces TypeScript
├── theme.ts          # Colores del tema
├── App.tsx           # Componente raíz + rutas
└── main.tsx          # Entry point
```

#### Convenciones (Roadmap)
- Extensiones: `.ts` (lógica pura), `.tsx` (componentes React)
- Imports: Named exports obligatorios, sin extensiones, orden: React → Libraries → Data → Components → Utils
- Naming: Componentes `PascalCase`, funciones `camelCase`, constantes `UPPER_SNAKE`, tipos `PascalCase`
- Estilos: Tailwind CSS para layouts, tokens de `theme.ts` para colores: `C.surface`, `C.text`
- TypeScript: **No usar `any`**, definir tipos en `types.ts`, usar `readonly` para arrays inmutables

#### Reglas (Roadmap)
1. **No romper persistencia** — cambios en estructura de levels invalidan progreso guardado
2. **No usar `any`**
3. **No agregar librerías** sin justificación
4. **No modificar auth** sin necesidad

#### Contenido del Roadmap
Al agregar temas:
- 3-4 checks por item
- Quiz: 3-5 preguntas, 90% para aprobar
- examQuestions para exámenes por nivel

#### Variables de Entorno (Roadmap)
```env
VITE_SUPABASE_URL=
VITE_SUPABASE_KEY=
VITE_ALLOW_GUESTS=true
VITE_EXAMS_FOR_USERS=true
VITE_EXAMS_FOR_GUESTS=true
VITE_ADMIN_PASSWORD=
```

---

### Agent Tooling Modules
Estos módulos siguen convenciones independientes de la aplicación web:

#### skills/
Skills del equipo (skill-builder, feature-docs, code-review, repo-context-skill) que siguen la estructura:
```
skills/<skill-name>/
├── SKILL.md        # Instrucciones completas de la skill
├── references/     # Archivos de referencia (opcional)
└── scripts/        # Scripts auxiliares (opcional)
```
- Convenciones: SKILL.md usa Markdown, scripts usan `.ts`/`.ps1` según corresponda
- Regla: No modificar skills existentes sin mantener compatibilidad con agentes que las usan

#### mcp/
Documentación de servidores MCP (Model Context Protocol):
- Formato: Markdown para docs, JSON para configuraciones de servidores
- Regla: Mantener documentación actualizada al cambiar servidores MCP soportados

#### prompts/
Librería de prompts reutilizables:
- Formato: `.md` para prompts de texto, `.json` para prompts estructurados
- Regla: No agregar prompts que expongan datos sensibles

#### agents/
Configuraciones de agentes especializados:
- Formato: JSON para configuraciones de agentes
- Regla: No compartir configuraciones de agentes privados en partes públicas del repo

#### .agents/
Configuración de agentes específica del entorno local (no se versiona en git salvo excepciones).

---

## Reglas Generales del Repositorio
1. Los cambios en módulos de agentes (skills, prompts, agents) no deben romper la compatibilidad con agentes existentes
2. Las documentaciones (mcp/, prompts/) deben mantenerse actualizadas al cambiar las herramientas
3. No agregar nuevos módulos de agentes sin justificación clara
4. Las partes públicas del repo no deben contener credenciales ni datos sensibles
