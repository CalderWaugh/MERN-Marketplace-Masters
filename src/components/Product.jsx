import { useNavigate } from "react-router";
import "../styles/Product.css";

export default function Product({product}) {
    const navigate = useNavigate();
    
    function viewProduct(id) {
        navigate(`/item/${id}`)
    }

    return (
        <div className={"Product product-container"}>
            <p className={"Product product-name"} onClick={() => viewProduct(product._id)}>{product.Name}</p>
            <p>Durability: {product.Durability < 3 ? "Standard" : "" }{product.Durability === 3  ? "Good" : "" }{product.Durability > 3  ? "Ultra" : "" }</p>
            <p>Length: {product.Length < 21 ? "Short" : "" }{product.Length <= 35 && product.Length >= 21  ? "Medium" : "" }{product.Length > 35  ? "Long" : "" }</p>
            <p>${product.Actual_Price}</p>
        </div>
    )
}