import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Droplets, Vote, TrendingUp, Lock } from "lucide-react";

const Home = () => {
  const stats = [
    { label: "Total Value Locked", value: "$124.5M", icon: Lock },
    { label: "24h Volume", value: "$8.2M", icon: TrendingUp },
    { label: "Total Pools", value: "156", icon: Droplets },
    { label: "Active Voters", value: "2,847", icon: Vote },
  ];

  const features = [
    {
      icon: Droplets,
      title: "Deep Liquidity",
      description: "Provide liquidity and earn rewards through our optimized AMM pools",
    },
    {
      icon: Vote,
      title: "ve(3,3) Voting",
      description: "Lock tokens to vote on emissions and earn bribes from protocols",
    },
    {
      icon: TrendingUp,
      title: "Optimized Trading",
      description: "Best prices through intelligent routing across all liquidity pools",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Next Generation{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              ve(3,3) DEX
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Trade, earn, and govern with the most efficient decentralized exchange built on ve(3,3) tokenomics
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/swap">
              <Button size="lg" className="gradient-primary glow-primary transition-smooth hover:scale-105">
                Start Trading
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/liquidity">
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 transition-smooth">
                Add Liquidity
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="glass-card p-6 text-center transition-smooth hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <p className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 pb-32">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Shadow DEX?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="glass-card p-8 transition-smooth hover:scale-105 hover:glow-primary animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
