"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useCurrentUser } from "@/components/providers/user-provider";
import { PENDING_APPLICATIONS } from "@/lib/graphql/queries/application-queries";
import { APPROVE_APPLICATION, REJECT_APPLICATION } from "@/lib/graphql/mutations/application-mutations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, FileText, Building2, User as UserIcon, ExternalLink } from "lucide-react";
import Link from "next/link";

interface CompanyInfo {
  companyName: string;
  registrationNumber: string;
  taxId: string;
  companyStreet: string;
  companyCity: string;
  companyPostalCode: string;
  companyCounty?: string;
  companyCountry: string;
  businessType?: string;
}

interface Documents {
  identityDocumentUrl: string;
  businessRegistrationUrl?: string;
  insuranceCertificateUrl?: string;
  additionalDocuments?: string[];
}

interface Application {
  id: string;
  user: {
    id: string;
    displayName: string;
    email: string;
  };
  applicationType: string;
  status: string;
  message?: string;
  companyInfo?: CompanyInfo;
  documents?: Documents;
  createdAt: string;
}

export default function ApplicationsPage() {
  const { user } = useCurrentUser();
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data, loading, error, refetch } = useQuery(PENDING_APPLICATIONS, {
    skip: !user || user.role !== "global_admin",
  });

  const [approveApplication, { loading: approving }] = useMutation(APPROVE_APPLICATION, {
    onCompleted: () => {
      toast({
        title: "Application Approved",
        description: "The cleaner application has been approved successfully.",
      });
      setSelectedApplication(null);
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const [rejectApplication, { loading: rejecting }] = useMutation(REJECT_APPLICATION, {
    onCompleted: () => {
      toast({
        title: "Application Rejected",
        description: "The cleaner application has been rejected.",
      });
      setSelectedApplication(null);
      setShowRejectDialog(false);
      setRejectionReason("");
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const applications: Application[] = data?.pendingApplications || [];

  const handleApprove = async (applicationId: string) => {
    await approveApplication({
      variables: { applicationId },
    });
  };

  const handleReject = async () => {
    if (!selectedApplication) return;

    await rejectApplication({
      variables: {
        applicationId: selectedApplication.id,
        reason: rejectionReason || null,
      },
    });
  };

  if (!user || user.role !== "global_admin") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Access Denied</CardTitle>
            <CardDescription>You must be a global admin to access this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Applications</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => refetch()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cleaner Applications</h1>
        <p className="text-muted-foreground mt-2">
          Review and approve pending cleaner applications • {applications.length} pending
        </p>
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6 space-y-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : applications.length > 0 ? (
        <div className="grid gap-4">
          {applications.map((application) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{application.user.displayName}</CardTitle>
                      <CardDescription className="mt-1">
                        {application.user.email}
                      </CardDescription>
                      <Badge variant="secondary" className="mt-2">
                        {application.applicationType}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    Applied {new Date(application.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {application.companyInfo && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        Company Information
                      </div>
                      <div className="pl-6 space-y-1 text-sm text-muted-foreground">
                        <p><span className="font-medium text-foreground">Name:</span> {application.companyInfo.companyName}</p>
                        <p><span className="font-medium text-foreground">Registration:</span> {application.companyInfo.registrationNumber}</p>
                        <p><span className="font-medium text-foreground">Tax ID:</span> {application.companyInfo.taxId}</p>
                        <p><span className="font-medium text-foreground">Type:</span> {application.companyInfo.businessType || "N/A"}</p>
                      </div>
                    </div>

                    {application.documents && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          Documents
                        </div>
                        <div className="pl-6 space-y-1 text-sm">
                          <Link
                            href={application.documents.identityDocumentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            Identity Document <ExternalLink className="h-3 w-3" />
                          </Link>
                          {application.documents.businessRegistrationUrl && (
                            <Link
                              href={application.documents.businessRegistrationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary hover:underline"
                            >
                              Business Registration <ExternalLink className="h-3 w-3" />
                            </Link>
                          )}
                          {application.documents.insuranceCertificateUrl && (
                            <Link
                              href={application.documents.insuranceCertificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary hover:underline"
                            >
                              Insurance Certificate <ExternalLink className="h-3 w-3" />
                            </Link>
                          )}
                          {application.documents.additionalDocuments && application.documents.additionalDocuments.length > 0 && (
                            <div>
                              <p className="font-medium text-foreground mb-1">Additional Documents:</p>
                              {application.documents.additionalDocuments.map((doc, index) => (
                                <Link
                                  key={index}
                                  href={doc}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-primary hover:underline"
                                >
                                  Document {index + 1} <ExternalLink className="h-3 w-3" />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {application.message && (
                  <div className="pt-2">
                    <p className="text-sm font-medium">Message:</p>
                    <p className="text-sm text-muted-foreground mt-1">{application.message}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => handleApprove(application.id)}
                    disabled={approving || rejecting}
                    className="flex-1"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setSelectedApplication(application);
                      setShowRejectDialog(true);
                    }}
                    disabled={approving || rejecting}
                    className="flex-1"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Pending Applications</h3>
            <p className="text-sm text-muted-foreground">
              All cleaner applications have been processed
            </p>
          </CardContent>
        </Card>
      )}

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting this application (optional).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejectionReason">Rejection Reason</Label>
              <Textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g., Incomplete documentation, missing business registration, etc."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectDialog(false);
                setRejectionReason("");
              }}
              disabled={rejecting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={rejecting}
            >
              {rejecting ? "Rejecting..." : "Reject Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
