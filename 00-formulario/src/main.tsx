import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Formulario01 } from "./Formulario01";
import { Formulario } from "./Formulario";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Formulario />
    <Formulario01 />
  </StrictMode>
);
