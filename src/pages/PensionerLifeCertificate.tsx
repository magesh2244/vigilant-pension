import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PensionerNav from "@/components/PensionerNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pensioner, mockLifeCertificates } from "@/data/mockData";
import { Upload, FileCheck } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const PensionerLifeCertificate = () => {
  const navigate = useNavigate();
  const [pensioner, setPensioner] = useState<Pensioner | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("pensionerAuth");
    if (!auth) {
      navigate("/pensioner-login");
      return;
    }
    setPensioner(JSON.parse(auth));
  }, [navigate]);

  if (!pensioner) return null;

  const pensionerCertificates = mockLifeCertificates.filter(c => c.pensionerId === pensioner.id);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    toast.success("Life certificate submitted successfully! Verification pending.");
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <PensionerNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Life Certificate Management</h1>
        <p className="text-muted-foreground mb-8">Submit your quarterly life certificate for verification</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Submit New Certificate
              </CardTitle>
              <CardDescription>
                Upload your life certificate. Supported formats: PDF, JPG, PNG
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="certificate">Select Certificate File</Label>
                <Input
                  id="certificate"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                <p className="font-semibold">Important Instructions:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Life certificate must be submitted every 3 months</li>
                  <li>Certificate should be signed by authorized personnel</li>
                  <li>Clear and legible document required</li>
                  <li>Verification takes 24-48 hours</li>
                </ul>
              </div>

              <Button className="w-full" onClick={handleSubmit}>
                <FileCheck className="mr-2 h-4 w-4" />
                Submit Certificate
              </Button>
            </CardContent>
          </Card>

          {/* Submission History */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Submission History</CardTitle>
              <CardDescription>Track your previous certificate submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pensionerCertificates.length > 0 ? (
                  pensionerCertificates.map((cert) => (
                    <div key={cert.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Submitted: {cert.submissionDate}</p>
                        <Badge 
                          variant={
                            cert.verificationStatus === 'verified' ? 'default' :
                            cert.verificationStatus === 'rejected' ? 'destructive' :
                            'secondary'
                          }
                        >
                          {cert.verificationStatus}
                        </Badge>
                      </div>
                      {cert.verificationDate && (
                        <p className="text-sm text-muted-foreground">
                          Verified: {cert.verificationDate}
                        </p>
                      )}
                      {cert.remarks && (
                        <p className="text-sm text-muted-foreground">
                          Remarks: {cert.remarks}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No certificates submitted yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Due Date Alert */}
        {pensioner.nextLifeCertificateDue && (
          <Card className="shadow-card mt-6 border-warning bg-warning/5">
            <CardContent className="pt-6">
              <p className="text-center font-semibold">
                📅 Next Life Certificate Due: {pensioner.nextLifeCertificateDue}
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default PensionerLifeCertificate;
