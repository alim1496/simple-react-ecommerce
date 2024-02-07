import { useEffect, useState } from "react";

interface Props {
  price: number;
  discount?: number;
}

const useDiscount = ({ price, discount = 0 }: Props) => {
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (discount === 0) {
      setResult(price);
    } else {
      setResult(price - (price * discount) / 100);
    }
  }, [price, discount]);

  return result;
};

export default useDiscount;
