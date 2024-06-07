import { create } from "zustand";
type State = {
  sessionChainId: number;
};
type Action = {
  updateSessionChainId: (sessionChainId: number) => void;
};
export const useSessionChainId = create<State & Action>((set) => ({
  sessionChainId: 0,
  updateSessionChainId: (sessionChainId) =>
    set(() => ({
      sessionChainId: sessionChainId,
    })),
}));
