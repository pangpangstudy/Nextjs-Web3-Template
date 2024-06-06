import { publicClient } from "@/utils/viem";
import { useCallback, useState } from "react";
import { Address, Hash } from "viem";
import { useAccount } from "wagmi";
import { usePublicNodeWaitForTransaction } from "./usePublicNodeWaitForTransaction";
// 用于控制调用以及回执
export default function useCatchTxError() {
  const [loading, setLoading] = useState(false);
  const { waitForTransaction } = usePublicNodeWaitForTransaction();
  const fetchWithCatchTxError = useCallback(
    async (callTx: () => Promise<{ hash: Address } | Hash | undefined>) => {
      let tx: { hash: Address } | Hash | null | undefined = null;
      try {
        setLoading(true);
        tx = await callTx();
        if (!tx) {
          return null;
        }
        const hash = typeof tx === "string" ? tx : tx.hash;
        //   使用toast 弹出提示消息 此时交易已经提交 但是在pending状态
        //   toast("提交交易成功")
        //   获取回执  因为可能是多链  所以不同的链 需要不同的chainId 也就需要不同的 publicClient
        // 可以另外封装 也可以在直接 读取
        // const { chainId } = useAccount();
        // const curPublicClient = publicClient({ chainId: chainId! });
        // const receipt = await curPublicClient.getTransactionReceipt({ hash });
        const receipt = await waitForTransaction({ hash });
        if (receipt?.status === "success") {
          return receipt;
        }
        throw Error("Failed");
      } catch (error) {
      } finally {
        setLoading(false);
      }
      return null;
    },
    [waitForTransaction]
  );
  return {
    fetchWithCatchTxError,

    loading,
  };
}
