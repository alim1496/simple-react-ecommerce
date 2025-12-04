import { FC, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setCartState } from "../redux/features/cartSlice";
import { updateModal } from "../redux/features/authSlice";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import CustomPopup from "./CustomPopup";
import { updateDarkMode } from "../redux/features/homeSlice";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import SearchBar from "./SearchBar";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useAppSelector(
    (state) => state.cartReducer.cartItems.length
  );
  const username = useAppSelector((state) => state.authReducer.username);
  const isDarkMode = useAppSelector((state) => state.homeReducer.isDarkMode);
  const { requireAuth } = useAuth();

  const showCart = () => {
    requireAuth(() => dispatch(setCartState(true)));
  };

  const toggleTheme = () => {
    dispatch(updateDarkMode(!isDarkMode));
    document.body.classList.toggle("dark");
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="py-4 bg-white dark:bg-slate-800 top-0 sticky z-10 shadow-lg font-karla">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-4xl font-bold dark:text-white"
            data-test="main-logo"
          >
            Shopify
          </Link>

          <div className="hidden sm:block">
            <SearchBar onSearch={() => setIsMenuOpen(false)} />
          </div>

          <div className="hidden sm:flex gap-4 md:gap-8 items-center dark:text-white">
            <Link
              to="/products"
              className="text-xl font-bold"
              data-test="main-products"
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="text-xl font-bold"
              data-test="main-categories"
            >
              Categories
            </Link>
            <div className="flex items-center">
              {username !== "" ? (
                <img
                  src="https://robohash.org/Terry.png?set=set4"
                  alt="avatar"
                  className="w-6"
                />
              ) : (
                <FaUser className="text-gray-500 text-2xl dark:text-white" />
              )}
              <div className="text-gray-500 text-2xl">
                {username !== "" ? (
                  <CustomPopup />
                ) : (
                  <span
                    className="cursor-pointer hover:opacity-85 dark:text-white"
                    onClick={() => dispatch(updateModal(true))}
                    data-test="login-btn"
                  >
                  </span>
                )}
              </div>
            </div>
            <div
              className="text-gray-500 text-[32px] relative hover:cursor-pointer hover:opacity-80"
              onClick={showCart}
              data-test="cart-btn"
            >
              <AiOutlineShoppingCart className="dark:text-white" />
              <div
                className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center"
                data-test="cart-item-count"
              >
                {cartCount}
              </div>
            </div>
            <div onClick={toggleTheme}>
              {isDarkMode ? (
                <MdOutlineLightMode className="cursor-pointer" size={30} />
              ) : (
                <MdOutlineDarkMode className="cursor-pointer" size={30} />
              )}
            </div>
          </div>

          <button
            className="sm:hidden text-3xl dark:text-white relative z-30"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden fixed inset-0 top-0 bg-black bg-opacity-50 z-20">
            <div className="absolute top-4 right-4 z-30">
              <button
                className="text-3xl text-white"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className="block h-0.5 bg-current rotate-45 translate-y-2"></span>
                  <span className="block h-0.5 bg-current opacity-0"></span>
                  <span className="block h-0.5 bg-current -rotate-45 -translate-y-2"></span>
                </div>
              </button>
            </div>
            <div className="bg-white dark:bg-slate-800 bg-opacity-95 dark:bg-opacity-95 h-full flex flex-col items-center justify-center gap-8 px-4 pt-20">
              <div className="w-full max-w-md">
                <SearchBar onSearch={() => setIsMenuOpen(false)} />
              </div>

              <Link
                to="/products"
                className="text-2xl font-bold dark:text-white hover:opacity-80"
                data-test="main-products"
                onClick={handleLinkClick}
              >
                Products
              </Link>

              <Link
                to="/categories"
                className="text-2xl font-bold dark:text-white hover:opacity-80"
                data-test="main-categories"
                onClick={handleLinkClick}
              >
                Categories
              </Link>

              <div className="flex items-center gap-3">
                {username !== "" ? (
                  <img
                    src="https://robohash.org/Terry.png?set=set4"
                    alt="avatar"
                    className="w-8"
                  />
                ) : (
                  <FaUser className="text-gray-500 text-3xl dark:text-white" />
                )}
                <div className="text-2xl font-bold dark:text-white">
                  {username !== "" ? (
                    <CustomPopup />
                  ) : (
                    <span
                      className="cursor-pointer hover:opacity-85"
                      onClick={() => {
                        dispatch(updateModal(true));
                        setIsMenuOpen(false);
                      }}
                      data-test="login-btn"
                    >
                      Profile
                    </span>
                  )}
                </div>
              </div>

              <div
                className="flex items-center gap-3 cursor-pointer hover:opacity-80"
                onClick={() => {
                  showCart();
                  setIsMenuOpen(false);
                }}
                data-test="cart-btn"
              >
                <div className="relative">
                  <AiOutlineShoppingCart className="text-3xl dark:text-white" />
                  <div
                    className="absolute top-[-10px] right-[-10px] bg-red-600 w-[20px] h-[20px] rounded-full text-white text-[12px] grid place-items-center"
                    data-test="cart-item-count"
                  >
                    {cartCount}
                  </div>
                </div>
                <span className="text-2xl font-bold dark:text-white">Cart</span>
              </div>

              <div
                className="flex items-center gap-3 cursor-pointer hover:opacity-80"
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
              >
                {isDarkMode ? (
                  <MdOutlineLightMode className="text-3xl dark:text-white" />
                ) : (
                  <MdOutlineDarkMode className="text-3xl dark:text-white" />
                )}
                <span className="text-2xl font-bold dark:text-white">Theme</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;