import { useSessionChainId } from "@/store/sessionChainIdStore";
import { useSwitchNetworkLoading } from "@/store/switchNetworkStatusStore";
import replaceBrowserHistory from "@/utils/replaceBrowserHistory";
import { useCallback, useMemo } from "react";
import { useAccount, useSwitchChain } from "wagmi";
// 切换网路后的操做
export function useSwitchNetworkLocal() {
  const { updateSessionChainId } = useSessionChainId();
  return useCallback(
    (chainId: number) => {
      //   也可以使用chainID的name
      replaceBrowserHistory("chain", chainId);
      //
      updateSessionChainId(chainId);
    },
    [updateSessionChainId]
  );
}
// 用于切换网络的hook  这里是为了 多链的选择  用户可能没有 登录 但是其可以点击按钮预设 需要连接的网络
export const useSwitchNetwork = () => {
  const { loading, setLoading } = useSwitchNetworkLoading();
  const {
    status,
    switchChainAsync: _switchNetworkAsync,
    switchChain: _switchNetwork,
    ...switchNetworkArgs
  } = useSwitchChain();
  const _isLoading = status === "pending";
  const { isConnected } = useAccount();
  const isLoading = _isLoading || loading;
  const switchNetworkLocal = useSwitchNetworkLocal();
  const switchNetworkAsync = useCallback(
    async (chainId: number) => {
      if (isConnected && typeof _switchNetworkAsync === "function") {
        if (isLoading) return undefined;
        setLoading(true);
        return _switchNetworkAsync({ chainId })
          .then((c) => {
            switchNetworkLocal(chainId);
            //   在 TokenPocket 中，切换网络后需要重新加载页面来确保状态的正确性。
            if (window.ethereum?.isTokenPocket === true) {
              window.location.reload();
            }
            return c;
          })
          .catch(() => {
            throw new Error(
              "Error connecting, please retry and confirm in wallet!"
            );
          })
          .finally(() => setLoading(false));
      }
      return new Promise(() => {
        switchNetworkLocal(chainId);
      });
    },
    [
      _switchNetworkAsync,
      switchNetworkLocal,
      isLoading,
      isConnected,
      setLoading,
    ]
  );
  const switchNetwork = useCallback(
    (chainId: number) => {
      if (isConnected && typeof _switchNetwork === "function") {
        return _switchNetwork({ chainId });
      }
      return switchNetworkLocal(chainId);
    },
    [_switchNetwork, isConnected, switchNetworkLocal]
  );
  const canSwitch = useMemo(
    () =>
      isConnected
        ? !!_switchNetworkAsync &&
          //  MathWallet 可能在处理特定事件或调用时有不同的实现
          !(typeof window !== "undefined" && window.ethereum?.isMathWallet)
        : true,
    [_switchNetworkAsync, isConnected]
  );
  return {
    ...switchNetworkArgs,
    switchNetwork,
    switchNetworkAsync,
    isLoading,
    canSwitch,
  };
};
