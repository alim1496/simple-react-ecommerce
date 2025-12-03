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
import { HiMenuAlt3, HiX } from "react-icons/hi";
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
    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    dispatch(updateDarkMode(!isDarkMode));
    document.body.classList.toggle("dark");
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

          <div className="hidden sm:flex sm:flex-1 sm:justify-center sm:mx-8">
            <SearchBar />
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
            <div onClick={toggleDarkMode}>
              {isDarkMode ? (
                <MdOutlineLightMode className="cursor-pointer" size={30} />
              ) : (
                <MdOutlineDarkMode className="cursor-pointer" size={30} />
              )}
            </div>
          </div>

          <button
            className="sm:hidden text-3xl dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-white dark:bg-slate-800 bg-opacity-95 dark:bg-opacity-95 w-full py-8 px-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center gap-6">
              <div className="w-full max-w-md">
                <SearchBar />
              </div>

              <Link
                to="/products"
                className="text-xl font-bold dark:text-white"
                data-test="main-products"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>

              <Link
                to="/categories"
                className="text-xl font-bold dark:text-white"
                data-test="main-categories"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>

              <div className="flex items-center gap-2">
                {username !== "" ? (
                  <img
                    src="https://robohash.org/Terry.png?set=set4"
                    alt="avatar"
                    className="w-6"
                  />
                ) : (
                  <FaUser className="text-gray-500 text-2xl dark:text-white" />
                )}
                <span className="text-xl font-bold dark:text-white">Profile</span>
                {username !== "" ? (
                  <CustomPopup />
                ) : (
                  <span
                    className="cursor-pointer hover:opacity-85 dark:text-white"
                    onClick={() => {
                      dispatch(updateModal(true));
                      setIsMenuOpen(false);
                    }}
                    data-test="login-btn"
                  >
                  </span>
                )}
              </div>

              <div
                className="flex items-center gap-2 relative cursor-pointer"
                onClick={showCart}
              >
                <AiOutlineShoppingCart className="dark:text-white text-[32px]" />
                <span className="text-xl font-bold dark:text-white">Cart</span>
                <div
                  className="absolute top-[-10px] left-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center"
                  data-test="cart-item-count"
                >
                  {cartCount}
                </div>
              </div>

              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  toggleDarkMode();
                  setIsMenuOpen(false);
                }}
              >
                {isDarkMode ? (
                  <MdOutlineLightMode size={30} />
                ) : (
                  <MdOutlineDarkMode size={30} />
                )}
                <span className="text-xl font-bold dark:text-white">Theme</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;