"use client";

import { useState } from "react";

import {
  ThirdwebProvider,
  ConnectWallet,
  localWallet,
  embeddedWallet,
  darkTheme,
  en,
  useConnectionStatus,
  useSetIsWalletModalOpen,
} from "@thirdweb-dev/react";

import { Base, BaseGoerli, BaseSepoliaTestnet } from "@thirdweb-dev/chains";

import { Button } from "../components/ui/button";
import { ArrowBigLeft, Dices, Zap } from "lucide-react";
import { PrivacyTerms } from "./privacy-terms";
import { Footer } from "../components/footer";
import Link from "next/link";

export default function Web3Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider
      activeChain={BaseSepoliaTestnet}
      supportedChains={[BaseSepoliaTestnet, Base]}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      locale={en()}
      supportedWallets={[
        localWallet(),
        embeddedWallet({
          auth: {
            options: ["google", "apple"],
          },
        }),
      ]}
    >
      <Displayer>{children}</Displayer>
    </ThirdwebProvider>
  );
}

const Displayer = ({ children }: { children: React.ReactNode }) => {
  const [showTerms, setShowTerms] = useState(false);

  const connectionStatus = useConnectionStatus();

  if (connectionStatus === "disconnected") {
    return (
      <>
        {!showTerms && (
          <div className='absolute md:top-3 w-full  text-black font-medium text-center hidden md:block'>
            <div className='flex justify-center items-center '>
              <p className='bg-violet-300 py-2 w-full md:w-fit md:rounded-full px-10'>
                Visit dappbase.elons.dev on mobile to install the app.
              </p>
            </div>
          </div>
        )}
        <div className=' p-8 h-screen grid grid-rows-2  w-full  rounded-xl'>
          {!showTerms ? (
            <>
              <div className='flex flex-col justify-center items-center'>
                <div className='flex gap-1 items-center justify-center  w-full'>
                  <Zap className='w-7 h-7 rotate-12 text-violet-300' />
                  <p className='text-3xl font-extralight'>DApp</p>

                  <p className='text-3xl font-semibold'>BOLT</p>
                </div>
                <p className='text-neutral-400 mt-3 text-sm text-center'>
                  Opensource PWA built on BASE.
                </p>
              </div>
              <div className='flex flex-col gap-3 items-center justify-center  w-full'>
                <ConnectWallet
                  theme={darkTheme({
                    colors: {
                      accentText: "#c4b5fd",
                      accentButtonBg: "#c4b5fd",
                      modalBg: "#171717",
                      dropdownBg: "#171717",
                      borderColor: "#262626",
                      separatorLine: "#404040",
                      secondaryText: "#a3a3a3",
                      primaryButtonBg: "#c4b5fd",
                      primaryButtonText: "#000000",
                      accentButtonText: "#000000",
                    },
                  })}
                  btnTitle={"Sign In"}
                  modalSize={"compact"}
                  style={{ borderRadius: "100px", fontWeight: "600" }}
                  welcomeScreen={{}}
                  modalTitleIconUrl={
                    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS16YXAiPjxwb2x5Z29uIHBvaW50cz0iMTMgMiAzIDE0IDEyIDE0IDExIDIyIDIxIDEwIDEyIDEwIDEzIDIiLz48L3N2Zz4="
                  }
                />
                <p
                  onClick={() => setShowTerms(true)}
                  className='text-xs text-neutral-500 cursor-pointer'
                >
                  Check our privacy and terms →
                </p>
              </div>
            </>
          ) : (
            <>
              <div className='w-full  my-8 mb-20'>
                <div
                  onClick={() => setShowTerms(false)}
                  className='flex gap-2 cursor-pointer'
                >
                  <ArrowBigLeft />
                  <p>BACK</p>
                </div>
                <div className='mt-4 '>
                  <PrivacyTerms />
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }

  if (connectionStatus === "connecting" || connectionStatus === "unknown") {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <Zap className='w-20 h-20 animate-pulse text-violet-300' />
      </div>
    );
  }

  if (connectionStatus === "connected") {
    return (
      <>
        {children} <Footer />
      </>
    );
  }
};
