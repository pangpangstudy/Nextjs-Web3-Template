import { CHAINS } from "@/config/chains";
import { PUBLIC_NODES } from "@/config/node";
import { Transport, http } from "viem";
import { mainnet } from "viem/chains";
import { createConfig, fallback } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
// import { CLIENT_CONFIG } from "./viem";
import memoize from "lodash/memoize";
export const chains = CHAINS;
export const CHAIN_IDS = chains.map((chain) => chain.id);
// connector
// 作用：控制是否模拟断开连接行为。如果设置为 true，当用户断开连接时，库会模拟一个断开连接的行为。
// 效果：适用于一些旧版钱包或不完全支持断开连接的情况
export const injectedConnector = injected({
  shimDisconnect: false,
});
export const coinbaseConnector = coinbaseWallet({
  appName: "Your App Name",
  appLogoUrl: "https://xxx.com/logo.png",
});
export const walletConnectConnector = walletConnect({
  showQrModal: process.env.NODE_ENV !== "test",
  projectId: "e542ff314e26ff34de2d4fba98db70bb",
});
export const walletConnectNoQrCodeConnector = walletConnect({
  showQrModal: false,
  projectId: "e542ff314e26ff34de2d4fba98db70bb",
});
export const metaMaskConnector = injected({
  target: "metaMask",
  shimDisconnect: false,
});
export const trustConnector = injected({
  target: "trust",
  shimDisconnect: false,
});
const PUBLIC_MAINNET = "https://ethereum.publicnode.com";
export const transports = chains.reduce((pre, chain) => {
  let httpStrings: string[] | readonly string[] = [];
  if (process.env.NODE_ENV === "test" && chain.id === mainnet.id) {
    httpStrings = [PUBLIC_MAINNET];
  } else {
    httpStrings = PUBLIC_NODES[chain.id] || [];
  }
  if (pre) {
    return {
      ...pre,
      [chain.id]: [fallback(httpStrings.map((t: any) => http(t)))],
    };
  }
  return { [chain.id]: [fallback(httpStrings.map((t: any) => http(t)))] };
}, {});
export function createWagmiConfig() {
  return createConfig({
    chains,
    transports,
    ssr: true,
    syncConnectedChain: true,
    // ...CLIENT_CONFIG,
    connectors: [
      injectedConnector,
      coinbaseConnector,
      walletConnectConnector,
      metaMaskConnector,
      trustConnector,
    ],
  });
}
export const isChainSupported = memoize((chainId: number) =>
  (CHAIN_IDS as number[]).includes(chainId)
);
export const isChainTestnet = memoize((chainId: number) => {
  const found = chains.find((c) => c.id === chainId);
  return found ? "testnet" in found : false;
});
