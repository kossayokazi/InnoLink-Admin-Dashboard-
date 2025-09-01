import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tendances from "./pages/Tendances";
import MatchingsIA from "./pages/MatchingsIA";
import ConfigurationIA from "./pages/ConfigurationIA";
import Utilisateurs from "./pages/Utilisateurs";
import Projets from "./pages/Projets";
import Parametres from "./pages/Parametres";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tendances" element={<Tendances />} />
          <Route path="/matchings" element={<MatchingsIA />} />
          <Route path="/configuration-ia" element={<ConfigurationIA />} />
          <Route path="/utilisateurs" element={<Utilisateurs />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/parametres" element={<Parametres />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
