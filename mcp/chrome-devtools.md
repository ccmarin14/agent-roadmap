# Chrome DevTools

## Description
MCP server que permite a agentes de IA (como Claude, Cursor, Copilot o Gemini) controlar e inspeccionar un navegador Chrome en vivo. Proporciona capacidades de debugging, automatización, análisis de red, screenshots y performance insights.

## Source
https://www.npmjs.com/package/chrome-devtools-mcp

## Requirements
- Node.js 18+
- Chrome/Chromium instalado en el sistema
- Puppeteer se instala automáticamente con el paquete

## Security Notes
- **Acceso al navegador:** El servidor tiene acceso completo al contenido del navegador. Solo usa con páginas de confianza.
- **Datos sensibles:** Evita compartir datos sensibles o personales en el navegador controlado por el MCP.
- **Automation:** El servidor puede automatizar acciones en el navegador (clicks, formularios, navegación).

## Installation

### opencode
```json
{
    "mcp": {
        "chrome-devtools": {
            "type": "local",
            "command": ["npx", "-y", "chrome-devtools-mcp@latest"]
        }
    }
}
```

### cursor
```json
{
    "mcpServers": {
        "chrome-devtools": {
            "command": "npx",
            "args": ["-y", "chrome-devtools-mcp@latest"]
        }
    }
}
```

## When to Use

- ¿El navegador muestra errores? Revisa la consola y las pestañas de red a través de este MCP
- ¿Necesitas automatizar interacciones como clics, llenado de formularios o navegación? Úsalo
- ¿Screenshots para debugging o documentación? Esta herramienta lo maneja

> **Nota:** Copia estos casos de uso al AGENTS.md de tus proyectos para que el agente use Chrome DevTools automáticamente en estos escenarios.

## How to Use in Conversation

### Sin AGENTS.md
Cuando el agente no tiene la configuración automática, menciónalo explícitamente:

```
"Abre http://localhost:3000 y revisa los errores de consola usando Chrome DevTools"
"Toma un screenshot del formulario de login"
"Rellena el formulario de registro con datos de prueba"
"Analiza el rendimiento de carga de la página principal"
"Revisa las peticiones network para ver la respuesta del API"
```

### Con AGENTS.md
Si ya configuraste los casos de uso en AGENTS.md, el agente lo usa automáticamente:

```
"Abre http://localhost:3000 y revisa los errores de consola"
"¿Qué errores hay en la consola del navegador?"
"Toma un screenshot del formulario"
"Rellena el formulario de registro con datos de prueba"
"Analiza el rendimiento de carga de la página"
```
