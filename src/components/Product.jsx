import { useNavigate } from "react-router";
import "../styles/Product.css";

export default function Product({ product }) {
  const navigate = useNavigate();

  function viewProduct(id) {
    navigate(`/item/${id}`);
  }

  return (
    <div className={"Product product-container"}
    onClick={() => viewProduct(product._id)}>
      <p
        className={"Product product-name"}
      >
        {product.Name}
      </p>
      <p>
        Durability:{" "}
        <span className={"Product descriptor"}>
          {product.Durability < 3 ? "Standard" : ""}
          {product.Durability === 3 ? "Good" : ""}
          {product.Durability > 3 ? "Ultra" : ""}
        </span>
      </p>
      <p>
        Length:{" "}
        <span className={"Product descriptor"}>
          {product.Length < 21 ? "Short" : ""}
          {product.Length <= 35 && product.Length >= 21 ? "Medium" : ""}
          {product.Length > 35 ? "Long" : ""}
        </span>
      </p>
      <div className={"Product actual-price-container"}>
        <p>${product.Actual_Price}</p>
      </div>
    </div>
  );
}
