import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { GAUGE_ABI } from '@/contracts/tokenContracts';
import { ERC20_ABI } from '@/contracts/abis';
import { toast } from 'sonner';

export const useGauge = (gaugeAddress: `0x${string}`, lpTokenAddress: `0x${string}`) => {
  const { writeContractAsync } = useWriteContract();
  const { address: account, chain } = useAccount();

  // Read staked balance
  const { data: stakedBalance } = useReadContract({
    address: gaugeAddress,
    abi: GAUGE_ABI,
    functionName: 'balanceOf',
    args: account ? [account] : undefined,
  });

  // Read earned rewards
  const { data: earnedRewards } = useReadContract({
    address: gaugeAddress,
    abi: GAUGE_ABI,
    functionName: 'earned',
    args: account ? [account] : undefined,
  });

  const deposit = async (amount: string, decimals: number = 18) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Approving LP tokens...', { id: 'approve-stake' });
      await writeContractAsync({
        address: lpTokenAddress,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [gaugeAddress, parseUnits(amount, decimals)],
        chain,
        account,
      } as any);

      toast.loading('Staking LP tokens...', { id: 'stake' });
      const hash = await writeContractAsync({
        address: gaugeAddress,
        abi: GAUGE_ABI,
        functionName: 'deposit',
        args: [parseUnits(amount, decimals)],
        chain,
        account,
      } as any);

      toast.success('LP tokens staked successfully!', { id: 'stake' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to stake: ' + error.message);
      throw error;
    }
  };

  const withdraw = async (amount: string, decimals: number = 18) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Withdrawing LP tokens...', { id: 'withdraw' });
      const hash = await writeContractAsync({
        address: gaugeAddress,
        abi: GAUGE_ABI,
        functionName: 'withdraw',
        args: [parseUnits(amount, decimals)],
        chain,
        account,
      } as any);

      toast.success('LP tokens withdrawn!', { id: 'withdraw' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to withdraw: ' + error.message);
      throw error;
    }
  };

  const claimRewards = async () => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Claiming rewards...', { id: 'claim' });
      const hash = await writeContractAsync({
        address: gaugeAddress,
        abi: GAUGE_ABI,
        functionName: 'getReward',
        chain,
        account,
      } as any);

      toast.success('Rewards claimed!', { id: 'claim' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to claim rewards: ' + error.message);
      throw error;
    }
  };

  return {
    stakedBalance: stakedBalance ? formatUnits(stakedBalance as bigint, 18) : '0',
    earnedRewards: earnedRewards ? formatUnits(earnedRewards as bigint, 18) : '0',
    deposit,
    withdraw,
    claimRewards,
  };
};
