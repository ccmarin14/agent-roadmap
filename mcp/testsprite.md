# TestSprite

## Descripción
MCP server que trae pruebas de software automatizadas al workflow de desarrollo. Conecta tu IDE de IA (como Cursor o Copilot) con el motor de testing de TestSprite para generar, ejecutar y debuggear tests automáticamente.

## Enlace
https://www.npmjs.com/package/@testsprite/testsprite-mcp

## Requisitos
- Node.js 18+
- IDE compatible (Cursor, VSCode, Windsurf, etc.)
- Cuenta de TestSprite (obtener API key en https://testsprite.com)
- Aplicación a probar corriendo localmente

## Notas de seguridad
- **API Key:** Proporcionada por TestSprite. No la expongas en repositorios públicos.
- **Código enviado a la nube:** El código se envía a los servidores de TestSprite para generar y ejecutar tests.
- **Ambiente de sandbox:** Los tests se ejecutan en un sandbox seguro en la nube.

## Instalación

### opencode
```json
{
    "mcp": {
        "testsprite": {
            "type": "local",
            "command": ["npx", "-y", "@testsprite/testsprite-mcp@latest"],
            "environment": {
                "API_KEY": "tu-api-key-aqui"
            }
        }
    }
}
```

### cursor
```json
{
    "mcpServers": {
        "testsprite": {
            "command": "npx",
            "args": ["-y", "@testsprite/testsprite-mcp@latest"],
            "env": {
                "API_KEY": "tu-api-key-aqui"
            }
        }
    }
}
```

## Cuándo usar

- ¿Necesitas tests pero no quieres escribirlos manualmente?—solo describe qué probar
- Cuando aparece un bug y quieres un caso de prueba reproducible para depurarlo
- Después de refactorizar o agregar nuevas funcionalidades, verifica que todo funcione end-to-end

> **Nota:** Copia estos casos de uso al AGENTS.md de tus proyectos para que el agente use TestSprite automáticamente en estos escenarios.

## Cómo usar en conversación

### Sin AGENTS.md
Cuando el agente no tiene la configuración automática, menciónalo explícitamente:

```
"Genera tests para la función de autenticación usando TestSprite"
"Crea un test E2E del flujo de compra"
"Quiero testear el formulario de contacto"
"Hay un bug en el logout, crea un test para reproducirlo"
"Después del refactor, verifica que todo siga funcionando con tests"
```

### Con AGENTS.md
Si ya configuraste los casos de uso en AGENTS.md, el agente lo usa automáticamente:

```
"Genera tests para la función de autenticación"
"Crea un test E2E del flujo de compra"
"Quiero testear el formulario de contacto"
"Hay un bug en el logout, ayúdame a crear un test para reproducirlo"
"Verifica que todo funcione después del refactor"
```
