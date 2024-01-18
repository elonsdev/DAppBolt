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

import {
  NATIVE_TOKEN_ADDRESS,
  useBalance,
  useTransferNativeToken,
} from "@thirdweb-dev/react";

import { Input } from "./ui/input";
import { useState } from "react";

export function WithdrawInfo() {
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);

  const {
    mutateAsync: transferNativeToken,
    isLoading: isLoadingTransfer,
    error,
  } = useTransferNativeToken();

  const [transferAmount, setTransferAmount] = useState<any>(0);
  const [withdrawalAddress, setWithdrawalAddress] = useState<any>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex flex-col items-center justify-center cursor-pointer'>
          <div className='rounded-full bg-primary hover:bg-primary-hover m-2 p-4 '>
            <Send className='text-black' />
          </div>
          <p className='font-medium text-foreground'>Withdraw</p>
        </div>
      </DialogTrigger>
      <DialogContent className='rounded-3xl'>
        <DialogHeader>
          <DialogTitle>Withdraw ETH</DialogTitle>
          <DialogDescription>
            Withdraw ETH from your dustminer wallet to another wallet on Base.
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-2'>
          <Input
            onChange={(value) => {
              setWithdrawalAddress(value.target.value);
            }}
            className='rounded-full'
            type='text'
            placeholder='Enter Address'
          />
          <Input
            type='number'
            onChange={(value) => {
              setTransferAmount(value.target.value);
            }}
            className='rounded-full'
            placeholder='0'
          />
          <p className='text-sm text-muted-foreground my-2 ml-3'>
            Your Balance:{" "}
            {!isLoading && `${data?.displayValue} ${data?.symbol}`}
          </p>
          <Button
            disabled={isLoadingTransfer}
            onClick={() =>
              transferNativeToken({
                to: withdrawalAddress,
                amount: transferAmount,
              })
            }
            className='mb-5 w-full rounded-full '
          >
            {isLoadingTransfer ? "Withdrawing..." : "Withdraw"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
