"use client";

import React, { useEffect } from "react";
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
import { configureChains, createConfig, WagmiConfig, useSignMessage, useAccount, useConnect } from "wagmi";
import { scrollSepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID; // from walletconnect

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [scrollSepolia],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
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

const requestSignature = async (signMessage, address, disconnect) => {
  const message = `Domain: liblock.app\nPubKey: ${address}\nMessage: By signing this message, you recognize that your interactions on the website are your own responsibility and any issues that may arise can not be blamed over the Liblock app`;
  try {
    await signMessage({ message });
  } catch (error) {
    console.error('Signature failed', error);
    disconnect();
  }
};

const Providers = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={AppInfo}
        modalSize="compact"
      >
        <SignatureChecker>
          {children}
        </SignatureChecker>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

const SignatureChecker = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { signMessage } = useSignMessage();
  const { disconnect } = useConnect();

  useEffect(() => {
    if (isConnected) {
      requestSignature(signMessage, address, disconnect);
    }
  }, [isConnected, address, signMessage, disconnect]);

  return <>{children}</>;
};

export default Providers;