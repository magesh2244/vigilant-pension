import { Shield, LogOut, Home, FileText, MessageSquare, Phone, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const PensionerNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("pensionerAuth");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navItems = [
    { path: "/pensioner-dashboard", label: "Dashboard", icon: Home },
    { path: "/pensioner-life-certificate", label: "Life Certificate", icon: FileText },
    { path: "/pensioner-complaints", label: "Complaints", icon: MessageSquare },
    { path: "/pensioner-contact", label: "Contact Us", icon: Phone },
    { path: "/pensioner-about", label: "About", icon: Info },
  ];

  return (
    <nav className="bg-card border-b shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Pensioner Portal</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                onClick={() => navigate(item.path)}
                className="gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
            <Button variant="destructive" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="destructive" onClick={handleLogout} size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4 flex gap-2 overflow-x-auto">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "default" : "outline"}
              onClick={() => navigate(item.path)}
              size="sm"
              className="gap-1 whitespace-nowrap"
            >
              <item.icon className="h-3 w-3" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default PensionerNav;
