import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";

const Analytics = () => {
  const topPairs = [
    { pair: "ETH/USDC", volume: "$3.2M", change: "+12.4%", positive: true },
    { pair: "WBTC/ETH", volume: "$2.1M", change: "+8.7%", positive: true },
    { pair: "USDC/USDT", volume: "$1.8M", change: "-2.3%", positive: false },
    { pair: "DAI/USDC", volume: "$1.2M", change: "+5.1%", positive: true },
  ];

  const topTokens = [
    { token: "ETH", price: "$2,450.34", change: "+3.2%", positive: true },
    { token: "WBTC", price: "$45,234.12", change: "+2.8%", positive: true },
    { token: "USDC", price: "$1.00", change: "+0.01%", positive: true },
    { token: "DAI", price: "$0.9998", change: "-0.02%", positive: false },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Real-time protocol metrics and trading statistics
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card p-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">TVL</p>
                <p className="text-2xl font-bold">$124.5M</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-green-500 gap-1">
              <TrendingUp className="w-3 h-3" />
              +8.2%
            </Badge>
          </Card>

          <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 gradient-accent rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">24h Volume</p>
                <p className="text-2xl font-bold">$8.2M</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-green-500 gap-1">
              <TrendingUp className="w-3 h-3" />
              +12.4%
            </Badge>
          </Card>

          <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">24h Fees</p>
                <p className="text-2xl font-bold">$24.6K</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-green-500 gap-1">
              <TrendingUp className="w-3 h-3" />
              +15.7%
            </Badge>
          </Card>

          <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">24h Txns</p>
                <p className="text-2xl font-bold">8,234</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-green-500 gap-1">
              <TrendingUp className="w-3 h-3" />
              +6.3%
            </Badge>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Pairs */}
          <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-xl font-bold mb-4">Top Trading Pairs</h2>
            <div className="space-y-3">
              {topPairs.map((pair, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground font-medium w-6">{index + 1}</span>
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary border-2 border-background" />
                      <div className="w-8 h-8 rounded-full bg-accent border-2 border-background" />
                    </div>
                    <span className="font-semibold">{pair.pair}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{pair.volume}</p>
                    <p
                      className={`text-sm flex items-center gap-1 ${
                        pair.positive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {pair.positive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {pair.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Tokens */}
          <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <h2 className="text-xl font-bold mb-4">Top Tokens</h2>
            <div className="space-y-3">
              {topTokens.map((token, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground font-medium w-6">{index + 1}</span>
                    <div className="w-8 h-8 rounded-full bg-primary border-2 border-background" />
                    <span className="font-semibold">{token.token}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{token.price}</p>
                    <p
                      className={`text-sm flex items-center gap-1 ${
                        token.positive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {token.positive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {token.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
