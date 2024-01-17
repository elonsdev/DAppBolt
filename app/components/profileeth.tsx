import { useAccount, useDisconnect, useEnsName } from "wagmi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export const EthProfile = () => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  return (
    <div className=' flex gap-3  items-center w-full'>
      <Avatar className='w-16 h-16 border '>
        <AvatarImage className='p-3' src={`/ethsvg.svg`} />

        <AvatarFallback>eth</AvatarFallback>
      </Avatar>
      <div className='w-full flex justify-between items-center'>
        <div className=' flex flex-col  gap-1 text-muted-foreground'>
          <h4>
            {address ? `From Connected Wallet` : `From Ethereum Mainnet`}{" "}
          </h4>
          <p className='text-sm'>
            {address ? (
              <>
                {ensName
                  ? `${ensName} (${address?.slice(0, 5)}...${address?.slice(
                      -5
                    )})`
                  : `${address?.slice(0, 5)}...${address?.slice(-5)}`}
              </>
            ) : (
              `Connect Wallet`
            )}
          </p>
        </div>
        {address && (
          <Button
            variant={"secondary"}
            className='rounded-full '
            onClick={() => disconnect()}
          >
            Disconnect
          </Button>
        )}
      </div>
    </div>
  );
};
