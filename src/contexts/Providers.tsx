"use client";
import { createWagmiConfig } from "@/utils/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { WagmiProvider } from "wagmi";

type Props = {
  children: ReactNode;
};
const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  return (
    <WagmiProvider config={createWagmiConfig()}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
