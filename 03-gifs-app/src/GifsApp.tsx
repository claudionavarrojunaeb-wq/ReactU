import { CustomHeader } from "./shared/components/CustomHeader.tsx";
import { SearchBar } from "./shared/components/SearchBar.tsx";
import { PreviouSearches } from "./shared/components/PreviouSearches.tsx";
import { GifsList } from "./shared/components/GifsList.tsx";
import { mockGifs } from "./mocks-data/gifs.mock";
import { useState } from "react";

export const GifsApp = () => {
  // const [previousTerms, setPreviousTerms] = useState(["dragon ball z"]);
  const [previousTerms, setPreviousTerms] = useState([]);
  const handleTermClicked = (termino: string) => {
    console.log(termino);
  };

  const handleSearch = (query: string = '') => {
    query = query.trim().toLowerCase()
    if (query.length === 0) return;
    if(previousTerms.includes(query)) return;
    setPreviousTerms([query, ...previousTerms].splice(0,8))
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
        // onLabelClicked={(term: string) => handleTermClicked(term)}
        onLabelClicked={handleTermClicked}
      />

      {/* Listado de Gifs */}
      <GifsList gifs={mockGifs} />
    </>
  );
};
