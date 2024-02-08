import { Outlet } from "react-router-dom";
import "../styles/Layout.css";
import Navbar from "../components/Navbar";

export default function Layout({cart, handleDeleteFromCart}) {
  return (
    <>
      <Navbar cart={cart} handleDeleteFromCart={handleDeleteFromCart} />
      <Outlet />
    </>
  );
}
