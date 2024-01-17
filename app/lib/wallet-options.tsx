import { Connector, useConnect } from "wagmi";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";

export function WalletOptions() {
  const { connectors, connect } = useConnect();
  const [isStandalone, setIsStandalone] = useState(false);

  console.log(connectors);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsStandalone(true);
    }
  }, []);

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

  const walletConnectConnector = connectors.find(
    (connector) => connector.id === "walletConnect"
  );

  if (isStandalone) {
    return (
      <Button
        onClick={() => connect({ connector: walletConnectConnector })}
        className='rounded-full bg-violet-300 hover:bg-violet-200'
      >
        Wallet Connect
      </Button>
    );
  } else {
    return filteredConnectors.map((connector) => (
      <Button
        className='rounded-full bg-violet-300 hover:bg-violet-200'
        key={connector.uid}
        onClick={() => connect({ connector })}
      >
        {connector.name}
      </Button>
    ));
  }
}
