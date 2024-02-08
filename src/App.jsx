import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import SearchResultsPage from "./pages/SearchResultsPage";
import './App.css'

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/search/*" element={<SearchResultsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
