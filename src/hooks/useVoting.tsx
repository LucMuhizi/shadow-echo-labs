import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { VOTER_ABI, CONTRACT_ADDRESSES } from '@/contracts/tokenContracts';
import { toast } from 'sonner';

export const useVoting = () => {
  const { writeContractAsync } = useWriteContract();
  const { address: account, chain } = useAccount();

  const vote = async (
    tokenId: bigint,
    poolAddresses: `0x${string}`[],
    weights: bigint[]
  ) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Submitting votes...', { id: 'vote' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VOTER,
        abi: VOTER_ABI,
        functionName: 'vote',
        args: [tokenId, poolAddresses, weights],
        chain,
        account,
      } as any);

      toast.success('Votes submitted successfully!', { id: 'vote' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to vote: ' + error.message);
      throw error;
    }
  };

  const resetVotes = async (tokenId: bigint) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Resetting votes...', { id: 'reset' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VOTER,
        abi: VOTER_ABI,
        functionName: 'reset',
        args: [tokenId],
        chain,
        account,
      } as any);

      toast.success('Votes reset!', { id: 'reset' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to reset votes: ' + error.message);
      throw error;
    }
  };

  const claimBribes = async (gaugeAddresses: `0x${string}`[], tokenId: bigint) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Claiming bribes...', { id: 'claim-bribes' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VOTER,
        abi: VOTER_ABI,
        functionName: 'claimBribes',
        args: [gaugeAddresses, tokenId],
        chain,
        account,
      } as any);

      toast.success('Bribes claimed successfully!', { id: 'claim-bribes' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to claim bribes: ' + error.message);
      throw error;
    }
  };

  const claimFees = async (gaugeAddresses: `0x${string}`[], tokenId: bigint) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Claiming fees...', { id: 'claim-fees' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VOTER,
        abi: VOTER_ABI,
        functionName: 'claimFees',
        args: [gaugeAddresses, tokenId],
        chain,
        account,
      } as any);

      toast.success('Fees claimed successfully!', { id: 'claim-fees' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to claim fees: ' + error.message);
      throw error;
    }
  };

  return {
    vote,
    resetVotes,
    claimBribes,
    claimFees,
  };
};
