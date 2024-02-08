import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ItemPage.css";

export default function ItemPage({ handleAddItemToCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [product, setProduct] = useState({ name: "Umbrella V1" });

  async function getItem() {
    let url = "http://localhost:3000";
    let search_param = pathname.split("/")[2];
    let data = { product: search_param };
    let res = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let search_res = await res.json();
    setProduct(search_res);
  }

  useEffect(() => {
    // getItem()
  }, []);

  return (
    <div className={"ItemPage content"}>
      {product ? (
        <div className={"ItemPage container"}>
          <div>
            <img src="/stock-item.jpg" className={"ItemPage item-photo"} />
          </div>
          <div className={"ItemPage item-info-container"}>
            <p>{product.name}</p>
            <p>$9.99</p>
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
