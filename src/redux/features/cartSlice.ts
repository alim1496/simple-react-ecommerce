import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../models/CartItem";
import { CartSlice } from "../../models/CartSlice";

const initialState: CartSlice = {
  cartOpen: false,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { cartItems } = state;
      if (cartItems.findIndex((pro) => pro.id === action.payload.id) === -1) {
        const item = { ...action.payload, quantity: 1 };
        return { ...state, cartItems: [...cartItems, item] };
      } else {
        const updatedItems = cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity && item.quantity + 1 }
            : item
        );
        return { ...state, cartItems: updatedItems };
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const { cartItems } = state;
      const updatedItems = cartItems.filter(
        (item) => item.id !== action.payload
      );
      return { ...state, cartItems: updatedItems };
    },
    reduceFromCart: (state, action: PayloadAction<number>) => {
      const { cartItems } = state;
      const _item = cartItems.find((item) => item.id === action.payload);
      if (_item?.quantity && _item?.quantity > 1) {
        const updatedList = cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity && item.quantity - 1 }
            : item
        );
        return { ...state, cartItems: updatedList };
      } else {
        const updatedItems = cartItems.filter(
          (item) => item.id !== action.payload
        );
        return { ...state, cartItems: updatedItems };
      }
    },
    setCartState: (state, action: PayloadAction<boolean>) => {
      return { ...state, cartOpen: action.payload };
    },
    emptyCart: (state) => {
      return { ...state, cartItems: [] };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCartState,
  reduceFromCart,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
