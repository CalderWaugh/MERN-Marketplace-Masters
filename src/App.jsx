import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import SearchResultsPage from "./pages/SearchResultsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutCompletePage from "./pages/CheckoutCompletePage";
import './App.css'
import ItemPage from "./pages/ItemPage";

function App() {
  const [cart, setCart] = useState([])

  function onAddToCart(item) {
    setCart([...cart, item])
  }
  
  function onRemoveFromCart(item) {
    setCart(cart.filter((i) => i !== item))
  }

  function resetCart() {
    setCart([]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout cart={cart} handleDeleteFromCart={onRemoveFromCart} />}>
          <Route index element={<Home />} />
          <Route path="/search/*" element={<SearchResultsPage />} />
          <Route path="/item/*" element={<ItemPage handleAddItemToCart={onAddToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart}  handleDeleteFromCart={onRemoveFromCart} />} />
          <Route path="/checkout" element={<CheckoutPage resetCart={resetCart} />} />
          <Route path="/order_complete" element={<CheckoutCompletePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
