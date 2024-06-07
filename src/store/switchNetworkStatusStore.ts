import { type } from "os";
import { create } from "zustand";
type State = {
  loading: boolean;
};
type Action = {
  setLoading: (loading: boolean) => void;
};
export const useSwitchNetworkLoading = create<State & Action>((set) => ({
  loading: false,
  setLoading: (loading) => set(() => ({ loading: loading })),
}));
