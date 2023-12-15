"use client";

import Link from "next/link";
import { Home, Info, MessagesSquare, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import { ConnectWallet } from "@thirdweb-dev/react";

export const Footer = () => {
  const pathname = usePathname();
  const isCurrentPage = (path: string) => pathname === path;

  return (
    <div className='fixed bottom-0 left-0 grid grid-cols-4  w-full items-end justify-center bg-black'>
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
          className={`w-6 h-6 ${isCurrentPage("/about") && "text-indigo-300"}`}
        />
      </Link>

      <div className='flex justify-center py-3 border-zinc-900 border items-center'>
        <ConnectWallet
          detailsBtn={() => {
            return (
              <Wallet
                className={`w-6 h-6 ${
                  isCurrentPage("/wallet") && "text-indigo-300"
                }`}
              />
            );
          }}
        />
      </div>
    </div>
  );
};
