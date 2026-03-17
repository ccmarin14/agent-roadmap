
# Generador de AGENTS.md [agents-md-generator]

## Qué hace: 
Crea AGENTS.md en español que instruya a agentes IA cómo trabajar en un proyecto específico, basado en información del stack y estructura del proyecto.

## El prompt
````markdown
Eres un experto en guiar agentes IA para trabajar efectivamente en proyectos de software.
Tu tarea es crear un archivo AGENTS.md en español a partir de la información del proyecto que proporcionaré. Este archivo será leído por agentes de IA, así que debe ser claro, específico y actionable.

# Estructura obligatoria (máximo 150 líneas):
- Descripción del proyecto (1-2 líneas)
- Comandos principales (instalación, test, build, dev)
- Estructura del proyecto (directorios clave)
- Patrones de código (convenciones, style, restricciones)
- Instrucciones de testing (framework, cómo ejecutar)
- Límites y permisos (qué permitido sin preguntar, qué requiere aprobación)

# Restricciones:
- Los comandos deben ser copy-paste listos y exactos
- Sé específico: "usa TypeScript strict mode" no "usa TypeScript"
- Evita duplicar información que va en README
- Markdown limpio y legible
- Máximo 150 líneas totales
- No incluyas explicaciones para agentes, solo instrucciones

# Formato de salida:
```markdown
# [Nombre del Proyecto]

[descripción corta]

## Comandos principales
- `comando` – descripción

## Estructura del proyecto
- `ruta/` – propósito

## Patrones de código
- [patrón específico]

## Testing
- Framework: [framework]
- Ejecución: [comando]
- Cobertura: [porcentaje]

## Límites
**Permitido sin preguntar:**
- [acción 1]

**Requiere aprobación:**
- [acción 1]
```
````

## Ejemplo de resultado:
```markdown
# API REST Backend

API REST con Express y TypeScript para servicios de autenticación y gestión de usuarios.

## Comandos principales
- `npm install` – Instalar dependencias
- `npm run dev` – Iniciar servidor (puerto 3000)
- `npm test` – Ejecutar suite de tests
- `npm run lint` – Ejecutar ESLint y Prettier
- `npm run typecheck` – Verificar tipos TypeScript

## Estructura del proyecto
- `src/routes/` – Definición de endpoints REST
- `src/controllers/` – Lógica de negocio y handlers
- `src/middleware/` – Middlewares personalizados (autenticación, validación)
- `src/db/migrations/` – Migraciones de BD (inmutables)

## Patrones de código
- TypeScript strict mode activo
- Single quotes, sin semicolons
- Async/await para operaciones I/O
- Nombres: camelCase para variables, PascalCase para tipos
- No hardcodear configuración (usar variables .env)

## Testing
- Framework: Jest
- Ubicación: `__tests__/` junto al código
- Ejecutar: `npm test`
- Cobertura requerida: 80%+ código nuevo

## Límites
**Permitido sin preguntar:**
- Leer y listar archivos
- Ejecutar `npm test` y `npm run lint`
- Crear nuevas rutas y controllers

**Requiere aprobación:**
- Modificar o crear migraciones
- Agregar nuevas dependencias npm
- Cambios en variables de entorno
- Commits directos a rama main
```

## Cuándo usar
Necesitas documentar cómo los agentes IA deben trabajar en tu proyecto
Tienes un nuevo miembro del equipo (humano o IA) que necesita contexto
Quieres establecer límites claros sobre qué pueden hacer los agentes sin supervisión

## Notas
- AGENTS.md complementa el README pero no lo reemplaza
- Mantén comandos exactos y actualizados
- La sección "Límites" es crítica para evitar cambios no autorizados
- Actualiza cuando cambies arquitectura o agreguess nuevas restricciones
- Usa este prompt cada vez que la estructura del proyecto cambie significativamente