"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
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

import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Info, Send, Upload } from "lucide-react";
import { WalletInfo } from "../../components/walletinfo";
import { Label } from "../../components/ui/label";
import Image from "next/image";
import { DepositInfo } from "../../components/depositinfo";
import { ExportWalletInfo } from "../../components/exportwalletinfo";
import { WithdrawInfo } from "../../components/withdrawinfo";
import { Profile } from "../../components/profile";

export default function Wallet() {
  const disconnect = useDisconnect();

  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);

  console.log(data);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between md:justify-normal md:gap-10 pb-20 px-4 pt-20 max-w-lg mx-auto'>
      <div className='w-full grid grid-cols-3 gap-2'>
        <Profile />
        <div className=' '>
          <WalletInfo />
          {data && (
            <>
              <div className='flex gap-1 items-center justify-end'>
                <Image
                  width={15}
                  height={10}
                  alt='chain logo'
                  src='/base-100.png'
                />
                <h4 className='text-neutral-300 text-sm font-semibold'>
                  {Number(data.displayValue).toFixed(4)}
                </h4>
              </div>
              <p className='text-sm text-neutral-400 text-right'>
                Wallet Balance
              </p>{" "}
            </>
          )}
        </div>
      </div>
      <div className='bg-zinc-900 h-[1px]  w-full' />
      <div className='w-full grid grid-cols-2  mb-5'>
        <DepositInfo />
        <WithdrawInfo />
      </div>
      <div className='bg-zinc-900 h-[1px] w-full' />
      <div className='grid grid-cols-1 md:grid-cols-2  gap-5 md:gap-5 w-full'>
        <ExportWalletInfo />

        <Button
          className='bg-violet-300 hover:bg-violet-200 rounded-full px-10 w-full'
          onClick={disconnect}
        >
          Log out
        </Button>
      </div>
    </main>
  );
}
