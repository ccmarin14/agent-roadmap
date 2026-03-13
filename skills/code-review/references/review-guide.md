# Guía de Code Review

## ¿Qué es un Code Review?
El code review es el proceso de examinar código fuente para identificar errores, vulnerabilidades, problemas de rendimiento y oportunidades de mejora antes de fusionar cambios al código base.

## Niveles de Review

### Review Básico
**Tiempo estimado**: 5-10 minutos

Incluye:
- Verificación de sintaxis
- Errores de compilación/obvios
- Naming y convenciones básicas
- Manejo de errores trivial

### Review Profundo
**Tiempo estimado**: 30-60 minutos

Incluye todo lo del básico más:
- Análisis de seguridad
- Optimización de rendimiento
- Patrones de diseño
- Arquitectura del código
- Gestión de dependencias
- Test coverage
- Memory leaks potenciales

## Categorías de Análisis

### 🔴 Críticos (Critical)
- Bugs que causan crashes
- Errors no manejados
- Inicializaciones faltantes
- Memory leaks obvios

### 🟠 Seguridad (Security)
- SQL Injection
- XSS (Cross-Site Scripting)
- CSRF vulnerabilities
- Exposición de datos sensibles
- Credenciales hardcodeadas
- Validación de inputs

### 🟡 Rendimiento (Performance)
- Loops ineficientes
- Consultas N+1
- Falta de caching
- Operaciones bloqueantes
- Memoria excesiva

### 🔵 Arquitectura (Architecture)
- Acoplamiento excesivo
- Responsabilidades violadas (SRP)
- Dependencias circulares
- Código duplicado
- SOLID principles

### 🟢 Estilo (Minor)
- Naming inconsistente
- Falta de comentarios
- Formatting irregular
- Variables no usadas

## Tips para un Good Review

1. **Sé constructivo**: Sugiere soluciones, no solo critiques
2. **Prioriza**: Enfócate en problemas reales, no trivialidades
3. **Justifica**: Explica el "por qué" detrás de las sugerencias
4. **Sé consistente**: Aplica los mismos estándares a todo el código
5. **Separar concerns**: Diferencia entre bloqueantes y mejoras

## Lenguajes Comunes

### JavaScript/TypeScript
- Verificar useEffect cleanup
- Validar tipos con TypeScript
- Evitar mutaciones directas
- Usar async/await correctamente

### Python
- Verificar type hints
- Manejo de exceptions
- PEP 8 compliance
- Context managers

### Java
- Null pointer handling
- Resource management (try-with-resources)
- Thread safety
- Dependency injection

### Go
- Error handling
- Goroutine leaks
- Nil pointer checks
- Context usage
