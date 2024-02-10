import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ItemPage.css";
import Product from "../components/Product";

export default function ItemPage({ handleAddItemToCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [product, setProduct] = useState({});
  const [recommendations, setRecommendations] = useState([]);

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
    let recs = await getRecommendations(prod.Recommendations);
    setRecommendations(recs)
  }

  async function getRecommendations(rec) {
    let url = "/api/productname";
    let rec_map = rec.map(async (r) => {
      let data = { Name: r };
      let res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      let prod = await res.json();
      return prod
    })
    let recs = await Promise.all(rec_map)
    return recs;

  }

  useEffect(() => {
    getItem();
  }, []);
  

  return (
    <div className={"ItemPage content"}>
      {product ? (
        <>
          <div className={"ItemPage container"}>
            <div>
              <img src="/stock-item.jpg" className={"ItemPage item-photo"} />
            </div>
            <div className={"ItemPage item-info-container"}>
              <p>{product.Name}</p>
              <p>Durability: {product.Durability}</p>
              <p>Length: {product.Length}</p>
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

          <div className={"ItemPage recommendations-container"}>
            <div className={"ItemPage recommendations-header"}>
              <h1>Recommendations</h1>
            </div>
            {recommendations ? recommendations.map((p, i) => {
              return <Product key={i} product={p} />;
            }) : <p>hi</p>}
          </div>
        </>
      ) : (
        <>
          <p>No result</p>
        </>
      )}
    </div>
  );
}
