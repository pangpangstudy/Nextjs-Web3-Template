import {
  Chain,
  bscTestnet,
  bsc as bsc_,
  goerli,
  mainnet,
  opBNB,
  opBNBTestnet,
} from "wagmi/chains";
const bsc = {
  ...bsc_,
  rpcUrls: {
    ...bsc_.rpcUrls,
    public: {
      ...bsc_.rpcUrls,
      http: ["https://bsc-dataseed.binance.org/"],
    },
    default: {
      ...bsc_.rpcUrls.default,
      http: ["https://bsc-dataseed.binance.org/"],
    },
  },
} satisfies Chain;
export const CHAINS: [Chain, ...Chain[]] = [
  bsc,
  bscTestnet,
  mainnet,
  goerli,
  opBNB,
  opBNBTestnet,
];
