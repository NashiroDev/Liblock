"use client";

import React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, mainnet, WagmiConfig } from "wagmi";
import { polygonMumbai, sepolia, lineaTestnet, optimism } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const projectId = "temp/getFromWalletConnect";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, optimism, polygonMumbai, sepolia, lineaTestnet],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "Liblock",
  projectId,
  chains,
});

const AppInfo = {
  appName: "Liblock",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const Providers = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={AppInfo}
        modalSize="compact"
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Providers;