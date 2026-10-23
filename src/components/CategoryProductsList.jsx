import useProducts from "../hooks/useProducts";
import CategoryMenu from "./CategoryMenu";

// "mens-watches" -> "Mens Watches"
const formatCategoryName = (slug) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const CategoryProducts = () => {
  const { products, loading, error } = useProducts();

  // Kelompokkan produk per kategori dari API
  const grouped = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = { count: 0, image: product.thumbnail };
    }
    acc[product.category].count += 1;
    return acc;
  }, {});

  const categories = Object.entries(grouped).map(([slug, { count, image }]) => ({
    title: formatCategoryName(slug),
    description: `${count} produk`,
    category: slug,
    image,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-2xl aspect-square animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <p className="text-center py-10 text-red-500 font-medium">Gagal memuat kategori: {error}</p>
      ) : (
        <>
          <h1 className="font-poppins font-bold text-xl text-gray-800 mb-10">Kategori Produk</h1>
          <CategoryMenu categories={categories} />
        </>
      )}
    </div>
  );
};

export default CategoryProducts;
