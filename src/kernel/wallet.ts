import { createPublicClient, http } from 'viem'
import { hardhat } from 'viem/chains'

import { FallbackProvider, JsonRpcProvider } from 'ethers'
import type { Chain, Client, Transport } from 'viem'

console.log('wallet.ts running');
 
const client = createPublicClient({ 
  chain: hardhat, 
  transport: http(), 
})

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

const ethersProvider = clientToProvider(client);

export { client, ethersProvider };