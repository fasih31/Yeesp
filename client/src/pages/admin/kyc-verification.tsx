import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Download, Eye } from "lucide-react";

export default function KYCVerification() {
  const pendingKYC = [
    { id: 1, user: "John Doe", role: "tutor", email: "john@example.com", submitted: "2024-01-10", documents: 3 },
    { id: 2, user: "Sarah Wilson", role: "freelancer", email: "sarah@example.com", submitted: "2024-01-11", documents: 2 },
  ];

  const approvedKYC = [
    { id: 3, user: "Mike Johnson", role: "tutor", email: "mike@example.com", approved: "2024-01-05", documents: 3 },
  ];

  const rejectedKYC = [
    { id: 4, user: "Jane Smith", role: "freelancer", email: "jane@example.com", rejected: "2024-01-08", reason: "Incomplete documentation" },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">KYC Verification</h1>
        <p className="text-muted-foreground">Review and approve user identity documents</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingKYC.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingKYC.map((kyc) => (
            <Card key={kyc.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{kyc.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="mb-1">{kyc.user}</CardTitle>
                      <p className="text-sm text-muted-foreground">{kyc.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{kyc.role}</Badge>
                        <span className="text-sm text-muted-foreground">Submitted: {kyc.submitted}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">Pending Review</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Button variant="default" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Review Documents ({kyc.documents})
                  </Button>
                  <Button variant="default" size="sm">
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="destructive" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedKYC.map((kyc) => (
            <Card key={kyc.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{kyc.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="mb-1">{kyc.user}</CardTitle>
                      <p className="text-sm text-muted-foreground">{kyc.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{kyc.role}</Badge>
                        <span className="text-sm text-muted-foreground">Approved: {kyc.approved}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="default">Verified</Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedKYC.map((kyc) => (
            <Card key={kyc.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{kyc.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="mb-1">{kyc.user}</CardTitle>
                      <p className="text-sm text-muted-foreground">{kyc.email}</p>
                      <p className="text-sm text-destructive mt-2">Reason: {kyc.reason}</p>
                    </div>
                  </div>
                  <Badge variant="destructive">Rejected</Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
