import { useReadContract } from 'wagmi';
import { ERC20_ABI } from '@/contracts/abis';
import { formatUnits } from 'viem';

export const useTokenBalance = (tokenAddress: `0x${string}` | undefined, userAddress: `0x${string}` | undefined) => {
  const { data: balance, isLoading, refetch } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!tokenAddress && !!userAddress,
    },
  });

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: {
      enabled: !!tokenAddress,
    },
  });

  const formattedBalance = balance && decimals
    ? parseFloat(formatUnits(balance as bigint, decimals as number)).toFixed(4)
    : '0.0000';

  return {
    balance,
    formattedBalance,
    decimals: decimals as number | undefined,
    isLoading,
    refetch,
  };
};
