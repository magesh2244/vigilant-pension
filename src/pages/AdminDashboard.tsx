import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "@/components/AdminNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockPensioners, mockLifeCertificates, mockComplaints } from "@/data/mockData";
import { Users, FileCheck, AlertCircle, TrendingUp, CheckCircle2, Clock, XCircle } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const stats = {
    totalPensioners: mockPensioners.length,
    activePensioners: mockPensioners.filter(p => p.status === 'active').length,
    deceasedPensioners: mockPensioners.filter(p => p.status === 'deceased').length,
    pendingCertificates: mockLifeCertificates.filter(c => c.verificationStatus === 'pending').length,
    openComplaints: mockComplaints.filter(c => c.status === 'open' || c.status === 'in-progress').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Pensioners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalPensioners}</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-success">{stats.activePensioners}</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                Deceased
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">{stats.deceasedPensioners}</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                Pending Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-warning">{stats.pendingCertificates}</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-secondary" />
                Open Complaints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-secondary">{stats.openComplaints}</p>
            </CardContent>
          </Card>
        </div>

        {/* Pensioner Status Overview */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Pensioner Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Service No.</TableHead>
                  <TableHead>Pension Amount</TableHead>
                  <TableHead>Last Certificate</TableHead>
                  <TableHead>Next Due</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPensioners.map((pensioner) => (
                  <TableRow key={pensioner.id}>
                    <TableCell className="font-medium">{pensioner.name}</TableCell>
                    <TableCell>{pensioner.rank}</TableCell>
                    <TableCell className="font-mono text-xs">{pensioner.serviceNumber}</TableCell>
                    <TableCell>₹{pensioner.pensionAmount.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-sm">{pensioner.lastLifeCertificateDate || 'N/A'}</TableCell>
                    <TableCell className="text-sm">{pensioner.nextLifeCertificateDue || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          pensioner.status === 'active' ? 'default' :
                          pensioner.status === 'deceased' ? 'destructive' :
                          'secondary'
                        }
                      >
                        {pensioner.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card cursor-pointer hover:shadow-elevated transition-shadow" onClick={() => navigate('/admin-certificates')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-warning" />
                Pending Life Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {stats.pendingCertificates} certificate(s) awaiting verification
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card cursor-pointer hover:shadow-elevated transition-shadow" onClick={() => navigate('/admin-complaints')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-secondary" />
                Open Complaints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {stats.openComplaints} complaint(s) require attention
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
