import { CommandType, OutputType } from "@/components/terminal";
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

export type CrateType = { id: string; name: string; version: string };

type State = {
  code: string;
  isHydrated: boolean;
  result: RustResult | null;
  outputs: OutputType[];
  isRunning: boolean;
  crates: CrateType[];
};

type Actions = {
  setCode: (code: string) => void;
  setResult: (result: RustResult, type?: CommandType) => void;
  setOutputs: (output: OutputType[]) => void;
  setIsRunning: (flag: boolean) => void;
  setCrates: (crates: CrateType[]) => void;
  reset: VoidFunction;
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
    crates: state.crates,
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
      crates: [],
      isHydrated: true,
      isRunning: false,
      setIsRunning: (flag) => set({ isRunning: flag }),
      setCode: (code) => set({ code }),
      setCrates: (crates) => set({ crates }),
      setResult: (result, type?: CommandType) => {
        set({ result });
        get().setOutputs([
          ...get().outputs,
          {
            type: type || CommandType.SUCCESS,
            text: result.result,
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
