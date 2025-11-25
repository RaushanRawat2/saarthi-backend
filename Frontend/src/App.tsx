import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext"; // ✅ wrap everything with AuthProvider


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const VirtualTours = lazy(() => import("./pages/VirtualTours"));
const InteractiveMap = lazy(() => import("./pages/InteractiveMap"));
const DigitalArchives = lazy(() => import("./pages/DigitalArchives"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const ParticipationPage = lazy(() => import("./pages/ParticipationPage"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const CulturalCalendar = lazy(() => import("./pages/CulturalCalendar"));
const AudioGuides = lazy(() => import("./pages/AudioGuides"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SettingsPage = lazy(() => import("./pages/Settings")); // ✅ Added

// Loading spinner component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        {/* ✅ AuthProvider wraps BrowserRouter so useContext(AuthContext) works everywhere */}
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<Index />} />
              <Route path="/tours" element={<VirtualTours />} />
              <Route path="/map" element={<InteractiveMap />} />
              <Route path="/archives" element={<DigitalArchives />} />
              <Route path="/calendar" element={<CulturalCalendar />} />
              <Route path="/audio-guides" element={<AudioGuides />} />

              {/* Tourist Features */}
              <Route path="/book" element={<BookingPage />} />
              <Route path="/participate" element={<ParticipationPage />} />

              {/* Admin Section */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute role="admin">
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />

              {/* Auth Pages */}
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <SettingsPage />
                  </PrivateRoute>
                }
              />

              {/* Catch-All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
