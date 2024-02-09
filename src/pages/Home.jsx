import "../styles/Home.css";
import Recommendations from "../components/Recommendations";
import BuyAgain from "../components/BuyAgain";
import TopSellers from "../components/TopSellers";
import Products from "../components/Products";

export default function Home() {
  return (
    <>
      <TopSellers />
      <Products />
      {/* <Recommendations />
      <BuyAgain /> */}
    </>
  );
}
