
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./components/layout/MainLayout";
import SettingsLayout from "./components/layout/SettingsLayout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SettingsIndex from "./pages/settings/SettingsIndex";
import ProfileSettings from "./pages/settings/ProfileSettings";
import AccountSettings from "./pages/settings/AccountSettings";
import PrivacySettings from "./pages/settings/PrivacySettings";
import NotificationSettings from "./pages/settings/NotificationSettings";
import SavedPosts from "./pages/settings/SavedPosts";
import MyBookings from "./pages/settings/MyBookings";
import MyGarage from "./pages/settings/MyGarage";
import AppearanceSettings from "./pages/settings/AppearanceSettings";
import HelpSupport from "./pages/settings/HelpSupport";
import ReportProblem from "./pages/settings/ReportProblem";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            
            {/* Settings Routes */}
            <Route path="/settings" element={<SettingsLayout />}>
              <Route index element={<SettingsIndex />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="account" element={<AccountSettings />} />
              <Route path="privacy" element={<PrivacySettings />} />
              <Route path="notifications" element={<NotificationSettings />} />
              <Route path="saved" element={<SavedPosts />} />
              <Route path="bookings" element={<MyBookings />} />
              <Route path="garage" element={<MyGarage />} />
              <Route path="appearance" element={<AppearanceSettings />} />
              <Route path="help" element={<HelpSupport />} />
              <Route path="report" element={<ReportProblem />} />
            </Route>
          </Route>
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
