import { render, screen, fireEvent } from "@testing-library/react";
import { PreviouSearches } from "../PreviouSearches";

describe("PreviouSearches", () => {
  test("muestra la lista y llama onLabelClicked al hacer click", () => {
    const searches = ["one", "two"];
    const handle = jest.fn();

    render(<PreviouSearches searches={searches} onLabelClicked={handle} />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);

    fireEvent.click(items[1]);
    expect(handle).toHaveBeenCalledWith("two");
  });
});
