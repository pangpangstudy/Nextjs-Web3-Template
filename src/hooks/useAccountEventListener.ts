import { useCallback, useEffect } from "react";
import { useSwitchNetworkLocal } from "./useSwitchNetwork";
import { useAccount, useAccountEffect, useConfig } from "wagmi";
import { watchAccount } from "@wagmi/core";
// 监听网路切换
export const useChainIdListener = () => {
  const switchNetworkCallback = useSwitchNetworkLocal();
  const { connector } = useAccount();
  const onChainChanged = useCallback(
    ({ chainId }: { chainId?: number }) => {
      if (chainId === undefined) return;
      switchNetworkCallback(chainId);
    },
    [switchNetworkCallback]
  );
  useEffect(() => {
    connector?.emitter?.on("change", onChainChanged);
    return () => connector?.emitter?.off("change", onChainChanged);
  });
};
//监听地址切换
export const useAddressListener = () => {
  const config = useConfig();
  const { chainId } = useAccount();
  useEffect(() => {
    return watchAccount(config, {
      onChange(data, prevData) {
        // 账户切换 但是没有切换chainId
        if (
          prevData.status === "connected" &&
          data.status === "connected" &&
          prevData.chainId === data.chainId
        ) {
          // 执行操做  比如清除 当前 zustand中的 user的相关信息
          // TODO：CLEAR DATA
        }
      },
    });
  }, [config, chainId]);
};
export const useAccountEventListener = () => {
  useChainIdListener();
  useAddressListener();
  useAccountEffect({
    onDisconnect() {
      // 执行操做  比如清除 当前 zustand中的 user的相关信息
      // TODO：CLEAR DATA
    },
  });
};
