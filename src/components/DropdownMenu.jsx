import { useNavigate } from "react-router-dom";
import "../styles/DropdownMenu.css";

const DropdownMenu = ({ cart, handleDeleteFromCart }) => {
  const navigate = useNavigate();

  function directViewCart() {
    navigate("/cart");
  }

  function directCheckout() {
    navigate("/checkout");
  }

  return (
    <>
      {cart.length > 0 ? (
        <div className="DropdownMenu menu">
          <ul>
            <li className={"DropdownMenu dropdown-button"}>
              <button onClick={directCheckout}>Checkout</button>
            </li>
            <li className={"DropdownMenu dropdown-button"}>
              <button onClick={directViewCart}>View Cart</button>
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DropdownMenu;
