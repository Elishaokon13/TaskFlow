import { ThirdwebProvider, Chain } from "@thirdweb-dev/react";
import "../styles/globals.css";
// Define your custom chain
const customChain = {
  chainId: 41454, // Chain ID for your custom chain
  rpc: ["https://devnet1.monad.xyz/rpc/6tanDgZFQbbRDmMFjy8LdgpTdIRiPfYaaqIW0NUY"], // RPC URL
  name: "Monad Devnet", // A friendly name for the chain
  nativeCurrency: {
    name: "Monad Token", // Native token name
    symbol: "MON",       // Native token symbol (e.g., ETH for Ethereum)
    decimals: 18         // Number of decimals for the native token
  },
  shortName: "monad-dev",  // A short name for the chain
  slug: "monad",           // Optional: slug used by thirdweb (e.g., in URLs)
  explorers: [
    {
      name: "Monad Explorer",  // Name of the explorer
      url: "https://explorer.monad.xyz", // Link to a blockchain explorer for your chain
      standard: "EIP3091" // Standard for blockchain explorers
    }
  ]
};

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={customChain}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
