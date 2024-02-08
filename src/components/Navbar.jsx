/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";
import DropdownMenu from "./DropdownMenu";

export default function Navbar({ cart, handleDeleteFromCart }) {
  const navigate = useNavigate();

  const [searchParam, setSearchParam] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  function handleChangeSearchParam(event) {
    setSearchParam(event.target.value);
  }
  function handleSearch() {
    navigate(`/search/${searchParam}`);
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

  return (
    <nav className="navbar">
      <p onClick={onClickHome} className={"Navbar home-logo"}>MERN Marketplace</p>
      <form onSubmit={handleSearch}>
        <input
          id="search-param"
          type="text"
          onChange={handleChangeSearchParam}
          className={"Navbar search-box"}
        />
        <input type="submit" value="Search" className={"Navbar search-submit"} />
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
        {isDropdownVisible && <DropdownMenu cart={cart} handleDeleteFromCart={handleDeleteFromCart} />}
      </div>
    </nav>
  );
}
