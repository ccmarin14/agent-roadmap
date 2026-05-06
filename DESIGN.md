# DESIGN.md - Agent Forge & AI Toolkit

Sistema de diseño y convenciones de UI para la aplicación roadmap (roadmap/).
Este documento guía a agentes IA y desarrolladores al trabajar con la interfaz de usuario.

---

## Design System Overview

El roadmap usa un sistema de diseño basado en **Tailwind CSS v4** con tokens de color centralizados en `theme.ts`.

---

## Color Tokens (theme.ts)

Los colores se definen en `roadmap/src/theme.ts` y se importan como `C`:

```typescript
import { C } from './theme';
```

### Tokens Disponibles

| Token | Uso | Ejemplo Tailwind |
|-------|-----|------------------|
| `C.surface` | Fondos de tarjetas, modales, superficies elevadas | `bg-[color:var(--surface)]` o clase personalizada |
| `C.background` | Fondo principal de la app | `bg-[color:var(--background)]` |
| `C.text` | Texto principal | `text-[color:var(--text)]` |
| `C.textSecondary` | Texto secundario, descripciones | `text-[color:var(--textSecondary)]` |
| `C.primary` | Acciones primarias, botones CTA | `bg-[color:var(--primary)]` |
| `C.primaryHover` | Hover de acciones primarias | `hover:bg-[color:var(--primaryHover)]` |
| `C.success` | Estados completados, checks | `text-[color:var(--success)]` |
| `C.error` | Errores, estados fallidos | `text-[color:var(--error)]` |
| `C.warning` | Advertencias | `text-[color:var(--warning)]` |
| `C.border` | Bordes de tarjetas, inputs | `border-[color:var(--border)]` |

**Importante**: Usar siempre los tokens de `theme.ts` en lugar de colores hardcodeados para mantener consistencia.

---

## Tipografía

<!-- TODO: Documentar escala tipográfica, fuentes utilizadas, y clases de Tailwind correspondientes -->

---

## Componentes y Patrones de UI

### Estructura de Componentes
- Componentes en `roadmap/src/components/` (11 componentes principales)
- Cada componente en su propio archivo `.tsx`
- Usar `PascalCase` para nombres de componentes

### Patrones Comunes

#### Tarjetas (Cards)
- Fondo: `C.surface`
- Bordes: `C.border`
- Sombras: Usar utilidades de Tailwind (`shadow-sm`, `shadow-md`)

#### Botones
- Primario: `C.primary` con `C.primaryHover` en hover
- Secundario: `C.surface` con borde `C.border`
- Texto del botón: `C.text` o blanco según contraste

#### Formularios e Inputs
<!-- TODO: Documentar estilos de inputs, validación visual, estados de error -->

#### Quizzes y Exámenes
- Preguntas: `C.text`
- Opciones: `C.surface` con borde `C.border`
- Feedback correcto: `C.success`
- Feedback incorrecto: `C.error`
- Progreso: `C.primary`

---

## Layout y Responsive

### Breakpoints (Tailwind defaults)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Estructura de Layout
- Contenedor principal: `max-w-*` + `mx-auto` + `px-4`
- Grid para listas de niveles/temas: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Flexbox para alineación de elementos dentro de componentes

---

## Animaciones y Transiciones

<!-- TODO: Documentar transiciones usadas, duraciones, y librerías de animación si aplica -->

Ejemplo común:
```tsx
<button className="transition-colors duration-200 hover:bg-[color:var(--primaryHover)]">
```

---

## Iconos y Assets

<!-- TODO: Documentar librería de iconos usada (si aplica), o ubicación de assets estáticos -->

---

## Accesibilidad

- Contraste adecuado usando los tokens de `theme.ts`
- Texto alternativo en imágenes (si las hay)
- Navegación por teclado en quizzes y formularios
- Aria labels donde sea necesario

---

## Gráficos (Recharts)

Para gráficos en dashboards o reportes (usando Recharts):
- Colores de datos: Usar paleta del theme (rotar entre `C.primary`, `C.success`, `C.warning`)
- Fondo de gráfico: `C.surface` o `C.background` según contraste
- Texto en gráficos: `C.text` o `C.textSecondary`

---

## Checklist para Agentes IA al Modificar UI

- [ ] ¿Estoy usando tokens de `theme.ts` en lugar de colores hardcodeados?
- [ ] ¿Los nuevos componentes siguen la estructura de `components/`?
- [ ] ¿Se mantiene la accesibilidad (contraste, navegación por teclado)?
- [ ] ¿El diseño es responsive (probado en móvil y desktop)?
- [ ] ¿Se siguen las convenciones de naming (`PascalCase` para componentes)?
- [ ] ¿Se mantiene consistencia con los 11 componentes existentes?
