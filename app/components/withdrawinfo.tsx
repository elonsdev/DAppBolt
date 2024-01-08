import { Send } from "lucide-react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { NATIVE_TOKEN_ADDRESS, useBalance } from "@thirdweb-dev/react";

import { Input } from "./ui/input";

export function WithdrawInfo() {
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex flex-col items-center justify-center'>
          <div className='rounded-full bg-violet-300 m-2 p-4 '>
            <Send className='text-black' />
          </div>
          <p className='text-sm text-neutral-300'>Withdraw</p>
        </div>
      </DialogTrigger>
      <DialogContent className='rounded-3xl'>
        <DialogHeader>
          <DialogTitle>Withdraw ETH</DialogTitle>
          <DialogDescription>
            Transfer ETH from your DappBolt wallet to another wallet on Base.
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-2'>
          <Input
            className='rounded-full'
            type='email'
            placeholder='Enter Address'
          />
          <Input className='rounded-full' type='number' placeholder='Amount' />
          <p className='text-sm text-neutral-300 my-2 ml-3'>
            Your Balance:{" "}
            {!isLoading && `${data?.displayValue} ${data?.symbol}`}
          </p>
          <Button className='mb-5 w-full rounded-full'>Transfer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
