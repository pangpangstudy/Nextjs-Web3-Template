import { create } from "zustand";
type State = {
  siweStatus: boolean;
};
type Action = {
  updateSiweStatus: (siweStatus: boolean) => void;
};
export const useSiweStatus = create<State & Action>((set) => ({
  siweStatus: false,
  updateSiweStatus: (siweStatus) =>
    set(() => ({
      siweStatus: siweStatus,
    })),
}));
