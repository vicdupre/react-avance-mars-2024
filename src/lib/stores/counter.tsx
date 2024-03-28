import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CounterStore {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

const useCounter = create<CounterStore>()(
  persist(
    (set) => ({
      counter: 0,
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      decrement: () => set((state) => ({ counter: state.counter + 1 })),
    }),
    {
      name: "zustand-counter",
    }
  )
);

export default useCounter;
