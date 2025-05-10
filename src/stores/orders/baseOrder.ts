import { create } from "zustand";

export interface BaseOrderStore {
  currentCategory: string;
  setCurrentCategory: (state: string) => void
}

export const useBaseOrder = create<BaseOrderStore>((set) => ({
  currentCategory: "realTime",

  setCurrentCategory: (state) => {
    set({currentCategory: state}) 
  },
  
}))