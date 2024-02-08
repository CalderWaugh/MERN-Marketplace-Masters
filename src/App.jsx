import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import SearchResultsPage from "./pages/SearchResultsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import './App.css'

function App() {
  const [cart, setCart] = useState([{id: 3, name: "Umbrella V3"}, {id: 2, name: "Umbrella V2"}])

  function onAddToCart(item) {
    setCart([...cart, item])
  }
  
  function onRemoveFromCart(item) {
    setCart(cart.filter((i) => {i !== item}))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout cart={cart} />}>
          <Route index element={<Home />} />
          <Route path="/search/*" element={<SearchResultsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
