import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { Button } from "../components/ui/button";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });

  return (
    <div className='w-full flex flex-col gap-2'>
      <Button className='rounded-full bg-violet-300'>Deposit</Button>
      <Button
        className='rounded-full bg-neutral-400'
        onClick={() => disconnect()}
      >
        Disconnect Connected Wallet
      </Button>
    </div>
  );
}
