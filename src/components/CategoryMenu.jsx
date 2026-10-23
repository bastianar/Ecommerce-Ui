import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CategoryMenu = ({ categories = [] }) => {
  let navigate = useNavigate();

  const handleCategoryClick = (e) => {
    const categoryCard = e.target.closest(".group");
    if (!categoryCard) return;

    const category = categoryCard.getAttribute("data-category");
    navigate(`/shop?category=${category}`);
  };

  return (
    <section onClick={handleCategoryClick} aria-label="Kategori produk">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 px-4">
        {categories.map((item) => (
          <div
            key={item.title}
            data-category={item.category}
            className="group relative flex min-w-0 cursor-pointer items-center gap-2 sm:gap-3 rounded-2xl bg-gray-50 p-3 sm:p-4 font-poppins transition-shadow duration-200 hover:shadow-md last:odd:col-span-2 sm:last:odd:col-span-1"
          >
            <img src={item.image} alt="" className="h-12 w-12 sm:h-16 sm:w-16 xl:h-20 xl:w-20 shrink-0 object-contain" />

            <div className="min-w-0 flex-1 pb-6">
              <h3 className="truncate text-xs sm:text-sm font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 sm:mt-2 line-clamp-2 text-[11px] sm:text-xs leading-relaxed text-gray-500">{item.description}</p>
            </div>

            <span className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-green-700 text-white transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryMenu;
