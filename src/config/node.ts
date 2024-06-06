import { notEmpty } from "@/utils/notEmpty";

import {
  bsc,
  opBNB,
  opBNBTestnet,
  bscTestnet,
  mainnet,
  goerli,
  //   .....
} from "wagmi/chains";

export const PUBLIC_NODES: Record<number, string[] | readonly string[]> = {
  [bsc.id]: [
    "https://bsc.publicnode.com",
    "https://binance.llamarpc.com",
    "https://bsc-dataseed1.defibit.io",
    "https://bsc-dataseed1.binance.org",
  ].filter(notEmpty),
  [bscTestnet.id]: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
  [mainnet.id]: [
    "https://ethereum.publicnode.com",
    "https://eth.llamarpc.com",
    "https://cloudflare-eth.com",
  ].filter(notEmpty),
  [goerli.id]: ["https://eth-goerli.public.blastapi.io"].filter(notEmpty),
  [opBNBTestnet.id]: opBNBTestnet.rpcUrls.default.http,
  [opBNB.id]: [...opBNB.rpcUrls.default.http, "https://opbnb.publicnode.com"],
  //   ...........
} satisfies Record<number, readonly string[]>;
