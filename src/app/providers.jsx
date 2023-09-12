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
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

const projectId = "be4bc7e4028ce5d2783be18884044fa7"; // from walletconnect

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli, sepolia],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
    publicProvider()
  ],
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