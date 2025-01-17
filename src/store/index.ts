import { OutputType } from "@/components/terminal";
import { RustResult } from "@/utils";
import localforage from "localforage";
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  PersistOptions,
  StateStorage,
} from "zustand/middleware";
import { INIT_CODE } from "../constant";

localforage.config({
  driver: localforage.INDEXEDDB,
  version: 1.0,
  name: "playground",
  storeName: "editor",
  description: "State of Rust Playground",
});

type State = {
  code: string;
  isHydrated: boolean;
  result: RustResult | null;
  outputs: OutputType[];
  isRunning: boolean;
};

type Actions = {
  setCode: (c: string) => void;
  setResult: (r: RustResult) => void;
  setOutputs: (o: OutputType[]) => void;
  setIsRunning: (flag: boolean) => void;
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
  partialize: (state: State) => ({
    code: state.code,
    isHydrated: state.isHydrated,
    result: state.result,
  }),
  onRehydrateStorage: () => (state: Store) => {
    //! Set isHydrated to true once the state is rehydrated
    if (state) {
      state.isHydrated = true;
    }
  },
};

export const useCodeStore = create(
  persist(
    (set, get) => ({
      code: INIT_CODE,
      result: null,
      outputs: [],
      isHydrated: true,
      isRunning: false,
      setIsRunning: (flag) => set({ isRunning: flag }),
      setCode: (code) => set({ code }),
      setResult: (result) => {
        set({ result });
        get().setOutputs([
          ...get().outputs,
          {
            type: "success",
            text: result.output,
            command: "cargo run",
          },
        ]);
      },
      setOutputs: (outputs) => set({ outputs }),
      reset: () => set({ code: INIT_CODE }),
    }),
    storageOptions as PersistOptions<Store, Partial<Store>>
  )
);
