# MySQL

## Descripción
Servidor MCP para interactuar con bases de datos MySQL con soporte de consultas de solo lectura.

## Enlace
https://www.npmjs.com/package/mcp-server-mysql

## Requisitos
- Node.js 18+
- MySQL 5.7+ o MariaDB 10.2+
- Conexión de red al servidor de base de datos
- Credenciales con permisos de solo lectura (recomendado)

## Notas de seguridad
- **Solo lectura:** Este servidor solo ejecuta consultas SELECT. Operaciones de escritura (INSERT, UPDATE, DELETE, DROP) no están soportadas.
- **Credenciales:** Usa un usuario con permisos mínimos necesarios (solo SELECT). No uses el usuario root.


## Instalación

### opencode
```json
{
    "mcp": {
        "mysql": {
            "type": "local",
            "command": ["npx", "-y", "mcp-server-mysql@latest"],
            "environment": {
                "MYSQL_HOST": "host",
                "MYSQL_PORT": "3306",
                "MYSQL_USER": "user",
                "MYSQL_PASS": "password",
                "MYSQL_DB": "database"
            }
        }
    }
}
```

### cursor
```json
{
    "mcpServers": {
        "mysql": {
            "command": "npx",
            "args": ["-y", "mcp-server-mysql@latest"],
            "env": {
				"MYSQL_HOST": "host",
				"MYSQL_PORT": "3306",
				"MYSQL_USER": "user",
				"MYSQL_PASS": "password",
				"MYSQL_DB": "database"
            }
        }
    }
}
```

## Cuándo usar

- ¿Debugueando y necesitas ver qué hay realmente en la base de datos? Consúltala directamente
- Inspeccionando el schema para entender cómo se relacionan las tablas entre sí

> **Nota:** Copia estos casos de uso al AGENTS.md de tus proyectos para que el agente use MySQL automáticamente en estos escenarios.

## Cómo usar en conversación

### Sin AGENTS.md
Cuando el agente no tiene la configuración automática, menciónalo explícitamente:

```
"Consulta la cantidad de registros en la tabla usuarios usando MySQL"
"Dime qué columnas tiene la tabla pedidos"
"Quiero ver los últimos 10 registros de la tabla avances"
"¿Cuántos registros hay en la tabla aciertos?"
"Muéstrame la estructura de la tabla proyectos"
```

### Con AGENTS.md
Si ya configuraste los casos de uso en AGENTS.md, el agente lo usa automáticamente:

```
"¿Cuántos usuarios hay registrados?"
"¿Qué columnas tiene la tabla pedidos?"
"Muéstrame los últimos 10 avances"
"¿Cuántos aciertos hay?"
"¿Cuál es la estructura de la tabla proyectos?"
```