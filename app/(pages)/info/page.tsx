"use client";

import { Zap } from "lucide-react";
import Link from "next/link";

export default function InfoPage() {
  return (
    <main className='flex min-h-screen flex-col max-w-lg mx-auto  px-4 pt-5'>
      <div className='flex items-center justify-between border-b py-3'>
        <div className='flex gap-1 items-center text-primary'>
          <Zap className='w-5 h-5 rotate-12 text-primary' />
          <p className='text-xl font-extralight'>Info</p>
        </div>
      </div>

      <div className='flex flex-col  gap-1 mt-5 text-muted-foreground'>
        <p>
          dustminer is a boiler-plate for building a PWA on BASE using the
          Thirdweb react SDK and Wagmi.
          <br />
          <br />
          Feel free to fork this repo and build your own PWA:
        </p>
        <Link
          className='underline underline-offset-1'
          href='https://github.com/elonsdev/dustminer'
        >
          GITHUB
        </Link>

        <h4 className='text-foreground mt-5 text-xl'>F.A.Q.</h4>
        <p className='text-muted-foreground mt-2 font-bold text-lg'>
          How long does a deposit take?
        </p>
        <p className='text-muted-foreground'>
          Deposits into dustminer take between 1 - 3 minutes. If you have not
          yet received your deposit after this time, please contact us and we
          will check the bridge contract.
        </p>
      </div>
    </main>
  );
}
