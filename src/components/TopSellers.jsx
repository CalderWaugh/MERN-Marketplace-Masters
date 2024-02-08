import { useEffect, useState } from "react";

export default function TopSellers() {
    let [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/products/bestsellers')
                console.log(response.body)
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                products = await response.json();
                setProducts(products);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <p>
                {products.map((p) => {
                    return (

                        <h3>
                            {p.Name}
                        </h3>
                    )
                })}
            </p>
        </>
    )
}