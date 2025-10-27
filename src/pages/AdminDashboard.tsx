import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "@/components/AdminNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  mockPensioners,
  mockLifeCertificates,
  mockComplaints,
  mockPensionTransfers,
  mockDependents,
} from "@/data/mockData";
import {
  Users,
  FileCheck,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowRightLeft,
} from "lucide-react";

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
    activePensioners: mockPensioners.filter((p) => p.status === "active")
      .length,
    deceasedPensioners: mockPensioners.filter((p) => p.status === "deceased")
      .length,
    pendingCertificates: mockLifeCertificates.filter(
      (c) => c.verificationStatus === "pending"
    ).length,
    openComplaints: mockComplaints.filter(
      (c) => c.status === "open" || c.status === "in-progress"
    ).length,
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
              <p className="text-3xl font-bold text-success">
                {stats.activePensioners}
              </p>
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
              <p className="text-3xl font-bold text-destructive">
                {stats.deceasedPensioners}
              </p>
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
              <p className="text-3xl font-bold text-warning">
                {stats.pendingCertificates}
              </p>
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
              <p className="text-3xl font-bold text-secondary">
                {stats.openComplaints}
              </p>
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
                    <TableCell className="font-medium">
                      {pensioner.name}
                    </TableCell>
                    <TableCell>{pensioner.rank}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {pensioner.serviceNumber}
                    </TableCell>
                    <TableCell>
                      ₹{pensioner.pensionAmount.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-sm">
                      {pensioner.lastLifeCertificateDate || "N/A"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {pensioner.nextLifeCertificateDue || "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          pensioner.status === "active"
                            ? "default"
                            : pensioner.status === "deceased"
                            ? "destructive"
                            : "secondary"
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

        {/* Pension Transfer Workflow */}
        {mockPensionTransfers.length > 0 && (
          <Card className="shadow-card mb-8 border-success/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-success" />
                Recent Pension Transfer - Automated Workflow
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockPensionTransfers.map((transfer) => {
                const dependent = mockDependents.find(
                  (d) => d.id === transfer.toPensionerId
                );
                return (
                  <div key={transfer.id} className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {transfer.fromPensionerName}
                          </h3>
                          <Badge variant="destructive" className="mt-1">
                            Deceased
                          </Badge>
                        </div>
                        <Badge variant="default" className="bg-success">
                          {transfer.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Death Confirmation
                          </p>
                          <p className="font-medium">
                            Matched with Official Death Registry
                          </p>
                          <p className="text-sm">
                            Date:{" "}
                            {new Date(transfer.deathDate).toLocaleDateString(
                              "en-IN",
                              { day: "numeric", month: "long", year: "numeric" }
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Certificate: {transfer.deathCertificateNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Pension Amount
                          </p>
                          <p className="text-2xl font-bold">
                            ₹{transfer.newAmount.toLocaleString("en-IN")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Monthly
                          </p>
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <div className="flex items-start gap-3 mb-3">
                          <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Dependent Verified & Pension Transferred
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {transfer.toDependentName}
                            </p>
                          </div>
                        </div>
                        <div className="bg-background p-3 rounded border">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">
                                Relationship
                              </p>
                              <p className="font-medium">
                                {transfer.relationship}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                Marital Status
                              </p>
                              <p className="font-medium">
                                {dependent?.maritalStatus}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Aadhaar</p>
                              <p className="font-mono text-xs">
                                {dependent?.aadhaarNumber}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                Eligibility
                              </p>
                              <Badge variant="default" className="bg-success">
                                ✓ Approved
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        {/* <p className="text-sm font-medium mb-2">⚙ System Workflow Summary:</p>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>✓ Automatic detection from Death Registry</li>
                          <li>✓ Immediate suspension of pension disbursements</li>
                          <li>✓ Dependent verification via Dependency & Marriage Registries</li>
                          <li>✓ Eligibility confirmed (No remarriage recorded)</li>
                          <li>✓ Pension benefits securely re-routed to verified dependent</li>
                          <li>✓ Admin notification and audit log generated</li>
                        </ul> */}
                        <div className="mt-3 p-2 bg-primary/10 rounded text-sm">
                          <p className="font-medium">Admin Remarks:</p>
                          <p className="text-muted-foreground">
                            {transfer.remarks}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="shadow-card cursor-pointer hover:shadow-elevated transition-shadow"
            onClick={() => navigate("/admin-certificates")}
          >
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

          <Card
            className="shadow-card cursor-pointer hover:shadow-elevated transition-shadow"
            onClick={() => navigate("/admin-complaints")}
          >
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
