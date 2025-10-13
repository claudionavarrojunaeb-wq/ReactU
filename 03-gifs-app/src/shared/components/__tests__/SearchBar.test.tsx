import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "../SearchBar";

describe("SearchBar", () => {
  test("renderiza placeholder y buttonText, y llama a onQuery al enviar", () => {
    const handleQuery = jest.fn();

    render(
      <SearchBar
        placeholder="Buscar gifs..."
        buttonText="Buscar ahora"
        onQuery={handleQuery}
      />
    );

    // verificar placeholder
    const input = screen.getByPlaceholderText(
      "Buscar gifs..."
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();

    // escribir en el input
    fireEvent.change(input, { target: { value: "batman" } });
    expect(input.value).toBe("batman");

    // click en el botón
    const button = screen.getByRole("button", { name: "Buscar ahora" });
    fireEvent.click(button);

    expect(handleQuery).toHaveBeenCalledTimes(1);
    expect(handleQuery).toHaveBeenCalledWith("batman");
  });
});
