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
            <p>Durability: {product.Durability}</p>
            <p>Length: {product.Length}</p>
            <p>${product.Actual_Price}</p>
        </div>
    )
}