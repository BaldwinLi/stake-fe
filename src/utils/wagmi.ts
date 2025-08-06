import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import {
  sepolia,
} from 'wagmi/chains';
// from https://cloud.walletconnect.com/
const ProjectId = '325c52fdf7cbf88e72bdc9550cd91e6c'

export const config = getDefaultConfig({
  appName: 'Meta Node Stake',
  projectId: ProjectId,
  chains: [
    sepolia
  ],
  transports: {
    // 替换之前 不可用的 https://rpc.sepolia.org/
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_SEPOLIA_API_KEY}`)
  },
  ssr: true,
});

export const defaultChainId: number = sepolia.id