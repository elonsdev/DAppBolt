"use client";

import { useEffect, useState } from "react";

import {
  ThirdwebProvider,
  ConnectWallet,
  localWallet,
  embeddedWallet,
  darkTheme,
  en,
  useConnectionStatus,
} from "@thirdweb-dev/react";

import Bowser from "bowser";

import { Base, BaseSepoliaTestnet } from "@thirdweb-dev/chains";

import {
  ArrowBigLeft,
  PlusSquare,
  Share,
  TabletSmartphone,
  Zap,
} from "lucide-react";
import { PrivacyTerms } from "./privacy-terms";
import { Footer } from "../components/footer";
import Link from "next/link";
import { Button } from "../components/ui/button";

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
  const [device, setDevice] = useState<string>("");
  const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);

  useEffect(() => {
    console.log(Bowser.parse(window.navigator.userAgent));

    const agent = Bowser.parse(window.navigator.userAgent);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }

    if (agent.platform.type === "mobile") {
      if (agent.os.name === "iOS") {
        if (agent.browser.name === "Safari") {
          setDevice("safari");
        } else {
          setDevice("ios");
        }
      } else {
        setDevice("android");

        // Check for the beforeinstallprompt event
        window.addEventListener("beforeinstallprompt", (event) => {
          // Prevent the default behavior of the browser
          event.preventDefault();
          // Store the event for later use
          setDeferredPrompt(event);
        });
      }
    }
  }, []);

  const handleInstallClick = () => {
    // Show the install prompt if available
    if (deferredPrompt) {
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }

        // Reset the deferredPrompt after user interaction
        setDeferredPrompt(null);
      });
    }
  };

  const [showTerms, setShowTerms] = useState(false);

  const connectionStatus = useConnectionStatus();

  if (connectionStatus === "disconnected") {
    return (
      <>
        {!showTerms && (
          <>
            <div className='absolute md:top-3 w-full  text-black font-medium text-center hidden md:block'>
              <div className='flex justify-center items-center '>
                <p className='bg-primary py-2 w-full md:w-fit md:rounded-full px-10'>
                  Visit dappbase.elons.dev on mobile to install the app.
                </p>
              </div>
            </div>
            {device && (
              <div className='absolute w-screen h-screen  '>
                <div className='flex justify-center items-center h-screen backdrop-blur-sm'>
                  <div className='p-6 max-w-xs bg-background/80 border shadow-lg rounded-xl flex flex-col items-center gap-3'>
                    <TabletSmartphone className='w-10 h-10 text-primary' />
                    <h2 className='font-medium text-foreground'>
                      {device === "safari" && "Add To Home Screen"}
                      {device === "android" && "Install App"}
                      {device === "ios" && "Wrong Browser Detected"}
                    </h2>
                    <p className='text-center text-muted-foreground'>
                      To install the app, you need to add this website to your
                      homescreen.
                    </p>

                    {device === "safari" && (
                      <div className='text-muted-foreground'>
                        <ul>
                          <li className='flex items-center gap-3'>
                            <Share /> Tap the Share Icon
                          </li>
                          <li className='flex items-center gap-3 mt-3'>
                            <PlusSquare /> Tap <b>Add to Home Screen</b>
                          </li>
                          <li className='flex items-center gap-3 mt-3'>
                            <Zap /> Open dustminer from the App
                          </li>
                        </ul>
                      </div>
                    )}
                    {device === "android" && (
                      <Button
                        onClick={handleInstallClick}
                        className='bg-primary  rounded-full w-full'
                      >
                        Install
                      </Button>
                    )}
                    {device === "ios" && (
                      <p className='text-center text-muted-foreground'>
                        Please open in Safari to install this app. Learn more
                        about progressive web apps{" "}
                        <Link
                          className='underline underline-offset-1'
                          href={
                            "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app"
                          }
                        >
                          here
                        </Link>
                        .
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div className=' p-8 h-screen grid grid-rows-2  w-full  rounded-xl'>
          {!showTerms ? (
            <>
              <div className='flex flex-col justify-center items-center'>
                <div className='flex gap-1 items-center justify-center  w-full'>
                  <p className='text-3xl font-extralight'>DApp</p>

                  <p className='text-3xl font-semibold'>BOLT</p>
                </div>
                <p className='text-muted-foreground mt-3 text-sm text-center'>
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
                  className='text-xs text-muted-foreground cursor-pointer'
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
        <Zap className='w-20 h-20 animate-pulse text-primary' />
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
