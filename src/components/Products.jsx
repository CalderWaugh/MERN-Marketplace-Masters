import { useEffect } from "react"

export default function Products() {

    async function getProducts() {
        await fetch('http://localhost:3000/api/products')
    }

    useEffect(() => {
        getProducts()
    }, [])
    return (
        <>
        <div>hi</div>
        </>
    )
}