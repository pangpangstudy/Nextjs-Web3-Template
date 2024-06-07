import { metaMaskConnector } from "@/utils/wagmi";
import { useEffect } from "react";
import { useConfig, useConnect } from "wagmi";
// 选择你期待的 钱包连接  如果用户有这个钱包的话  会直接尝试连接钱包
const useEagerConnect = () => {
  const config = useConfig();
  const { connectors, connectAsync } = useConnect();
  useEffect(() => {
    if (
      !(typeof window === "undefined") &&
      window?.parent !== window &&
      window.ethereum
    ) {
      connectAsync({
        connector: metaMaskConnector,
      });
    }
  }, [config, connectAsync, connectors]);
};
export default useEagerConnect;
