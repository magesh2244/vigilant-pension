import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PensionerNav from "@/components/PensionerNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Target, Users, Zap } from "lucide-react";

const PensionerAbout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("pensionerAuth");
    if (!auth) {
      navigate("/pensioner-login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <PensionerNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">About This System</h1>
        <p className="text-muted-foreground mb-8">Understanding our mission and features</p>

        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">About the Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Army Pension Management System is an innovative digital platform designed to streamline 
                pension distribution for retired army personnel while preventing fraudulent disbursements 
                through automated verification mechanisms.
              </p>
              <p>
                This system integrates with national databases including death registries, marriage records, 
                and Aadhaar authentication to ensure that pension benefits reach only legitimate beneficiaries. 
                In case of a pensioner's demise, the system automatically identifies eligible dependents based 
                on priority and relationship status.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To ensure timely and accurate pension distribution to army veterans and their families 
                  while eliminating fraud through digital verification and automated processes.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Aadhaar-based authentication</li>
                  <li>• OTP verification</li>
                  <li>• Quarterly life certificates</li>
                  <li>• Cross-verification with registries</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Digital life certificate submission</li>
                  <li>• Real-time transaction tracking</li>
                  <li>• Complaint management system</li>
                  <li>• Automatic dependent transfer</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Beneficiaries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Retired army personnel</li>
                  <li>• Spouses of deceased pensioners</li>
                  <li>• Unmarried daughters</li>
                  <li>• Other eligible dependents</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Life Certificate Verification</h4>
                <p className="text-muted-foreground">
                  Pensioners submit digital life certificates every 3 months, which are verified by administrators 
                  to confirm they are alive and eligible to receive pension.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">2. Death Registry Integration</h4>
                <p className="text-muted-foreground">
                  The system continuously checks death registries. If a pensioner's name appears, pension credits 
                  are immediately stopped to prevent fraud.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. Automatic Dependent Transfer</h4>
                <p className="text-muted-foreground">
                  Upon death verification, the system checks the dependency database and marriage registry to 
                  identify the next eligible beneficiary (spouse, unmarried daughter, etc.) and transfers the 
                  pension accordingly.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">4. Transaction Transparency</h4>
                <p className="text-muted-foreground">
                  All pension credits, debits, and transfers are tracked in real-time with complete audit trails 
                  accessible to both pensioners and administrators.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PensionerAbout;
