import { useNavigate, useLocation } from "react-router-dom";

const ProductCard = ({ title, price, image, discount, category, rating, id }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const convertToIDR = (value) => {
    const exchangeRate = 17645;
    const idrValue = value * exchangeRate;

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(idrValue);
  };

  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;

  const handleProductClick = () => {
    navigate(`/product/${id}`, {
      state: { from: location.pathname + location.search },
    });
  };

  return (
    <div role="button" tabIndex={0} onClick={handleProductClick} className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="relative overflow-hidden rounded-t-2xl bg-gray-50 aspect-square">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {hasDiscount && <span className="absolute top-2 left-2 bg-green-700 text-white text-xs font-semibold px-2 py-1 rounded-full">{Math.round(discount)}%</span>}
      </div>

      <h3 className="font-poppins font-semibold text-xs xl:text-sm mt-3 text-gray-400 line-clamp-2 px-2">{category.charAt(0).toUpperCase() + category.slice(1).replaceAll("-"," ")}</h3>

      <h2 className="font-poppins font-semibold text-xs xl:text-sm text-gray-800 line-clamp-2 px-2">{title}</h2>

      <div className="flex items-center gap-2 px-2">
        <p className="text-green-700 font-bold text-xs xl:text-base">{convertToIDR(finalPrice)}</p>
        {hasDiscount && <p className="text-gray-400 text-xs line-through">{convertToIDR(price / (1 - discount / 100))}</p>}
      </div>

      <div className="flex items-center gap-1 px-2 pb-2">
        <span className="text-yellow-400">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
              ★
            </span>
          ))}
        </span>
        <span className="text-gray-500 text-sm ml-2">({(rating ?? 0).toFixed(1)})</span>
      </div>
    </div>
  );
};

export default ProductCard;
