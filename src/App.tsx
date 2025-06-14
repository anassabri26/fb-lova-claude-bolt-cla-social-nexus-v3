
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/providers/QueryProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnhancedIndex from "./pages/EnhancedIndex";
import Profile from "./pages/Profile";
import Groups from "./pages/Groups";
import Friends from "./pages/Friends";
import EnhancedMessages from "./pages/EnhancedMessages";
import Notifications from "./pages/Notifications";
import Watch from "./pages/Watch";
import Marketplace from "./pages/Marketplace";
import EnhancedEvents from "./pages/EnhancedEvents";
import Saved from "./pages/Saved";
import Memories from "./pages/Memories";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <QueryProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<EnhancedIndex />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/messages" element={<EnhancedMessages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/events" element={<EnhancedEvents />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryProvider>
  );
}

export default App;
