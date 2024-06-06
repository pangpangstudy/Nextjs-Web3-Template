import { CHAINS } from "@/config/chains";
import { PUBLIC_NODES } from "@/config/node";
import { first } from "lodash";
import { PublicClient, createPublicClient, fallback, http } from "viem";
import { mainnet } from "viem/chains";
// transportSignal: AbortSignal 类型，用于控制请求的取消。
// 效果：当传入的 AbortSignal 被触发时，会中止所有与该信号关联的网络请求。这在需要取消挂起的请求时非常有用，例如在用户导航到另一个页面时中止当前页面的请求。
export const CLIENT_CONFIG = {
  batch: {
    multicall: {
      batchSize: 1024 * 200,
      wait: 16,
    },
  },
  pollingInterval: 6_000,
};
export type CreateViemPublicClientParams = {
  transportSignal?: AbortSignal;
};
export function createViemPublicClients({
  transportSignal,
}: CreateViemPublicClientParams = {}) {
  return CHAINS.reduce((prev, cur) => {
    return {
      ...prev,
      [cur.id]: createPublicClient({
        chain: cur,
        transport: fallback(
          PUBLIC_NODES[cur.id].map((t) =>
            http(t, {
              timeout: 10_000,
              fetchOptions: {
                signal: transportSignal,
              },
            })
          ),
          //   切换以启用排名或排名选项。
          {
            rank: false,
          }
        ),
      }),
    };
  }, {} as Record<number, PublicClient>);
}
export const viemClients = createViemPublicClients();
// export const getViemClient =
type CreateViemPublicClientGetterParams = {
  viemClients?: Record<number, PublicClient>;
} & CreateViemPublicClientParams;
export function createViemPublicClientGetter({
  //如果没有传 创建新的 client
  viemClients: viemClientsOverride,
  ...restParams
}: CreateViemPublicClientGetterParams = {}) {
  const clients = viemClientsOverride || createViemPublicClients(restParams);
  return function getClients({ chainId }: { chainId?: number }): PublicClient {
    //   类型断言：chainId as ChainId 是一种类型断言，告诉 TypeScript 我们确信 chainId 是 ChainId 类型。这种断言不会进行运行时检查，仅在编译时影响类型系统。
    //   类型断言忽略了可能的未定义情况：类型断言 chainId as ChainId 告诉 TypeScript 忽略 chainId 可能为 undefined 的情况。类型断言会绕过类型检查，因此不会在编译时报错。
    //   在运行时，如果 chainId 是 undefined，则 clients[chainId as ChainId] 将返回 undefined，这可能会在你尝试使用返回值时导致错误。
    return clients[chainId as number];
  };
}
export const getViemClients = createViemPublicClientGetter({ viemClients });
const PUBLIC_MAINNET = "https://ethereum.publicnode.com";
export const publicClient = ({ chainId }: { chainId: number }) => {
  if (chainId && viemClients[chainId]) {
    return viemClients[chainId];
  }
  let httpString: string | undefined;
  if (process.env.NODE_ENV === "test" && chainId === mainnet.id) {
    httpString = PUBLIC_MAINNET;
  } else {
    httpString =
      chainId && first(PUBLIC_NODES[chainId])
        ? first(PUBLIC_NODES[chainId])
        : undefined;
  }
  const chain = CHAINS.find((c) => c.id == chainId);
  return createPublicClient({
    chain,
    transport: http(httpString),
    ...CLIENT_CONFIG,
  });
};
