import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, TrendingUp, Gift } from "lucide-react";

const Vote = () => {
  const gauges = [
    {
      pair: "ETH/USDC",
      votes: "12.4M",
      percentage: 35,
      bribes: "$45.2K",
      apr: "24.5%",
    },
    {
      pair: "WBTC/ETH",
      votes: "8.9M",
      percentage: 25,
      bribes: "$32.1K",
      apr: "18.3%",
    },
    {
      pair: "USDC/USDT",
      votes: "7.1M",
      percentage: 20,
      bribes: "$28.4K",
      apr: "15.2%",
    },
    {
      pair: "DAI/USDC",
      votes: "5.2M",
      percentage: 15,
      bribes: "$19.8K",
      apr: "12.7%",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Vote & Earn</h1>
          <p className="text-muted-foreground">
            Lock tokens to vote on emissions and earn bribes from protocols
          </p>
        </div>

        {/* Lock Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="glass-card p-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Your veSDX</p>
                <p className="text-2xl font-bold">0.00</p>
              </div>
            </div>
            <Button className="w-full gradient-primary transition-smooth hover:scale-105">
              Lock Tokens
            </Button>
          </Card>

          <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Voting Power</p>
                <p className="text-2xl font-bold">0.00%</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Lock ends: --</p>
          </Card>

          <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bribes Earned</p>
                <p className="text-2xl font-bold">$0.00</p>
              </div>
            </div>
            <Button variant="outline" className="w-full border-green-500/50 hover:bg-green-500/10">
              Claim Rewards
            </Button>
          </Card>
        </div>

        {/* Gauges */}
        <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Active Gauges</h2>
            <div className="flex gap-2">
              <Badge variant="secondary">Epoch 42</Badge>
              <Badge variant="outline">5d 12h remaining</Badge>
            </div>
          </div>

          <div className="space-y-4">
            {gauges.map((gauge, index) => (
              <div
                key={index}
                className="glass-card p-5 rounded-lg border border-border/50 hover:border-primary/50 transition-smooth"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary border-2 border-background" />
                      <div className="w-10 h-10 rounded-full bg-accent border-2 border-background" />
                    </div>
                    <div>
                      <span className="font-semibold text-lg">{gauge.pair}</span>
                      <p className="text-sm text-muted-foreground">{gauge.votes} votes</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Bribes</p>
                      <p className="text-lg font-bold text-green-500">{gauge.bribes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">APR</p>
                      <p className="text-lg font-bold">{gauge.apr}</p>
                    </div>
                    <Button className="gradient-primary transition-smooth hover:scale-105">
                      Vote
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Vote Share</span>
                    <span className="font-semibold">{gauge.percentage}%</span>
                  </div>
                  <Progress value={gauge.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Vote;
