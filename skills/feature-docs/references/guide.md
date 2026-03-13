# Guía de Documentación de Features

## Estructura de Documentación

### Sección: Descripción
Breve explicación de qué hace la funcionalidad y su propósito en el proyecto.

### Sección: Cuándo se Activa
- Acciones del usuario que disparan el feature
- Eventos del sistema que lo invocan
- Condiciones necesarias

### Sección: Flujo
Lista numerada de pasos:
1. Usuario realiza acción
2. Sistema procesa
3. Respuesta al usuario

### Sección: Archivos
Tabla con archivos relacionados:

| Archivo | Propósito |
|---------|-----------|
| `src/auth/login.js` | Controlador de login |
| `models/User.js` | Modelo de usuario |
| `db/migrations/001` | Schema de usuarios |

---

## Secciones Opcionales

### API
Endpoints relacionados con el feature:

```markdown
## API

### POST /api/login
- **Input**: `{ email, password }`
- **Output**: `{ token, user }`
- **Errores**: 401, 500
```

### Modelos de Datos
Entidades y estructuras:

```markdown
## Modelos de Datos

### User
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único |
| email | String | Email único |
| password | String | Hash bcrypt |
```

### Base de Datos
Tablas y queries:

```markdown
## Base de Datos

### Tablas
- `users` - Usuarios del sistema
- `sessions` - Sesiones activas
```

### Seguridad
Validaciones, permisos, autenticación:

```markdown
## Seguridad

- Contraseñas hasheadas con bcrypt
- Tokens JWT con expiración
- Rate limiting en login
```

### Configuración
Variables de entorno:

```markdown
## Configuración

| Variable | Descripción | Default |
|----------|-------------|---------|
| JWT_SECRET | Secret para tokens | - |
```

---

## Mejores Prácticas

1. **Ser conciso**: No escribir más de lo necesario
2. **Mantener actualizado**: Cuando cambia el código, actualizar docs
3. **Incluir ejemplos**: Código real de uso
4. **Links internos**: Referenciar otros documentos si aplica
5. **Verificable**: El documento debe reflejar realidad
