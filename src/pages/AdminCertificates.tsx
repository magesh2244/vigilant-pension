import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "@/components/AdminNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { mockLifeCertificates, mockPensioners } from "@/data/mockData";
import { FileCheck, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const AdminCertificates = () => {
  const navigate = useNavigate();
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleVerify = (certId: string, status: 'verified' | 'rejected') => {
    if (status === 'rejected' && !remarks.trim()) {
      toast.error("Please provide remarks for rejection");
      return;
    }
    
    const action = status === 'verified' ? 'verified' : 'rejected';
    toast.success(`Certificate ${action} successfully`);
    setSelectedCert(null);
    setRemarks("");
  };

  const pendingCertificates = mockLifeCertificates.filter(c => c.verificationStatus === 'pending');
  const verifiedCertificates = mockLifeCertificates.filter(c => c.verificationStatus !== 'pending');

  const getPensionerName = (pensionerId: string) => {
    return mockPensioners.find(p => p.id === pensionerId)?.name || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Life Certificate Verification</h1>
        <p className="text-muted-foreground mb-8">Review and verify submitted life certificates</p>

        {/* Pending Certificates */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-warning" />
              Pending Verification ({pendingCertificates.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingCertificates.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pensioner Name</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Certificate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingCertificates.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell className="font-medium">
                        {getPensionerName(cert.pensionerId)}
                      </TableCell>
                      <TableCell>{cert.submissionDate}</TableCell>
                      <TableCell>
                        <a href="#" className="text-primary hover:underline text-sm">
                          View Certificate
                        </a>
                      </TableCell>
                      <TableCell>
                        {selectedCert === cert.id ? (
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Add remarks (required for rejection)"
                              value={remarks}
                              onChange={(e) => setRemarks(e.target.value)}
                              rows={2}
                            />
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleVerify(cert.id, 'verified')}
                                className="gap-1"
                              >
                                <CheckCircle className="h-3 w-3" />
                                Verify
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleVerify(cert.id, 'rejected')}
                                className="gap-1"
                              >
                                <XCircle className="h-3 w-3" />
                                Reject
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setSelectedCert(null);
                                  setRemarks("");
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={() => setSelectedCert(cert.id)}
                          >
                            Review
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No pending certificates at the moment
              </p>
            )}
          </CardContent>
        </Card>

        {/* Verified/Rejected Certificates */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Verification History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pensioner Name</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Verification Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {verifiedCertificates.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">
                      {getPensionerName(cert.pensionerId)}
                    </TableCell>
                    <TableCell>{cert.submissionDate}</TableCell>
                    <TableCell>{cert.verificationDate || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant={cert.verificationStatus === 'verified' ? 'default' : 'destructive'}>
                        {cert.verificationStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {cert.remarks || 'No remarks'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminCertificates;
