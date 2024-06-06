import { getContract } from "@/utils/contractHelpers";
import { useMemo } from "react";
import { Abi, Address, erc20Abi } from "viem";
import { useWalletClient } from "wagmi";
type UseContractOptions = {
  chainId?: number;
};
// 这里因为声明周期 可能会碰到接受参数为 undefined
export function useContract<TAbi extends Abi>(
  addressOrAddressMap?: Address | { [chainId: number]: Address },
  abi?: TAbi,
  options?: UseContractOptions
) {
  // 这里的chainId 可以从自己存储的状态中  如果存在cookie里 就从cookie里那  如果在zustand里就在zustand里拿
  // 反正这里要是 当前连接的chainID  具体情况具体处理
  // const { chainId } = useAccount();
  const chainId = options?.chainId || 97 || "";
  const { data: walletClient } = useWalletClient();
  // 从这里取出walletClient 相当于signer  如果没有 证明用户没有连接 就使用 publicClient
  return useMemo(() => {
    if (!addressOrAddressMap || !abi || !chainId) return null;
    let address: Address | undefined;
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    try {
      // 注意 类型推断的问题  这里是依靠 泛型来完成 类型推断的
      return getContract({
        abi,
        address,
        chainId,
        signer: walletClient ?? undefined,
      });
    } catch (error) {
      console.log("Failed to get contract", error);
      return null;
    }
  }, [addressOrAddressMap, abi, chainId, walletClient]);
}
export function useTokenContract(tokenAddress?: Address) {
  return useContract(tokenAddress, erc20Abi);
}
