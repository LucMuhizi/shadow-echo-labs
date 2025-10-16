import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { VE_SDX_ABI, SDX_TOKEN_ABI, CONTRACT_ADDRESSES, TOKENOMICS } from '@/contracts/tokenContracts';
import { ERC20_ABI } from '@/contracts/abis';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

export const useVeSDX = () => {
  const { writeContractAsync } = useWriteContract();
  const { address: account, chain } = useAccount();
  const [veBalance, setVeBalance] = useState('0');
  const [sdxBalance, setSDXBalance] = useState('0');
  const [lockedAmount, setLockedAmount] = useState('0');
  const [unlockTime, setUnlockTime] = useState(0);

  // Read SDX balance
  const { data: sdxBalanceData } = useReadContract({
    address: CONTRACT_ADDRESSES.SDX_TOKEN,
    abi: SDX_TOKEN_ABI,
    functionName: 'balanceOf',
    args: account ? [account] : undefined,
  });

  // Read veSDX NFT count
  const { data: veNFTCount } = useReadContract({
    address: CONTRACT_ADDRESSES.VE_SDX,
    abi: VE_SDX_ABI,
    functionName: 'balanceOf',
    args: account ? [account] : undefined,
  });

  useEffect(() => {
    if (sdxBalanceData) {
      setSDXBalance(formatUnits(sdxBalanceData as bigint, 18));
    }
  }, [sdxBalanceData]);

  const createLock = async (amount: string, lockDuration: number) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      // First approve SDX
      toast.loading('Approving SDX...', { id: 'approve-lock' });
      const approvalHash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.SDX_TOKEN,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.VE_SDX, parseUnits(amount, 18)],
        chain,
        account,
      } as any);

      toast.loading('Creating lock...', { id: 'create-lock' });
      
      const lockHash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VE_SDX,
        abi: VE_SDX_ABI,
        functionName: 'createLock',
        args: [parseUnits(amount, 18), BigInt(lockDuration)],
        chain,
        account,
      } as any);

      toast.success('Lock created successfully!', { id: 'create-lock' });
      return lockHash;
    } catch (error: any) {
      toast.error('Failed to create lock: ' + error.message);
      throw error;
    }
  };

  const increaseAmount = async (tokenId: bigint, amount: string) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Approving SDX...', { id: 'approve-increase' });
      await writeContractAsync({
        address: CONTRACT_ADDRESSES.SDX_TOKEN,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.VE_SDX, parseUnits(amount, 18)],
        chain,
        account,
      } as any);

      toast.loading('Increasing lock amount...', { id: 'increase-amount' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VE_SDX,
        abi: VE_SDX_ABI,
        functionName: 'increaseAmount',
        args: [tokenId, parseUnits(amount, 18)],
        chain,
        account,
      } as any);

      toast.success('Lock amount increased!', { id: 'increase-amount' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to increase amount: ' + error.message);
      throw error;
    }
  };

  const increaseUnlockTime = async (tokenId: bigint, additionalTime: number) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Extending lock time...', { id: 'extend-lock' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VE_SDX,
        abi: VE_SDX_ABI,
        functionName: 'increaseUnlockTime',
        args: [tokenId, BigInt(additionalTime)],
        chain,
        account,
      } as any);

      toast.success('Lock time extended!', { id: 'extend-lock' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to extend lock: ' + error.message);
      throw error;
    }
  };

  const withdraw = async (tokenId: bigint) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Withdrawing SDX...', { id: 'withdraw' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VE_SDX,
        abi: VE_SDX_ABI,
        functionName: 'withdraw',
        args: [tokenId],
        chain,
        account,
      } as any);

      toast.success('SDX withdrawn successfully!', { id: 'withdraw' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to withdraw: ' + error.message);
      throw error;
    }
  };

  const calculateVotingPower = (amount: number, lockDuration: number): number => {
    // Voting power = amount * (lockDuration / MAX_LOCK_TIME)
    const maxLock = TOKENOMICS.MAX_LOCK_TIME;
    return amount * (lockDuration / maxLock);
  };

  return {
    sdxBalance,
    veBalance,
    veNFTCount: veNFTCount ? Number(veNFTCount) : 0,
    lockedAmount,
    unlockTime,
    createLock,
    increaseAmount,
    increaseUnlockTime,
    withdraw,
    calculateVotingPower,
    TOKENOMICS,
  };
};
