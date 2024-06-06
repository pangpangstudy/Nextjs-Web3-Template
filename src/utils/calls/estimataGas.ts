import {
  Abi,
  Account,
  Address,
  CallParameters,
  Chain,
  ContractFunctionArgs,
  ContractFunctionName,
} from "viem";

export const estimateGas = async <
  TAbi extends Abi | unknown[],
  functionName extends ContractFunctionName<TAbi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<
    TAbi,
    "nonpayable" | "payable",
    functionName
  >
>(
  // 解构出 合约相关的数据以及方法
  contract: {
    abi: TAbi;
    address: Address;
    //   一个账户对象 也可以说是 signer
    account: Account | undefined;
    chain: Chain | undefined;
    write: any;
    estimateGas: any;
  },
  methodName: functionName,
  methodArgs: args,
  //   Omit<CallParameters, "chain" | "to" | "data"> 是 TypeScript 中的一个类型操作，它的作用是从 CallParameters 类型中移除 chain、to 和 data 属性。
  overrides: Omit<CallParameters, "chain" | "to" | "data"> = {},
  gasMarginPer10000: bigint
) => {
  if (!contract.estimateGas[methodName]) {
    throw new Error(
      `Method ${methodName} doesn't exist on ${contract.address}`
    );
  }
  const rawGasEstimation = await contract.estimateGas[methodName](methodArgs, {
    value: 0n,
    account: contract.account,
    chain: contract.chain,
    ...overrides,
  });
  const gasEstimation = calculateGasMargin(rawGasEstimation, gasMarginPer10000);
  return gasEstimation;
};
export function calculateGasMargin(value: bigint, margin = 1000n): bigint {
  return (value * (10000n + margin)) / 10000n;
}
export const callWithEstimateGas = async <
  TAbi extends Abi,
  functionName extends ContractFunctionName<TAbi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<
    TAbi,
    "nonpayable" | "payable",
    functionName
  >
>(
  contract: {
    abi: TAbi;
    account: Account | undefined;
    chain: Chain | undefined;
    address: Address;
    write: any;
    estimateGas: any;
  },
  methodName: functionName,
  methodArgs: args,
  overrides: Omit<CallParameters, "chain" | "to" | "data"> = {},
  gasMarginPer10000 = 1000n
) => {
  const gasEstimation = await estimateGas(
    contract,
    methodName,
    methodArgs,
    overrides,
    gasMarginPer10000
  );
  const tx = await contract.write[methodName](methodArgs, {
    value: 0n,
    gas: gasEstimation,
    account: contract.account,
    chain: contract.chain,
    ...overrides,
  });
  return {
    hash: tx,
  };
};
