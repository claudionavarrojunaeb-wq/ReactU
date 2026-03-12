import { useEffect, useRef, useState, type FC, type KeyboardEvent } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void; // onQuery: (q: string) => void;
  buttonText?: string;
}
export const SearchBar: FC<Props> = ({ placeholder = "Buscador de gifs",onQuery, buttonText = "Buscar",}: Props) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  useEffect(() => {
    const timeoutId = setTimeout(()=>{
      onQuery(query)
    },500)
    
    return()=>{
      clearTimeout(timeoutId)
    }
  },[query, onQuery])
  
  const handleSearch = () => {
    // Read the current value from the input DOM to avoid stale state during tests
    const current = inputRef.current?.value ?? query;
    onQuery(current);
    // setQuery("")
  };
   const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "Enter") {
          handleSearch();
        }  
  } 
  
  return (
    <div className="search-container">
      {/* {<h1>{query}</h1> } */}
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      //value={query}
      onChange={(a) => setQuery(a.target.value)}
      onKeyDown={handleKeydown}//{(event) => {handleKeydown(event)}}
      // onKeyDown={(event) => {
      //   if (event.key === "Enter") {
      //     handleSearch();
      //   }
      // }}
    />
      <button onClick={handleSearch}>{buttonText}</button>
    </div>
  );
};
