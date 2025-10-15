import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Settings, ChevronDown } from "lucide-react";

const Swap = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-lg">
        <Card className="glass-card p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Swap</h2>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* From Token */}
          <div className="space-y-2 mb-2">
            <label className="text-sm text-muted-foreground">From</label>
            <div className="glass-card p-4 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <Input
                  type="text"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="bg-transparent border-none text-2xl font-semibold p-0 focus-visible:ring-0"
                />
                <Button variant="secondary" className="gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary" />
                  ETH
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Balance: 0.0</p>
            </div>
          </div>

          {/* Swap Direction Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full border-4 border-background hover:rotate-180 transition-all duration-300"
            >
              <ArrowDownUp className="w-4 h-4" />
            </Button>
          </div>

          {/* To Token */}
          <div className="space-y-2 mb-6">
            <label className="text-sm text-muted-foreground">To</label>
            <div className="glass-card p-4 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <Input
                  type="text"
                  placeholder="0.0"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  className="bg-transparent border-none text-2xl font-semibold p-0 focus-visible:ring-0"
                />
                <Button variant="secondary" className="gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent" />
                  USDC
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Balance: 0.0</p>
            </div>
          </div>

          {/* Swap Info */}
          <div className="glass-card p-4 rounded-lg border border-border/50 mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rate</span>
              <span>1 ETH = 2,450.34 USDC</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price Impact</span>
              <span className="text-green-500">{"<0.01%"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fee</span>
              <span>0.3%</span>
            </div>
          </div>

          <Button className="w-full gradient-primary glow-primary transition-smooth hover:scale-105" size="lg">
            Connect Wallet
          </Button>
        </Card>

        {/* Recent Swaps */}
        <Card className="glass-card p-6 mt-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h3 className="text-lg font-semibold mb-4">Recent Swaps</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary border-2 border-background" />
                    <div className="w-8 h-8 rounded-full bg-accent border-2 border-background" />
                  </div>
                  <span className="text-sm">ETH → USDC</span>
                </div>
                <span className="text-sm text-muted-foreground">2m ago</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Swap;
