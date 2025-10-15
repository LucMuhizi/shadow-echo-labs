import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { formatEther } from 'viem';

export const useWallet = () => {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
  });

  const formattedBalance = balance ? parseFloat(formatEther(balance.value)).toFixed(4) : '0.0000';

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return {
    address,
    isConnected,
    chain,
    balance: formattedBalance,
    disconnect,
    shortenAddress,
  };
};
