"use client";

import { Zap } from "lucide-react";
import Link from "next/link";
import InstallPWA from "./components/installpwa";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col max-w-lg mx-auto  px-4 pt-16'>
      <Link
        href={"/"}
        className='flex gap-1 items-center text-transparent  bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-500'
      >
        <Zap className='w-5 h-5 rotate-12 text-indigo-300' />
        <p className='text-xl font-extralight'>DApp</p>
        <p className='text-xl font-semibold'>BOLT</p>
      </Link>

      <div>
        <div className='text-2xl font-medium flex items-center gap-1'>
          Welcome
        </div>
      </div>
    </main>
  );
}
