import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, X, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import type { KycDocument, User } from "@shared/schema";

type KycWithUser = KycDocument & {
  user: User;
};

export default function KYCVerification() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedKyc, setSelectedKyc] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data: kycDocuments, isLoading } = useQuery<KycDocument[]>({
    queryKey: ["/api/kyc-documents"],
    queryFn: async () => {
      return api.kycDocuments.getPending();
    },
  });

  const updateKycMutation = useMutation({
    mutationFn: async ({ id, status, rejectionReason }: { id: string; status: string; rejectionReason?: string }) => {
      return api.kycDocuments.update(id, { status, rejectionReason });
    },
    onSuccess: () => {
      toast({
        title: "KYC Updated",
        description: "The verification status has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/kyc-documents"] });
      setSelectedKyc(null);
      setRejectionReason("");
    },
  });

  const pending = kycDocuments?.filter(k => k.status === "pending");
  const approved = kycDocuments?.filter(k => k.status === "approved");
  const rejected = kycDocuments?.filter(k => k.status === "rejected");

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">KYC Verification</h1>
        <p className="text-muted-foreground">Review and approve user identity documents</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pending?.length || 0})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approved?.length || 0})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejected?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">Loading documents...</div>
          ) : pending && pending.length > 0 ? (
            pending.map((kyc) => (
              <Card key={kyc.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="mb-1">User ID: {kyc.userId}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{kyc.documentType}</Badge>
                          <span className="text-sm text-muted-foreground">
                            Submitted: {new Date(kyc.submittedAt || '').toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">Pending Review</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    {kyc.documentUrl && (
                      <Button variant="default" size="sm" asChild>
                        <a href={kyc.documentUrl} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4 mr-2" />
                          View Document
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => updateKycMutation.mutate({ id: kyc.id, status: "approved" })}
                      disabled={updateKycMutation.isPending}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm" onClick={() => setSelectedKyc(kyc.id)}>
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reject KYC Document</DialogTitle>
                          <DialogDescription>
                            Provide a reason for rejecting this document
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2">
                          <Label htmlFor="reason">Rejection Reason</Label>
                          <Textarea
                            id="reason"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="e.g., Document is unclear, ID is expired..."
                            rows={4}
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            variant="destructive"
                            onClick={() => updateKycMutation.mutate({
                              id: kyc.id,
                              status: "rejected",
                              rejectionReason,
                            })}
                            disabled={!rejectionReason || updateKycMutation.isPending}
                          >
                            Confirm Rejection
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No pending KYC documents</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approved && approved.length > 0 ? (
            approved.map((kyc) => (
              <Card key={kyc.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="mb-1">User ID: {kyc.userId}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{kyc.documentType}</Badge>
                          <span className="text-sm text-muted-foreground">
                            Approved: {kyc.verifiedAt ? new Date(kyc.verifiedAt).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="default">Verified</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No approved documents</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejected && rejected.length > 0 ? (
            rejected.map((kyc) => (
              <Card key={kyc.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="mb-1">User ID: {kyc.userId}</CardTitle>
                        <p className="text-sm text-destructive mt-2">
                          Reason: {kyc.rejectionReason || "No reason provided"}
                        </p>
                      </div>
                    </div>
                    <Badge variant="destructive">Rejected</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No rejected documents</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
