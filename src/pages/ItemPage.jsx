import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ItemPage() {
    const location = useLocation();
    const { pathname } = location;

    const [product, setProduct] = useState({name: "Umbrella V1"});

    async function getItem() {
        let url = "http://localhost:3000"
        let search_param = pathname.split("/")[2]
        let data = {product: search_param}
        let res = await fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        let search_res = await res.json()
        setProduct(search_res)
    }
    
    useEffect(() => {
        getItem()
    }, [])

    return (
        <>
            <p>Item Page</p>
            {product ? (
                <>
                    <div>{product.name}</div>
                </>
            ) : (
                <>
                    <p>No result</p>
                </>
            )}
        </>
    )
}