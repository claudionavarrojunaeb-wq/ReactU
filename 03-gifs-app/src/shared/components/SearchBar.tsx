import { useEffect, useRef, useState } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void; // onQuery: (q: string) => void;
  buttonText?: string;
}
export const SearchBar: React.FC<Props> = ({ placeholder = "Buscador de gifs",onQuery, buttonText = "Buscar",}: Props) => {
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
  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  }
  return (
    <div className="search-container">
      {/* <h1>{query}</h1> */}
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)} //{(event) => console.log(event)} //
        onKeyDown={handleKeydown}
       />
      <button onClick={handleSearch}>{buttonText}</button>
    </div>
  );
};
