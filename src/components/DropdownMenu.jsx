import { useNavigate } from "react-router-dom";
import "../styles/DropdownMenu.css";
import { useEffect } from "react";

const DropdownMenu = ({ cart, handleDeleteFromCart }) => {
  const navigate = useNavigate();

  function directViewCart() {
    navigate("/cart");
  }

  function directCheckout() {
    navigate("/checkout");
  }

  useEffect(() => {
    cart.forEach((item) => {
      console.log(item.name);
    });
  }, []);

  return (
    <div className="DropdownMenu menu">
      <ul>
        <li className={"DropdownMenu dropdown-button"}>
          <button onClick={directViewCart}>View Cart</button>
        </li>
        <li className={"DropdownMenu dropdown-button"}>
          <button
            onClick={directCheckout}
          >
            Checkout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
