import { sepolia } from "viem/chains";
import { PublicClient, createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'





export const viemClients = (chaiId: number): PublicClient => {
  const clients: {
    [key: number]: PublicClient
  } = {
    [sepolia.id]: createPublicClient({
      chain: sepolia,
      transport: http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_SEPOLIA_API_KEY}`)
    })
  }
  return clients[chaiId]
}