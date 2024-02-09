import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ItemPage.css";

export default function ItemPage({ handleAddItemToCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [product, setProduct] = useState({});

  async function getItem() {
    let url = "/api/product";
    let search_param = pathname.split("/")[2];
    let data = { id: search_param };
    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let prod = await res.json();
    setProduct(prod);
  }

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className={"ItemPage content"}>
      {product ? (
        <div className={"ItemPage container"}>
          <div>
            <img src="/stock-item.jpg" className={"ItemPage item-photo"} />
          </div>
          <div className={"ItemPage item-info-container"}>
            <p>{product.Name}</p>
            <p>${product.Actual_Price}</p>
          </div>
          <img
            src="/add-to-cart.png"
            className={"CartPage add-to-cart-icon"}
            onClick={() => {
              handleAddItemToCart(product);
              navigate("/cart");
            }}
          />
        </div>
      ) : (
        <>
          <p>No result</p>
        </>
      )}
    </div>
  );
}
