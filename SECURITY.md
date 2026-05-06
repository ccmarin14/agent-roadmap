# SECURITY.md - Agent Forge & AI Toolkit

Guía de seguridad para el repositorio agent_kit, que maneja datos sensibles y tiene visibilidad mixta (pública/privada).

---

## Credenciales y Secretos

### Variables de Entorno (roadmap/)
Nunca commitear archivos `.env` con valores reales. Usar `.env.example` para documentar variables necesarias:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-anon-key
VITE_ADMIN_PASSWORD=your-secure-password
```

- `VITE_SUPABASE_KEY`: Es una **anon key** pública por diseño, pero no debe exponerse en repositorios públicos sin justificación
- `VITE_ADMIN_PASSWORD`: Secreto sensible, **nunca** en repositorios públicos
- `VITE_ALLOW_GUESTS`, `VITE_EXAMS_FOR_USERS`, `VITE_EXAMS_FOR_GUESTS`: Configuraciones de feature flags, seguras para público

### Supabase
- Las credenciales de Supabase se manejan vía variables de entorno Vite (`VITE_` prefix)
- El `supabaseClient` en `roadmap/src/lib/` usa estas variables para conectar
- Las Row Level Security (RLS) policies deben estar habilitadas en Supabase para proteger datos por usuario

---

## Visibilidad Mixta

### Partes Públicas del Repo
- `roadmap/src/data/` — Contenido educativo (levels, quizzes, exams)
- `skills/` — Skills documentadas para uso público
- `mcp/` — Documentación de servidores MCP soportados
- `prompts/` — Prompts reutilizables públicos
- `README.md`, `AGENTS.md`, `SECURITY.md`, `AUDIENCE.md`, `llms.txt`, `DESIGN.md`

### Partes Privadas (no versionar o mantener en .agents/)
- `.agents/` — Configuraciones locales de agentes
- `agents/` — Configuraciones de agentes privados (evaluar caso por caso)
- Archivos `.env` con valores reales
- Cualquier dato sensible de usuarios o administradores

---

## Acceso y Autenticación

### Roadmap App
- Soporta **guest users** (invitados sin registro)
- Soporta **authenticated users** vía Supabase Auth
- **Admin access** protegido por `VITE_ADMIN_PASSWORD` (evaluar migrar a auth basada en roles)
- Exámenes pueden habilitarse/deshabilitarse por tipo de usuario vía variables de entorno

### Agent Tooling
- No requiere autenticación para uso local de skills/prompts
- Servidores MCP pueden requerir sus propias credenciales (documentar en `mcp/`)

---

## Consideraciones de Seguridad para Agentes IA

1. **No exponer secretos en código generado** — Los agentes no deben hardcodear credenciales
2. **Respetar `.gitignore`** — No intentar commitear archivos listados ahí
3. **Validar inputs en prompts** — Evitar inyección de prompts en `prompts/` y `skills/`
4. **No modificar lógica de auth** sin revisión de seguridad
5. **Cuidado con datos en `roadmap/src/data/`** — No incluir información personal de usuarios reales

---

## Reporte de Vulnerabilidades

<!-- TODO: Definir canal de reporte (email, issue tracker, etc.) -->

---

## Checklist de Seguridad para Cambios

- [ ] ¿Se están agregando nuevas variables de entorno? → Verificar que no se commiteen valores reales
- [ ] ¿Se están modificando permisos de usuario? → Revisar impacto en RLS y auth
- [ ] ¿Se están agregando nuevos prompts o skills? → Verificar que no expongan datos sensibles
- [ ] ¿Se están cambiando configuraciones de feature flags? → Evaluar impacto en usuarios (guests vs auth)
