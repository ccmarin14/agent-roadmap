# AUDIENCE.md - Agent Forge & AI Toolkit

Definición de audiencias para el repositorio agent_kit, que combina una aplicación educativa (roadmap) con herramientas para agentes IA.

---

## Audiencias del Roadmap (roadmap/)

### End Users - Estudiantes / Usuarios del Roadmap
**Perfil**: Personas aprendiendo tecnologías mediante el roadmap interactivo.

**Necesidades**:
- Navegación clara por niveles y temas
- Quizzes interactivos con feedback inmediato
- Exámenes para validar conocimientos
- Progreso guardado (persistencia en Supabase o localStorage para guests)
- Interfaz responsive y accesible

**Acceso**:
- **Guest users**: Acceso limitado, sin persistencia en la nube
- **Authenticated users**: Progreso guardado, acceso completo a exámenes (según `VITE_EXAMS_FOR_USERS`)
- **Admin**: Acceso al `AdminDashboard` protegido por contraseña

---

## Audiencias de Agent Tooling

### Developers - Creadores de Skills y Prompts
**Perfil**: Desarrolladores construyendo o manteniendo skills, prompts, y configuraciones de agentes.

**Necesidades**:
- Documentación clara de estructura en `skills/<skill-name>/SKILL.md`
- Ejemplos de prompts en `prompts/`
- Referencias técnicas en `skills/<skill-name>/references/`
- Scripts auxiliares en `skills/<skill-name>/scripts/`

### AI Agents - Consumidores de Skills
**Perfil**: Agentes IA (como opencode) que ejecutan skills para realizar tareas.

**Necesidades**:
- `SKILL.md` con instrucciones completas y pasos claros
- Convenciones consistentes entre skills
- Compatibilidad hacia atrás (no romper skills existentes)

### Developers - Integradores de MCP
**Perfil**: Desarrolladores integrando servidores MCP (Model Context Protocol).

**Necesidades**:
- Documentación de servidores soportados en `mcp/`
- Configuraciones JSON de ejemplo
- Guías de autenticación y uso

---

## Audiencias por Módulo

| Módulo | Primaria | Secundaria |
|--------|----------|------------|
| `roadmap/` | Estudiantes / End users | Developers (mantenimiento) |
| `skills/` | AI Agents (consumidores) | Developers (creadores) |
| `prompts/` | AI Agents | Developers |
| `agents/` | Developers (configuradores) | AI Agents (ejecutores) |
| `mcp/` | Developers (integradores) | AI Agents (consumidores) |

---

## Consideraciones de Diseño por Audiencia

### Roadmap (End Users)
- **Claridad sobre densidad**: El contenido educativo debe ser fácil de digerir
- **Feedback inmediato**: Quizzes y exámenes con resultados claros
- **Progreso visible**: Indicadores de avance por nivel/tema

### Agent Tooling (Developers + AI Agents)
- **Consistencia**: Misma estructura y convenciones en todos los módulos
- **Documentación técnica**: Precisión sobre estilo
- **Ejemplos ejecutables**: Scripts y configuraciones que funcionen out-of-the-box

---

## Canales de Feedback

<!-- TODO: Definir cómo recibir feedback de cada audiencia (issues, surveys, analytics, etc.) -->
