import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PensionerNav from "@/components/PensionerNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const PensionerContact = () => {
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
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-8">Get in touch with our support team</p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Helpline Numbers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold">Toll-Free Helpline</p>
                <p className="text-muted-foreground">1800-XXX-XXXX</p>
              </div>
              <div>
                <p className="font-semibold">Direct Line</p>
                <p className="text-muted-foreground">011-XXXX-XXXX</p>
              </div>
              <div>
                <p className="font-semibold">Emergency Contact</p>
                <p className="text-muted-foreground">+91-XXXX-XXXXXX</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold">General Queries</p>
                <p className="text-muted-foreground">support@armypension.gov.in</p>
              </div>
              <div>
                <p className="font-semibold">Technical Support</p>
                <p className="text-muted-foreground">technical@armypension.gov.in</p>
              </div>
              <div>
                <p className="font-semibold">Grievance</p>
                <p className="text-muted-foreground">grievance@armypension.gov.in</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Office Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold mb-2">Army Pension Management Office</p>
              <p className="text-muted-foreground">
                Department of Ex-Servicemen Welfare<br />
                Ministry of Defence<br />
                South Block, New Delhi - 110011<br />
                India
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Office Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold">Monday - Friday</p>
                <p className="text-muted-foreground">9:00 AM - 5:30 PM</p>
              </div>
              <div>
                <p className="font-semibold">Saturday</p>
                <p className="text-muted-foreground">9:00 AM - 1:00 PM</p>
              </div>
              <div>
                <p className="font-semibold">Sunday & Holidays</p>
                <p className="text-muted-foreground">Closed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PensionerContact;
