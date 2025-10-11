<!-- .github/copilot-instructions.md - Guidance for AI coding agents in this repo -->

# Copilot instructions for this workspace

This repository contains several small tutorial/demo projects (Node and React). Be concise and make edits that match the small, instructional scope of each folder. Focus on the active project in the editor — for example `03-gifs-app` when working in that folder.

Key facts (big picture)

- This workspace holds two main demo areas: `NodeU/NodeU` (Node + TS exercises) and `ReactU/ReactU` (Vite + React + TS demos). Each demo is intentionally minimal and self-contained.
- The React demos use Vite + TypeScript. Entry points: `src/main.tsx` and component files under `src/` (e.g. `src/GifsApp.tsx`).

Build / run / test workflows

- Typical dev server (React demos): run the package script in the demo folder, for example:
  - `cd ReactU/03-gifs-app && npm install && npm run dev` — uses Vite with HMR (`vite` script in `package.json`).
- Build: `npm run build` runs `tsc -b && vite build` in the demo package. The project uses `noEmit` in `tsconfig.app.json`, so the TypeScript build is primarily for type checks (tsc -b uses project refs in larger configs).
- Lint: `npm run lint` runs ESLint; follow existing ESLint config files at the demo root.

Project-specific conventions

- Files are tiny and educational. Keep changes minimal and clear. Prefer explicit imports (`./GifsApp`) and keep `jsx` set to `react-jsx` in `tsconfig.app.json`.
- TypeScript strictness is enabled in demos. Fix any type errors rather than disabling rules.
- Styling: simple CSS files next to `main.tsx` (`index.css`).

Patterns & examples

- Component pattern: stateless functional components in `src/*.tsx`, e.g. `GifsApp` in `03-gifs-app/src/GifsApp.tsx`.
- Entrypoint: `03-gifs-app/src/main.tsx` — mount with `createRoot(document.getElementById('root')!)`.
- Vite plugin: `vite.config.ts` uses `@vitejs/plugin-react-swc`; keep React fast-refresh compatibility in mind when editing babel/swc-related code.

Integration points / external deps

- `react` / `react-dom` and `@vitejs/plugin-react-swc` are the main runtime/dev deps for React demos. Node demos have separate package manifests under `02-bases` and others.

When modifying code

- Keep changes scoped to the demo folder. Update `package.json` scripts when needed, but avoid adding heavy dependencies — these are learning projects.
- Preserve `tsconfig` compiler options unless a change is required to support new code; note `noEmit: true` and bundler-style module resolution.

Files to inspect for context

- `ReactU/03-gifs-app/package.json` (scripts & deps)
- `ReactU/03-gifs-app/vite.config.ts` (Vite + SWC plugin)
- `ReactU/03-gifs-app/tsconfig.app.json` (TypeScript options)
- `ReactU/03-gifs-app/src/main.tsx` and `src/GifsApp.tsx` (component patterns)
- `NodeU/NodeU/02-bases/package.json` and `src/` for Node tutorial patterns

If you need more context

- Prefer small, incremental edits and run the demo locally with `npm run dev` to validate. If tests exist, run them from the specific demo folder.

If you edit this file, keep it short and concrete (20–50 lines). Reference exact files and scripts rather than general rules.
