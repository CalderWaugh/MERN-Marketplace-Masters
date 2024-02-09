import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ItemPage.css";

export default function ItemPage({ handleAddItemToCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;


  const [product, setProduct] = useState(null);

  async function getItem() {
    try {
      let productId = pathname.split("/")[2];
      let productUrl = `http://localhost:3000/api/products/${productId}`;
      let productResponse = await fetch(productUrl);
      if (!productResponse.ok) {
        throw new Error("Failed to fetch product");
      }
      let productData = await productResponse.json();

      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className={"ItemPage content"}>
      {product ? (
        <div className={"ItemPage container"}>
          <div>
            <img src="/stock-item.jpg" alt="Product" className={"ItemPage item-photo"} />
          </div>
          <div className={"ItemPage item-info-container"}>
            <p>{product.Name}</p>
            <p>${product.Actual_Price}</p>
            <p>Recommended:</p>
            <ul>
              <li>Goes here</li>
            </ul>

          </div>
          <img
            src="/add-to-cart.png"
            alt="Add to Cart"
            className={"CartPage add-to-cart-icon"}
            onClick={() => {
              handleAddItemToCart(product);
              navigate("/cart");
            }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
