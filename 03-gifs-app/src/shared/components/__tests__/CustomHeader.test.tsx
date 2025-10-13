import { render, screen } from "@testing-library/react";
import { CustomHeader } from "../CustomHeader";

describe("CustomHeader", () => {
  test("muestra title y description cuando existe", () => {
    render(<CustomHeader title="TIT" description="DESC" />);
    expect(screen.getByText("TIT")).toBeInTheDocument();
    expect(screen.getByText("DESC")).toBeInTheDocument();
  });

  test("no renderiza description si no se pasa", () => {
    render(<CustomHeader title="Only Title" />);
    expect(screen.getByText("Only Title")).toBeInTheDocument();
    // No debe existir un heading de nivel 2 (subtitle) cuando no se pasa description
    expect(screen.queryByRole("heading", { level: 2 })).toBeNull();
  });
});
