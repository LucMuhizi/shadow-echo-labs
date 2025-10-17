import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useOwnerControls } from '@/hooks/useOwnerControls';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertCircle } from 'lucide-react';
import { CONTRACT_ADDRESSES } from '@/contracts/tokenContracts';

const Admin = () => {
  const { address, isConnected } = useAccount();
  const {
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
  } = useOwnerControls();

  const [minterInput, setMinterInput] = useState('');
  const [poolAddress, setPoolAddress] = useState('');
  const [gaugeAddress, setGaugeAddress] = useState('');
  const [bribeAddress, setBribeAddress] = useState('');
  const [whitelistInput, setWhitelistInput] = useState('');
  const [newOwnerAddress, setNewOwnerAddress] = useState('');
  const [rewardToken, setRewardToken] = useState('');
  const [targetGauge, setTargetGauge] = useState('');

  const isSdxOwner = isOwner('SDX');
  const isVeSDXOwner = isOwner('VE_SDX');
  const isVoterOwner = isOwner('VOTER');
  const isAnyOwner = isSdxOwner || isVeSDXOwner || isVoterOwner;

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please connect your wallet to access the admin panel.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!isAnyOwner) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You are not authorized to access this page. Only contract owners can manage protocol settings.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Manage protocol contracts and settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">SDX Token Owner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-xs font-mono break-all">{sdxOwner as string}</p>
              {isSdxOwner && <Badge variant="default">You</Badge>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">veSDX Owner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-xs font-mono break-all">{veSDXOwner as string}</p>
              {isVeSDXOwner && <Badge variant="default">You</Badge>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Voter Owner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-xs font-mono break-all">{voterOwner as string}</p>
              {isVoterOwner && <Badge variant="default">You</Badge>}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sdx" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sdx" disabled={!isSdxOwner}>
            SDX Token
          </TabsTrigger>
          <TabsTrigger value="vesdx" disabled={!isVeSDXOwner}>
            veSDX
          </TabsTrigger>
          <TabsTrigger value="voter" disabled={!isVoterOwner}>
            Voter
          </TabsTrigger>
          <TabsTrigger value="ownership">
            Ownership
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sdx">
          <Card>
            <CardHeader>
              <CardTitle>SDX Token Management</CardTitle>
              <CardDescription>
                Manage minter address and token emissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm text-muted-foreground">Current Minter</Label>
                <p className="text-sm font-mono mt-1 break-all">{minterAddress as string}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="minter">Set New Minter</Label>
                  <Input
                    id="minter"
                    placeholder="0x..."
                    value={minterInput}
                    onChange={(e) => setMinterInput(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => setMinter(minterInput as `0x${string}`)}
                  disabled={!minterInput}
                >
                  Update Minter
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vesdx">
          <Card>
            <CardHeader>
              <CardTitle>veSDX Management</CardTitle>
              <CardDescription>
                Manage whitelisted addresses for locking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whitelist">Whitelist Address</Label>
                <Input
                  id="whitelist"
                  placeholder="0x..."
                  value={whitelistInput}
                  onChange={(e) => setWhitelistInput(e.target.value)}
                />
              </div>
              <Button
                onClick={() => whitelistAddress(whitelistInput as `0x${string}`)}
                disabled={!whitelistInput}
              >
                Whitelist Address
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voter">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gauge Management</CardTitle>
                <CardDescription>Create and manage gauges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Create New Gauge</h3>
                  <div className="space-y-2">
                    <Label htmlFor="pool">Pool Address</Label>
                    <Input
                      id="pool"
                      placeholder="0x..."
                      value={poolAddress}
                      onChange={(e) => setPoolAddress(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gauge">Gauge Address</Label>
                    <Input
                      id="gauge"
                      placeholder="0x..."
                      value={gaugeAddress}
                      onChange={(e) => setGaugeAddress(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={() =>
                      createGauge(poolAddress as `0x${string}`, gaugeAddress as `0x${string}`)
                    }
                    disabled={!poolAddress || !gaugeAddress}
                  >
                    Create Gauge
                  </Button>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <h3 className="font-semibold">Gauge Controls</h3>
                  <div className="space-y-2">
                    <Label htmlFor="targetGauge">Target Gauge</Label>
                    <Input
                      id="targetGauge"
                      placeholder="0x..."
                      value={targetGauge}
                      onChange={(e) => setTargetGauge(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      onClick={() => killGauge(targetGauge as `0x${string}`)}
                      disabled={!targetGauge}
                    >
                      Kill Gauge
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => reviveGauge(targetGauge as `0x${string}`)}
                      disabled={!targetGauge}
                    >
                      Revive Gauge
                    </Button>
                    <Button
                      onClick={() => distributeForGauge(targetGauge as `0x${string}`)}
                      disabled={!targetGauge}
                    >
                      Distribute
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bribe Management</CardTitle>
                <CardDescription>Configure bribe contracts for gauges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bribeGauge">Gauge Address</Label>
                  <Input
                    id="bribeGauge"
                    placeholder="0x..."
                    value={gaugeAddress}
                    onChange={(e) => setGaugeAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bribe">Bribe Contract</Label>
                  <Input
                    id="bribe"
                    placeholder="0x..."
                    value={bribeAddress}
                    onChange={(e) => setBribeAddress(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() =>
                    setBribe(gaugeAddress as `0x${string}`, bribeAddress as `0x${string}`)
                  }
                  disabled={!gaugeAddress || !bribeAddress}
                >
                  Set Bribe Contract
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emissions Distribution</CardTitle>
                <CardDescription>Trigger weekly emissions distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => distributeEmissions()} className="w-full">
                  Distribute All Emissions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gauge Rewards</CardTitle>
                <CardDescription>Add reward tokens to gauges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rewardGauge">Gauge Address</Label>
                  <Input
                    id="rewardGauge"
                    placeholder="0x..."
                    value={targetGauge}
                    onChange={(e) => setTargetGauge(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reward">Reward Token</Label>
                  <Input
                    id="reward"
                    placeholder="0x..."
                    value={rewardToken}
                    onChange={(e) => setRewardToken(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() =>
                    addRewardToGauge(targetGauge as `0x${string}`, rewardToken as `0x${string}`)
                  }
                  disabled={!targetGauge || !rewardToken}
                >
                  Add Reward Token
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ownership">
          <Card>
            <CardHeader>
              <CardTitle>Transfer Ownership</CardTitle>
              <CardDescription>
                Transfer contract ownership to a new address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Warning: Transferring ownership is permanent. Make sure you trust the new owner address.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="newOwner">New Owner Address</Label>
                <Input
                  id="newOwner"
                  placeholder="0x..."
                  value={newOwnerAddress}
                  onChange={(e) => setNewOwnerAddress(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => transferOwnership('SDX', newOwnerAddress as `0x${string}`)}
                  disabled={!isSdxOwner || !newOwnerAddress}
                >
                  Transfer SDX Token Ownership
                </Button>

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => transferOwnership('VE_SDX', newOwnerAddress as `0x${string}`)}
                  disabled={!isVeSDXOwner || !newOwnerAddress}
                >
                  Transfer veSDX Ownership
                </Button>

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => transferOwnership('VOTER', newOwnerAddress as `0x${string}`)}
                  disabled={!isVoterOwner || !newOwnerAddress}
                >
                  Transfer Voter Ownership
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Contract Addresses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <Label className="text-xs text-muted-foreground">SDX Token</Label>
            <p className="text-sm font-mono">{CONTRACT_ADDRESSES.SDX_TOKEN}</p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">veSDX</Label>
            <p className="text-sm font-mono">{CONTRACT_ADDRESSES.VE_SDX}</p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Voter</Label>
            <p className="text-sm font-mono">{CONTRACT_ADDRESSES.VOTER}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
