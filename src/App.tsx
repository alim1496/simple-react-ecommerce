import { Provider } from "react-redux";
import "./App.css";
import { store } from "./redux/store";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import SingleProduct from "./pages/SingleProduct";
import LoginModal from "./components/LoginModal";
import Wishlist from "./pages/Wishlist";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import AllProducts from "./pages/AllProducts";
import ScrollToTopButton from "./components/ScrollToTopButton";
import BannerPopup from "./components/BannerPopup";
import AllCategories from "./pages/AllCategories";
import SingleCategory from "./pages/SingleCategory";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/product/:productID" element={<SingleProduct />} />
        <Route path="/category/:slug" element={<SingleCategory />} />
        <Route path="/wishlist" element={<ProtectedRoute />}>
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/account" element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Footer />
      <Cart />
      <LoginModal />
      <ScrollToTopButton />
      <BannerPopup />
    </Provider>
  );
}

export default App;
