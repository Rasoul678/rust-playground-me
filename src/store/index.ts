import localforage from "localforage";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { INIT_CODE } from "../constant";

localforage.config({
  driver: localforage.INDEXEDDB,
  version: 1.0,
  name: "playground",
  storeName: "editor",
  description: "Code for Rust Playground",
});

type State = {
  code: string;
};

type Actions = {
  setCode: (c: string) => void;
  reset: () => void;
};

type Store = State & Actions;

const localForageStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await localforage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    localforage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await localforage.removeItem(name);
  },
};

const storageOptions = {
  name: "rust-code",
  storage: createJSONStorage<Store>(() => localForageStorage),
};

export const useCodeStore = create(
  persist<Store>(
    (set) => ({
      code: INIT_CODE,
      setCode: (code) => set({ code }),
      reset: () => set({ code: INIT_CODE }),
    }),
    storageOptions
  )
);
