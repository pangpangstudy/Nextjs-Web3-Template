"use client";
import { useTokenContract } from "@/hooks/useContract";
import { calculateGasMargin } from "@/utils/calls/estimataGas";
import { metaMaskConnector } from "@/utils/wagmi";
import React, { useEffect } from "react";
import { useConnect, useWalletClient } from "wagmi";

type Props = {};

const Test = (props: Props) => {
  const { connect } = useConnect();
  const { data: walletClient } = useWalletClient();
  useEffect(() => {
    connect({ chainId: 97, connector: metaMaskConnector });
  }, [connect]);
  const contract = useTokenContract(
    "0x791518786955CA63903fcC22e45bAd82c0aFF07A"
  );
  const estimate = contract!.estimateGas.approve;
  const result = async () => {
    if (!walletClient || !contract) return;
    await estimate(["0xe15c2b1dfa0455511d30e4e25af72af25b7b7747", 1000n], {
      account: contract.account,
    }).then((r) => console.log(calculateGasMargin(r)));
  };
  result();
  return <div>Test</div>;
};

export default Test;
