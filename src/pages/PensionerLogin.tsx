import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { mockPensioners } from "@/data/mockData";

const PensionerLogin = () => {
  const navigate = useNavigate();
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = () => {
    // Validate Aadhaar format
    const cleanAadhaar = aadhaar.replace(/-/g, "");
    if (cleanAadhaar.length !== 12) {
      toast.error("Please enter a valid 12-digit Aadhaar number");
      return;
    }

    // Check if Aadhaar exists in mock data
    const pensioner = mockPensioners.find((p) => p.aadhaarNumber === aadhaar);
    if (!pensioner) {
      toast.error("Aadhaar number not found in our records");
      return;
    }

    setOtpSent(true);
    toast.success("OTP sent to your registered mobile number");
  };

  const handleLogin = () => {
    if (otp !== "123456") {
      toast.error("Invalid OTP. Please try again.");
      return;
    }

    const pensioner = mockPensioners.find((p) => p.aadhaarNumber === aadhaar);
    if (pensioner) {
      localStorage.setItem("pensionerAuth", JSON.stringify(pensioner));
      toast.success(`Welcome ${pensioner.name}!`);
      navigate("/pensioner-dashboard");
    }
  };

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/(\d{0,4})(\d{0,4})(\d{0,4})/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join("-");
    }
    return cleaned;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button variant="ghost" className="mb-4" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-elevated">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl">Pensioner Login</CardTitle>
              <CardDescription>
                Login using your Aadhaar number and OTP
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Number</Label>
              <Input
                id="aadhaar"
                placeholder="1234-5678-9012"
                value={aadhaar}
                onChange={(e) => setAadhaar(formatAadhaar(e.target.value))}
                maxLength={14}
                disabled={otpSent}
              />
            </div>

            {!otpSent ? (
              <Button className="w-full" onClick={handleSendOTP}>
                Send OTP
              </Button>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                  {/* <p className="text-xs text-muted-foreground">
                    Demo OTP: 123456
                  </p> */}
                </div>

                <Button className="w-full" onClick={handleLogin}>
                  Login
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                  }}
                >
                  Resend OTP
                </Button>
              </>
            )}

            {/* <div className="pt-4 border-t text-center text-sm text-muted-foreground">
              <p>Numbers:</p>
              <p className="font-mono text-xs">1234-5678-9012, 3456-7890-1234</p>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PensionerLogin;
