import { FC } from "react";
import { Product } from "../models/Product";
import ProductCard from "./ProductCard";

const ProductList: FC<{ title: string; products: Product[] }> = ({
  title,
  products,
}) => (
  <div className="container mt-8 mx-auto px-4">
    <div className="sm:flex items-center justify-between">
      <h2 className="text-4xl font-medium font-lora">{title}</h2>
    </div>
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4"
      data-test="product-list-container"
    >
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          category={product.category}
          title={product.title}
          price={product.price}
          thumbnail={product.thumbnail}
          rating={product.rating}
          discountPercentage={product.discountPercentage}
        />
      ))}
    </div>
  </div>
);

export default ProductList;
