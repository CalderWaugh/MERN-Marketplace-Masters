import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const [searchParam, setSearchParam] = useState("");

  function handleChangeSearchParam(event) {
    setSearchParam(event.target.value)
  }
  function handleSearch() {
    navigate(`/search/${searchParam}`)
  }

  return (
    <nav className="navbar">
      <img src="" />
      <form onSubmit={handleSearch}>
        <input id="search-param" type="text" onChange={handleChangeSearchParam} />
        <input type="submit" value="Search" />
      </form>
      <img src="" />
    </nav>
  );
}
