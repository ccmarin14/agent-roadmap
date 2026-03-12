# Servidores MCP

Documentación de servidores MCP disponibles para el equipo.

## Agregar un nuevo servidor MCP

Cada servidor MCP debe incluir:

````markdown
# [Nombre]

## Descripción
Descripción breve.

## Enlace
Enlace al paquete npm.

## Requisitos
- Requisitos del sistema
- Permisos necesarios

## Notas de seguridad
- Notas de seguridad relevantes

## Instalación

### opencode
```json
{
    "mcp": {
        "[nombre]": {
            "type": "local",
            "command": ["npx", "-y", "[paquete]@latest"],
            "environment": {}
        }
    }
}
```

### cursor
```json
{
    "mcpServers": {
        "[nombre]": {
            "command": "npx",
            "args": ["-y", "[paquete]@latest"],
            "env": {}
        }
    }
}
```

## Cuándo usar
- Casos de uso apropiados para este servidor

> **Nota:** Copia estos casos de uso al AGENTS.md de tus proyectos para que el agente use este MCP automáticamente en estos escenarios.

## Cómo usar en conversación

### Sin AGENTS.md
Cuando el agente no tiene la configuración automática, usa este servidor:

```
[Ejemplos de prompts]
```

### Con AGENTS.md
Si ya configuraste los casos de uso en AGENTS.md, el agente lo usa automáticamente:

```
[Ejemplos de prompts]
```
````

## Servidores disponibles

- [MySQL](./mysql.md) - Consultas de solo lectura a MySQL
- [Chrome DevTools](./chrome-devtools.md) - Depuración de Chrome/Puppeteer
- [Context7](./context7.md) - Documentación de librerías
- [TestSprite](./testsprite.md) - Testing automatizado
