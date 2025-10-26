import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PensionerNav from "@/components/PensionerNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pensioner, mockComplaints } from "@/data/mockData";
import { MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const PensionerComplaints = () => {
  const navigate = useNavigate();
  const [pensioner, setPensioner] = useState<Pensioner | null>(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("pensionerAuth");
    if (!auth) {
      navigate("/pensioner-login");
      return;
    }
    setPensioner(JSON.parse(auth));
  }, [navigate]);

  if (!pensioner) return null;

  const pensionerComplaints = mockComplaints.filter(c => c.pensionerId === pensioner.id);

  const handleSubmit = () => {
    if (!subject.trim() || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Complaint submitted successfully! We'll respond within 48 hours.");
    setSubject("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-background">
      <PensionerNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Complaints & Grievances</h1>
        <p className="text-muted-foreground mb-8">Submit and track your concerns</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Submit Complaint */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Submit New Complaint
              </CardTitle>
              <CardDescription>
                We aim to resolve all issues within 48 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide details about your complaint..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                />
              </div>

              <Button className="w-full" onClick={handleSubmit}>
                <Send className="mr-2 h-4 w-4" />
                Submit Complaint
              </Button>
            </CardContent>
          </Card>

          {/* Complaint History */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Your Complaints</CardTitle>
              <CardDescription>Track status of your submitted complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pensionerComplaints.length > 0 ? (
                  pensionerComplaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-semibold">{complaint.subject}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Submitted: {complaint.createdDate}
                          </p>
                        </div>
                        <Badge 
                          variant={
                            complaint.status === 'resolved' ? 'default' :
                            complaint.status === 'in-progress' ? 'secondary' :
                            'outline'
                          }
                        >
                          {complaint.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm">{complaint.description}</p>
                      
                      {complaint.adminResponse && (
                        <div className="bg-muted/50 p-3 rounded-md">
                          <p className="text-xs font-semibold text-muted-foreground mb-1">Admin Response:</p>
                          <p className="text-sm">{complaint.adminResponse}</p>
                        </div>
                      )}
                      
                      {complaint.resolvedDate && (
                        <p className="text-xs text-muted-foreground">
                          Resolved: {complaint.resolvedDate}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No complaints submitted yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PensionerComplaints;
