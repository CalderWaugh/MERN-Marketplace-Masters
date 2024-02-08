import { Outlet } from "react-router-dom";
import "../styles/Layout.css";
import Navbar from "../components/Navbar";

export default function Layout({cart}) {
  return (
    <>
      <Navbar cart={cart} />
      <Outlet />
    </>
  );
}
