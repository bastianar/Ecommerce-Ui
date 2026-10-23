import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getProductById } from "../services/ProductService";
import DetailCard from "../components/DetailsCard";


const DetailProducts = () => {
  const { id: Id } = useParams();

  const [products, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(Id);
        setProduct(data);
      } catch (error) {
        setError(error.message);
      }finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [Id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading product details...</p>
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
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      {products && (
        <DetailCard
          key={products.id}
          id={products.id}
          title={products.title}
          price={products.price}
          image={products.thumbnail}
          discount={products.discountPercentage}
          category={products.category}
          rating={products.rating}
          description={products.description}
          stok={products.stock}
        />

      )}
        
    </div>
  )
}

export default DetailProducts