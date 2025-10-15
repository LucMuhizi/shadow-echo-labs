import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sprout, Plus } from "lucide-react";

const Farms = () => {
  const farms = [
    { pair: "ETH/USDC", apr: "145.2%", tvl: "$12.3M", earned: "0.0", boost: "2.5x" },
    { pair: "WBTC/ETH", apr: "98.7%", tvl: "$8.1M", earned: "0.0", boost: "1.8x" },
    { pair: "USDC/USDT", apr: "67.3%", tvl: "$5.2M", earned: "0.0", boost: "1.2x" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gradient-primary">Yield Farms</h1>
            <p className="text-muted-foreground">Stake LP tokens to earn rewards</p>
          </div>
          <Button className="gradient-primary glow-primary-lg hover-glow">
            <Plus className="w-4 h-4 mr-2" />
            Create Position
          </Button>
        </div>

        <div className="space-y-4">
          {farms.map((farm, index) => (
            <Card key={index} className="glass-card-hover p-6 hover-lift animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Sprout className="w-10 h-10 text-primary animate-float" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-lg">{farm.pair}</span>
                      <Badge className="gradient-accent">{farm.boost}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">TVL: {farm.tvl}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-8 text-right">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">APR</p>
                    <p className="text-2xl font-bold text-gradient-primary">{farm.apr}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Earned</p>
                    <p className="text-lg font-semibold">{farm.earned}</p>
                  </div>
                  <Button className="gradient-primary hover-glow">Stake</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Farms;
