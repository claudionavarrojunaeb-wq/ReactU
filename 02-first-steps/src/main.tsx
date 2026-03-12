import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import { FirstStepsApp } from "./FirstStepsApp";
//import { OtroComponente } from "./OtroComponente";
import { MyAwesomeApp } from "./MyAwesomeApp";
// import './index.css'
// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <FirstStepsApp /> */}
     <MyAwesomeApp />
    {/* <OtroComponente name = 'nombre'/> */}
  </StrictMode>,
);
