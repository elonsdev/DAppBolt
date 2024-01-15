"use client";

import { Zap } from "lucide-react";
import Link from "next/link";

export default function InfoPage() {
  return (
    <main className='flex min-h-screen flex-col max-w-lg mx-auto  px-4 pt-5'>
      <div className='flex items-center justify-between border-b py-3'>
        <div className='flex gap-1 items-center text-transparent  bg-clip-text bg-gradient-to-r from-violet-200 to-violet-400'>
          <Zap className='w-5 h-5 rotate-12 text-violet-300' />
          <p className='text-xl font-extralight'>Info</p>
        </div>
      </div>

      <div className='flex flex-col  gap-1 mt-5 text-neutral-400'>
        <p>
          DappBolt is a boiler-plate for building a PWA on BASE using the
          Thirdweb react SDK and Wagmi.
          <br />
          <br />
          Feel free to fork this repo and build your own PWA:
        </p>
        <Link href='https://github.com/elonsdev/DAppBolt'>GITHUB</Link>
      </div>
    </main>
  );
}
