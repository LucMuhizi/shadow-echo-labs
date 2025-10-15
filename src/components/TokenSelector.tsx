import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";
import { TOKEN_ADDRESSES } from "@/contracts/abis";

export interface Token {
  symbol: string;
  name: string;
  address: `0x${string}`;
  logo?: string;
}

const COMMON_TOKENS: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: TOKEN_ADDRESSES.WETH,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: TOKEN_ADDRESSES.USDC,
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    address: TOKEN_ADDRESSES.USDT,
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: TOKEN_ADDRESSES.DAI,
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    address: TOKEN_ADDRESSES.WBTC,
  },
];

interface TokenSelectorProps {
  selectedToken: Token;
  onSelectToken: (token: Token) => void;
}

export const TokenSelector = ({ selectedToken, onSelectToken }: TokenSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredTokens = COMMON_TOKENS.filter(
    (token) =>
      token.symbol.toLowerCase().includes(search.toLowerCase()) ||
      token.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (token: Token) => {
    onSelectToken(token);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent" />
          {selectedToken.symbol}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle>Select a token</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search token name or address"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredTokens.map((token) => (
              <button
                key={token.address}
                onClick={() => handleSelect(token)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth text-left"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                <div>
                  <p className="font-semibold">{token.symbol}</p>
                  <p className="text-sm text-muted-foreground">{token.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
