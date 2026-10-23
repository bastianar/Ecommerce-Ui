import logo from "./Logo";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-800">
        <footer className="container mx-auto grid grid-rows-2 md:grid-cols-2 text-white py-4">
          <div className="w-full flex flex-col gap-2">
            <div className="logo flex flex-col gap-2 p-4">
              {logo()}
              <span className="text-sm text-gray-400">
                Belanja mudah dan nyaman <br />
                bersama kami di Belanjain. aja.
              </span>
            </div>

            <ul className="social-media flex p-4 gap-4">
              <li className="bg-green-700 rounded-full h-8 w-8 flex items-center justify-center overflow-hidden">
                <a href="#" className="w-full h-full flex items-center justify-center text-white hover:text-green-100">
                  <i className="fi fi-brands-whatsapp leading-none"></i>
                </a>
              </li>
              <li className="bg-green-700 rounded-full h-8 w-8 flex items-center justify-center overflow-hidden">
                <a href="#" className="w-full h-full flex items-center justify-center text-white hover:text-green-100">
                  <i className="fi fi-brands-instagram leading-none"></i>
                </a>
              </li>
              <li className="bg-green-700 rounded-full h-8 w-8 flex items-center justify-center overflow-hidden">
                <a href="#" className="w-full h-full flex items-center justify-center text-white hover:text-green-100">
                  <i className="fi fi-brands-tik-tok leading-none"></i>
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full flex justify-between p-4">
            <div className="flex flex-col items-center gap-2">
              <h3 className="font-bold text-base md:text-lg">Company</h3>

              <ul className="flex flex-col justify-center items-center gap-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-green-700 font-medium text-xs md:text-base">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-700 font-medium text-xs md:text-base">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-700 font-medium text-xs md:text-base">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center gap-2">
              <h3 className="font-bold text-base md:text-lg">Service</h3>

              <ul className="flex flex-col justify-center items-center gap-2 text-xs md:text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-green-700 font-medium text-xs md:text-base">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-700 font-medium text-xs md:text-base">
                    Care
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-700 font-medium text-xs md:text-base">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-700 font-medium text-xs md:text-base">
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center gap-2">
              <h3 className="font-bold text-base md:text-lg">Shop</h3>

              <ul className="flex flex-col justify-center items-center gap-2 text-xs md:text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-green-700 font-medium text-xs md:text-base">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-700 font-medium text-xs md:text-base">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-700 font-medium text-xs md:text-base">
                    Best Sellers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full md:col-span-2 p-4">
            <div className="w-full flex justify-center md:justify-start py-4 border-t border-gray-600">
              <p className="text-center text-sm text-gray-400">&copy; 2026 Belanjain. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
