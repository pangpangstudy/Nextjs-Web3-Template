"use client";
import { useActiveChainId } from "@/hooks/useActiveChainId";
import { useSiweStatus } from "@/store/siweStatuusStore";
import createSiweMessage from "@/utils/siwe";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { SiweMessage } from "siwe";
import { Address } from "viem";
import { useAccount, useSignMessage } from "wagmi";
type Props = {};

const LoginButton = (props: Props) => {
  const t = useTranslations();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>();
  const { siweStatus, updateSiweStatus } = useSiweStatus();
  const { chainId } = useActiveChainId();
  const { signMessageAsync } = useSignMessage();
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const nonceResponse = await fetch(
        "/api/affiliates-program/affiliate-nonce"
      );
      const { nonce } = await nonceResponse.json();

      if (nonce) {
        const initMessage = new SiweMessage({
          domain: window.location.host,
          address,
          statement: "xxxxx",
          uri: window.location.origin,
          version: "1",
          chainId,
          nonce,
        });
        const message = initMessage.prepareMessage();
        const signature = await signMessageAsync({ message });

        // const response = await fetch("/api/verify", {
        //   method: "POST",
        //   body: JSON.stringify({ affiliate: { message, signature } }),
        // });
        // const { status } = await response.json();
        // if (status === "success") {
        //   updateSiweStatus(true);
        // }
        const res = { status: "success" };
        if (res.status === "success") {
          updateSiweStatus(true);
          // .......... TODO
        }
      }
    } catch (error) {
      console.error(`Submit Dashboard Login Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  return <button>LoginButton</button>;
};

export default LoginButton;
