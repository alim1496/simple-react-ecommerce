import { FC } from "react";
import useDiscount from "../hooks/useDiscount";

const PriceSection: FC<{ price: number; discountPercentage: number }> = ({
  price,
  discountPercentage = 0,
}) => {
  const result = useDiscount({ price, discount: discountPercentage });
  const discount = parseFloat(discountPercentage.toString());
  if (Math.floor(discount) === 0) {
    return <h2 className="font-medium text-blue-500 text-xl">${price}</h2>;
  }
  return (
    <div className="leading-3">
      <h2 className="font-medium text-blue-500 text-xl">
        ${result.toFixed(2)}
      </h2>
      <span className="mr-2 text-sm line-through opacity-70 dark:text-white">
        ${price}
      </span>
      <span className="text-sm font-semibold dark:text-white">
        -{discountPercentage}%
      </span>
    </div>
  );
};

export default PriceSection;
