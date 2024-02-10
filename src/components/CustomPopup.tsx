import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  MdFavoriteBorder,
  MdOutlineAccountCircle,
  MdOutlineLogout,
} from "react-icons/md";
import { doLogout } from "../redux/features/authSlice";
import { Link } from "react-router-dom";

const CustomPopup: FC = () => {
  const dispatch = useAppDispatch();
  const [isVisible, setVisible] = useState(false);
  const username = useAppSelector((state) => state.authReducer.username);

  const handlePopup = () => {
    setVisible((v) => !v);
  };

  const handleLogout = () => {
    dispatch(doLogout());
    hidePopup();
  };

  const hidePopup = () => {
    setVisible(false);
  };

  return (
    <div className="relative font-karla">
      <div
        className="inline-block cursor-pointer hover:opacity-85"
        onClick={handlePopup}
        data-test="username-popup"
      >
        {username}
      </div>
      {isVisible && (
        <div
          className="absolute p-4 left-[-50px] w-40 z-50 mt-2 rounded-md shadow-2xl bg-white ring-1 transition-all ring-black ring-opacity-5 focus:outline-none"
          data-test="popup-content-list"
        >
          <table>
            <tbody>
              <tr>
                <td className="text-center">
                  <MdOutlineAccountCircle />
                </td>
                <td className="hover:underline cursor-pointer text-lg pl-2">
                  <Link to="/account" onClick={hidePopup}>
                    Account
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="text-center">
                  <MdFavoriteBorder />
                </td>
                <td
                  className="hover:underline cursor-pointer text-lg pl-2"
                  data-test="wishlist-container"
                >
                  <Link to="/wishlist" onClick={hidePopup}>
                    Wishlist
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="text-center">
                  <MdOutlineLogout />
                </td>
                <td
                  className="hover:underline cursor-pointer text-lg pl-2"
                  onClick={handleLogout}
                  data-test="logout-btn"
                >
                  Logout
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomPopup;
