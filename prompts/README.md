# Prompts

Colección de prompts reutilizables para diferentes tareas con agentes IA.

## Estructura

```
prompts/
├── README.md
├── prompt-name.md
└── ...
```

## Agregar un nuevo prompt

Cada prompt debe seguir esta estructura:

```markdown
---
name: [prompt-name]
type: [system | user | task]
model: [opcional - modelo recomendado]
---

# [Nombre del Prompt]

## Descripción
Breve descripción de qué hace este prompt.

## Cuándo usar
- Casos de uso apropiados
- Situaciones recomendadas

## Prompt

### Persona
[Quién es el agente, su rol y tono]

### Contexto
[Background información relevante]

### Tarea
[Qué necesita hacer el agente]

### Restricciones
[Límites y reglas a seguir]

### Formato de salida
[Cómo debe estructurar la respuesta]

## Ejemplos

### Input
```
[ejemplo de entrada]
```

### Output esperado
```
[ejemplo de salida]
```

## Tags
- [tag1]
- [tag2]
```

## Prompts disponibles

- Coming soon...
```

> **Nota:** Los prompts pueden importarse en conversaciones o referenciarse en AGENTS.md/CLAUDE.md.
