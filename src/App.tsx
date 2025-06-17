import React, { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { ROUTES } from "@/lib/constants";

// Lazy-loaded pages for better performance
const Auth = lazy(() => import("./pages/Auth"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Groups = lazy(() => import("./pages/Groups"));
const Friends = lazy(() => import("./pages/Friends"));
const Messages = lazy(() => import("./pages/Messages"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Watch = lazy(() => import("./pages/Watch"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const Events = lazy(() => import("./pages/Events"));
const Saved = lazy(() => import("./pages/Saved"));
const Memories = lazy(() => import("./pages/Memories"));
const TrendingPage = lazy(() => import("./components/TrendingPage"));
const Recent = lazy(() => import("./pages/Recent"));
const Pages = lazy(() => import("./pages/Pages"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster position="top-right" closeButton richColors />
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Auth route - no layout */}
                  <Route path={ROUTES.AUTH} element={<Auth />} />
                  
                  {/* Main routes with layout */}
                  <Route path={ROUTES.HOME} element={
                    <AppLayout>
                      <Home />
                    </AppLayout>
                  } />
                  <Route path={ROUTES.PROFILE} element={
                    <AppLayout>
                      <Profile />
                    </AppLayout>
                  } />
                  <Route path={ROUTES.GROUPS} element={
                    <AppLayout>
                      <Groups />
                    </AppLayout>
                  } />
                  <Route path={ROUTES.FRIENDS} element={
                    <AppLayout>
                      <Friends />
                    </AppLayout>
                  } />
                  <Route path={ROUTES.MESSAGES} element={
                    <AppLayout>
                      <Messages />
                    </AppLayout>
                  } />
                  <Route path={ROUTES.NOTIFICATIONS} element={
                    <AppLayout>
                      <Notifications />
                    </AppLayout>
                  } />
                  <Route path={ROUTES.WATCH} element={
                    <AppLayout>
                      <Watch />
                    </AppLayout>
                  } />
                  <Route path="/trending" element={
                    <AppLayout>
                      <TrendingPage />
                    </AppLayout>
                  } />
                  <Route path={ROUTES.MARKETPLACE} element={
                    <AppLayout>
                      <Marketplace />
                    </AppLayout>
                  } />
                  <Route path={ROUTES.EVENTS} element={
                    <AppLayout>
                      <Events />
                    </AppLayout>
                  } />
                  <Route path={ROUTES.SAVED} element={
                    <AppLayout>
                      <Saved />
                    </AppLayout>
                  } />
                  <Route path={ROUTES.MEMORIES} element={
                    <AppLayout>
                      <Memories />
                    </AppLayout>
                  } />
                  <Route path="/recent" element={
                    <AppLayout>
                      <Recent />
                    </AppLayout>
                  } />
                  <Route path="/pages" element={
                    <AppLayout>
                      <Pages />
                    </AppLayout>
                  } />
                  <Route path={ROUTES.SETTINGS} element={
                    <AppLayout>
                      <Settings />
                    </AppLayout>
                  } />
                  
                  {/* 404 route */}
                  <Route path="/not-found" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/not-found" replace />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;