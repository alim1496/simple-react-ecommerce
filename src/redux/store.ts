import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";
import productReducer from "./features/productSlice";
import homeReducer from "./features/homeSlice";

export const store = configureStore({
  reducer: {
    cartReducer,
    productReducer,
    authReducer,
    homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
