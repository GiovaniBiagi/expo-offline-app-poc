import { create } from "zustand";
import { persist } from "zustand/middleware";
import { persistStorage } from "@/lib/zustand/persist-storage";

export type Product = {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

type State = {
  products: Product[];
};

type Actions = {
  setProducts: (products: Product[]) => void;
  clearStore: () => void;
};

const initialState: State = {
  products: [],
};

export const useProductStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setProducts: (products) => set({ products }),
      clearStore: () => set(initialState),
    }),
    {
      name: "products",
      storage: persistStorage<State>(),
    }
  )
);

export type UseProductStoreType = typeof useProductStore;
