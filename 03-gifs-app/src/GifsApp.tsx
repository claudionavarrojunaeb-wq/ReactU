import { CustomHeader } from "./shared/components/CustomHeader.tsx";
import { SearchBar } from "./shared/components/SearchBar.tsx";
import { PreviouSearches } from "./shared/components/PreviouSearches.tsx";
import { GifsList } from "./shared/components/GifsList.tsx";
import { mockGifs } from "./mocks-data/gifs.mock";
import { useState } from "react";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(["dragon ball z"]);

  const handleTermClicked = (term: string) => {
    console.log(term);
  };

  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <>
      {/* Header  */}
      <CustomHeader
        title="BUSCADOR DE GIFS"
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
      {/* <GifsList gifs={mockGifs} /> */}
    </>
  );
};
