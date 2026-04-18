import { ItemCounter } from './shopping-cart/ItemCounter';

interface ItemInCart {
  productName: string;
  quantity: number;
}

const itemsInCart: ItemInCart[] = [
  { productName: "Nintendo Switch 2", quantity: 1 },
  { productName: "Pro Controller", quantity: 2 },
  { productName: "Super Smash", quantity: 3 },
];
export function FirstStepsApp() {
  return (
    <>
      <h3>Carrito de compras </h3>
      {itemsInCart.map(({ productName, quantity }) => (
        <ItemCounter key={quantity} name={productName} quantity={quantity} />
      ))}
      {/* <ItemCounter name="uno" />
      <ItemCounter name="dos" />
      <ItemCounter name="tres" /> */}
    </>
  );
}
