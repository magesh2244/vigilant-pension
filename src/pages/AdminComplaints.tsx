import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "@/components/AdminNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { mockComplaints, mockPensioners } from "@/data/mockData";
import { MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

const AdminComplaints = () => {
  const navigate = useNavigate();
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleRespond = (complaintId: string) => {
    if (!response.trim()) {
      toast.error("Please provide a response");
      return;
    }
    
    toast.success("Response sent successfully");
    setSelectedComplaint(null);
    setResponse("");
  };

  const getPensionerName = (pensionerId: string) => {
    return mockPensioners.find(p => p.id === pensionerId)?.name || 'Unknown';
  };

  const openComplaints = mockComplaints.filter(c => c.status === 'open' || c.status === 'in-progress');
  const closedComplaints = mockComplaints.filter(c => c.status === 'resolved' || c.status === 'closed');

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Complaint Management</h1>
        <p className="text-muted-foreground mb-8">Respond to pensioner complaints and grievances</p>

        {/* Open Complaints */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-secondary" />
              Open Complaints ({openComplaints.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {openComplaints.length > 0 ? (
                openComplaints.map((complaint) => (
                  <div key={complaint.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-semibold text-lg">{complaint.subject}</p>
                          <Badge variant="secondary">{complaint.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          From: {getPensionerName(complaint.pensionerId)}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Submitted: {complaint.createdDate}
                        </p>
                        <p className="text-sm">{complaint.description}</p>
                      </div>
                    </div>
                    
                    {selectedComplaint === complaint.id ? (
                      <div className="space-y-2 pt-2 border-t">
                        <Textarea
                          placeholder="Type your response here..."
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleRespond(complaint.id)}
                            className="gap-1"
                          >
                            <Send className="h-3 w-3" />
                            Send Response
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedComplaint(null);
                              setResponse("");
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
                        onClick={() => setSelectedComplaint(complaint.id)}
                      >
                        Respond
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No open complaints at the moment
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resolved Complaints */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Resolved Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {closedComplaints.map((complaint) => (
                <div key={complaint.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-semibold">{complaint.subject}</p>
                        <Badge variant="default">{complaint.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        From: {getPensionerName(complaint.pensionerId)}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Submitted: {complaint.createdDate} | Resolved: {complaint.resolvedDate}
                      </p>
                      <p className="text-sm mb-3">{complaint.description}</p>
                      
                      {complaint.adminResponse && (
                        <div className="bg-muted/50 p-3 rounded-md">
                          <p className="text-xs font-semibold text-muted-foreground mb-1">Admin Response:</p>
                          <p className="text-sm">{complaint.adminResponse}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminComplaints;
