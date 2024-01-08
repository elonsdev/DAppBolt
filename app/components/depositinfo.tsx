import { Check, Info, Upload } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAddress, useChain, useSwitchChain } from "@thirdweb-dev/react";
import { useState } from "react";

export function DepositInfo() {
  const chain = useChain();
  const switchChain = useSwitchChain();
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
          <DialogTitle>Deposit ETH</DialogTitle>
          <DialogDescription>
            Deposit ETH into your DappBolt account.
          </DialogDescription>
        </DialogHeader>

        <div className='w-full'>
          <Button className='w-full rounded-full'>From an ETH Wallet</Button>
          <p className='text-xs text-neutral-500 mt-1'>
            Visit https://dappbolt.io/wallet and login on any device that has an
            external wallet installed.
          </p>
        </div>
        <div className='w-full'>
          <Button onClick={handleCopy} className='w-full rounded-full'>
            {copied ? (
              <span className='ml-2 text-green-900 flex gap-2 items-center'>
                Copied {address?.slice(0, 5)}...{address?.slice(-5)}
                <Check className='w-4 h-4' />
              </span>
            ) : (
              <span>From a BASE Wallet</span>
            )}
          </Button>
          <p className='text-xs text-neutral-500 mt-1'>
            Transfer ETH on the Base Network to fund your DappBolt wallet.
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
