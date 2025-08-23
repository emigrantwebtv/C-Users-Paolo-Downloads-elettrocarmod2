import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import ChiSiamo from "@/pages/ChiSiamo";
import Officina from "@/pages/Officina";
import Autolavaggio from "@/pages/Autolavaggio";
import Ebikes from "@/pages/Ebikes";
import Bar from "@/pages/Bar";
import DoveSiamo from "@/pages/DoveSiamo";
import Gallery from "@/pages/Gallery";
import Contatti from "@/pages/Contatti";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/chi-siamo" component={ChiSiamo} />
      <Route path="/officina" component={Officina} />
      <Route path="/autolavaggio" component={Autolavaggio} />
      <Route path="/ebikes" component={Ebikes} />
      <Route path="/bar" component={Bar} />
      <Route path="/dove-siamo" component={DoveSiamo} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contatti" component={Contatti} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
