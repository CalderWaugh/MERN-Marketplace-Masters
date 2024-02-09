import { useEffect, useState } from "react";
import Product from "./Product";
import "../styles/Products.css";

const prod_per_page = 40;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const getDisplayedProducts = () => {
    let end = prod_per_page * pageNumber;
    let dp = products.slice(prod_per_page * (pageNumber - 1), end);
    console.log(`dp ${dp}`);
    setDisplayedProducts(dp);
  };

  const changePageNumber = (e) => {
    let new_page = e.target.value;
    setPageNumber(new_page);
  };

  const getProducts = async () => {
    try {
      const response = await fetch("/api/products");
      console.log(response.body);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      let prod = await response.json();
      console.log(prod);
      await setProducts(prod);
      setMaxPage(products.length / prod_per_page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getDisplayedProducts();
  }, [products, pageNumber]);
  return (
    <>
      {products ? (
        <div className={"Products products-container"}>
          <div className={"Products header"}>
            <h1>All Umbrellas</h1>
          </div>
          {displayedProducts.map((p, i) => (
            <Product key={i} product={p} />
          ))}
          <div className={"Products page-container"}>
            <input
              type="number"
              id="page-number"
              name="page-number"
              min="1"
              max={maxPage}
              value={pageNumber}
              onChange={changePageNumber}
            />
          </div>
        </div>
      ) : (
        <>
          <p>loading</p>
        </>
      )}
    </>
  );
}
