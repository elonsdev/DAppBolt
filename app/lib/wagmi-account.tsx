import {
  useAccount,
  useBalance,
  useDisconnect,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import abi from "./abi.json";
import { Button } from "../components/ui/button";

export function Account() {
  const { disconnect } = useDisconnect();

  const { data: hash, isPending, writeContract } = useWriteContract();

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
      value: BigInt(100000000000000000),
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
        className='rounded-full bg-violet-300'
      >
        {isPending ? "Confirming..." : "Deposit"}
      </Button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      <Button
        className='rounded-full bg-neutral-400'
        onClick={() => disconnect()}
      >
        Disconnect Connected Wallet
      </Button>
    </div>
  );
}
