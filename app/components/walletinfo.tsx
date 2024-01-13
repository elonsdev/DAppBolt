import { Info } from "lucide-react";
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

import { useChain, useSwitchChain } from "@thirdweb-dev/react";

export function WalletInfo() {
  const chain = useChain();
  const switchChain = useSwitchChain();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge className='flex items-center gap-1 justify-center bg-violet-300 mb-1'>
          {chain?.testnet ? "TESTNET" : "BASE"} <Info className='w-4 h-4' />
        </Badge>
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
            {/*  <p className='mt-4 text-neutral-300'>Step 1.</p>
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
            </Button> */}
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
