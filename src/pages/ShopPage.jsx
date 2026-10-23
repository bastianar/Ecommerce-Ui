import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import useProducts from "../hooks/useProducts";

import ProductCard from "../components/ProductCard";

const ShopPage = () => {
  const { products, loading, error } = useProducts();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";
  const [sortBy, setSortBy] = useState("popular");

  const visibleProducts = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesSearch = keyword ? product.title.toLowerCase().includes(keyword) : true;
      const matchesCategory = categoryQuery ? product.category.toLowerCase().includes(categoryQuery.toLowerCase()) : true;
      return matchesSearch && matchesCategory;
    });

    const sorted = [...filtered];

    switch (sortBy) {
      case "price-low-to-high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high-to-low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.meta?.createdAt ?? 0) - new Date(a.meta?.createdAt ?? 0));
        break;
      default: // popular
        sorted.sort((a, b) => b.rating - a.rating);
    }

    return sorted;
  }, [products, searchQuery, categoryQuery, sortBy]);

  return (
    <div className="w-full pb-3 min-h-screen bg-gray-100">
      <main className="container mx-auto py-25 px-4">
        <h1 className="font-poppins font-bold text-xl text-gray-400">
          {categoryQuery ? `Kategori: ${categoryQuery.charAt(0).toUpperCase() + categoryQuery.slice(1).replaceAll("-"," ")}` : searchQuery ? `Hasil pencarian untuk: "${searchQuery}"` : "Semua Produk"}
        </h1>

        <div className="flex items-center gap-4 mt-4 bg-white p-4 rounded-lg">
          <p className="font-poppins font-medium text-black">Sort by :</p>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded-md px-3 py-2 bg-green-700 text-white focus:outline-none">
            <option value="popular" className="bg-white text-gray-400">
              Popular
            </option>
            <option value="price-low-to-high" className="bg-white text-gray-400">
              Price: Low to High
            </option>
            <option value="price-high-to-low" className="bg-white text-gray-400">
              Price: High to Low
            </option>
            <option value="newest" className="bg-white text-gray-400">
              Newest Arrivals
            </option>
          </select>
        </div>

        <div className="mt-10 h-fit">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl aspect-square animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <p className="text-center py-10 text-red-500 font-medium">Gagal memuat produk: {error}</p>
          ) : visibleProducts.length === 0 ? (
            <p className="text-center py-10 text-gray-500 font-poppins">Tidak ada produk yang cocok dengan "{searchQuery}".</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} id={product.id} title={product.title} price={product.price} image={product.thumbnail} discount={product.discountPercentage} category={product.category} rating={product.rating} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
