import {
  Abi,
  Address,
  GetContractReturnType,
  PublicClient,
  WalletClient,
  getContract as viemGetContract,
} from "viem";
import { bsc } from "viem/chains";
import { viemClients } from "./viem";
export function getContract<
  TAbi extends Abi | readonly unknown[],
  TWalletClient extends WalletClient
>({
  abi,
  address,
  chainId = bsc.id,
  publicClient,
  signer,
}: {
  abi: TAbi | readonly unknown[];
  address: Address;
  chainId?: number;
  signer?: TWalletClient;
  publicClient?: PublicClient;
}) {
  // 这里比ethers 好用的一点就是  这里直接可以生成两种 public wallet相当于jsonRpcProvider 和 浏览器Provider
  const contract = viemGetContract({
    abi,
    address,
    client: {
      public: publicClient ?? viemClients[chainId],
      wallet: signer,
    },
  }) as unknown as GetContractReturnType<TAbi, PublicClient, Address>;

  return {
    ...contract,
    account: signer?.account,
    chain: signer?.chain,
  };
}
