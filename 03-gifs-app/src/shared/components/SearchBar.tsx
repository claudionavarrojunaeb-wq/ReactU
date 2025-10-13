import { useState } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void; // onQuery: (q: string) => void;
  buttonText?: string;
}
export const SearchBar: React.FC<Props> = ({
  placeholder = "Buscador de gifs",
  onQuery,
  buttonText = "Buscar",
}: Props) => {
  const [query, setQuery] = useState("");
  const submit = () => {
    onQuery(query);
  };
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={submit}>{buttonText}</button>
    </div>
  );
};
