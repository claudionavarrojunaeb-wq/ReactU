# Componentes principales

Resumen de los componentes más relevantes del proyecto y sus props/tipos.

1. CustomHeader
- Ubicación: `src/shared/components/CustomHeader.tsx`
- Props esperadas (ejemplo):
  - `title: string` — título principal.
  - `description?: string` — descripción/subtítulo.

2. SearchBar
- Ubicación: `src/shared/components/SearchBar.tsx`
- Props:
  - `placeholder?: string` — texto del placeholder del input.
  - `onQuery: (query: string) => void` — callback llamado cuando cambia la query o se hace la búsqueda.
  - `buttonText?: string` — texto del botón de búsqueda.

Comportamiento clave:
- Tiene un debounce de 500ms en el `useEffect` para que las búsquedas se lancen automáticamente mientras el usuario escribe.
- El botón ejecuta una búsqueda inmediata leyendo el valor actual del input desde `ref`.

3. PreviouSearches
- Ubicación: `src/gifs/components/PreviouSearches.tsx`
- Props esperadas:
  - `searches: string[]` — lista de términos previos.
  - `onLabelClicked: (term: string) => void` — callback cuando el usuario clickea un término.

4. GifsList
- Ubicación: `src/gifs/components/GifsList.tsx`
- Props:
  - `gifs: Gif[]` — arreglo de gifs a mostrar. El tipo `Gif` está definido en `src/gifs/interfaces/gif.interface.ts` o en `src/mocks-data/gifs.mock.ts`.

5. Acciones / API helper
- `src/gifs/actions/get-gifs-by-query.action.ts` — encapsula la llamada a `giphyApi` y mapea la respuesta a los tipos locales.

Cómo ampliar
- Para añadir ejemplos concretos de props o snapshots de uso, puedo generar ejemplos de Storybook o tests unitarios que muestren los props y el render.
