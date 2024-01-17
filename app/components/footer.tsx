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
              isCurrentPage("/") ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <p
            className={` text-lg font-medium ${
              isCurrentPage("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Dashboard
          </p>
        </Link>

        <Link href='./info' className='flex  gap-2  items-center'>
          <Info
            className={`w-6 h-6 ${
              isCurrentPage("/info") ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <p
            className={` text-lg font-semibold ${
              isCurrentPage("/info") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Info
          </p>
        </Link>
        <Link href='./wallet' className='flex  gap-2  items-center'>
          <Wallet
            className={`w-6 h-6 ${
              isCurrentPage("/wallet")
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          />
          <p
            className={` text-lg font-semibold ${
              isCurrentPage("/wallet")
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Wallet
          </p>
        </Link>
      </div>
      <Link
        href='https://x.com/elonsdev'
        className='text-muted
        absolute bottom-5 left-5 hidden md:block'
      >
        built by @elonsdev
      </Link>
      <div className='fixed bottom-0 left-0 grid grid-cols-3  w-full items-end justify-center bg-black md:hidden'>
        <Link
          href='./'
          className='flex justify-center pt-4 pb-7  border-border border items-center'
        >
          <Home className={`w-6 h-6 ${isCurrentPage("/") && "text-primary"}`} />
        </Link>

        <Link
          href='./info'
          className='flex justify-center pt-4 pb-7 border-border border items-center'
        >
          <Info
            className={`w-6 h-6 ${isCurrentPage("/info") && "text-primary"}`}
          />
        </Link>

        <Link
          href='./wallet'
          className='flex justify-center pt-4 pb-7 border-border border items-center'
        >
          <Wallet
            className={`w-6 h-6 ${isCurrentPage("/wallet") && "text-primary"}`}
          />
        </Link>
      </div>
    </>
  );
};
