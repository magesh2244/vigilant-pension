import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PensionerLogin from "./pages/PensionerLogin";
import AdminLogin from "./pages/AdminLogin";
import PensionerDashboard from "./pages/PensionerDashboard";
import PensionerLifeCertificate from "./pages/PensionerLifeCertificate";
import PensionerComplaints from "./pages/PensionerComplaints";
import PensionerContact from "./pages/PensionerContact";
import PensionerAbout from "./pages/PensionerAbout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCertificates from "./pages/AdminCertificates";
import AdminComplaints from "./pages/AdminComplaints";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pensioner-login" element={<PensionerLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/pensioner-dashboard" element={<PensionerDashboard />} />
          <Route path="/pensioner-life-certificate" element={<PensionerLifeCertificate />} />
          <Route path="/pensioner-complaints" element={<PensionerComplaints />} />
          <Route path="/pensioner-contact" element={<PensionerContact />} />
          <Route path="/pensioner-about" element={<PensionerAbout />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-certificates" element={<AdminCertificates />} />
          <Route path="/admin-complaints" element={<AdminComplaints />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
