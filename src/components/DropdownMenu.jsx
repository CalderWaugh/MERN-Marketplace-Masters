import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DropdownMenu.css";

const DropdownMenu = ({cart}) => {
    const navigate = useNavigate();

    function directViewCart() {
        navigate("/cart")
    }

    function directCheckout() {
        navigate("/checkout")
    }

    return (
        <div className="DropdownMenu menu">
        <ul>
            {cart.map((item) => {
                <li key={item.id}>{item.name}</li>
            })}
            <li><button onClick={directViewCart}>View Cart</button></li>
            <li><button onClick={directCheckout}>Checkout</button></li>
        </ul>
        </div>
    );
};

export default DropdownMenu;