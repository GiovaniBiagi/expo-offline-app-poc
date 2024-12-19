import { create } from "zustand";
import { persist } from "zustand/middleware";
import { persistStorage } from "@/lib/zustand/persist-storage";

export type Post = {
  title: string;
  body: string;
  userId: number;
};

type State = {
  posts: Post[];
};

type Actions = {
  setPosts: (posts: Post[]) => void;
  clearStore: () => void;
};

const initialState: State = {
  posts: [],
};

export const usePostStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setPosts: (posts) => set({ posts }),
      clearStore: () => set(initialState),
    }),
    {
      name: "post",
      storage: persistStorage<State>(),
    }
  )
);

export type UsePostStoreType = typeof usePostStore;
