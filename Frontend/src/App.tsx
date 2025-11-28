import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./context/AuthContext";

// Lazy-loaded pages - Your existing pages
const Index = lazy(() => import("./pages/Index"));
const VirtualTours = lazy(() => import("./pages/VirtualTours"));
const InteractiveMap = lazy(() => import("./pages/InteractiveMap"));
const DigitalArchives = lazy(() => import("./pages/DigitalArchives"));
const CulturalCalendar = lazy(() => import("./pages/CulturalCalendar"));
const AudioGuides = lazy(() => import("./pages/AudioGuides"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy-loaded pages - Monastery Booking System Pages
const Home = lazy(() => import("./pages/Home"));
const Events = lazy(() => import("./pages/Events"));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const Bookings = lazy(() => import("./pages/Bookings"));
const ParticipationPage = lazy(() => import("./pages/ParticipationPage"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

// Lazy-loaded Admin Pages
const AdminDashboard = lazy(() => import("./pages/Admin/Dashboard"));
const AdminEvents = lazy(() => import("./pages/Admin/Events"));
const AdminBookings = lazy(() => import("./pages/Admin/Bookings"));
const QRScanner = lazy(() => import("./pages/Admin/QRScanner"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// ✅ ProtectedRoute for authenticated users
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

// ✅ AdminRoute for admin users only
const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return user && (user.role === 'admin' || user.role === 'monastery_admin') ? children : <Navigate to="/" replace />;
};

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />

    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Pages - Your existing routes */}
        <Route path="/" element={<Index />} />
        <Route path="/tours" element={<VirtualTours />} />
        <Route path="/map" element={<InteractiveMap />} />
        <Route path="/archives" element={<DigitalArchives />} />
        <Route path="/calendar" element={<CulturalCalendar />} />
        <Route path="/audio-guides" element={<AudioGuides />} />

        {/* Monastery Booking System Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/participate" element={<ParticipationPage />} />

        {/* Auth Pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes for authenticated users */}
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <AdminRoute>
              <AdminEvents />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <AdminRoute>
              <AdminBookings />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/qr-scanner"
          element={
            <AdminRoute>
              <QRScanner />
            </AdminRoute>
          }
        />

        {/* Not Found + Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </TooltipProvider>
);

export default App;