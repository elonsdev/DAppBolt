import { Check, Info, Upload } from "lucide-react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { useAddress } from "@thirdweb-dev/react";
import { useState } from "react";

import { Account } from "../lib/wagmi-account";
import { WalletOptions } from "../lib/wallet-options";
import { useAccount, useEnsName } from "wagmi";
import { Profile } from "./profile";
import { EthProfile } from "./profileeth";
import { Input } from "./ui/input";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export function DepositInfo() {
  const address = useAddress();

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(address!)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Remove "Copied!" message after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy address:", err);
        // Handle copy failure, e.g., display an error message
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex flex-col items-center justify-center'>
          <div className='rounded-full bg-violet-300 m-2 p-4 '>
            <Upload className='text-black' />
          </div>
          <p className='text-sm text-neutral-300'>Deposit</p>
        </div>
      </DialogTrigger>
      <DialogContent className='rounded-3xl'>
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription>
            Deposit ETH into your DappBolt account.
          </DialogDescription>
        </DialogHeader>

        <div className='w-full'>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='w-full rounded-full bg-violet-300'>
                From ETH Blockchain
              </Button>
            </DialogTrigger>
            <DialogContent className='rounded-3xl'>
              <DialogHeader>
                <DialogTitle>Deposit ETH</DialogTitle>
                <DialogDescription>
                  Deposit ETH from Ethereum into your DAppBolt account.
                </DialogDescription>
              </DialogHeader>

              <div className='w-full flex flex-col gap-3'>
                <Profile />

                <EthProfile />

                <div className='flex flex-col gap-1'>
                  <Input className='rounded-full' placeholder='Amount' />
                  <p className='self-end text-sm text-neutral-500'>
                    Balance: 0 ETH
                  </p>
                </div>
              </div>

              <div className='w-full flex flex-col gap-2'>
                <ConnectWallet />
                <p className='text-center text-sm text-neutral-400'>
                  DAppBolt balance: 0 ETH
                </p>
              </div>
            </DialogContent>
          </Dialog>
          <p className='text-xs text-neutral-500 mt-1'>
            Visit https://dappbolt.io/wallet and login on any device that has an
            external wallet installed.
          </p>
        </div>
        <div className='w-full'>
          <Button
            onClick={handleCopy}
            className='w-full rounded-full bg-violet-300'
          >
            {copied ? (
              <span className='ml-2 text-green-900 flex gap-2 items-center'>
                Copied {address?.slice(0, 5)}...{address?.slice(-5)}
                <Check className='w-4 h-4' />
              </span>
            ) : (
              <span>From BASE Blockchain</span>
            )}
          </Button>
          <p className='text-xs text-neutral-500 mt-1'>
            Transfer ETH on the BASE Network to fund your DappBolt wallet
            address.
          </p>
        </div>
        <Button disabled className='rounded-full'>
          From Card**
        </Button>
        <div>
          <p className='text-xs text-neutral-500'>
            ** We are currently working on credit card integration
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
