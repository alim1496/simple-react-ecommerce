import { FC, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { addCategories, addProducts } from "../redux/features/productSlice";
import ProductCard from "../components/ProductCard";
import { Product } from "../models/Product";

const AllProducts: FC = () => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState("all");
  const sortRef = useRef<HTMLSelectElement>(null);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const allProducts = useAppSelector(
    (state) => state.productReducer.allProducts
  );
  const allCategories = useAppSelector(
    (state) => state.productReducer.categories
  );

  useEffect(() => {
    const fetchProducts = () => {
      fetch("https://dummyjson.com/products?limit=100")
        .then((res) => res.json())
        .then(({ products }) => {
          dispatch(addProducts(products));
        });
    };
    const fetchCategories = () => {
      fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then((data) => {
          dispatch(addCategories(data));
        });
    };
    if (allProducts.length === 0) fetchProducts();
    if (allCategories.length === 0) fetchCategories();
  }, [allProducts, allCategories, dispatch]);

  useEffect(() => {
    setCurrentProducts(allProducts);
  }, [allProducts]);

  useEffect(() => {
    if (category !== "all") {
      const updated = allProducts.filter((pro) => pro.category === category);
      setCurrentProducts(updated);
    }
  }, [category, allProducts]);

  const sortProducts = (sortValue: string) => {
    if (sortValue === "asc") {
      setCurrentProducts(
        [...currentProducts].sort((a, b) => {
          const aPrice =
            a.price - (a.price * (a.discountPercentage ?? 0)) / 100;
          const bPrice =
            b.price - (b.price * (b.discountPercentage ?? 0)) / 100;
          return aPrice - bPrice;
        })
      );
    } else if (sortValue === "desc") {
      setCurrentProducts(
        [...currentProducts].sort((a, b) => {
          const aPrice =
            a.price - (a.price * (a.discountPercentage ?? 0)) / 100;
          const bPrice =
            b.price - (b.price * (b.discountPercentage ?? 0)) / 100;
          return bPrice - aPrice;
        })
      );
    } else {
      setCurrentProducts([...currentProducts].sort((a, b) => a.id - b.id));
    }
  };

  return (
    <div className="container mx-auto min-h-[83vh] p-4 font-karla">
      <div className="grid grid-cols-5 gap-1">
        <div className="col-span-1">
          <h1 className="font-bold mb-2">Categories</h1>
          <div className="space-y-1">
            {allCategories.map((_category) => (
              <div
                key={_category}
                className={`cursor-pointer hover:text-blue-500 ${
                  _category === category ? "text-blue-500" : ""
                }`}
                onClick={() => {
                  setCategory(_category);
                  if (sortRef && sortRef.current)
                    sortRef.current.value = "default";
                  sortProducts("default");
                }}
              >
                {_category}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-lg">
              <span>Products</span>
              <span> {">"} </span>
              <span className="font-bold">{category}</span>
            </div>
            <select
              ref={sortRef}
              className="border border-black rounded p-1"
              onChange={(e) => sortProducts(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="asc">Price (low to high)</option>
              <option value="desc">Price (high to low)</option>
            </select>
          </div>
          <div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
