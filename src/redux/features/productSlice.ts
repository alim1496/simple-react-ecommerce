import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/Product";
import { ProductSlice } from "../../models/ProductSlice";
import { Category } from "../../models/Category";

const initialState: ProductSlice = {
  allProducts: [],
  categories: [],
  newProducts: [],
  featuredProducts: [],
  wishlist: [],
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    updateNewList: (state, action: PayloadAction<Product[]>) => {
      return { ...state, newProducts: action.payload };
    },
    updateFeaturedList: (state, action: PayloadAction<Product[]>) => {
      return { ...state, featuredProducts: action.payload };
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const { wishlist } = state;
      if (wishlist.findIndex((item) => item.id === action.payload.id) === -1) {
        const updatedList = [...state.wishlist, action.payload];
        return { ...state, wishlist: updatedList };
      }
    },
    addCategories: (state, action: PayloadAction<Category[]>) => {
      return { ...state, categories: action.payload };
    },
    addProducts: (state, action: PayloadAction<Product[]>) => {
      return { ...state, allProducts: action.payload };
    },
  },
});

export const {
  updateNewList,
  updateFeaturedList,
  addToWishlist,
  addCategories,
  addProducts,
} = productSlice.actions;
export default productSlice.reducer;
