"use client";

import Link from "next/link";
import { Home, Info, MessagesSquare, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import { ConnectWallet } from "@thirdweb-dev/react";

export const Footer = () => {
  const pathname = usePathname();
  const isCurrentPage = (path: string) => pathname === path;

  return (
    <>
      <div className='fixed left-10 top-20  grid-cols-1 gap-5 hidden md:grid'>
        <Link href='./' className='flex py-3 gap-2  items-center'>
          <Home
            className={`w-4 h-4 ${
              isCurrentPage("/") ? "text-indigo-300" : "text-neutral-300"
            }`}
          />
          <p
            className={` text-sm font-semibold ${
              isCurrentPage("/") ? "text-indigo-300" : "text-neutral-300"
            }`}
          >
            Dashboard
          </p>
        </Link>
        <Link href='./chat' className='flex  py-3 gap-2  items-center'>
          <MessagesSquare
            className={`w-4 h-4 ${
              isCurrentPage("/chat") ? "text-indigo-300" : "text-neutral-300"
            }`}
          />
          <p
            className={` text-sm font-semibold ${
              isCurrentPage("/chat") ? "text-indigo-300" : "text-neutral-300"
            }`}
          >
            Chat
          </p>
        </Link>
        <Link href='./info' className='flex  py-3 gap-2  items-center'>
          <Info
            className={`w-4 h-4 ${
              isCurrentPage("/about") ? "text-indigo-300" : "text-neutral-300"
            }`}
          />
          <p
            className={` text-sm font-semibold ${
              isCurrentPage("/about") ? "text-indigo-300" : "text-neutral-300"
            }`}
          >
            About
          </p>
        </Link>
        <Link href='./wallet' className='flex  py-3 gap-2  items-center'>
          <Wallet
            className={`w-4 h-4 ${
              isCurrentPage("/wallet") ? "text-indigo-300" : "text-neutral-300"
            }`}
          />
          <p
            className={` text-sm font-semibold ${
              isCurrentPage("/wallet") ? "text-indigo-300" : "text-neutral-300"
            }`}
          >
            Wallet
          </p>
        </Link>
      </div>
      <div className='fixed bottom-0 left-0 grid grid-cols-4  w-full items-end justify-center bg-black md:hidden'>
        <Link
          href='./'
          className='flex justify-center py-3 border-zinc-900 border items-center'
        >
          <Home
            className={`w-6 h-6 ${isCurrentPage("/") && "text-indigo-300"}`}
          />
        </Link>
        <Link
          href='./chat'
          className='flex justify-center py-3 border-zinc-900 border items-center'
        >
          <MessagesSquare
            className={`w-6 h-6 ${isCurrentPage("/chat") && "text-indigo-300"}`}
          />
        </Link>
        <Link
          href='./about'
          className='flex justify-center py-3 border-zinc-900 border items-center'
        >
          <Info
            className={`w-6 h-6 ${
              isCurrentPage("/about") && "text-indigo-300"
            }`}
          />
        </Link>

        <Link
          href='./wallet'
          className='flex justify-center py-3 border-zinc-900 border items-center'
        >
          <Wallet
            className={`w-6 h-6 ${
              isCurrentPage("/wallet") && "text-indigo-300"
            }`}
          />
        </Link>
      </div>
    </>
  );
};
