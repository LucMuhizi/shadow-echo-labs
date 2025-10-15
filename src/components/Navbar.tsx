import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Swap", path: "/swap" },
    { name: "Liquidity", path: "/liquidity" },
    { name: "Vote", path: "/vote" },
    { name: "Analytics", path: "/analytics" },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center glow-primary">
              <span className="text-2xl font-bold">S</span>
            </div>
            <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
              Shadow DEX
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-smooth hover:text-primary ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <Button className="gradient-primary glow-primary transition-smooth hover:scale-105">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
