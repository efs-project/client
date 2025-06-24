import { createPublicClient, createWalletClient, custom, http, type WalletClient, type Chain, type Client, type Transport } from 'viem';
import { hardhat } from 'viem/chains';
import { BrowserProvider, JsonRpcSigner, FallbackProvider, JsonRpcProvider } from 'ethers';
import { signal } from '@lit-labs/signals';

console.log('wallet.ts running');

// Signal to hold the connected account address
export const account = signal<`0x${string}` | undefined>(undefined);

// Signal to hold the connected signer
export const signer = signal<JsonRpcSigner | undefined>(undefined);

// Create a public client to read from the blockchain
const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
});

/**
 * Converts a viem WalletClient to an ethers.js v6 Signer.
 * @param client The viem WalletClient to convert.
 * @returns An ethers.js Signer.
 */
export function walletClientToSigner(client: WalletClient): JsonRpcSigner {
    const { account, chain, transport } = client;
    // We use the non-null assertion operator (!) because we are certain the
    // walletClient will have a chain and account when this is called.
    const network = {
      chainId: chain!.id,
      name: chain!.name,
      ensAddress: chain!.contracts?.ensRegistry?.address,
    };
    const provider = new BrowserProvider(transport, network);
    const signer = new JsonRpcSigner(provider, account!.address);
    return signer;
}

// Function to connect the wallet
export async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install a browser wallet like MetaMask.");
    return;
  }
  
  try {
    const walletClient = createWalletClient({
      chain: hardhat,
      transport: custom(window.ethereum)
    });

    const [address] = await walletClient.requestAddresses();
    account.set(address);

    // Create a new wallet client with the account set
    const connectedWalletClient = createWalletClient({
      account: address,
      chain: hardhat,
      transport: custom(window.ethereum)
    });

    const signerInstance = walletClientToSigner(connectedWalletClient);
    signer.set(signerInstance);

    const { Kernel } = await import('./kernel');
    Kernel.EFS.connect(signerInstance);

  } catch (error) {
    console.error("Failed to connect wallet:", error);
    account.set(undefined);
    signer.set(undefined);
  }
}

/**
 * Converts a viem PublicClient to an ethers.js v6 Provider.
 * This is a utility function that was part of the original code.
 * @param client The viem Client to convert.
 * @returns An ethers.js Provider.
 */
export function clientToProvider(client: Client<Transport, Chain>) {
    const { chain, transport } = client
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    }
    if (transport.type === 'fallback') {
      const providers = (transport.transports as ReturnType<Transport>[]).map(
        ({ value }) => new JsonRpcProvider(value?.url, network),
      )
      if (providers.length === 1) return providers[0]
      return new FallbackProvider(providers)
    }
    return new JsonRpcProvider(transport.url, network)
  }

const ethersProvider = clientToProvider(publicClient);

export { publicClient, ethersProvider };