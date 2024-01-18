"use client";

import { Zap } from "lucide-react";

import { NATIVE_TOKEN_ADDRESS, useBalance } from "@thirdweb-dev/react";
import Image from "next/image";
import { WalletInfo } from "../components/walletinfo";

export default function Home() {
  const { data } = useBalance(NATIVE_TOKEN_ADDRESS);

  return (
    <main className='flex min-h-screen flex-col max-w-lg mx-auto  px-4 pt-5'>
      <div className='flex items-center justify-between border-b py-3'>
        <div className='flex gap-1 items-center text-primary'>
          <Zap className='w-5 h-5 rotate-12 text-primary' />
          <p className='text-xl font-extralight'>DApp</p>
          <p className='text-xl font-semibold'>BOLT</p>
        </div>
        {data && (
          <div className='flex items-center gap-2'>
            <div className='flex gap-1 items-center justify-end'>
              <Image
                width={15}
                height={10}
                alt='chain logo'
                src='/base-100.png'
              />
              <h4 className='text-foreground text-sm font-semibold'>
                {Number(data.displayValue).toFixed(4)}
              </h4>
            </div>

            <WalletInfo />
          </div>
        )}
      </div>

      <div className='flex flex-col  gap-1 mt-5 text-muted-foreground'>
        <p>
          Welcome to dustminer, a boiler-plate for building a PWA on BASE.
          <br />
          <br />
          This is a good place to start building your DApp.
        </p>
        <h2 className='mt-5'>FEATURES:</h2>
        <ul className='flex flex-col gap-1'>
          <li>- Simple Signup with Google/Apple/Guest</li>
          <li>- Embedded Wallets (Powered by Thirdweb)</li>
          <li>
            - Easily Deposit ETH from connected wallets / Base wallets / Credit
            cards
          </li>
          <li>- Withdraw to another BASE wallet</li>
          <li>- Export Private key</li>
          <li>- Demo blockchain action</li>
          <li>- Demo Pages</li>
          <li>- Privacy Policy</li>
        </ul>
      </div>
    </main>
  );
}
