import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });

  return (
    <div>
      {address && (
        <div>
          {ensName
            ? `${ensName} (${address?.slice(0, 5)}...${address?.slice(-5)})`
            : `${address?.slice(0, 5)}...${address?.slice(-5)}`}
        </div>
      )}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
