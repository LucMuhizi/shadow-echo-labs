import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Coins, TrendingDown, Lock, Users, Zap, Gift } from "lucide-react";
import { TOKENOMICS, CONTRACT_ADDRESSES } from "@/contracts/tokenContracts";

const Tokenomics = () => {
  const distribution = [
    { label: "Initial Liquidity", percentage: 20, amount: 20_000_000, color: "bg-primary" },
    { label: "Community Emissions", percentage: 50, amount: 50_000_000, color: "bg-accent" },
    { label: "Team & Development", percentage: 15, amount: 15_000_000, color: "bg-purple-500" },
    { label: "Treasury", percentage: 10, amount: 10_000_000, color: "bg-blue-500" },
    { label: "Partnerships", percentage: 5, amount: 5_000_000, color: "bg-green-500" },
  ];

  const emissionSchedule = [
    { week: "Week 1", emission: "2,000,000", decay: "0%", cumulative: "2.0M" },
    { week: "Week 10", emission: "1,826,676", decay: "8.66%", cumulative: "19.1M" },
    { week: "Week 52", emission: "1,216,653", decay: "39.17%", cumulative: "86.4M" },
    { week: "Week 104", emission: "742,741", decay: "62.86%", cumulative: "149.3M" },
    { week: "Week 208", emission: "270,598", decay: "86.47%", cumulative: "232.7M" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-5xl font-bold">
              <span className="text-gradient-primary">SDX Tokenomics</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understanding the ve(3,3) model powering Shadow DEX
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge variant="outline" className="text-sm">
                <Coins className="w-3 h-3 mr-1" />
                100M Total Supply
              </Badge>
              <Badge variant="outline" className="text-sm">
                <TrendingDown className="w-3 h-3 mr-1" />
                1% Weekly Decay
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Lock className="w-3 h-3 mr-1" />
                4 Year Max Lock
              </Badge>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
            <Card className="glass-card-hover border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-primary" />
                  Initial Supply
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gradient-primary">
                  {TOKENOMICS.INITIAL_SUPPLY.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">SDX tokens</p>
              </CardContent>
            </Card>

            <Card className="glass-card-hover border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Weekly Emissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gradient-accent">
                  {TOKENOMICS.INITIAL_WEEKLY_EMISSION.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Starting rate</p>
              </CardContent>
            </Card>

            <Card className="glass-card-hover border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-purple-500" />
                  Emission Decay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gradient-primary">
                  {(TOKENOMICS.WEEKLY_EMISSION_DECAY * 100).toFixed(0)}%
                </p>
                <p className="text-sm text-muted-foreground mt-1">Per week</p>
              </CardContent>
            </Card>
          </div>

          {/* Token Distribution */}
          <Card className="glass-card border animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="text-2xl">Token Distribution</CardTitle>
              <CardDescription>Initial allocation of 100M SDX tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {distribution.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{item.amount.toLocaleString()}</span>
                      <span className="text-muted-foreground ml-2">({item.percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Emission Schedule */}
          <Card className="glass-card border animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="text-2xl">Emission Schedule</CardTitle>
              <CardDescription>
                Weekly emissions with {(TOKENOMICS.WEEKLY_EMISSION_DECAY * 100).toFixed(0)}% decay rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">Period</th>
                      <th className="text-right py-3 px-4">Weekly Emission</th>
                      <th className="text-right py-3 px-4">Total Decay</th>
                      <th className="text-right py-3 px-4">Cumulative</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emissionSchedule.map((row, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/5 transition-colors">
                        <td className="py-4 px-4 font-medium">{row.week}</td>
                        <td className="text-right py-4 px-4">{row.emission} SDX</td>
                        <td className="text-right py-4 px-4 text-red-400">{row.decay}</td>
                        <td className="text-right py-4 px-4 text-gradient-primary font-bold">{row.cumulative}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* ve(3,3) Model Explanation */}
          <Card className="glass-card border animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <CardTitle className="text-2xl">The ve(3,3) Model</CardTitle>
              <CardDescription>How Shadow DEX aligns incentives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">Lock for Power</h3>
                  <p className="text-sm text-muted-foreground">
                    Lock SDX tokens for up to 4 years to receive veSDX NFTs with voting power proportional to lock duration.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-lg">Vote on Emissions</h3>
                  <p className="text-sm text-muted-foreground">
                    Direct weekly SDX emissions to liquidity pools of your choice, influencing where rewards flow.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="font-bold text-lg">Earn Rewards</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive trading fees, protocol bribes, and weekly rebases to combat dilution from emissions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contract Addresses */}
          <Card className="glass-card border animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle className="text-2xl">Contract Addresses</CardTitle>
              <CardDescription>Core protocol contracts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/5">
                <span className="font-medium">SDX Token</span>
                <code className="text-xs text-muted-foreground">{CONTRACT_ADDRESSES.SDX_TOKEN}</code>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/5">
                <span className="font-medium">veSDX (Voting Escrow)</span>
                <code className="text-xs text-muted-foreground">{CONTRACT_ADDRESSES.VE_SDX}</code>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/5">
                <span className="font-medium">Voter Contract</span>
                <code className="text-xs text-muted-foreground">{CONTRACT_ADDRESSES.VOTER}</code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
