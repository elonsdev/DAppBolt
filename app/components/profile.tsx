import { useAddress, useWallet, useWalletConfig } from "@thirdweb-dev/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Profile = () => {
  const address = useAddress();
  const walletInstance = useWallet() as any;
  const walletConfig = useWalletConfig();

  return (
    <div className='col-span-2 flex gap-3  items-center'>
      <Avatar className='w-16 h-16 border '>
        <AvatarImage
          src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${address}&scale=75&shapeColor=c4b5fd&backgroundColor=transparent&mouthColor=000000&eyesColor=000000`}
        />

        <AvatarFallback>test</AvatarFallback>
      </Avatar>
      <div className=' flex flex-col  gap-1 text-neutral-300'>
        <h4>
          {walletConfig?.meta.name}
          {walletInstance?.connector.id === "local_walle" && "Guest"}
        </h4>
        <p className='text-sm'>
          {address?.slice(0, 5)}...{address?.slice(-5)}
        </p>
      </div>
    </div>
  );
};
