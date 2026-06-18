# Checklist de descubrimiento por proyecto

Ejecutar **al iniciar cualquier modo** (`spec` o `implement`). No asumir que
todos los archivos existen.

## 1. Guías para agentes y contribución

| Ruta | Si existe, leer para |
|------|---------------------|
| `AGENTS.md` (raíz y subproyectos) | Reglas globales, comandos, prohibiciones |
| `CONTRIBUTING.md` | Flujo de contribución, estilo |
| `README.md` | Stack, estructura, cómo arrancar |
| `.cursor/rules/` | Reglas del IDE |
| `docs/` | Documentación de dominio y convenciones |

## 2. Estructura del repositorio

Identificar sin asumir monorepo ni layout fijo:

- Carpetas de código (`src/`, `app/`, `api/`, `packages/`, etc.)
- Separación front/back/libs
- Dónde vive la configuración

## 2b. Patrones y features análogas (obligatorio si hay UI o listados)

Ejecutar [reuse-patterns-checklist.md](reuse-patterns-checklist.md).

- [ ] Buscar páginas del **mismo rol/menú** o dominio similar.
- [ ] Identificar cómo se hacen **paginación, búsqueda, tablas, modales** hoy.
- [ ] Anotar **archivos referencia** (rutas concretas) antes de proponer diseño nuevo.
- [ ] Si no hay analogía, documentar **qué se buscó**.

## 3. Herramientas de calidad

Buscar y anotar comandos reales:

| Buscar | Ejemplos habituales |
|--------|---------------------|
| `package.json` scripts | `lint`, `test`, `build`, `dev` |
| `composer.json` | `pint`, `test` |
| `vitest.config.*`, `jest.config.*` | framework de tests front |
| `phpunit.xml`, `pest.php` | tests PHP |
| `.eslintrc*`, `biome.json` | linter |
| `Makefile` | atajos de CI local |

## 4. Política de tests

Determinar:

- [ ] ¿Existen tests automatizados?
- [ ] ¿Dónde (`test/`, `tests/`, `__tests__/`)? 
- [ ] ¿Qué runner y comando?
- [ ] ¿Hay guía específica (`test/AGENTS.md`)?
- [ ] ¿Política de no añadir tests (documentada)?

Si **no hay tests:** anotar «sin tests automatizados» → omitir Fase 4.

## 5. Política de git y commits

- ¿Flujo con PR o commit directo?
- ¿Convención de mensajes (idioma, formato)?
- ¿Commit solo con petición explícita? (respetar siempre salvo instrucción del usuario)

## 6. Documentación de producto

- ¿Existe `docs/` con ficheros por feature?
- ¿CHANGELOG, ADR, u otro formato?
- ¿Idioma predominante?

Fase 5: actualizar **solo** lo necesario siguiendo el estilo existente.

## 7. Registro del descubrimiento

Anotar en:

| Modo | Dónde registrar |
|------|-----------------|
| `spec` | Sección «Convenciones del proyecto» en `SPEC.md` |
| `implement` | §5 Instrucciones de trabajo en `AGENTS_BUILD.md` |

Campos mínimos:

```markdown
| Tema | Valor descubierto |
|------|-------------------|
| Lint / format | {comando} |
| Tests | {comando o «no aplica»} |
| Build | {comando} |
| Capas | {resumen} |
| Commits | {convención} |
| Docs | {dónde y estilo} |
| Patrones referencia | {archivos modelo por área} |
```

## 8. WIP

- Ruta por defecto: `docs/_wip/{feature-slug}/`
- Si `docs/` no existe, proponer crearla o alternativa acordada con el usuario.
- Commitear WIP: opcional.
