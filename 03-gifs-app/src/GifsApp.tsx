import { useState } from "react";

import { CustomHeader } from "./shared/components/CustomHeader.tsx";
import { SearchBar } from "./shared/components/SearchBar.tsx";
import { PreviouSearches } from "./gifs/components/PreviouSearches.tsx";
import { GifsList } from "./gifs/components/GifsList.tsx";

import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action.ts";
import type { Gif } from "./gifs/interfaces/gif.interface.ts";

export const GifsApp = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);//useState(["Freddy"]);//useState<string[]>([]);
  
  const handleTermClicked = (term: string) => {
    console.log(term);
  };


  const handleSearch = async (query: string = '') => {
    query = query.trim().toLowerCase()
    if (query.length === 0) return;
    if(previousTerms.includes(query)) return;
    setPreviousTerms([query, ...previousTerms].splice(0,8));
    const gifs = await getGifsByQuery(query);
    setGifs(gifs);
  };

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
        onQuery={handleSearch}
      />

      {/* Busquedas previas */}
      <PreviouSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      {/* Listado de Gifs */}
      <GifsList gifs={gifs} />
    </>
  );
};
