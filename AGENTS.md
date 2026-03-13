# AGENTS.md - Agent Forge & AI Toolkit

Este archivo contiene las directrices, comandos y estándares para agentes de IA que operan en este repositorio. El objetivo es mantener la consistencia en el roadmap interactivo y las herramientas del equipo.

---

## 🛠 Comandos y Operaciones

### 1. Roadmap (React + Vite)
El roadmap es la aplicación principal en la carpeta `/roadmap`.

- **Instalar dependencias:** `npm install` (ejecutar dentro de `/roadmap`)
- **Desarrollo:** `npm run dev` (abre servidor local en http://localhost:5173)
- **Producción:** `npm run build` (genera el bundle en `/roadmap/dist`)
- **Previsualizar build:** `npm run preview`
- **Linting:** No hay script de linting configurado. Se espera que sigas las convenciones existentes o uses un linter local antes de commitear.
- **Tests:** No hay suite de tests configurada. Si necesitas agregar pruebas unitarias, utiliza **Vitest**. Para ejecutar un test individual (una vez configurado): `npx vitest run path/to/file.test.js`.

### 2. Otros Módulos
- **MCP (`/mcp`)**: Documentación técnica en Markdown sobre servidores MCP.
- **Skills (`/skills`)**: Definiciones de habilidades procedimentales (`SKILL.md`).
- **Agents (`/agents`)**: Configuraciones de agentes especializados con su propio `AGENT.md`.
- **Prompts (`/prompts`)**: Librería de prompts reutilizables por tipo de tarea.

---

## 🎨 Guía de Estilo y Convenciones

### Estándares de Código (React/JS)
- **Framework:** React 18 utilizando Componentes Funcionales y Hooks.
- **Estilos:** 
  - **Tailwind CSS v4** para layouts, espaciado y utilidades básicas.
  - **Inline Styles** vinculados al objeto `C` de `roadmap/src/theme.js` para colores dinámicos y tokens de diseño.
- **Tema:** Usa SIEMPRE los tokens de `roadmap/src/theme.js`.
  - Ejemplo: `<div style={{ backgroundColor: C.surface, color: C.text }}>`.
- **Imports:**
  - Usa módulos ES (`import/export`).
  - Orden: React hooks -> Data/Constants -> Components -> Styles.
  - Extensiones: Usa `.js` para lógica pura y `.jsx` para componentes de React.
- **Naming:**
  - Componentes: `PascalCase` (ej. `ContentView.jsx`).
  - Funciones y Variables: `camelCase` (ej. `levelStats`).
  - Constantes globales: `UPPER_SNAKE_CASE` (ej. `LEVELS`, `STORAGE_KEY`).
- **Estado:** Utiliza el hook `useProgress` para persistir el progreso de los checklists. Las claves de persistencia se generan como `lvlIdx,secIdx,itemIdx,checkIdx`.

### Estándares de Documentación (Markdown)
- **Idioma:** Español (para contenido del roadmap y guías internas).
- **Formato:** Sigue las plantillas establecidas en los `README.md` de cada subcarpeta para mantener la uniformidad.

---

## 📂 Estructura Crítica del Proyecto

### `roadmap/src/data/`
Es la base de conocimiento de la aplicación.
- `index.js`: Exportación centralizada.
- `levelXX.js`: Contenido educativo y checklists por nivel.
- `references.js`: Enlaces externos y documentación de apoyo.

### `roadmap/src/hooks/useProgress.js`
Gestiona la persistencia en `LocalStorage` bajo la clave `agent-kit-progress`. Cualquier cambio en la estructura de los niveles de datos puede afectar la integridad de los datos guardados por el usuario.

---

## 🤖 Instrucciones Específicas para Agentes

1. **Consistencia Visual:** El roadmap tiene una estética "cyberpunk/dark". Asegúrate de que cualquier cambio en la UI mantenga este estilo usando los colores definidos en el theme.
2. **Jerarquía de Reglas:** Si existe un `AGENTS.md` o un `AGENT.md` local en una subcarpeta de módulo, sus instrucciones tienen prioridad sobre este archivo global.
3. **Actualización de Contenido:** Al agregar nuevos temas al roadmap, asegúrate de incluir al menos 3-4 "Criterios de Dominio" (checks) por cada item.
4. **No Side-Effects:** Evita instalar librerías adicionales en `/roadmap` sin justificar la necesidad arquitectónica. Actualmente es un stack muy ligero y rápido.
5. **Respeto a los Patterns:** No conviertas componentes funcionales a clases. Mantén el uso de hooks.

## Documentación de Librerías/APIs

- Antes de escribir código con cualquier librería o framework—consulta Context7 primero para obtener la información actual y ejemplos funcionales
- Si te encuentras con una función o método desconocido—usa Context7 para entender qué hace
- Al configurar una nueva librería pide a Context7 los docs actualizados para no seguir guías obsoletas