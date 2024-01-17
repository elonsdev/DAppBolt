import { Check } from "lucide-react";

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

import { useWallet } from "@thirdweb-dev/react";
import { useState } from "react";

export function ExportWalletInfo() {
  const walletInstance = useWallet() as any;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(walletInstance.ethersWallet.privateKey)
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
        <Button className='bg-red-300 hover:bg-red-200 rounded-full px-10 w-full'>
          Export Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className='rounded-3xl'>
        <DialogHeader>
          <DialogTitle>Transfer Wallet</DialogTitle>
          <DialogDescription>
            You can take your account with you to another site using an external
            wallet.
          </DialogDescription>
        </DialogHeader>

        <div className=''>
          <p className='mt-4 text-foreground'>Step 1.</p>
          <div className='flex justify-between text-muted-foreground text-sm'>
            <p>
              Follow our guide to transfer your account to your wallet of
              choice.
            </p>
          </div>
          <p className='mt-4 text-foreground'>Step 2.</p>
          <div className='flex justify-between text-muted-foreground text-sm'>
            <p>Copy your private key into your other wallet.</p>
          </div>

          <Button
            onClick={handleCopy}
            className='w-full mt-5 text-muted-foreground rounded-full'
            variant={"outline"}
          >
            {copied ? (
              <span className='ml-2 text-green-400 flex gap-2 items-center'>
                Copied <Check className='w-4 h-4' />
              </span>
            ) : (
              <span>Copy Private Key</span>
            )}
          </Button>
        </div>

        <DialogFooter>
          <div>
            <p className='text-red-400'>WARNING</p>
            <p className='text-muted-foreground'>
              Never share your private key with anyone! It controls your entire
              account.
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
