import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, Copy, Check, Shield } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWallet } from "@/hooks/useWallet";
import { useOwnerControls } from "@/hooks/useOwnerControls";
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const { address, isConnected, chain, balance, disconnect, shortenAddress } = useWallet();
  const { isOwner } = useOwnerControls();
  const [copied, setCopied] = useState(false);

  const isAnyOwner = isOwner('SDX') || isOwner('VE_SDX') || isOwner('VOTER');
  
  const navItems = [
    { name: "Swap", path: "/swap" },
    { name: "Liquidity", path: "/liquidity" },
    { name: "Farms", path: "/farms" },
    { name: "Vote", path: "/vote" },
    { name: "Analytics", path: "/analytics" },
    { name: "Tokenomics", path: "/tokenomics" },
  ];
  
  const isActive = (path: string) => location.pathname === path;

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Address copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
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
          
          {isConnected && address ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gradient-primary glow-primary transition-smooth hover:scale-105">
                  <Wallet className="w-4 h-4 mr-2" />
                  {shortenAddress(address)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card w-64">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Connected Wallet</p>
                    <p className="text-xs text-muted-foreground">{chain?.name}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start py-3">
                  <span className="text-xs text-muted-foreground">Balance</span>
                  <span className="text-lg font-bold gradient-primary bg-clip-text text-transparent">
                    {balance} {chain?.nativeCurrency?.symbol}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
                  {copied ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  Copy Address
                </DropdownMenuItem>
                {isAnyOwner && (
                  <Link to="/admin">
                    <DropdownMenuItem className="cursor-pointer">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Panel
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem onClick={() => disconnect()} className="cursor-pointer text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <Button 
                  onClick={openConnectModal}
                  className="gradient-primary glow-primary transition-smooth hover:scale-105"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </ConnectButton.Custom>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
