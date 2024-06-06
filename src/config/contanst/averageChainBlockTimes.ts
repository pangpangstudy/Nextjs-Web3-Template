import { bsc, bscTestnet } from "viem/chains";

export const AVERAGE_CHAIN_BLOCK_TIMES: Record<number, number> = {
  [bsc.id]: 3,
  [bscTestnet.id]: 3,
  // ......
};
export const BSC_BLOCK_TIME = 3;
