import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import {
  SDX_TOKEN_ABI,
  VE_SDX_ABI,
  VOTER_ABI,
  GAUGE_ABI,
  CONTRACT_ADDRESSES
} from '@/contracts/tokenContracts';
import { toast } from 'sonner';

export const useOwnerControls = () => {
  const { writeContractAsync } = useWriteContract();
  const { address: account, chain } = useAccount();

  const { data: sdxOwner } = useReadContract({
    address: CONTRACT_ADDRESSES.SDX_TOKEN,
    abi: SDX_TOKEN_ABI,
    functionName: 'owner',
  });

  const { data: veSDXOwner } = useReadContract({
    address: CONTRACT_ADDRESSES.VE_SDX,
    abi: VE_SDX_ABI,
    functionName: 'owner',
  });

  const { data: voterOwner } = useReadContract({
    address: CONTRACT_ADDRESSES.VOTER,
    abi: VOTER_ABI,
    functionName: 'owner',
  });

  const { data: minterAddress } = useReadContract({
    address: CONTRACT_ADDRESSES.SDX_TOKEN,
    abi: SDX_TOKEN_ABI,
    functionName: 'minter',
  });

  const setMinter = async (minterAddress: `0x${string}`) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Setting minter...', { id: 'set-minter' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.SDX_TOKEN,
        abi: SDX_TOKEN_ABI,
        functionName: 'setMinter',
        args: [minterAddress],
        chain,
        account,
      } as any);

      toast.success('Minter set successfully!', { id: 'set-minter' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to set minter: ' + error.message);
      throw error;
    }
  };

  const createGauge = async (poolAddress: `0x${string}`, gaugeAddress: `0x${string}`) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Creating gauge...', { id: 'create-gauge' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VOTER,
        abi: VOTER_ABI,
        functionName: 'createGauge',
        args: [poolAddress, gaugeAddress],
        chain,
        account,
      } as any);

      toast.success('Gauge created successfully!', { id: 'create-gauge' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to create gauge: ' + error.message);
      throw error;
    }
  };

  const killGauge = async (gaugeAddress: `0x${string}`) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Killing gauge...', { id: 'kill-gauge' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VOTER,
        abi: VOTER_ABI,
        functionName: 'killGauge',
        args: [gaugeAddress],
        chain,
        account,
      } as any);

      toast.success('Gauge killed successfully!', { id: 'kill-gauge' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to kill gauge: ' + error.message);
      throw error;
    }
  };

  const reviveGauge = async (gaugeAddress: `0x${string}`) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Reviving gauge...', { id: 'revive-gauge' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VOTER,
        abi: VOTER_ABI,
        functionName: 'reviveGauge',
        args: [gaugeAddress],
        chain,
        account,
      } as any);

      toast.success('Gauge revived successfully!', { id: 'revive-gauge' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to revive gauge: ' + error.message);
      throw error;
    }
  };

  const setBribe = async (gaugeAddress: `0x${string}`, bribeAddress: `0x${string}`) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Setting bribe contract...', { id: 'set-bribe' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VOTER,
        abi: VOTER_ABI,
        functionName: 'setBribe',
        args: [gaugeAddress, bribeAddress],
        chain,
        account,
      } as any);

      toast.success('Bribe contract set successfully!', { id: 'set-bribe' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to set bribe: ' + error.message);
      throw error;
    }
  };

  const distributeEmissions = async () => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Distributing emissions...', { id: 'distribute' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VOTER,
        abi: VOTER_ABI,
        functionName: 'distribute',
        chain,
        account,
      } as any);

      toast.success('Emissions distributed successfully!', { id: 'distribute' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to distribute emissions: ' + error.message);
      throw error;
    }
  };

  const distributeForGauge = async (gaugeAddress: `0x${string}`) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Distributing for gauge...', { id: 'distribute-gauge' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VOTER,
        abi: VOTER_ABI,
        functionName: 'distributeForGauge',
        args: [gaugeAddress],
        chain,
        account,
      } as any);

      toast.success('Gauge distribution completed!', { id: 'distribute-gauge' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to distribute for gauge: ' + error.message);
      throw error;
    }
  };

  const whitelistAddress = async (addressToWhitelist: `0x${string}`) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Whitelisting address...', { id: 'whitelist' });
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.VE_SDX,
        abi: VE_SDX_ABI,
        functionName: 'whitelist',
        args: [addressToWhitelist],
        chain,
        account,
      } as any);

      toast.success('Address whitelisted successfully!', { id: 'whitelist' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to whitelist address: ' + error.message);
      throw error;
    }
  };

  const transferOwnership = async (
    contract: 'SDX' | 'VE_SDX' | 'VOTER',
    newOwner: `0x${string}`
  ) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    const contractConfig = {
      SDX: { address: CONTRACT_ADDRESSES.SDX_TOKEN, abi: SDX_TOKEN_ABI },
      VE_SDX: { address: CONTRACT_ADDRESSES.VE_SDX, abi: VE_SDX_ABI },
      VOTER: { address: CONTRACT_ADDRESSES.VOTER, abi: VOTER_ABI },
    };

    try {
      toast.loading(`Transferring ${contract} ownership...`, { id: 'transfer-ownership' });
      const hash = await writeContractAsync({
        address: contractConfig[contract].address,
        abi: contractConfig[contract].abi,
        functionName: 'transferOwnership',
        args: [newOwner],
        chain,
        account,
      } as any);

      toast.success(`${contract} ownership transferred!`, { id: 'transfer-ownership' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to transfer ownership: ' + error.message);
      throw error;
    }
  };

  const addRewardToGauge = async (
    gaugeAddress: `0x${string}`,
    rewardToken: `0x${string}`
  ) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      toast.loading('Adding reward token...', { id: 'add-reward' });
      const hash = await writeContractAsync({
        address: gaugeAddress,
        abi: GAUGE_ABI,
        functionName: 'addReward',
        args: [rewardToken],
        chain,
        account,
      } as any);

      toast.success('Reward token added!', { id: 'add-reward' });
      return hash;
    } catch (error: any) {
      toast.error('Failed to add reward: ' + error.message);
      throw error;
    }
  };

  const isOwner = (contract: 'SDX' | 'VE_SDX' | 'VOTER'): boolean => {
    if (!account) return false;

    const ownerMap = {
      SDX: sdxOwner,
      VE_SDX: veSDXOwner,
      VOTER: voterOwner,
    };

    return ownerMap[contract]?.toLowerCase() === account.toLowerCase();
  };

  return {
    sdxOwner,
    veSDXOwner,
    voterOwner,
    minterAddress,
    isOwner,
    setMinter,
    createGauge,
    killGauge,
    reviveGauge,
    setBribe,
    distributeEmissions,
    distributeForGauge,
    whitelistAddress,
    transferOwnership,
    addRewardToGauge,
  };
};
