interface Props {
  placeholder: string;
  onQuery: (query: string) => void;
}
export const SearchBar = ({
  placeholder = "Buscador de gifs", //en caso de que venga vacío
  onQuery,
}: Props) => {
  const [query, setQuery] = useState("");
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button>Buscar</button>
    </div>
  );
};
function useState(arg0: string): [any, any] {
  throw new Error("Function not implemented.");
}
