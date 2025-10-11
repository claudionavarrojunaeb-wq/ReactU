import type { CSSProperties } from "react";

const firstName = "Claudio";
const lastName = "Navarro";
const favoriteGames = ["uno", "dos", "tres"];
const isActive = false;
const address = {
  zipCode: "ytre4565",
  country: "canada",
};
const myStyles: CSSProperties = {
  backgroundColor: "#cccccc",
  borderRadius: isActive ? 10 : 20,
  padding: 10,
};
export function MyAwesomeApp() {
  return (
    <>
      <h1>{firstName}</h1>
      <h6>{lastName}</h6>
      <h6>{favoriteGames.join(", ")}</h6>
      <p>{6 + 4}</p>
      <p>{isActive ? "Activo" : "Inactivo"}</p>
      <p style={myStyles}>{JSON.stringify(address)}</p>
    </>
  );
}
