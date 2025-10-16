import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, Plus, TrendingUp, Lock, Coins } from "lucide-react";
import { useGauge } from "@/hooks/useGauge";
import { useWallet } from "@/hooks/useWallet";
import { useState } from "react";
import { toast } from "sonner";

const Farms = () => {
  const { isConnected } = useWallet();
  const [selectedFarm, setSelectedFarm] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const farms = [
    { 
      pair: "ETH/USDC", 
      apr: "145.2%", 
      tvl: "$12.3M", 
      earned: "245.67",
      boost: "2.5x",
      gaugeAddress: "0x0000000000000000000000000000000000000001" as `0x${string}`,
      lpTokenAddress: "0x0000000000000000000000000000000000000011" as `0x${string}`,
    },
    { 
      pair: "WBTC/ETH", 
      apr: "98.7%", 
      tvl: "$8.1M", 
      earned: "142.89",
      boost: "1.8x",
      gaugeAddress: "0x0000000000000000000000000000000000000002" as `0x${string}`,
      lpTokenAddress: "0x0000000000000000000000000000000000000012" as `0x${string}`,
    },
    { 
      pair: "USDC/USDT", 
      apr: "67.3%", 
      tvl: "$5.2M", 
      earned: "89.34",
      boost: "1.2x",
      gaugeAddress: "0x0000000000000000000000000000000000000003" as `0x${string}`,
      lpTokenAddress: "0x0000000000000000000000000000000000000013" as `0x${string}`,
    },
    { 
      pair: "SDX/ETH", 
      apr: "234.5%", 
      tvl: "$18.7M", 
      earned: "567.12",
      boost: "4.2x",
      gaugeAddress: "0x0000000000000000000000000000000000000004" as `0x${string}`,
      lpTokenAddress: "0x0000000000000000000000000000000000000014" as `0x${string}`,
    },
  ];

  const FarmCard = ({ farm }: { farm: typeof farms[0] }) => {
    const { stakedBalance, earnedRewards, deposit, withdraw, claimRewards } = useGauge(
      farm.gaugeAddress,
      farm.lpTokenAddress
    );

    const handleStake = async () => {
      if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
        toast.error('Please enter a valid amount');
        return;
      }
      try {
        await deposit(stakeAmount);
        setStakeAmount('');
        setSelectedFarm(null);
      } catch (error) {
        console.error('Staking failed:', error);
      }
    };

    const handleWithdraw = async () => {
      if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
        toast.error('Please enter a valid amount');
        return;
      }
      try {
        await withdraw(withdrawAmount);
        setWithdrawAmount('');
        setSelectedFarm(null);
      } catch (error) {
        console.error('Withdrawal failed:', error);
      }
    };

    const handleClaim = async () => {
      try {
        await claimRewards();
      } catch (error) {
        console.error('Claim failed:', error);
      }
    };

    return (
      <Card className="glass-card-hover border hover-lift">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-12 h-12 rounded-full bg-gradient-primary border-2 border-background" />
                <div className="w-12 h-12 rounded-full bg-gradient-accent border-2 border-background" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-xl">{farm.pair}</span>
                  <Badge className="gradient-accent">{farm.boost}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Total Value Locked: {farm.tvl}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">APR</p>
              <p className="text-2xl font-bold text-gradient-primary">{farm.apr}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Your Stake</p>
              <p className="text-lg font-semibold">{parseFloat(stakedBalance).toFixed(4)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Earned SDX</p>
              <p className="text-lg font-semibold text-gradient-accent">
                {parseFloat(earnedRewards).toFixed(4)}
              </p>
            </div>
          </div>

          {selectedFarm === farm.pair ? (
            <Tabs defaultValue="stake" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="stake">Stake</TabsTrigger>
                <TabsTrigger value="unstake">Unstake</TabsTrigger>
                <TabsTrigger value="claim">Claim</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stake" className="space-y-4">
                <div className="space-y-2">
                  <Label>Amount to Stake</Label>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    disabled={!isConnected}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 gradient-primary"
                    onClick={handleStake}
                    disabled={!isConnected}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Stake LP Tokens
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedFarm(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="unstake" className="space-y-4">
                <div className="space-y-2">
                  <Label>Amount to Unstake</Label>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    disabled={!isConnected}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setWithdrawAmount(stakedBalance)}
                    disabled={!isConnected}
                  >
                    MAX
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    variant="outline"
                    onClick={handleWithdraw}
                    disabled={!isConnected}
                  >
                    Unstake LP Tokens
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedFarm(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="claim" className="space-y-4">
                <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Claimable Rewards</span>
                    <span className="text-2xl font-bold text-gradient-accent">
                      {parseFloat(earnedRewards).toFixed(4)} SDX
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 gradient-accent glow-accent"
                    onClick={handleClaim}
                    disabled={!isConnected || parseFloat(earnedRewards) <= 0}
                  >
                    <Coins className="w-4 h-4 mr-2" />
                    Claim Rewards
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedFarm(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Button 
                className="gradient-primary"
                onClick={() => setSelectedFarm(farm.pair)}
                disabled={!isConnected}
              >
                <Lock className="w-4 h-4 mr-2" />
                Manage
              </Button>
              <Button 
                className="gradient-accent"
                onClick={handleClaim}
                disabled={!isConnected || parseFloat(earnedRewards) <= 0}
              >
                <Coins className="w-4 h-4 mr-2" />
                Claim
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 animate-fade-in gap-4">
          <div>
            <h1 className="text-5xl font-bold mb-2">
              <span className="text-gradient-primary">Yield Farms</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Stake LP tokens to earn SDX rewards
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Card className="glass-card border p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Value Locked</p>
                  <p className="text-xl font-bold text-gradient-primary">$44.3M</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {!isConnected && (
          <Card className="glass-card border p-6 mb-8 animate-slide-up">
            <div className="text-center">
              <Sprout className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
              <p className="text-muted-foreground">
                Connect your wallet to view and manage your farming positions
              </p>
            </div>
          </Card>
        )}

        <div className="space-y-6">
          {farms.map((farm, index) => (
            <div 
              key={index} 
              className="animate-slide-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FarmCard farm={farm} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Farms;
