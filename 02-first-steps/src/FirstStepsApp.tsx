import { ItemCounter } from "./shopping-cart/ItemCounter";

export function FirstStepsApp() {
  return (
    <>
      <h3>Carrito de compras </h3>
      <ItemCounter name="uno" />
      <ItemCounter name="dos" />
      <ItemCounter name="tres" />
    </>
  );
}
