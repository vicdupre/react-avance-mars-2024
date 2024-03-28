import { Dispatch, ReactNode, Reducer, createContext, useReducer } from "react";
import { Product } from "../types/types";

type CartProduct = Product & {
  quantity: number;
};
enum ActionTypes {
  ADD = "cart/add",
}
type CartAction = {
  type: ActionTypes;
  payload?: any;
};
type CartState = CartProduct[];
type CartReducer = Reducer<CartState, CartAction>;

export const CartContext = createContext<[CartState, Dispatch<CartAction>]>([
  [],
  () => {},
]);

export const addToCart = (product: Product, qty: number): CartAction => {
  return {
    type: ActionTypes.ADD,
    payload: {
      ...product,
      quantity: qty,
    },
  };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case ActionTypes.ADD: {
      const index = state.findIndex((el) => el.id === action.payload?.id);
      console.log(index, action.payload);
      if (index >= 0) {
        return state.toSpliced(index, 1, {
          ...state[index],
          quantity: state[index].quantity + action.payload.quantity,
        });
      }
      return [...state, action.payload];
    }
    default:
      return state;
  }
};

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer<CartReducer>(cartReducer, []);

  return (
    <CartContext.Provider value={[cart, dispatch]}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
