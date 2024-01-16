import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";

import Web3Provider from "./lib/web3-provider";
import WagmiRainbowProvider from "./lib/rainbow-wagmi-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DAppBolt",
  description: "Opensource PWA built on BASE.",
  generator: "Next.js",
  manifest: "/manifest.json",
  icons: [{ rel: "icon", url: "icon-192x192.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Web3Provider>
          {" "}
          <WagmiRainbowProvider>{children}</WagmiRainbowProvider>{" "}
        </Web3Provider>
      </body>
    </html>
  );
}
