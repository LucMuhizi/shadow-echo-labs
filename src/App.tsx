import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { config } from './config/wagmi';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Swap from "./pages/Swap";
import Liquidity from "./pages/Liquidity";
import Vote from "./pages/Vote";
import Analytics from "./pages/Analytics";
import Farms from "./pages/Farms";
import Tokenomics from "./pages/Tokenomics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider theme={darkTheme({
        accentColor: 'hsl(270, 70%, 60%)',
        accentColorForeground: 'white',
        borderRadius: 'large',
      })}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen w-full">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/swap" element={<Swap />} />
                <Route path="/liquidity" element={<Liquidity />} />
                <Route path="/farms" element={<Farms />} />
                <Route path="/vote" element={<Vote />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/tokenomics" element={<Tokenomics />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
