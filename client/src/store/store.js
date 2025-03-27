import { create } from "zustand";

export const useAccount = create((set) => {
  return {
    account: [],
    setAccount: (account) => set((state) => ({ account })),
  };
});
