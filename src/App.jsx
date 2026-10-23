import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/DetailProducts.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import CartPage from "./pages/CartPage.jsx"

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />}/>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
