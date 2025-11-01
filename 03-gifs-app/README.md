# Buscador de GIFs (React + TypeScript + Vite)

Proyecto de ejemplo: una pequeña aplicación para buscar GIFs usando la API de Giphy.

Descripción corta
------------------
Aplicación en React + TypeScript creada con Vite. Permite buscar GIFs, mostrar resultados y mantener un historial de búsquedas recientes.

Principales características
- Búsqueda de GIFs usando la API de Giphy.
- Componente de búsqueda con debounce (auto-búsqueda tras 500ms).
- Listado de resultados y búsquedas previas.

Requisitos
----------
- Node.js 18+ (recomendado)
- npm, yarn o pnpm

Variables de entorno
--------------------
Debes crear un archivo `.env` (o `.env.local`) en la raíz con la variable de entorno para la API key de Giphy:

VITE_GIPHY_API_KEY=tu_api_key_aqui

La app lee esta variable mediante `import.meta.env.VITE_GIPHY_API_KEY`.

Instalación y ejecución
-----------------------
En PowerShell (Windows) desde la raíz del proyecto:

```powershell
npm install
npm run dev
```

Scripts principales (definidos en `package.json`)
- `npm run dev` — inicia Vite en modo desarrollo.
- `npm run build` — compila TypeScript y genera la build de Vite.
- `npm run preview` — sirve la build de producción.
- `npm run lint` — ejecuta ESLint.
- `npm test` — ejecuta Jest (pasa si no hay tests).
- `npm run coverage` — ejecuta tests con reporte de cobertura.

Estructura del proyecto
------------------------
Carpeta `src/` con la siguiente organización relevante:

- `src/GifsApp.tsx` — Componente principal que orquesta la búsqueda y el estado.
- `src/main.tsx` — Punto de entrada.
- `src/gifs/` — Lógica relacionada con gifs:
  - `api/giphy.api.ts` — configuración de Axios para Giphy (usa VITE_GIPHY_API_KEY).
  - `actions/get-gifs-by-query.action.ts` — acción que obtiene GIFs por query.
  - `components/` — componentes relacionados (GifsList, PreviouSearches, etc.).
  - `interfaces/` — tipos e interfaces (Gif, GiphyResponse, ...).
- `src/shared/components/` — componentes compartidos (SearchBar, CustomHeader, ...).

Componentes principales
----------------------
- `CustomHeader` — cabecera con título y descripción.
- `SearchBar` — input con debounce; props: `placeholder?: string`, `onQuery: (q:string)=>void`, `buttonText?: string`.
- `PreviouSearches` — muestra búsquedas previas y permite click sobre ellas.
- `GifsList` — muestra listado de GIFs. Recibe `gifs: Gif[]`.

API y configuración
-------------------
La comunicación con Giphy se hace vía Axios configurado en `src/gifs/api/giphy.api.ts`:

- `baseURL`: `https://api.giphy.com/v1/gifs`
- `params`: incluye `api_key` desde `import.meta.env.VITE_GIPHY_API_KEY` y `lang: 'es'`.

Documentación adicional
----------------------
Se añadió la carpeta `docs/` con:

- `docs/API.md` — detalles de la API y cómo configurar la API key.
- `docs/COMPONENTS.md` — listado de componentes y sus props/tipos.
- `docs/TECHNICAL_LOG.md` — log de decisiones técnicas importantes del proyecto.

Tests y lint
-----------
- Tests con Jest (configuración mínima incluida). Ejecuta `npm test` o `npm run test:watch`.
- Lint con ESLint: `npm run lint`.

Decisiones técnicas
------------------
**¿Por qué no usamos `enum` en este proyecto?**

En `src/gifs/interfaces/giphy.response.ts` usamos tipos de unión (`type Rating = "g" | "pg" | "r"`) en lugar de enums por las siguientes razones:

1. **Compatibilidad con `erasableSyntaxOnly`**: La configuración de TypeScript del proyecto tiene `erasableSyntaxOnly: true` para optimización, que no permite la sintaxis de enums.

2. **Menos código generado**: Los tipos de unión no generan código JavaScript adicional, mientras que los enums sí.

3. **Mejor rendimiento**: Al no generar objetos JavaScript en runtime, los tipos de unión son más eficientes.

4. **Simplicidad**: Para casos simples como este, los string literals son más directos.

Ejemplo de conversión realizada:
```typescript
// ❌ Antes (causaba error de compilación)
export enum Rating {
    G = "g",
    PG = "pg", 
    R = "r"
}

// ✅ Después (funciona correctamente)
export type Rating = "g" | "pg" | "r";
```

Si en el futuro necesitas enums, puedes cambiar `erasableSyntaxOnly: false` en la configuración de TypeScript.

Cómo contribuir
---------------
- Haz un fork y crea una rama con tu feature/bugfix.
- Abre un PR describiendo el cambio.

Notas finales
------------
Esta documentación es un punto de partida. Si quieres que amplíe la sección de componentes con ejemplos de props/propTypes, o que añada instrucciones para desplegar en Netlify/Vercel, dime y lo añado.

Licencia
--------
Consulta el archivo `package.json` para los metadatos del autor.

