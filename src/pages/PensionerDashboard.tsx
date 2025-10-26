import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PensionerNav from "@/components/PensionerNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pensioner, mockTransactions, mockLifeCertificates } from "@/data/mockData";
import { AlertCircle, CheckCircle, Clock, IndianRupee } from "lucide-react";

const PensionerDashboard = () => {
  const navigate = useNavigate();
  const [pensioner, setPensioner] = useState<Pensioner | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("pensionerAuth");
    if (!auth) {
      navigate("/pensioner-login");
      return;
    }
    setPensioner(JSON.parse(auth));
  }, [navigate]);

  if (!pensioner) return null;

  const pensionerTransactions = mockTransactions.filter(t => t.pensionerId === pensioner.id).slice(0, 5);
  const latestCertificate = mockLifeCertificates.find(c => c.pensionerId === pensioner.id);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", icon: any }> = {
      active: { variant: "default", icon: CheckCircle },
      pending: { variant: "secondary", icon: Clock },
      deceased: { variant: "destructive", icon: AlertCircle },
    };
    const config = variants[status] || variants.active;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <PensionerNav />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {pensioner.name}</h1>
          <p className="text-muted-foreground">Service Number: {pensioner.serviceNumber} | Rank: {pensioner.rank}</p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              {getStatusBadge(pensioner.status)}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Pension</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-2xl font-bold">
                <IndianRupee className="h-6 w-6" />
                {pensioner.pensionAmount.toLocaleString('en-IN')}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Next Certificate Due</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {pensioner.nextLifeCertificateDue || 'N/A'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Life Certificate Status */}
        {latestCertificate && (
          <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle>Latest Life Certificate Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Submitted: {latestCertificate.submissionDate}</p>
                  {latestCertificate.verificationDate && (
                    <p className="text-sm text-muted-foreground">Verified: {latestCertificate.verificationDate}</p>
                  )}
                </div>
                {getStatusBadge(latestCertificate.verificationStatus)}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Transactions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pensionerTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="font-mono text-xs">{transaction.referenceNumber}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ₹{transaction.amount.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status}
                      </Badge>
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

export default PensionerDashboard;
