import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { Product } from "../models/Product";
import ProductCard from "../components/ProductCard";
import { useAppSelector } from "../redux/hooks";
import { updateLoading } from "../redux/features/homeSlice";

const SingleCategory: FC = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const [productList, setProductList] = useState<Product[]>([]);
  const isLoading = useAppSelector((state) => state.homeReducer.isLoading);
  
  useEffect(() => {
    const fetchProducts = () => {
      dispatch(updateLoading(true));
      fetch(`https://dummyjson.com/products/category/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          const { products } = data;
          setProductList(products);
          dispatch(updateLoading(false));
        });
    };

    fetchProducts();
  }, [slug, dispatch]);

  return (
    <div className="container mx-auto min-h-[83vh] p-4 font-karla">
      <div className="flex items-center space-x-2 text-lg dark:text-white">
        <span>Categories</span>
        <span> {">"} </span>
        <span className="font-bold">{slug}</span>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin mt-32 rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (<div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 my-2">
        {productList?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>)}
    </div>
  );
};

export default SingleCategory;
