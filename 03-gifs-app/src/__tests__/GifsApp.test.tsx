import { render, screen, fireEvent } from "@testing-library/react";
import { GifsApp } from "../GifsApp";

describe("GifsApp integration", () => {
  test("muestra header, searchbar y previous searches; los handlers llaman console.log", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(<GifsApp />);

    // Header
    expect(screen.getByText("BUSCADOR DE GIFS")).toBeInTheDocument();
    expect(screen.getByText("Encuentra los mejores gifs")).toBeInTheDocument();

    // SearchBar input and button
    const input = screen.getByPlaceholderText("Buscador de gifs");
    const button = screen.getByRole("button", { name: "Buscar" });

    fireEvent.change(input, { target: { value: "batman" } });
    fireEvent.click(button);

    // onQuery logs the query
    expect(logSpy).toHaveBeenCalledWith("batman");

    // Previous searches
    const prev = screen.getByText("dragon ball z");
    expect(prev).toBeInTheDocument();
    fireEvent.click(prev);
    expect(logSpy).toHaveBeenCalledWith("dragon ball z");

    logSpy.mockRestore();
  });
});
