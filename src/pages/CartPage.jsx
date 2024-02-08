import "../styles/CartPage.css";

export default function CartPage({ cart, handleDeleteFromCart }) {
  return (
    <>
      <p>Cart Page</p>
      <ul className={"CartPage item-list"}>
        {cart.map((item, i) => (
          <li key={i} className={"CartPage item"}>
            <div>
              <img src="stock-item.jpg" className={"CartPage item-photo"} />
            </div>
            <div>
              <p>{item.name}</p>
              <p>$9.99</p>
            </div>
            <div>
              <img
                src="/delete.png"
                className={"CartPage delete-icon"}
                onClick={() => {
                  handleDeleteFromCart(item);
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
