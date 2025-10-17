# Smart Contract Owner Controls Guide

This guide explains how to control the Shadow DEX smart contracts as the owner.

## Overview

The Shadow DEX implements a ve(3,3) tokenomics model with three main contracts that require owner control:

1. **SDX Token** - The protocol's native token with emission controls
2. **veSDX** - Vote-escrowed SDX for governance (NFT-based)
3. **Voter** - Manages gauge voting and emissions distribution

## Accessing the Admin Panel

1. Connect your wallet using the "Connect Wallet" button
2. If you're an owner of any contract, you'll see "Admin Panel" in the wallet dropdown menu
3. Click "Admin Panel" to access the owner controls at `/admin`

## Contract Owner Functions

### 1. SDX Token Management

#### Set Minter Address
The minter is the only address authorized to mint new SDX tokens (typically the Voter contract).

**Function:** `setMinter(address _minter)`

**Usage:**
```typescript
import { useOwnerControls } from '@/hooks/useOwnerControls';

const { setMinter } = useOwnerControls();
await setMinter('0x...');
```

**Admin Panel:**
- Navigate to "SDX Token" tab
- Enter the new minter address
- Click "Update Minter"

### 2. veSDX Management

#### Whitelist Address
Allow specific addresses (usually smart contracts) to create locks. This is necessary for contracts that need to lock SDX on behalf of users.

**Function:** `whitelist(address _account)`

**Usage:**
```typescript
const { whitelistAddress } = useOwnerControls();
await whitelistAddress('0x...');
```

**Admin Panel:**
- Navigate to "veSDX" tab
- Enter the address to whitelist
- Click "Whitelist Address"

### 3. Voter Management (Core Protocol Controls)

#### Create Gauge
Create a new gauge for a liquidity pool to receive SDX emissions.

**Function:** `createGauge(address _pool, address _gauge)`

**Usage:**
```typescript
const { createGauge } = useOwnerControls();
await createGauge(poolAddress, gaugeAddress);
```

**Admin Panel:**
- Navigate to "Voter" tab → "Gauge Management"
- Enter Pool Address and Gauge Address
- Click "Create Gauge"

#### Kill Gauge
Deactivate a gauge to stop emissions (use for malicious or inactive pools).

**Function:** `killGauge(address _gauge)`

**Usage:**
```typescript
const { killGauge } = useOwnerControls();
await killGauge(gaugeAddress);
```

**Admin Panel:**
- Navigate to "Voter" tab → "Gauge Controls"
- Enter gauge address
- Click "Kill Gauge"

#### Revive Gauge
Reactivate a previously killed gauge.

**Function:** `reviveGauge(address _gauge)`

**Usage:**
```typescript
const { reviveGauge } = useOwnerControls();
await reviveGauge(gaugeAddress);
```

**Admin Panel:**
- Navigate to "Voter" tab → "Gauge Controls"
- Enter gauge address
- Click "Revive Gauge"

#### Set Bribe Contract
Configure the bribe contract for a gauge (for vote incentives).

**Function:** `setBribe(address _gauge, address _bribe)`

**Usage:**
```typescript
const { setBribe } = useOwnerControls();
await setBribe(gaugeAddress, bribeAddress);
```

**Admin Panel:**
- Navigate to "Voter" tab → "Bribe Management"
- Enter Gauge Address and Bribe Contract
- Click "Set Bribe Contract"

#### Distribute Emissions
Trigger weekly SDX emissions distribution to all gauges based on voting weights.

**Function:** `distribute()`

**Usage:**
```typescript
const { distributeEmissions } = useOwnerControls();
await distributeEmissions();
```

**Admin Panel:**
- Navigate to "Voter" tab → "Emissions Distribution"
- Click "Distribute All Emissions"

**Important:** This should be called once per week (epoch) to distribute emissions.

#### Distribute for Single Gauge
Distribute emissions to a specific gauge.

**Function:** `distributeForGauge(address _gauge)`

