import "../styles/CartPage.css";
import { useNavigate } from "react-router-dom";

export default function CartPage({ cart, handleDeleteFromCart }) {
  const navigate = useNavigate();
  function viewItem(id) {
    navigate(`/item/${id}`)
  }
  return (
    <div className={"CartPage content"}>
      <div className={"CartPage container"}>
        <h1>Cart</h1>
        <ul className={"CartPage item-list"}>
          {cart.map((item, i) => (
            <li key={i} className={"CartPage item"}>
              <div>
                <img src="stock-item.jpg" className={"CartPage item-photo"} />
              </div>
              <div>
                <p onClick={() => viewItem(item._id)} className={"CartPage item-name"}>{item.Name}</p>
                <p>${item.Actual_Price}</p>
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
      </div>
    </div>
  );
}
