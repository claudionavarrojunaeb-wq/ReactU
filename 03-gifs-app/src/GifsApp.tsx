import { CustomHeader } from "./shared/components/CustomHeader.tsx";
import { SearchBar } from "./shared/components/SearchBar.tsx";
import { PreviouSearches } from "./gifs/components/PreviouSearches.tsx";
import { GifsList } from "./gifs/components/GifsList.tsx";
import { useGifs } from "./gifs/hooks/useGifs.tsx";

export const GifsApp = () => {
  const {gifs,previousTerms, handleTermClicked, handleSearch} = useGifs()

  return (
    <>
      {/* Header  */}
      <CustomHeader
        title="Buscador de gifs"
        description="Encuentra los mejores gifs"
      />

      {/* Buscador*/}
      <SearchBar
        placeholder="Buscador de gifs"
        buttonText="Buscar"
        onQuery={handleSearch}// onQuery={(query:string)=>handleSearch(query)}
      />

      {/* Busquedas previas */}
      <PreviouSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}//{(term: string) =>{return handleTermClicked(term)}}
      />

      {/* Listado de Gifs */}
      <GifsList gifs={gifs} />
    </>
  );
};
