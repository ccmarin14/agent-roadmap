# Plantillas de archivos

Son puntos de partida — adáptalas en profundidad según el proyecto real.
Nunca copiar literalmente. Rellenar con contenido real o dejar TODOs explícitos.

---

## Plantilla AGENTS.md

```markdown
# AGENTS.md

Guía para agentes de IA que trabajen en este repositorio.

## Configuración inicial

<!-- TODO: ¿Qué comandos necesita ejecutar un agente primero? -->
\`\`\`bash
# Instalar dependencias
[comando de instalación]

# Verificar configuración
[comando de verificación]
\`\`\`

## Comandos de desarrollo

| Tarea       | Comando       |
|-------------|---------------|
| Build       | `[comando]`   |
| Tests       | `[comando]`   |
| Lint        | `[comando]`   |
| Tipos       | `[comando]`   |

## Estructura del repositorio

\`\`\`
[directorios clave y qué contienen]
\`\`\`

## Reglas

- [Restricción específica de este proyecto]
- [Otra restricción]

## Zonas protegidas

NO modificar sin instrucción explícita:
- `[ruta]` — [motivo]

## Antes de terminar una tarea

- [ ] Ejecutar tests: `[comando]`
- [ ] Ejecutar lint: `[comando]`
- [ ] [Cualquier otra comprobación específica del proyecto]

## Problemas conocidos y advertencias

- [Algo que suele confundir a agentes o a personas nuevas]
```

---

## Plantilla AUDIENCE.md

```markdown
# AUDIENCE.md

Para quién existe este proyecto — y para quién no.

## Audiencia principal

[Descripción conductual y específica. Ejemplo: "Desarrolladores independientes que construyen
side projects, con alta tolerancia técnica pero poca paciencia para contenido genérico de IA."]

## Qué ya saben

- [Supuesto 1]
- [Supuesto 2]

## Qué intentan conseguir

- [Objetivo 1]
- [Objetivo 2]

## Sus objeciones o miedos habituales

- [Objeción 1]
- [Objeción 2]

## Lenguaje y tono

**Usar:** [palabras, registro, estilo que conecta]
**Evitar:** [palabras, registro, estilo que aleja]

## Quién NO es la audiencia

[Exclusiones explícitas. Tan importante como las inclusiones.]

## Supuestos sin validar

<!-- Cosas que creemos sobre nuestra audiencia pero que aún no hemos verificado -->
- [Supuesto sobre el que no estamos seguros]
```

---

## Plantilla llms.txt

```markdown
# [Nombre del proyecto]

> [Una frase de descripción]

[2–3 frases de contexto: qué hace, quién lo usa, qué problema resuelve]

## Documentación

- [Página más importante](URL): [Por qué leer esto primero]
- [Segunda más importante](URL): [Anotación breve]
- [Referencia de API](URL): [Qué cubre]

## Opcional (leer si es relevante para la tarea)

- [Tema avanzado](URL)
- [Guía de configuración](URL)

## Omitir

- [Changelog](URL): Solo histórico
- [Archivo](URL): Contenido deprecated
```

---

## Plantilla ADR

```markdown
# ADR-[NNN]: [Título corto]

**Fecha:** AAAA-MM-DD
**Estado:** [Propuesto | Aceptado | Obsoleto | Reemplazado por ADR-NNN]

## Contexto

[¿Qué situación o problema llevó a esta decisión? ¿Qué restricciones existían?]

## Decisión

[¿Qué se decidió? Expresarlo de forma clara y directa.]

## Alternativas consideradas

- **[Alternativa A]:** [Por qué se consideró, por qué se descartó]
- **[Alternativa B]:** [Igual]

## Consecuencias

**Positivas:**
- [Beneficio]

**Negativas / compromisos:**
- [Coste o compromiso]

**Riesgos:**
- [Algo a vigilar]
```

---

## Plantilla SECURITY.md

```markdown
# Política de seguridad

## Reportar una vulnerabilidad

**No abrir un issue público de GitHub para vulnerabilidades de seguridad.**

<!-- TODO: Elegir uno: -->
Enviar informes a: [security@tudominio.com]
<!-- O bien -->
Usar el sistema de reporte privado de GitHub: [enlace a security advisories]

Por favor, incluir:
- Descripción de la vulnerabilidad
- Pasos para reproducirla
- Impacto potencial
- Corrección sugerida (si la hay)

Confirmaremos la recepción en [X] días laborables y buscaremos resolver
las vulnerabilidades confirmadas en [Y] días.

## Versiones con soporte

| Versión   | Soporte |
|-----------|---------|
| [x.x.x]   | ✅      |
| [x.x.x]   | ❌      |

## Scope

**En scope:**
- [Qué nos importa]

**Fuera de scope:**
- Ataques de denegación de servicio
- Ingeniería social
- [Otras exclusiones]
```

---

## Plantilla DESIGN.md

```markdown
# DESIGN.md

Principios visuales y de experiencia para [nombre del proyecto].

## Principios fundamentales

1. **[Principio]:** [Qué significa en la práctica. Ser específico.]
2. **[Principio]:** [Implicación concreta, no un tópico.]

## Tipografía

- **Títulos:** [Fuente, peso, escala de tamaños]
- **Cuerpo:** [Fuente, tamaño, interlineado]
- **Código:** [Fuente monoespaciada]

## Color

| Rol         | Valor     | Uso                        |
|-------------|-----------|----------------------------|
| Primario    | `#[hex]`  | CTAs, acciones clave       |
| Fondo       | `#[hex]`  | Fondo de página            |
| Superficie  | `#[hex]`  | Tarjetas, paneles          |
| Texto       | `#[hex]`  | Texto de cuerpo            |
| Peligro     | `#[hex]`  | Errores, acciones destructivas |

<!-- TODO: Enlazar a Figma o archivo de design tokens si existe -->

## Sistema de espaciado

[ej: unidad base de 4px. Múltiplos permitidos: 4, 8, 12, 16, 24, 32, 48, 64]

## Componentes

[Dónde encontrar la librería de componentes, o lista de convenciones clave]

## Accesibilidad mínima

- Ratio de contraste mínimo: [4.5:1 para texto / 3:1 para elementos de UI]
- Todos los elementos interactivos navegables por teclado
- [Otras no negociables]

## Qué evitar

- [Antipatrón visual específico de este proyecto]
- [Otro]

## Ejemplos

<!-- Si es posible, enlazar a pantallas o componentes que representen el ideal -->
- ✅ Bien: [descripción o enlace]
- ❌ Evitar: [descripción o enlace]
```
