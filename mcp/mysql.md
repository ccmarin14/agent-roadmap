# MySQL

## Description
Servidor MCP para interactuar con bases de datos MySQL con soporte de consultas de solo lectura.

## Source
https://www.npmjs.com/package/mcp-server-mysql

## Installation

### opencode
```json
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