import { create } from "zustand";
import { Product } from "../types/types";
type CartProduct = Product & {
  quantity: number;
};
interface State {
  cart: CartProduct[];
}
interface Actions {
  clear: () => void;
  add: (item: Product, quantity: number) => void;
}
const useCart = create<State & Actions>()((set) => ({
  cart: [],
  clear: () => set({ cart: [] }),
  add: (item, quantity) =>
    set((state) => {
      const index = state.cart.findIndex((el) => el.id === item.id);
      if (index >= 0) {
        return {
          cart: state.cart.toSpliced(index, 1, {
            ...state.cart[index],
            quantity: state.cart[index].quantity + quantity,
          }),
        };
      }
      return {
        cart: [...state.cart, { ...item, quantity }],
      };
    }),
}));

export default useCart;
