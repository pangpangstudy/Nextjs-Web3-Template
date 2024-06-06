import {
  AVERAGE_CHAIN_BLOCK_TIMES,
  BSC_BLOCK_TIME,
} from "@/config/contanst/averageChainBlockTimes";
import { retry } from "@/utils/retry";
import { viemClients } from "@/utils/viem";
import { useCallback } from "react";
import {
  BlockNotFoundError,
  GetTransactionReceiptParameters,
  TransactionNotFoundError,
  TransactionReceipt,
  TransactionReceiptNotFoundError,
  WaitForTransactionReceiptTimeoutError,
} from "viem";
import { useAccount, usePublicClient } from "wagmi";
export type PublicNodeWaitForTransactionParams =
  GetTransactionReceiptParameters & {
    chainId?: number;
  };
export function usePublicNodeWaitForTransaction() {
  // 这里的chainId 可以从 cookie  zutandState 中取 下边的只是为了示例
  const { chainId } = useAccount();
  // 这里使用的是 wagmi 封装好的方法  在util文件中 也有自己封装的 viem的方法
  const provider = usePublicClient({ chainId });
  const waitForTransaction_ = useCallback(
    async (
      opts: PublicNodeWaitForTransactionParams
    ): Promise<TransactionReceipt> => {
      const getTransaction = async () => {
        try {
          const selectedChain = opts?.chainId ?? chainId;
          if (selectedChain && chainId && viemClients[chainId]) {
            return await viemClients[chainId].getTransactionReceipt({
              hash: opts.hash,
            });
          }
          if (!provider) {
            return undefined;
          }
          return await provider.getTransactionReceipt({ hash: opts.hash });
        } catch (error) {
          if (error instanceof TransactionNotFoundError) {
            throw new Error(`Transaction not found: ${opts.hash}`);
          } else if (error instanceof TransactionReceiptNotFoundError) {
            throw new Error(`Transaction receipt not found: ${opts.hash}`);
          } else if (error instanceof BlockNotFoundError) {
            throw new Error(`Block not found for transaction: ${opts.hash}`);
          } else if (error instanceof WaitForTransactionReceiptTimeoutError) {
            throw new Error(
              `Timeout reached when fetching transaction receipt: ${opts.hash}`
            );
          }
          throw error;
        }
      };
      return retry(getTransaction, {
        n: 10,
        minWait: 5000,
        maxWait: 10000,
        delay:
          (chainId ? AVERAGE_CHAIN_BLOCK_TIMES[chainId] : BSC_BLOCK_TIME) *
            1000 +
          1000,
      }).promise as Promise<TransactionReceipt>;
    },
    [chainId, provider]
  );
  return { waitForTransaction: waitForTransaction_ };
}
