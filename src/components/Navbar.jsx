/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";
import DropdownMenu from "./DropdownMenu";

export default function Navbar({ cart, handleDeleteFromCart }) {
  const navigate = useNavigate();

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [durability, setDurability] = useState('good');
  const [size, setSize] = useState('medium');

  function handleSearch() {
    navigate(`/search/${durability}/${size}`);
  }

  function directViewCart() {
    navigate("/cart");
  }

  function handleMouseEnter() {
    setDropdownVisible(true);
  }

  function handleMouseLeave() {
    setDropdownVisible(false);
  }

  function onClickHome() {
    navigate("/");
  }

  function changeDurability(e) {
    setDurability(e.target.value)
  }
  
  function changeSize(e) {
    setSize(e.target.value)
  }

  return (
    <nav className="navbar">
      <img
        src="/TheUmbrellaShoppe.png"
        onClick={onClickHome}
        className={"Navbar home-logo"}
      />
      <form onSubmit={handleSearch}>
        <label htmlFor="durability">Durability</label>
        <select
          id="durability"
          name="durability"
          value={durability}
          onChange={changeDurability}
          className={"Navbar dropdown"}
        >
          <option value="standard">Standard</option>
          <option value="good">Good</option>
          <option value="ultra">Ultra</option>
        </select>
        <label htmlFor="size">Size</label>
        <select
          id="size"
          name="size"
          value={size}
          onChange={changeSize}
          className={"Navbar dropdown"}
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
        <input
          type="submit"
          value="Search"
          className={"Navbar search-submit"}
        />
      </form>
      <div
        className={"Navbar cart-icon-container"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={"Navbar dropdown-toggle-container"}>
          <img
            src="/cart.png"
            onClick={directViewCart}
            className={"Navbar cart-icon"}
          />
          <p>{cart.length > 0 ? cart.length : <></>}</p>
        </div>
        {isDropdownVisible && (
          <DropdownMenu
            cart={cart}
            handleDeleteFromCart={handleDeleteFromCart}
          />
        )}
      </div>
    </nav>
  );
}
