import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "../SearchBar";

describe("SearchBar defaults and empty submit", () => {
  test("usa placeholder y buttonText por defecto y llama onQuery con cadena vacía", () => {
    const handle = jest.fn();

    // El componente define valores por defecto para placeholder y buttonText,
    // por lo que podemos renderizarlo pasando únicamente la prop requerida.
    render(<SearchBar onQuery={handle} />);

    const input = screen.getByPlaceholderText("Buscador de gifs");
    expect(input).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Buscar" });
    expect(button).toBeInTheDocument();

    // Click sin escribir debe enviar cadena vacía
    fireEvent.click(button);
    expect(handle).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenCalledWith("");
  });
});
