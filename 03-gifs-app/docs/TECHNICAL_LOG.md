# Log de Decisiones Técnicas

Este archivo documenta las decisiones técnicas importantes tomadas durante el desarrollo del proyecto.

## Fecha: 29 de Octubre, 2025

### Decisión: Uso de Union Types en lugar de Enums

**Problema:** 
Durante la compilación del proyecto se encontraron errores de TypeScript relacionados con el uso de `enum`:

```
error TS1294: This syntax is not allowed when 'erasableSyntaxOnly' is enabled.
```

**Archivos afectados:**
- `src/gifs/interfaces/giphy.response.ts`

**Enums originales que causaban problemas:**
```typescript
export enum Rating {
    G = "g",
    PG = "pg",
    R = "r",
}

export enum TrendingDatetimeEnum {
    The00000000000000 = "0000-00-00 00:00:00",
}

export enum Type {
    GIF = "gif",
}

export enum Name {
    Empty = "",
    Mannyjammy = "mannyjammy", 
    Netflixlat = "netflixlat",
}
```

**Solución implementada:**
Convertir todos los enums a tipos de unión (union types):

```typescript
export type Rating = "g" | "pg" | "r";
export type TrendingDatetimeEnum = "0000-00-00 00:00:00";
export type Type = "gif";
export type Name = "" | "mannyjammy" | "netflixlat";
```

**Razones de la decisión:**

1. **Compatibilidad con configuración actual:** El proyecto usa `erasableSyntaxOnly: true` en la configuración de TypeScript para optimización.

2. **Rendimiento:** Los union types no generan código JavaScript adicional en runtime, a diferencia de los enums que crean objetos.

3. **Simplicidad:** Para este caso específico donde solo necesitamos valores string constantes, los union types son más directos.

4. **Tamaño del bundle:** Menor tamaño final del JavaScript compilado.

**Alternativas consideradas:**
- Cambiar `erasableSyntaxOnly: false` en la configuración de TypeScript
- Usar `const enum` (descartado por limitaciones similares)

**Impacto:**
- ✅ Compilación exitosa
- ✅ Mismo nivel de type safety
- ✅ Autocompletado funcional
- ⚠️ Sintaxis ligeramente diferente (usar strings directamente en lugar de `Rating.G`)

**Resultado:**
El proyecto compila correctamente y mantiene todas las funcionalidades de tipado estricto sin comprometer el rendimiento.

---

## Otras Decisiones Técnicas

### Corrección de Import en GifsList.tsx

**Problema:** Import incorrecto desde mock en lugar de interface
```typescript
// ❌ Antes
import type { Gif } from "../../mocks-data/gifs.mock";

// ✅ Después  
import type { Gif } from "../interfaces/gif.interface";
```

**Razón:** Usar la interface oficial en lugar del mock para mejor organización y claridad.

---

*Nota: Este log debe actualizarse cada vez que se tomen decisiones técnicas importantes que afecten la arquitectura o configuración del proyecto.*