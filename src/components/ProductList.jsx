import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";

const ProductList = ({ limit }) => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-2xl aspect-square animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-medium">Gagal memuat produk: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.slice(0, limit).map((product) => (
        <ProductCard key={product.id} id={product.id} title={product.title} price={product.price} image={product.thumbnail} discount={product.discountPercentage} category={product.category} rating={product.rating} />
      ))}
    </div>
  );
};

export default ProductList;
