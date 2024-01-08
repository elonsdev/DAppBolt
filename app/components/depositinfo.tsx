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
          <DialogTitle>{chain?.name} Chain</DialogTitle>
          <DialogDescription>You are on {chain?.name} Chain.</DialogDescription>
        </DialogHeader>

        {chain?.testnet ? (
          <div className=''>
            <p className='text-sm text-neutral-400 text-center'>
              The {chain?.name} is a place to play around without any real
              funds. You can get ETH testnet coins for free and test our
              features before putting in any real money.
              <br />
            </p>
            <p className='mt-4 text-neutral-300'>Step 1.</p>
            <div className='flex justify-between text-neutral-400'>
              <p>Tap your address:</p>
              <p onClick={handleCopy}>
                {copied ? (
                  <span className='ml-2 text-green-400 flex gap-2 items-center'>
                    Copied <Check className='w-4 h-4' />
                  </span>
                ) : (
                  <span>
                    {address?.slice(0, 5)}...{address?.slice(-5)}
                  </span>
                )}
              </p>
            </div>
            <p className='mt-4 text-neutral-300'>Step 2.</p>
            <Button
              className='w-full mt-1 text-neutral-400 rounded-full'
              variant={"outline"}
            >
              GET TESTNET ETH
            </Button>
          </div>
        ) : (
          <div className=''>
            <p className='text-sm text-neutral-400 text-center'>
              The {chain?.name} chain is a Layer 2 blockchain built ontop of
              Ethereum and run by Coinbase.
              <br />
            </p>
          </div>
        )}
        <div className=''></div>
        <DialogFooter>
          <Button
            className='rounded-full'
            onClick={() => switchChain(chain?.testnet ? 8453 : 84531)}
          >
            {chain?.testnet ? "Switch to BASE Mainnet" : "Switch to Testnet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
