import { FC } from "react";
import { Link } from "react-router-dom";

const Footer: FC = () => (
  <div className="p-4 text-center mt-auto border-t border-gray-200 dark:border-white dark:text-white">
    <div>&copy; Copyright | All Rights Reserved</div>
    <div>
      <Link
        to="https://alim1496.github.io/"
        className="text-blue-500 hover:underline hover:font-bold opacity-85 hover:opacity-100"
      >
        M A Alim
      </Link>
    </div>
  </div>
);

export default Footer;
