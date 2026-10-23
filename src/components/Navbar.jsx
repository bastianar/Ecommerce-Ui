import searchIcon from "../assets/icon/searchIcon.svg";
import cartIcon from "../assets/icon/carticon.svg";
import menuIcon from "../assets/icon/menuIcon.svg";
import backIcon from "../assets/icon/backIcon.svg";

import logo from "./Logo";

import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapperRef = useRef(null);
  const location = useLocation();
  const { totalItems } = useCart();

  const filteredProducts = searchQuery ? products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  let navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSearchBarClick = () => {
    setIsSearchOpen(true);
    navigate("/search", {
      state: { from: location.pathname + location.search },
    });
  };

  const handleBackClick = () => {
    const previousPath = location.state?.from || "/";

    setSearchQuery("");
    setIsSearchOpen(false);
    navigate(previousPath);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    setShowSuggestions(false);
    setIsSearchOpen(false);
    navigate(`/shop?search=${encodeURIComponent(query)}`);
  };

  const handleSuggestedProductClick = (product) => {
    setSearchQuery(product.title);
    setShowSuggestions(false);
    navigate(`/shop?search=${encodeURIComponent(product.title)}`);
  };

  const navLinkClass = ({ isActive }) => `font-medium text-base transition-colors hover:text-green-700 ${isActive ? "text-green-700" : "text-gray-800"}`;

  return (
    <>
      <div className="flex justify-center bg-white w-full h-20 fixed top-0 left-0 right-0 z-50 mx-auto">
        <nav className="container relative flex items-center justify-between p-4">
          {isSearchOpen && window.innerWidth <= 640 ? null : (
            <div onClick={handleLogoClick} className="logo cursor-pointer">
              {logo()}
            </div>
          )}

          {/* Menu desktop, berganti jadi tombol kembali saat search aktif */}
          {isSearchOpen ? (
            <button onClick={handleBackClick} className="sm:w-80 justify-center sm:justify-end flex items-center  shrink-0 text-gray-600 hover:text-green-700 transition-colors">
              <img src={backIcon} alt="Back" className="h-6 w-6" />
            </button>
          ) : (
            <div className="hidden md:flex space-x-10">
              <NavLink to="/" label="Home" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/shop" label="Shop" className={navLinkClass}>
                Shop
              </NavLink>
            </div>
          )}

          {/* Menu mobile slide down, hanya isi ul */}
          <div
            className={`md:hidden absolute top-full right-0 w-50 space-y-3 rounded-lg bg-white shadow-lg overflow-hidden flex flex-col items-center transition-all duration-300 ease-in-out ${
              isOpen ? "max-h-60 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
            }`}
          >
            <NavLink to="/" label="Home" className="hover:text-green-700 font-medium text-base">
              Home
            </NavLink>
            <NavLink to="/shop" label="Shop" className="hover:text-green-700 font-medium text-base">
              Shop
            </NavLink>
          </div>

          {/* Wrapper: search, cart, hamburger jadi satu grup relative */}
          <div ref={searchWrapperRef} className="relative flex items-center gap-4">
            {/* Search bar */}
            <div className={`relative flex items-center ${isSearchOpen ? "w-60 sm:w-auto" : ""}`}>
              <input
                value={searchQuery}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit(e);
                  }
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onClick={handleSearchBarClick}
                type="text"
                placeholder="Search Products..."
                className={`border-2 border-gray-300 focus:outline-none px-3 py-1 rounded-full transition-all duration-300
                  ${isSearchOpen ? "flex absolute right-0 w-80" : "hidden"}
                  sm:flex sm:static ${isSearchOpen ? "sm:w-2xl" : "sm:w-80"}`}
              />
              <img
                src={searchIcon}
                alt="Search"
                className={`h-6 w-6 sm:h-4 sm:w-4 cursor-pointer z-10
                  ${isSearchOpen ? "absolute right-2 top-1/2 -translate-y-1/2" : ""}
                  sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2`}
                onClick={handleSearchBarClick}
              />

              {showSuggestions && filteredProducts.length > 0 && (
                <div className=" top-10 sm:top-full right-0 sm:left-0 w-80 sm:w-full absolute mt-1 max-h-64 sm:max-h-80 overflow-y-auto bg-white rounded-lg shadow-md border border-gray-100 z-50">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="px-3 sm:px-4 py-3 sm:py-2 text-sm sm:text-base cursor-pointer hover:bg-gray-100 truncate" onClick={() => handleSuggestedProductClick(product)}>
                      {product.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart sembunyi saat search terbuka */}
            <Link to="/cart" aria-label="Keranjang" className={`cart relative ${isSearchOpen ? "hidden" : ""}`}>
              <img src={cartIcon} alt="" className="h-8 w-8 hover:scale-110 transition-transform" />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-700 px-1 text-[10px] font-semibold text-white">{totalItems}</span>}
            </Link>

            {/* Hamburger sembunyi di mobile saat search terbuka */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden flex flex-col justify-center items-center w-8 h-8 z-50
                ${isSearchOpen ? "hidden sm:flex" : ""}`}
              aria-label="Toggle menu"
            >
              <img src={menuIcon} alt="Menu" className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
