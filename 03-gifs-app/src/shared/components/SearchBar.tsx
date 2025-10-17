import { useEffect, useState } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void; // onQuery: (q: string) => void;
  buttonText?: string;
}
export const SearchBar: React.FC<Props> = ({ placeholder = "Buscador de gifs",onQuery, buttonText = "Buscar",}: Props) => {
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    const timeoutId = setTimeout(()=>{
      onQuery(query)
    },500)
    
    return()=>{
      clearTimeout(timeoutId)
    }
  },[query, onQuery])
  
  
  
  
  const handleSearch = () => {
    onQuery(query);
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
