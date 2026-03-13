# Ejemplos de Documentación de Features

## Ejemplo 1: Módulo de Autenticación

### docs/Authentication.md
```markdown
[volver](../README.md)
# Autenticación

## Descripción
Sistema de autenticación de usuarios mediante email y contraseña, generando tokens JWT para sesión.

## Cuándo se Activa
- Usuario intenta iniciar sesión
- Usuario se registra

## Flujo
1. Usuario ingresa email y contraseña
2. Sistema verifica credenciales
3. Si válidas, genera token JWT
4. Retorna token y datos del usuario

## API

### POST /api/auth/login
```javascript
// Request
{ "email": "user@example.com", "password": "password123" }

// Response 200
{ "token": "eyJhbG...", "user": { "id": "1", "email": "user@example.com" } }

// Response 401
{ "error": "Credenciales inválidas" }
```

## Modelos de Datos

### User
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | ID único |
| email | String | Email único |
| password | String | Hash bcrypt |

## Seguridad
- Contraseñas hasheadas con bcrypt (cost: 12)
- Tokens JWT con expiración de 15 minutos

## Configuración
| Variable | Descripción |
|----------|-------------|
| JWT_SECRET | Secret para firmar tokens |
| JWT_EXPIRES_IN | Expiración access token |

## Pruebas
- `tests/unit/auth/bcrypt.test.js`
- `tests/integration/auth.test.js`
```

---

## Ejemplo 2: Sistema de Notificaciones

### docs/Notifications.md
```markdown
[volver](../README.md)
# Sistema de Notificaciones

## Descripción
Módulo de notificaciones push y email para informar a usuarios sobre eventos del sistema.

## Cuándo se Activa
- Nuevo comentario en publicación
- Respuesta a comentario
- Mensaje directo recibido

## Flujo
1. Evento ocurre en el sistema
2. Worker procesa evento
3. Determina destinatarios
4. Envía notificación (push/email)
5. Registra en historial

## Canales

### Push Notifications
- Firebase Cloud Messaging
- Topic: `user_{userId}`

### Email
- SendGrid / SES

## Eventos
| Evento | Canal | Prioridad |
|--------|-------|-----------|
| new_comment | Push + Email | Alta |
| order_status | Push | Media |

## Configuración
| Variable | Descripción |
|----------|-------------|
| FCM_KEY | Clave de Firebase |
| EMAIL_FROM | Email remitente |
```
