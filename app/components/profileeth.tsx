import { useAccount, useEnsName } from "wagmi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const EthProfile = () => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  return (
    <div className='col-span-2 flex gap-3  items-center'>
      <Avatar className='w-16 h-16 border '>
        <AvatarImage className='p-3' src={`/ethsvg.svg`} />

        <AvatarFallback>eth</AvatarFallback>
      </Avatar>
      <div className=' flex flex-col  gap-1 text-neutral-300'>
        <h4>{address ? `From Connected Wallet` : `From Ethereum Mainnet`} </h4>
        <p className='text-sm'>
          {address ? (
            <>
              {ensName
                ? `${ensName} (${address?.slice(0, 5)}...${address?.slice(-5)})`
                : `${address?.slice(0, 5)}...${address?.slice(-5)}`}
            </>
          ) : (
            `Connect Wallet`
          )}
        </p>
      </div>
    </div>
  );
};
