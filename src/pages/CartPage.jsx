import "../styles/CartPage.css";

export default function CartPage({ cart, handleDeleteFromCart }) {
  return (
    <>
      <p>Cart Page</p>
      <ul className={"CartPage item-list"}>
        {cart.map((item, i) => (
          <li key={i} className={"CartPage item"}>
            <p>{item.name}</p>
            <p>$9.99</p>
            <img
              src="/delete.png"
              className={"CartPage delete-icon"}
              onClick={() => {
                handleDeleteFromCart(item);
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
