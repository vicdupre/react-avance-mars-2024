import { create } from "zustand";
import { Products } from "../types/types";

interface State {
  products: Products;
  loading: boolean;
  isLoaded: boolean;
  error?: Error;
}

interface Actions {
  fetchData: () => Promise<void>;
}

const useProducts = create<State & Actions>()((set) => ({
  products: [],
  loading: false,
  isLoaded: false,
  fetchData: async () => {
    set({
      loading: true,
    });
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const json = await res.json();
      set({
        loading: false,
        isLoaded: true,
        products: json,
      });
    } catch (error) {
      set({
        loading: false,
        error: error as Error,
      });
    }
  },
}));

export default useProducts;
