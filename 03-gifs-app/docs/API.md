# API — Giphy

Este archivo documenta cómo la aplicación consume la API de Giphy.

Endpoint principal
- Base URL: `https://api.giphy.com/v1/gifs`

Configuración en el proyecto
- Archivo: `src/gifs/api/giphy.api.ts`
- Se usa Axios con la siguiente configuración por defecto:
  - `baseURL: 'https://api.giphy.com/v1/gifs'`
  - `params.lang = 'es'`
  - `params.api_key = import.meta.env.VITE_GIPHY_API_KEY`

Variables de entorno
- Debes definir `VITE_GIPHY_API_KEY` en el entorno (por ejemplo en `.env`):

```
VITE_GIPHY_API_KEY=tu_api_key_aqui
```

Ejemplo de uso (interno)
- La acción `getGifsByQuery` utiliza `giphyApi` para solicitar el recurso `search` o `trending` según corresponda. Generalmente la llamada es algo como:

```ts
const { data } = await giphyApi.get('/search', { params: { q: query, limit: 25 } })
// mapear data.data a la interfaz local Gif
```

Notas
- La API key se inyecta en tiempo de build/entorno por Vite. No subir una clave privada al repositorio.
- Respeta los límites de rate y la política de uso de Giphy.
