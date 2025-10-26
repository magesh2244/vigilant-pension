import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, FileCheck, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Army Pension Management</h1>
              <p className="text-xs text-muted-foreground">Secure & Efficient Pension Distribution</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          Automated Pension Management System
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          Preventing fraudulent pension disbursements through automated death verification and 
          seamless dependent transfer for army pensioners
        </p>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="shadow-elevated hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/pensioner-login')}>
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Pensioner Portal</CardTitle>
              <CardDescription className="text-base">
                Submit life certificates, view transactions, and manage your pension account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                Login as Pensioner
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elevated hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/admin-login')}>
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription className="text-base">
                Verify certificates, monitor pensioner status, and manage complaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary" size="lg">
                Login as Admin
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-card">
              <CardHeader>
                <FileCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Digital Life Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pensioners can submit life certificates digitally every quarter for verification
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <Shield className="h-12 w-12 text-success mb-4" />
                <CardTitle>Automated Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cross-verification with death and marriage registries to prevent fraud
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <TrendingDown className="h-12 w-12 text-warning mb-4" />
                <CardTitle>Dependent Transfer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automatic pension transfer to eligible dependents based on priority
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Army Pension Management System. All rights reserved.</p>
          <p className="text-sm mt-2">Government of India Initiative</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
