# AGENTS.md - Agent Forge

Directrices para agentes de IA que operan en este repositorio.

---

## 🛠 Comandos

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm run preview

# Tests (si están configurados)
npx vitest run
npx vitest run path/to/test.tsx
```

---

## Stack

- React 18 + TypeScript 5
- Vite 5
- Tailwind CSS v4
- Supabase (auth + db)
- React Router DOM
- Recharts

---

## Estructura

```
src/
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

---

## Convenciones

### Extensiones
- `.ts` — lógica pura
- `.tsx` — componentes React

### Imports
- Named exports obligatorios
- Sin extensiones
- Orden: React → Libraries → Data → Components → Utils

### Naming
- Componentes: `PascalCase`
- Funciones: `camelCase`
- Constantes: `UPPER_SNAKE`
- Tipos: `PascalCase`

### Estilos
- Tailwind CSS para layouts
- Tokens de `theme.ts` para colores: `C.surface`, `C.text`

### TypeScript
- **No usar `any`**
- Definir tipos en `types.ts`
- Usar `readonly` para arrays inmutables

---

## Reglas

1. **No romper persistencia** — cambios en estructura de levels invalidan progreso guardado
2. **No usar `any`**
3. **No agregar librerías** sin justificación
4. **No modificar auth** sin necesidad

---

## Contenido del Roadmap

Al agregar temas:
- 3-4 checks por item
- Quiz: 3-5 preguntas, 90% para aprobar
- examQuestions para exámenes por nivel

---

## Variables de Entorno

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_KEY=
VITE_ALLOW_GUESTS=true
VITE_EXAMS_FOR_USERS=true
VITE_EXAMS_FOR_GUESTS=true
VITE_ADMIN_PASSWORD=
```
