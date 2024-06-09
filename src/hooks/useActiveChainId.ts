import { useSessionChainId } from "@/store/sessionChainIdStore";
import { isChainSupported } from "@/utils/wagmi";
import { useMemo } from "react";
import { useAccount } from "wagmi";

export const useActiveChainId = () => {
  const { sessionChainId } = useSessionChainId();
  const { chainId: wagmiChainId } = useAccount();
  const chainId = sessionChainId ?? wagmiChainId ?? undefined;
  //please use rainbowkit
  const isWrongNetwork = useMemo(
    () => Boolean(wagmiChainId && !isChainSupported(wagmiChainId)),
    [wagmiChainId]
  );
  return { chainId, isWrongNetwork };
};
