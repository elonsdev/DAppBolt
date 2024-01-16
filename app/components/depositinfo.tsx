import { Check, Info, Upload } from "lucide-react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import {
  NATIVE_TOKEN_ADDRESS,
  useAddress,
  useBalance,
  useChain,
  useSwitchChain,
} from "@thirdweb-dev/react";
import { useState } from "react";

import { Account } from "../lib/wagmi-account";
import { WalletOptions } from "../lib/wallet-options";
import {
  useAccount,
  useBalance as useConnectedBalance,
  useEnsName,
} from "wagmi";

import { Profile } from "./profile";
import { EthProfile } from "./profileeth";
import { Input } from "./ui/input";
import { config } from "../lib/config";
import Link from "next/link";

function ConnectWallet(depositAmount: any) {
  const { isConnected } = useAccount();
  if (isConnected) return <Account depositAmount={depositAmount} />;
  return <WalletOptions />;
}

export function DepositInfo() {
  const address = useAddress();

  const chain = useChain();
  const switchChain = useSwitchChain();

  const [copied, setCopied] = useState(false);

  const { address: connectedAddress } = useAccount();
  const { data: connectedBalance } = useConnectedBalance({
    address: connectedAddress,
  });

  const { data: balance, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(address!)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Remove "Copied!" message after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy address:", err);
        // Handle copy failure, e.g., display an error message
      });
  };

  const [depositAmount, setDepositAmount] = useState<any>(0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex flex-col items-center justify-center cursor-pointer'>
          <div className='rounded-full bg-violet-300 hover:bg-violet-200 m-2 p-4 '>
            <Upload className='text-black' />
          </div>
          <p className='font-medium text-neutral-300'>Deposit</p>
        </div>
      </DialogTrigger>
      <DialogContent className='rounded-3xl'>
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription>
            Deposit {chain?.testnet ? `Testnet Sepolia ETH` : `ETH`} into your
            DappBolt account.
          </DialogDescription>
        </DialogHeader>

        {chain?.testnet ? (
          <div className=''>
            <p className='text-sm text-neutral-400 text-center'>
              The {chain?.name} is a place to play around without any real
              funds. You can get ETH testnet coins for free and test our
              features before putting in any real money.
              <br />
            </p>
            <p className='mt-4 text-neutral-300'>Step 1.</p>
            <div className='flex justify-between text-neutral-400 cursor-pointer'>
              <p>Tap your address:</p>
              <p onClick={handleCopy}>
                {copied ? (
                  <span className='ml-2 text-green-400 flex gap-2 items-center'>
                    Copied <Check className='w-4 h-4' />
                  </span>
                ) : (
                  <span>
                    {address?.slice(0, 5)}...{address?.slice(-5)}
                  </span>
                )}
              </p>
            </div>
            <p className='mt-4 text-neutral-300'>Step 2.</p>
            <Link target='_blank' href='https://basefaucet.com/'>
              <Button
                className='w-full mt-1 text-neutral-400 rounded-full'
                variant={"outline"}
              >
                Get BASE Testnet Sepolia ETH
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className='w-full'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='w-full rounded-full bg-violet-300 hover:bg-violet-200'>
                    From ETH Blockchain
                  </Button>
                </DialogTrigger>
                <DialogContent className='rounded-3xl'>
                  <DialogHeader>
                    <DialogTitle>Deposit ETH</DialogTitle>
                    <DialogDescription>
                      Deposit ETH from Ethereum into your DAppBolt account.
                    </DialogDescription>
                  </DialogHeader>

                  <div className='w-full flex flex-col gap-3'>
                    <Profile />

                    <EthProfile />

                    <div className='flex flex-col gap-1'>
                      <Input
                        type='number'
                        onChange={(value) => {
                          setDepositAmount(value.target.value);
                        }}
                        className='rounded-full'
                        placeholder='0'
                      />

                      <p className='self-end text-sm text-neutral-500'>
                        Balance:{" "}
                        {connectedBalance
                          ? `${connectedBalance.formatted}`
                          : `0`}{" "}
                        ETH
                      </p>
                    </div>
                  </div>

                  <div className='w-full flex flex-col gap-2'>
                    <ConnectWallet depositAmount={depositAmount} />
                    <p className='text-center text-sm text-neutral-400'>
                      DAppBolt balance: {balance?.displayValue} ETH
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              <p className='text-xs text-neutral-500 mt-1'>
                Visit https://dappbolt.io/wallet and login on any device that
                has an external wallet installed.
              </p>
            </div>
            <div className='w-full'>
              <Button
                onClick={handleCopy}
                className='w-full rounded-full bg-violet-300 hover:bg-violet-200'
              >
                {copied ? (
                  <span className='ml-2 text-green-900 flex gap-2 items-center'>
                    Copied {address?.slice(0, 5)}...{address?.slice(-5)}
                    <Check className='w-4 h-4' />
                  </span>
                ) : (
                  <span>From BASE Blockchain</span>
                )}
              </Button>
              <p className='text-xs text-neutral-500 mt-1'>
                Transfer ETH on the BASE Network to fund your DappBolt wallet
                address.
              </p>
            </div>
            <Button disabled className='rounded-full'>
              From Card**
            </Button>
            <div>
              <p className='text-xs text-neutral-500'>
                ** We are currently working on credit card integration
              </p>
            </div>
          </>
        )}

        <DialogFooter>
          <Button
            className='rounded-full w-full bg-neutral-300 hover:bg-neutral-200'
            onClick={() => switchChain(chain?.testnet ? 8453 : 84532)}
          >
            {chain?.testnet ? "Switch to BASE Mainnet" : "Switch to Testnet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
