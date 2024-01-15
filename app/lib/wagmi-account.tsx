import {
  useAccount,
  useBalance,
  useDisconnect,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import abi from "./abi.json";
import { Button } from "../components/ui/button";

export function Account({ depositAmount }: any) {
  const { data: hash, isPending, writeContract } = useWriteContract();

  console.log(depositAmount.depositAmount);

  const depositer = async () => {
    console.log("deposit");
    writeContract({
      address: "0xfd0Bf71F60660E2f608ed56e1659C450eB113120",
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
      args: ["0xb249E162ed44061b195Ed72C3353563A5101d1a1", 0, ""],
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
