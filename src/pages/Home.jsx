import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import { Tag, Truck, ShieldCheck, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import CategoryProductsList from "../components/CategoryProductsList";

import Serum from "../assets/icon/promoProduk.png";
import FurnitureImage from "../assets/icon/furniture.png";
import SmartWatchImage from "../assets/icon/smartWatch.png";

import "swiper/css";

const Home = () => {
  const features = [
    { icon: Tag, title: "Harga Terbaik", subtitle: "Termurah se-Indonesia" },
    { icon: Truck, title: "Pengiriman Cepat", subtitle: "Sampai dalam 1-2 hari", highlight: true },
    { icon: ShieldCheck, title: "Garansi Produk", subtitle: "Garansi resmi 1 tahun" },
    { icon: Lock, title: "Pembayaran Aman", subtitle: "100% checkout aman" },
  ];

  let navigate = useNavigate();
  const handleViewAllProductsClick = () => {
    navigate("/shop");
  };

  return (
    <div className="w-full pb-3 min-h-screen bg-gray-100">
      <header className="w-full">
        <div className="mx-auto mt-10 py-4">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            <SwiperSlide>
              <img src={Serum} alt="Promo Produk" className="h-screen w-full object-center" />
            </SwiperSlide>

            <SwiperSlide>
              <img src={FurnitureImage} alt="Promo Produk" className="h-screen w-full object-center" />
            </SwiperSlide>

            <SwiperSlide>
              <img src={SmartWatchImage} alt="Promo Produk" className="h-screen w-full object-center" />
            </SwiperSlide>
          </Swiper>
        </div>
      </header>

      <main className="w-full flex flex-col justify-center items-center">
        <CategoryProductsList />

        {/* Produk List */}
        <div className="container mx-auto mt-8 px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <h1 className="font-poppins font-bold text-xl text-gray-800">Produk Unggulan</h1>
            <button onClick={handleViewAllProductsClick} className="font-poppins font-semibold text-green-700 hover:text-green-800 flex items-center cursor-pointer">
              Semua Produk
              <ArrowRight className="inline-block ml-2" size={16} />
            </button>
          </div>
          <ProductList limit={4} />
        </div>

        {/* Keuntungan */}
        <div className="container  mx-auto mt-8 px-4 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 bg-white rounded-2xl">
            {features.map(({ icon: Icon, title, subtitle, highlight }) => (
              <div key={title} className={`flex items-center gap-3 px-5 py-5 ${highlight ? "bg-green-700 rounded-tr-2xl sm:rounded-none" : ""}`}>
                <Icon className={`shrink-0 ${highlight ? "text-white" : "text-green-800"}`} size={22} strokeWidth={1.75} />
                <div className="text-left">
                  <h3 className={`font-poppins font-semibold text-sm leading-tight ${highlight ? "text-white" : "text-gray-800"}`}>{title}</h3>
                  <p className={`text-xs mt-0.5 ${highlight ? "text-green-100" : "text-gray-500"}`}>{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
