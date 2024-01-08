"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  useAddress,
  useDisconnect,
  useLogout,
  useWallet,
  useWalletConfig,
  useBalance,
  useChain,
} from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Info, Send, Upload } from "lucide-react";
import { WalletInfo } from "../components/walletinfo";
import { Label } from "../components/ui/label";
import Image from "next/image";
import { DepositInfo } from "../components/depositinfo";
import { ExportWalletInfo } from "../components/exportwalletinfo";

export default function Wallet() {
  const disconnect = useDisconnect();
  const address = useAddress();
  const chain = useChain();
  const walletInstance = useWallet() as any;
  console.log(walletInstance);
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);

  const walletConfig = useWalletConfig();

  console.log(walletConfig);
  console.log(data);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between pb-20 px-4 pt-16'>
      <div className='w-full grid grid-cols-3 gap-2'>
        <div className='col-span-2 flex gap-3  items-center'>
          <Avatar className='w-16 h-16 border '>
            <AvatarImage
              src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${address}&scale=75&shapeColor=c4b5fd&backgroundColor=transparent&mouthColor=000000&eyesColor=000000`}
            />

            <AvatarFallback>test</AvatarFallback>
          </Avatar>
          <div className=' flex flex-col  gap-1 text-neutral-300'>
            <h4>
              {walletConfig?.meta.name}
              {walletInstance?.connector.id === "local_walle" && "Guest"}
            </h4>
            <p className='text-sm'>
              {address?.slice(0, 5)}...{address?.slice(-5)}
            </p>
          </div>
        </div>
        <div className=' '>
          <WalletInfo />
          {data && (
            <>
              <div className='flex gap-1 items-center'>
                <Image
                  width={15}
                  height={10}
                  alt='chain logo'
                  src='/base-100.png'
                />
                <h4 className='text-neutral-400 font-semibold'>
                  {data.displayValue} {data.symbol}{" "}
                </h4>
              </div>
              <p className='text-sm text-neutral-300'>Wallet Balance</p>{" "}
            </>
          )}
        </div>
      </div>
      <div className='bg-zinc-900 h-[1px]  w-screen' />
      <div className='w-full grid grid-cols-2 gap-2 mb-5'>
        <DepositInfo />
        <div className='flex flex-col items-center justify-center'>
          <div className='rounded-full bg-violet-300 m-2 p-4 '>
            <Send className='text-black' />
          </div>
          <p className='text-sm text-neutral-300'>Withdraw</p>
        </div>
      </div>
      <div className='bg-zinc-900 h-[1px] w-screen' />
      <div className='flex flex-col gap-5 '>
        <ExportWalletInfo />

        <Button
          className='bg-violet-300 rounded-full px-10'
          onClick={disconnect}
        >
          Log out
        </Button>
      </div>
    </main>
  );
}
