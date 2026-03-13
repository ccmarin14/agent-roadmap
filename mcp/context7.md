# Context7

## Descripción
MCP server que proporciona documentación actualizada y ejemplos de código para bibliotecas y frameworks directamente en tus prompts de IA.

## Enlace
https://www.npmjs.com/package/@upstash/context7-mcp

## Requisitos
- Node.js 18+
- Conexión a internet para acceder a la API de Context7
- API key de Context7 (obtenerla en https://context7.com)

## Notas de seguridad
- **API Key:** La API key se pasa en headers. No la expongas en repositorios públicos.
- **Solo lectura:** Este servidor consulta documentación, no modifica archivos.
- **Datos externos:** El servidor obtiene datos de Context7, asegúrate de confiar en la fuente.

## Instalación

### opencode
```json
{
    "mcp": {
        "context7": {
            "type": "remote",
            "url": "https://mcp.context7.com/mcp",
            "headers": {
                "CONTEXT7_API_KEY": "tu-api-key-aqui"
            },
            "enabled": true
        }
    }
}
```

### cursor
```json
{
    "mcpServers": {
        "context7": {
            "url": "https://mcp.context7.com/mcp",
            "headers": {
                "CONTEXT7_API_KEY": "tu-api-key-aqui"
            }
        }
    }
}
```

## Cuándo usar

- Antes de escribir código con cualquier librería o framework—consulta Context7 primero para obtener la API actual y ejemplos funcionales
- Si te encuentras con una función o método desconocido—usa Context7 para entender qué hace
- Al configurar una nueva librería pide a Context7 los docs actualizados para no seguir guías obsoletas

> **Nota:** Copia estos casos de uso al AGENTS.md de tus proyectos para que el agente use Context7 automáticamente en estos escenarios.

## Cómo usar en conversación

### Sin AGENTS.md
Cuando el agente no tiene la configuración automática, menciónalo explícitamente:

```
"Busca cómo usar useState en React usando Context7"
"Consulta la API de Next.js Image usando Context7"
"¿Cómo funciona Prisma relations? Búscalo en Context7"
"Quiero implementar autenticación con Auth.js, dime los pasos usando Context7"
```

### Con AGENTS.md
Si ya configuraste los casos de uso en AGENTS.md, el agente lo usa automáticamente:

```
"¿Cómo uso useState en React?"
"¿Cuál es la API de Next.js Image?"
"Explícame las Prisma relations"
"Dime los pasos para implementar autenticación con Auth.js"
```
