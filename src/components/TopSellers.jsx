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
            <h1>
                Top Sellers:
            </h1>
            {products.map((p) => {
                return (
                    <p>
                        <h3>
                            {p.Name}
                        </h3>
                    </p>
                )
            })}
        </>
    )
}