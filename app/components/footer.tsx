"use client";

import Link from "next/link";
import { Heart, Home, Info, MessagesSquare, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Profile } from "./profile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Footer = () => {
  const pathname = usePathname();
  const isCurrentPage = (path: string) => pathname === path;
  const address = useAddress();

  return (
    <>
      <div className='fixed left-5 top-5  grid-cols-1 gap-5 hidden md:grid'>
        <div>
          <Avatar className='w-16 h-16 border '>
            <AvatarImage
              src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${address}&scale=75&shapeColor=c4b5fd&backgroundColor=transparent&mouthColor=000000&eyesColor=000000`}
            />

            <AvatarFallback>test</AvatarFallback>
          </Avatar>
        </div>
        <Link href='./' className='flex gap-2  items-center'>
          <Home
            className={`w-6 h-6 ${
              isCurrentPage("/") ? "text-indigo-300" : "text-neutral-300"
            }`}
          />
          <p
            className={` text-lg font-medium ${
              isCurrentPage("/") ? "text-indigo-300" : "text-neutral-300"
            }`}
          >
            Dashboard
          </p>
        </Link>
        <Link href='./chat' className='flex  gap-2  items-center'>
          <MessagesSquare
            className={`w-6 h-6 ${
              isCurrentPage("/chat") ? "text-indigo-300" : "text-neutral-300"
            }`}
          />
          <p
            className={` text-lg font-semibold ${
              isCurrentPage("/chat") ? "text-indigo-300" : "text-neutral-300"
            }`}
          >
            Chat
          </p>
        </Link>
        <Link href='./info' className='flex  gap-2  items-center'>
          <Info
            className={`w-6 h-6 ${
              isCurrentPage("/about") ? "text-indigo-300" : "text-neutral-300"
            }`}
          />
          <p
            className={` text-lg font-semibold ${
              isCurrentPage("/about") ? "text-indigo-300" : "text-neutral-300"
            }`}
          >
            About
          </p>
        </Link>
        <Link href='./wallet' className='flex  gap-2  items-center'>
          <Wallet
            className={`w-6 h-6 ${
              isCurrentPage("/wallet") ? "text-indigo-300" : "text-neutral-300"
            }`}
          />
          <p
            className={` text-lg font-semibold ${
              isCurrentPage("/wallet") ? "text-indigo-300" : "text-neutral-300"
            }`}
          >
            Wallet
          </p>
        </Link>
      </div>
      <Link
        href='https://elons.dev'
        className='text-neutral-600 
        absolute bottom-5 left-5 hidden md:block'
      >
        built by @elonsdev
      </Link>
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
