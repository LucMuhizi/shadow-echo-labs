import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { ROUTER_ABI, ROUTER_ADDRESS, ERC20_ABI } from '@/contracts/abis';
import { toast } from 'sonner';

export const useSwap = () => {
  const { writeContractAsync } = useWriteContract();
  const { chain, address: account } = useAccount();

  const approveToken = async (
    tokenAddress: `0x${string}`,
    amount: string,
    decimals: number
  ) => {
    try {
      const hash = await writeContractAsync({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [ROUTER_ADDRESS, parseUnits(amount, decimals)],
        chain,
        account,
      } as any);
      
      toast.loading('Approving token...', { id: 'approve' });
      return hash;
    } catch (error: any) {
      toast.error('Approval failed: ' + error.message);
      throw error;
    }
  };

  const executeSwap = async (
    tokenIn: `0x${string}`,
    tokenOut: `0x${string}`,
    amountIn: string,
    amountOutMin: string,
    decimalsIn: number,
    userAddress: `0x${string}`
  ) => {
    try {
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
      
      const hash = await writeContractAsync({
        address: ROUTER_ADDRESS,
        abi: ROUTER_ABI,
        functionName: 'swapExactTokensForTokens',
        args: [
          parseUnits(amountIn, decimalsIn),
          parseUnits(amountOutMin, 18),
          [tokenIn, tokenOut],
          userAddress,
          BigInt(deadline),
        ],
        chain,
        account,
      } as any);

      toast.loading('Swapping tokens...', { id: 'swap' });
      return hash;
    } catch (error: any) {
      toast.error('Swap failed: ' + error.message);
      throw error;
    }
  };

  const getAmountOut = async (
    amountIn: string,
    decimalsIn: number,
    path: readonly `0x${string}`[]
  ) => {
    try {
      // This would call the router's getAmountsOut function
      // For now, return a mock value
      return (parseFloat(amountIn) * 2450.34).toFixed(4);
    } catch (error) {
      return '0';
    }
  };

  return {
    approveToken,
    executeSwap,
    getAmountOut,
  };
};
