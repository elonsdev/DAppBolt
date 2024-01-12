import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const EthProfile = () => {
  return (
    <div className='col-span-2 flex gap-3  items-center'>
      <Avatar className='w-16 h-16 border '>
        <AvatarImage className='p-3' src={`/ethsvg.svg`} />

        <AvatarFallback>eth</AvatarFallback>
      </Avatar>
      <div className=' flex flex-col  gap-1 text-neutral-300'>
        <h4>From Ethereum Mainnet</h4>
        <p className='text-sm'>Connect Wallet</p>
      </div>
    </div>
  );
};
