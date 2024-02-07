import { CartItem } from "./CartItem";

export interface CartSlice {
  cartOpen: boolean;
  cartItems: CartItem[];
}
