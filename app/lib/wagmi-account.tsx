import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
  useChainId,
} from "wagmi";

import { Button } from "../components/ui/button";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect } from "react";

export function Account({ depositAmount }: any) {
  const address = useAddress();
  const { data: hash, isPending, writeContract } = useWriteContract();

  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();

  useEffect(() => {
    if (chainId !== 1) {
      switchChain({ chainId: 1 });
    }
  }, []);

  const depositer = async () => {
    console.log("deposit");
    writeContract({
      address: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
      abi: [
        {
          inputs: [
            { internalType: "address", name: "_to", type: "address" },
            { internalType: "uint32", name: "_minGasLimit", type: "uint32" },
            { internalType: "bytes", name: "_extraData", type: "bytes" },
          ],
          name: "depositETHTo",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      functionName: "depositETHTo",
      value: BigInt(depositAmount.depositAmount * 1000000000000000000),
      args: [address, 0, ""],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <div className='w-full flex flex-col gap-2'>
      <Button
        onClick={depositer}
        disabled={isPending}
        className='rounded-full bg-violet-300 hover:bg-violet-200'
      >
        {isPending ? "Confirming..." : "Deposit"}
      </Button>

      {isConfirming && (
        <div className='text-neutral-400 text-sm text-center'>
          Waiting for confirmation...
        </div>
      )}
      {isConfirmed && (
        <div className='text-neutral-400 text-sm'>
          Transaction confirmed. Your ETH will be deposited in a few minutes.
          You may close this window while waiting for your deposit.
        </div>
      )}
    </div>
  );
}
