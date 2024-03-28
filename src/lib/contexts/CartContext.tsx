import {
  Dispatch,
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from "react";
import { Product } from "../types/types";

type CartProduct = Product & {
  quantity: number;
};
enum ActionTypes {
  ADD = "cart/add",
  CLEAR = "cart/clear",
}

interface Action<A, P> {
  type: A;
  payload: P;
}
type AddToCart = Action<ActionTypes.ADD, CartProduct>;
type ClearCart = Omit<Action<ActionTypes.CLEAR, null>, "payload">;
type CartAction = AddToCart | ClearCart;
type CartState = CartProduct[];
type CartReducer = Reducer<CartState, CartAction>;

export const CartContext = createContext<[CartState, Dispatch<CartAction>]>([
  [],
  () => {},
]);

export const addToCart = (product: Product, qty: number): AddToCart => {
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
    case ActionTypes.CLEAR:
      return [];
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

export const useCart = () => useContext(CartContext);

export default CartContextProvider;
