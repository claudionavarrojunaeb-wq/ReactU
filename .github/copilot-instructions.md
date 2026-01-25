<!-- .github/copilot-instructions.md - Guidance for AI coding agents in this repo -->

# Instrucciones para agentes de Copilot en ReactU

Este es un repositorio educativo de **React + TypeScript** del curso de Fernando Herrera. Contiene 4 proyectos enfocados en enseñanza. Sé conciso y mantén cambios alineados con el alcance educativo de cada carpeta.

## Arquitectura General

**Proyectos principales** en `/`:
- **`00-formulario/`** — Formulario multipaso con validación y testing completo
- **`01-reforzamiento/`** — Ejercicios de TypeScript y ES6+ (no React)
- **`02-first-steps/`** — Conceptos básicos: componentes, props, hooks simples
- **`03-gifs-app/`** — Aplicación completa: API (Giphy), custom hooks, acciones, testing

## Workflows: Desarrollo, Build, Testing

**Dev**: `cd <proyecto> && npm install && npm run dev` — Vite + HMR en `http://localhost:5173`

**Build**: `npm run build` → `tsc -b && vite build` (TypeScript sin emitir, solo type-check con `noEmit: true`)

**Lint**: `npm run lint` (ESLint strict)

**Tests**: 
- `npm test` ejecuta Jest con config `jest.config.cjs` (preset `ts-jest`, entorno `jsdom`)
- `00-formulario/` y `03-gifs-app/`: coverage & watch modes disponibles
- Setup: `setupTests.ts` importa `@testing-library/jest-dom`

## Convenciones & Patrones

**React/TypeScript**:
- Componentes funcionales stateless en `src/*.tsx`
- Type-safe: `export type FormData = {...}` para datos críticos (ver `MultiStepForm.tsx`)
- Entrypoint: `src/main.tsx` con `createRoot(document.getElementById('root')!).render(<StrictMode>...)</StrictMode>)`
- JSX: configurado como `react-jsx` en `tsconfig.app.json` (no requiere `import React`)
- Imports explícitos: `./GifsApp` o `./gifs/actions/get-gifs-by-query.action`

**TypeScript Strictness**: 
- `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noEmit: true`
- Arregla errores de tipo, no desactives reglas

**Estilo**: CSS simple (`index.css` al lado de `main.tsx`); módulos CSS en componentes específicos (e.g., `itemCounter.module.css`)

## Patrones Específicos de Proyectos

**00-formulario**: Gestión de estado complejo con `useState`; pasos (Step1, Step2, Step3) controlados por padre; validaciones en renderizado condicional

**03-gifs-app**: 
- Estructura modular: `gifs/{api,actions,components,interfaces}` + `shared/components`
- API: `axios.create()` en `gifs/api/giphy.api.ts` con `VITE_GIPHY_API_KEY` en variables de entorno
- Actions: funciones puras (e.g., `getGifsByQuery()`) que llaman API
- Interfaces: tipos en `gifs/interfaces/gif.interface.ts`
- Mocks: `mocks-data/gifs.mock.ts` para tests

**02-first-steps**: Contador simple, props, eventos básicos — patrón instructivo

## Dependencias Clave

- `react@^19.1.1`, `react-dom@^19.1.1`
- `@vitejs/plugin-react-swc` (fast-refresh, no Babel)
- **Testing**: `@testing-library/react`, `jest`, `ts-jest`
- **03-gifs-app**: `axios@^1.12.2` para API
- ESLint + TypeScript ESLint

## Recomendaciones

- Cambios pequeños e incrementales; valida localmente con `npm run dev` y tests
- No agregues dependencias pesadas; estos son proyectos educativos
- Preserva opciones `tsconfig` (bundler mode, `noEmit`, etc.)
- En tests, usa `setupTests.ts` para setup global y `mocks-data/` para datos mock

## Contexto Rápido (por proyecto)

| Proyecto | Enfoque | Key Files |
|----------|---------|-----------|
| 00-formulario | Formularios, validación, testing | `MultiStepForm.tsx`, `steps/`, `__tests__/` |
| 03-gifs-app | API, custom hooks, actions | `GifsApp.tsx`, `gifs/api/`, `gifs/actions/` |
| 02-first-steps | Conceptos básicos React | `FirstStepsApp.tsx`, componentes simples |
| 01-reforzamiento | ES6+, TypeScript (no React) | `src/bases/`, ejercicios TS |

If you edit this file, keep it short and concrete (20–50 lines). Reference exact files and scripts rather than general rules.
