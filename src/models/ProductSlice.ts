import { Category } from "./Category";
import { Product } from "./Product";

export interface ProductSlice {
  allProducts: Product[];
  newProducts: Product[];
  featuredProducts: Product[];
  wishlist: Product[];
  categories: Category[];
}
