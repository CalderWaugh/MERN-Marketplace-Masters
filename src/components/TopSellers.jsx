import { useEffect, useState } from "react";
import Product from "./Product";
import "../styles/TopSellers.css";

export default function TopSellers() {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products/bestsellers");
        console.log(response.body);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        products = await response.json();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={"TopSellers products-container"}>
      <div className={"TopSellers header"}>
        <h1>Top Sellers</h1>
      </div>
      {products.map((p, i) => {
        return (
            <Product key={i} product={p} />
        );
      })}
    </div>
  );
}