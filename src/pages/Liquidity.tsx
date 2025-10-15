import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp } from "lucide-react";

const Liquidity = () => {
  const pools = [
    {
      pair: "ETH/USDC",
      tvl: "$45.2M",
      apr: "24.5%",
      volume24h: "$3.2M",
      type: "Stable",
    },
    {
      pair: "WBTC/ETH",
      tvl: "$32.1M",
      apr: "18.3%",
      volume24h: "$2.1M",
      type: "Volatile",
    },
    {
      pair: "USDC/USDT",
      tvl: "$28.4M",
      apr: "12.7%",
      volume24h: "$1.8M",
      type: "Stable",
    },
    {
      pair: "DAI/USDC",
      tvl: "$19.8M",
      apr: "15.2%",
      volume24h: "$1.2M",
      type: "Stable",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold mb-2">Liquidity Pools</h1>
            <p className="text-muted-foreground">
              Provide liquidity and earn trading fees plus token emissions
            </p>
          </div>
          <Button className="gradient-primary glow-primary transition-smooth hover:scale-105">
            <Plus className="w-4 h-4 mr-2" />
            Add Liquidity
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="glass-card p-6 animate-slide-up">
            <p className="text-sm text-muted-foreground mb-2">Your Liquidity</p>
            <p className="text-3xl font-bold mb-1">$0.00</p>
            <p className="text-sm text-green-500">+0.00%</p>
          </Card>
          <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <p className="text-sm text-muted-foreground mb-2">Your Earnings</p>
            <p className="text-3xl font-bold mb-1">$0.00</p>
            <p className="text-sm text-muted-foreground">Unclaimed</p>
          </Card>
          <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-sm text-muted-foreground mb-2">Pools</p>
            <p className="text-3xl font-bold mb-1">156</p>
            <p className="text-sm text-muted-foreground">Active Pairs</p>
          </Card>
        </div>

        {/* Pools List */}
        <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Top Pools</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                All
              </Button>
              <Button variant="ghost" size="sm">
                Stable
              </Button>
              <Button variant="ghost" size="sm">
                Volatile
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {pools.map((pool, index) => (
              <div
                key={index}
                className="glass-card p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-smooth hover:scale-[1.02] cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary border-2 border-background" />
                      <div className="w-10 h-10 rounded-full bg-accent border-2 border-background" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{pool.pair}</span>
                        <Badge
                          variant={pool.type === "Stable" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {pool.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">TVL: {pool.tvl}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-8 text-right">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">APR</p>
                      <p className="text-lg font-bold text-green-500">{pool.apr}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
                      <p className="text-lg font-semibold">{pool.volume24h}</p>
                    </div>
                    <div className="flex items-center">
                      <Button className="gradient-primary transition-smooth hover:scale-105">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Deposit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Liquidity;
