
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/providers/QueryProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnhancedIndex from "./pages/EnhancedIndex";
import EnhancedProfile from "./pages/EnhancedProfile";
import EnhancedGroups from "./pages/EnhancedGroups";
import EnhancedFriends from "./pages/EnhancedFriends";
import EnhancedMessages from "./pages/EnhancedMessages";
import Notifications from "./pages/Notifications";
import Watch from "./pages/Watch";
import EnhancedMarketplace from "./pages/EnhancedMarketplace";
import EnhancedEvents from "./pages/EnhancedEvents";
import Saved from "./pages/Saved";
import EnhancedMemories from "./pages/EnhancedMemories";
import TrendingPage from "./components/TrendingPage";
import Recent from "./pages/Recent";
import Pages from "./pages/Pages";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <QueryProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<EnhancedIndex />} />
            <Route path="/profile" element={<EnhancedProfile />} />
            <Route path="/groups" element={<EnhancedGroups />} />
            <Route path="/friends" element={<EnhancedFriends />} />
            <Route path="/messages" element={<EnhancedMessages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/marketplace" element={<EnhancedMarketplace />} />
            <Route path="/events" element={<EnhancedEvents />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/memories" element={<EnhancedMemories />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/pages" element={<Pages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryProvider>
  );
}

export default App;