**Usage:**
```typescript
const { distributeForGauge } = useOwnerControls();
await distributeForGauge(gaugeAddress);
```

**Admin Panel:**
- Navigate to "Voter" tab → "Gauge Controls"
- Enter gauge address
- Click "Distribute"

### 4. Gauge Rewards Management

#### Add Reward Token
Add additional reward tokens to a gauge (beyond SDX emissions).

**Function:** `addReward(address _reward)` (called on Gauge contract)

**Usage:**
```typescript
const { addRewardToGauge } = useOwnerControls();
await addRewardToGauge(gaugeAddress, rewardTokenAddress);
```

**Admin Panel:**
- Navigate to "Voter" tab → "Gauge Rewards"
- Enter Gauge Address and Reward Token
- Click "Add Reward Token"

### 5. Ownership Transfer

Transfer ownership of any contract to a new address.

**Function:** `transferOwnership(address newOwner)`

**Usage:**
```typescript
const { transferOwnership } = useOwnerControls();
await transferOwnership('SDX', newOwnerAddress);
```

**Admin Panel:**
- Navigate to "Ownership" tab
- Enter New Owner Address
- Click the appropriate transfer button

**⚠️ Warning:** Ownership transfer is permanent and cannot be reversed!

## Custom Hook Usage

The `useOwnerControls` hook provides all owner functions:

```typescript
import { useOwnerControls } from '@/hooks/useOwnerControls';

function MyComponent() {
  const {
    // Owner addresses
    sdxOwner,
    veSDXOwner,
    voterOwner,
    minterAddress,

    // Check if connected wallet is owner
    isOwner,

    // SDX Token functions
    setMinter,

    // Voter functions
    createGauge,
    killGauge,
    reviveGauge,
    setBribe,
    distributeEmissions,
    distributeForGauge,

    // veSDX functions
    whitelistAddress,

    // Gauge functions
    addRewardToGauge,

    // Ownership functions
    transferOwnership,
  } = useOwnerControls();

  // Check if you're an owner
  if (isOwner('SDX')) {
    // You're the SDX token owner
  }
}
```

## Security Best Practices

1. **Verify Addresses:** Always double-check addresses before executing owner functions
2. **Multi-sig Recommended:** Use a multi-signature wallet for owner addresses
3. **Test on Testnet:** Test all operations on testnet before mainnet
4. **Gauge Vetting:** Thoroughly vet pools before creating gauges
5. **Monitor Emissions:** Regularly check emission distribution is working correctly
6. **Backup Plans:** Have emergency procedures for killing malicious gauges

## Weekly Owner Tasks

1. **Monitor Gauges:** Check for suspicious activity
2. **Distribute Emissions:** Call `distribute()` once per epoch (weekly)
3. **Process Requests:** Review and approve new gauge requests
4. **Update Bribes:** Configure bribe contracts for new incentives

## Emergency Procedures

### Malicious Pool Detected
1. Immediately call `killGauge(gaugeAddress)`
2. Announce to community
3. Investigate the issue
4. Decide whether to revive or permanently remove

### Contract Upgrade Needed
1. Deploy new contract version
2. Update relevant addresses (minter, gauges, etc.)
3. Transfer ownership if needed
4. Update frontend to use new addresses

## Contract Addresses

Update these addresses with your deployed contracts:

```typescript
export const CONTRACT_ADDRESSES = {
  SDX_TOKEN: '0x0000000000000000000000000000000000000001',
  VE_SDX: '0x0000000000000000000000000000000000000002',
  VOTER: '0x0000000000000000000000000000000000000003',
};
```

## Support

For questions or issues with owner controls, refer to:
- [Velodrome Documentation](https://docs.velodrome.finance/)
- [Aerodrome Documentation](https://docs.aerodrome.finance/)
- Shadow DEX Discord/Telegram

## Code Reference

- ABIs with owner functions: `/src/contracts/tokenContracts.ts`
- Owner controls hook: `/src/hooks/useOwnerControls.tsx`
- Admin panel UI: `/src/pages/Admin.tsx`
