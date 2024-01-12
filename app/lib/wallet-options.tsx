import { Connector, useConnect } from "wagmi";
import { Button } from "../components/ui/button";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  // Specify the names you want to filter by
  const idsToFilter = [
    "io.metamask",
    "me.rainbow",
    "com.coinbase.wallet",
    "app.phantom",
    "safe",
  ];

  // Filter connectors based on names
  const filteredConnectors = connectors.filter((connector) =>
    idsToFilter.includes(connector.id)
  );

  return filteredConnectors.map((connector) => (
    <Button
      className='rounded-full bg-violet-300'
      key={connector.uid}
      onClick={() => connect({ connector })}
    >
      {connector.name}
    </Button>
  ));
}
