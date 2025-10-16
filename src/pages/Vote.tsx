import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Lock, TrendingUp, Gift, Vote as VoteIcon, Clock } from "lucide-react";
import { useVeSDX } from "@/hooks/useVeSDX";
import { useVoting } from "@/hooks/useVoting";
import { useWallet } from "@/hooks/useWallet";
import { useState } from "react";
import { toast } from "sonner";

const Vote = () => {
  const { isConnected } = useWallet();
  const { sdxBalance, veNFTCount, createLock, calculateVotingPower, TOKENOMICS } = useVeSDX();
  const { vote, claimBribes, claimFees } = useVoting();
  
  const [lockAmount, setLockAmount] = useState('');
  const [lockWeeks, setLockWeeks] = useState(52); // Default 1 year
  const [selectedGauges, setSelectedGauges] = useState<{ [key: string]: number }>({});

  const lockDurationSeconds = lockWeeks * 7 * 86400;
  const votingPower = lockAmount ? calculateVotingPower(parseFloat(lockAmount), lockDurationSeconds) : 0;
  const maxLockYears = TOKENOMICS.MAX_LOCK_TIME / (365 * 86400);

  const handleCreateLock = async () => {
    if (!lockAmount || parseFloat(lockAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    try {
      await createLock(lockAmount, lockDurationSeconds);
      setLockAmount('');
    } catch (error) {
      console.error('Lock creation failed:', error);
    }
  };

  const handleVote = async (gaugeAddress: string) => {
    if (veNFTCount === 0) {
      toast.error('Please create a veSDX lock first');
      return;
    }
    
    const weight = selectedGauges[gaugeAddress] || 0;
    if (weight <= 0) {
      toast.error('Please allocate voting power');
      return;
    }

    try {
      await vote(BigInt(1), [gaugeAddress as `0x${string}`], [BigInt(weight * 100)]);
    } catch (error) {
      console.error('Voting failed:', error);
    }
  };

  const handleClaimRewards = async () => {
    if (veNFTCount === 0) {
      toast.error('No veSDX NFT found');
      return;
    }

    const gaugeAddresses = gauges.map(g => g.address as `0x${string}`);
    
    try {
      await claimBribes(gaugeAddresses, BigInt(1));
      await claimFees(gaugeAddresses, BigInt(1));
    } catch (error) {
      console.error('Claim failed:', error);
    }
  };

  const gauges = [
    { name: "ETH/USDC", votes: "2.4M", bribes: "$45,000", apr: "34.5%", address: "0x0000000000000000000000000000000000000001", percentage: 35 },
    { name: "WBTC/ETH", votes: "1.8M", bribes: "$32,000", apr: "28.3%", address: "0x0000000000000000000000000000000000000002", percentage: 25 },
    { name: "SDX/ETH", votes: "3.1M", bribes: "$67,000", apr: "42.1%", address: "0x0000000000000000000000000000000000000003", percentage: 40 },
    { name: "USDC/USDT", votes: "1.2M", bribes: "$18,000", apr: "21.7%", address: "0x0000000000000000000000000000000000000004", percentage: 20 },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-5xl font-bold">
              <span className="text-gradient-primary">Vote & Earn</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Lock SDX tokens to receive veSDX and vote on liquidity incentives
            </p>
            {!isConnected && (
              <Badge variant="outline" className="text-sm border-accent/50">
                Connect wallet to participate in governance
              </Badge>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
            <Card className="glass-card-hover border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Your veSDX
                </CardTitle>
                <CardDescription>Current voting power</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gradient-primary">
                  {votingPower.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  From {veNFTCount} NFT{veNFTCount !== 1 ? 's' : ''}
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card-hover border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Lock SDX
                </CardTitle>
                <CardDescription>Lock SDX to get veSDX voting power</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="lock-amount">Amount to Lock</Label>
                  <div className="flex gap-2">
                    <Input
                      id="lock-amount"
                      type="number"
                      placeholder="0.0"
                      value={lockAmount}
                      onChange={(e) => setLockAmount(e.target.value)}
                      disabled={!isConnected}
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => setLockAmount(sdxBalance)}
                      disabled={!isConnected}
                    >
                      MAX
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Balance: {parseFloat(sdxBalance).toFixed(4)} SDX
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Lock Duration</Label>
                    <Badge variant="secondary">
                      {lockWeeks} weeks ({(lockWeeks / 52).toFixed(1)} years)
                    </Badge>
                  </div>
                  <Slider
                    value={[lockWeeks]}
                    onValueChange={(value) => setLockWeeks(value[0])}
                    min={1}
                    max={208}
                    step={1}
                    disabled={!isConnected}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 week</span>
                    <span>{maxLockYears} years (max)</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">You will receive</span>
                    <span className="text-lg font-bold text-gradient-primary">
                      {votingPower.toFixed(4)} veSDX
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Unlock in {lockWeeks} weeks</span>
                  </div>
                </div>

                <Button 
                  className="w-full gradient-primary glow-primary hover:scale-105 transition-smooth"
                  onClick={handleCreateLock}
                  disabled={!isConnected || !lockAmount || parseFloat(lockAmount) <= 0}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Create Lock
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card-hover border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-accent" />
                  Rewards
                </CardTitle>
                <CardDescription>Your accumulated rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full gradient-accent glow-accent hover:scale-105 transition-smooth"
                  onClick={handleClaimRewards}
                  disabled={!isConnected || veNFTCount === 0}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Claim All Rewards
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Gauges Section */}
          <Card className="glass-card border animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Active Gauges</CardTitle>
                  <CardDescription>Vote to direct SDX emissions</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">Epoch 42</Badge>
                  <Badge variant="outline">5d 12h remaining</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {gauges.map((gauge, index) => (
                <div
                  key={index}
                  className="glass-card p-5 rounded-lg border border-border/50 hover:border-primary/30 transition-smooth hover-lift"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-primary border-2 border-background" />
                          <div className="w-10 h-10 rounded-full bg-gradient-accent border-2 border-background" />
                        </div>
                        <div>
                          <span className="font-semibold text-lg">{gauge.name}</span>
                          <p className="text-sm text-muted-foreground">{gauge.votes} votes</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Bribes</p>
                          <p className="text-lg font-bold text-green-400">{gauge.bribes}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">APR</p>
                          <p className="text-lg font-bold text-gradient-accent">{gauge.apr}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Vote Share</span>
                          <span className="font-semibold">{gauge.percentage}%</span>
                        </div>
                        <Progress value={gauge.percentage} className="h-2" />
                      </div>
                      
                      <Input
                        type="number"
                        placeholder="% of votes"
                        className="w-28"
                        value={selectedGauges[gauge.address] || ''}
                        onChange={(e) => setSelectedGauges({
                          ...selectedGauges,
                          [gauge.address]: parseFloat(e.target.value) || 0
                        })}
                        disabled={!isConnected || veNFTCount === 0}
                        min="0"
                        max="100"
                      />
                      
                      <Button 
                        className="gradient-primary hover:scale-105 transition-smooth"
                        onClick={() => handleVote(gauge.address)}
                        disabled={!isConnected || veNFTCount === 0}
                      >
                        <VoteIcon className="w-4 h-4 mr-2" />
                        Vote
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Vote;
