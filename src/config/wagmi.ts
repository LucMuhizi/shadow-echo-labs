import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, base, arbitrum, optimism, polygon } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Shadow DEX',
  projectId: 'YOUR_PROJECT_ID', // Get from WalletConnect Cloud
  chains: [mainnet, base, arbitrum, optimism, polygon],
  ssr: false,
});
