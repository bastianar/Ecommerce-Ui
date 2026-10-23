import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { convertToIDR } from "../utils/Currency";

const DetailsCard = ({ id, title, price, image, discount, category, rating, description, stok }) => {
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;

  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const cartProduct = { id, title, price: finalPrice, image, stock: stok };

  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(location.state?.from ?? "/shop");
  };

  const handleAddToCart = () => {
    addToCart(cartProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(cartProduct);
    navigate("/cart");
  };

  return (
    <div className="font-poppins pt-24 pb-6 sm:pt-28">
      <div className="container mx-auto flex flex-col gap-6 px-4 lg:flex-row lg:gap-10">
        {/* Hero image */}
        <div className="relative h-72 w-full shrink-0 overflow-hidden rounded-3xl bg-gray-50 sm:h-96 lg:sticky lg:top-28 lg:aspect-square lg:h-auto lg:max-h-[calc(100vh-8rem)] lg:w-1/2 lg:self-start">
          <img src={image} alt={title} className="h-full w-full object-cover" />

          <button
            type="button"
            onClick={handleBack}
            aria-label="Kembali"
            className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white shadow-md transition hover:scale-105 hover:bg-green-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Content panel */}
        <div className="flex min-w-0 flex-1 flex-col rounded-3xl bg-[#FAF8F4]">
          <div className="px-5 pb-6 pt-6 sm:px-8 lg:px-10 lg:pt-10">
            <p className="text-sm font-medium text-[#6B7280]">{category.charAt(0).toUpperCase() + category.slice(1)}</p>
            <h1 className="mt-1 wrap-break-word text-xl font-semibold leading-snug text-[#1F2320] sm:text-2xl lg:text-3xl">{title}</h1>

            {/* Stat row */}
            <div className="mt-6 grid grid-cols-3 divide-x divide-[#E5E1D8] text-center">
              <div className="px-2">
                <p className="flex items-center justify-center gap-1 text-sm font-semibold text-[#1F2320]">
                  <span className="text-[#C9A227]">★</span> {(rating ?? 0).toFixed(1)}
                </p>
                <p className="mt-0.5 text-xs text-[#6B7280]">Rating</p>
              </div>
              <div className="px-2">
                <p className="text-sm font-semibold text-[#1F2320]">{stok} unit</p>
                <p className="mt-0.5 text-xs text-[#6B7280]">Stok tersedia</p>
              </div>
              <div className="px-2">
                <p className="text-sm font-semibold text-[#1F2320]">{hasDiscount ? `${Math.round(discount)}%` : "—"}</p>
                <p className="mt-0.5 text-xs text-[#6B7280]">Diskon</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="mb-2 text-sm font-semibold text-[#1F2320]">Deskripsi</h2>
              <p className="max-w-[62ch] text-sm leading-relaxed text-[#6B7280]">{description}</p>
            </div>
          </div>

          {/* Bottom bar: menempel di bawah layar pada mobile/tablet */}
          <div className="sticky bottom-0 z-20 mt-auto flex flex-col gap-3 rounded-b-3xl border-t border-gray-200 bg-white px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:static lg:px-10">
            <div className="flex items-baseline gap-2 sm:block">
              <p className="text-lg font-bold text-[#1F2320]">{convertToIDR(finalPrice)}</p>
              {hasDiscount && <p className="text-xs text-[#9CA3AF] line-through">{convertToIDR(price)}</p>}
            </div>

            <div className="flex w-full gap-2 sm:w-auto">
              <button
                onClick={handleAddToCart}
                className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-center text-xs font-semibold leading-tight text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700 min-[400px]:text-sm sm:flex-none sm:px-6"
              >
                {added ? "Ditambahkan ✓" : "Masukan Keranjang"}
              </button>
              <button onClick={handleBuyNow} className="flex-1 rounded-full bg-green-700 px-4 py-3 text-center text-xs font-semibold leading-tight text-white transition-colors hover:bg-green-800 min-[400px]:text-sm sm:flex-none sm:px-6">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
