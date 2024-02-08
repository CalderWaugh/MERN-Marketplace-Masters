import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";
import DropdownMenu from "./DropdownMenu";

export default function Navbar({cart}) {
  const navigate = useNavigate();

  const [searchParam, setSearchParam] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  function handleChangeSearchParam(event) {
    setSearchParam(event.target.value)
  }
  function handleSearch() {
    navigate(`/search/${searchParam}`)
  }

  function directViewCart() {
    navigate("/cart")
  }
  
  function handleMouseEnter() {
    setDropdownVisible(true);
  };

  function handleMouseLeave() {
    setDropdownVisible(false);
  };

  return (
    <nav className="navbar">
      <img src="" />
      <form onSubmit={handleSearch}>
        <input id="search-param" type="text" onChange={handleChangeSearchParam} />
        <input type="submit" value="Search" />
      </form>
      <div 
        className={"Navbar cart-icon-container"} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img 
        src="/cart.png"
        onClick={directViewCart}
        className={"Navbar cart-icon"} />
        <p>{cart.length > 0 ? cart.length : <></>}</p>
        {isDropdownVisible && <DropdownMenu cart={cart} />}
      </div>
    </nav>
  );
}
