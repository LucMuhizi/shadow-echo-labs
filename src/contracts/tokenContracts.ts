// SDX Token Contract (ERC20 with emissions)
export const SDX_TOKEN_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'weeklyEmission',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_minter', type: 'address' }],
    name: 'setMinter',
    outputs: [],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'minter',
    outputs: [{ name: '', type: 'address' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    type: 'function',
  },
] as const;

// Voting Escrow (veSDX) Contract - NFT based
export const VE_SDX_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: '_lockDuration', type: 'uint256' },
    ],
    name: 'createLock',
    outputs: [{ name: 'tokenId', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_tokenId', type: 'uint256' },
      { name: '_amount', type: 'uint256' },
    ],
    name: 'increaseAmount',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_tokenId', type: 'uint256' },
      { name: '_lockDuration', type: 'uint256' },
    ],
    name: 'increaseUnlockTime',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_tokenId', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_tokenId', type: 'uint256' }],
    name: 'balanceOfNFT',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_index', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_tokenId', type: 'uint256' }],
    name: 'locked',
    outputs: [
      { name: 'amount', type: 'int128' },
      { name: 'end', type: 'uint256' },
    ],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_account', type: 'address' }],
    name: 'whitelist',
    outputs: [],
    type: 'function',
  },
] as const;

// Voter Contract - Handles gauge voting
export const VOTER_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_tokenId', type: 'uint256' },
      { name: '_poolVote', type: 'address[]' },
      { name: '_weights', type: 'uint256[]' },
    ],
    name: 'vote',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_tokenId', type: 'uint256' }],
    name: 'reset',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_gauges', type: 'address[]' },
      { name: '_tokenId', type: 'uint256' },
    ],
    name: 'claimBribes',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_gauges', type: 'address[]' },
      { name: '_tokenId', type: 'uint256' },
    ],
    name: 'claimFees',
    outputs: [],
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '_tokenId', type: 'uint256' },
      { name: '_pool', type: 'address' },
    ],
    name: 'votes',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_pool', type: 'address' },
      { name: '_gauge', type: 'address' },
    ],
    name: 'createGauge',
    outputs: [{ name: '', type: 'address' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_gauge', type: 'address' }],
    name: 'killGauge',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_gauge', type: 'address' }],
    name: 'reviveGauge',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_gauge', type: 'address' },
      { name: '_bribe', type: 'address' },
    ],
    name: 'setBribe',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'distribute',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_gauge', type: 'address' }],
    name: 'distributeForGauge',
    outputs: [],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_gauge', type: 'address' }],
    name: 'isAlive',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    type: 'function',
  },
] as const;

// Gauge Contract - Rewards distribution
export const GAUGE_ABI = [
  {
    constant: false,
    inputs: [{ name: '_amount', type: 'uint256' }],
    name: 'deposit',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_amount', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'getReward',
    outputs: [],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_account', type: 'address' }],
    name: 'earned',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_reward', type: 'address' }],
    name: 'addReward',
    outputs: [],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    type: 'function',
  },
] as const;

// Contract Addresses (Mainnet - Update with actual deployed addresses)
export const CONTRACT_ADDRESSES = {
  SDX_TOKEN: '0x0000000000000000000000000000000000000001', // Placeholder
  VE_SDX: '0x0000000000000000000000000000000000000002', // Placeholder
  VOTER: '0x0000000000000000000000000000000000000003', // Placeholder
} as const;

// Tokenomics Constants
export const TOKENOMICS = {
  INITIAL_SUPPLY: 100_000_000, // 100M SDX
  MAX_LOCK_TIME: 4 * 365 * 86400, // 4 years in seconds
  MIN_LOCK_TIME: 7 * 86400, // 1 week in seconds
  EPOCH_DURATION: 7 * 86400, // 1 week
  WEEKLY_EMISSION_DECAY: 0.99, // 1% decay per week
  INITIAL_WEEKLY_EMISSION: 2_000_000, // 2M SDX per week
} as const;
