"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useCurrentUser } from "@/components/providers/user-provider";
import {
  usePendingCompaniesQuery,
  useApproveCompanyMutation,
  useRejectCompanyMutation,
  UserRole,
  CompanyType,
} from "@/lib/api/_gen/gql";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, FileText, Building2, User as UserIcon, Eye } from "lucide-react";
import { DocumentViewer } from "@/components/document-viewer";

interface Documents {
  identityDocumentUrl: string;
  businessRegistrationUrl?: string | null;
  insuranceCertificateUrl?: string | null;
  additionalDocuments?: string[] | null;
}

interface Company {
  id: string;
  companyType: CompanyType;
  companyName: string;
  registrationNumber: string;
  taxId: string;
  companyStreet: string;
  companyCity: string;
  companyPostalCode: string;
  companyCounty?: string | null;
  companyCountry: string;
  businessType?: string | null;
  documents?: Documents | null;
  message?: string | null;
  adminUser: {
    id: string;
    displayName: string;
    email: string;
  };
  createdAt: string;
}

export default function ApplicationsPage() {
  const { user } = useCurrentUser();
  const { toast } = useToast();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [viewingDocument, setViewingDocument] = useState<{ url: string; name: string } | null>(null);

  const { data, loading, error, refetch } = usePendingCompaniesQuery({
    skip: !user || user.role !== UserRole.GlobalAdmin,
  });

  const [approveCompany, { loading: approving }] = useApproveCompanyMutation({
    onCompleted: () => {
      toast({
        title: "Company Approved",
        description: "The company application has been approved successfully.",
      });
      setSelectedCompany(null);
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

  const [rejectCompany, { loading: rejecting }] = useRejectCompanyMutation({
    onCompleted: () => {
      toast({
        title: "Company Rejected",
        description: "The company application has been rejected.",
      });
      setSelectedCompany(null);
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

  const companies: Company[] = (data?.pendingCompanies || []) as Company[];

  const handleApprove = async (companyId: string) => {
    await approveCompany({
      variables: { companyId },
    });
  };

  const handleReject = async () => {
    if (!selectedCompany) return;

    await rejectCompany({
      variables: {
        companyId: selectedCompany.id,
        reason: rejectionReason || null,
      },
    });
  };

  if (!user || user.role !== UserRole.GlobalAdmin) {
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
        <h1 className="text-3xl font-bold tracking-tight">Company Applications</h1>
        <p className="text-muted-foreground mt-2">
          Review and approve pending company applications ({companies.length} pending)
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
      ) : companies.length > 0 ? (
        <div className="grid gap-4">
          {companies.map((company) => (
            <Card key={company.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{company.companyName}</CardTitle>
                      <CardDescription className="mt-1">
                        {company.adminUser.displayName} ({company.adminUser.email})
                      </CardDescription>
                      <Badge variant="secondary" className="mt-2">
                        {company.companyType === CompanyType.Individual ? "Individual" : "Business"}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    Applied {new Date(company.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      Company Information
                    </div>
                    <div className="pl-6 space-y-1 text-sm text-muted-foreground">
                      <p><span className="font-medium text-foreground">Name:</span> {company.companyName}</p>
                      <p><span className="font-medium text-foreground">Registration:</span> {company.registrationNumber}</p>
                      <p><span className="font-medium text-foreground">Tax ID:</span> {company.taxId}</p>
                      <p><span className="font-medium text-foreground">Type:</span> {company.businessType || "N/A"}</p>
                      <p><span className="font-medium text-foreground">Address:</span> {company.companyStreet}, {company.companyCity} {company.companyPostalCode}</p>
                    </div>
                  </div>

                  {company.documents && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        Documents
                      </div>
                      <div className="pl-6 space-y-2 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-primary hover:underline hover:bg-transparent justify-start"
                          onClick={() =>
                            setViewingDocument({
                              url: company.documents!.identityDocumentUrl,
                              name: "Identity Document",
                            })
                          }
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Identity Document
                        </Button>
                        {company.documents.businessRegistrationUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-primary hover:underline hover:bg-transparent justify-start"
                            onClick={() =>
                              setViewingDocument({
                                url: company.documents!.businessRegistrationUrl!,
                                name: "Business Registration",
                              })
                            }
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Business Registration
                          </Button>
                        )}
                        {company.documents.insuranceCertificateUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-primary hover:underline hover:bg-transparent justify-start"
                            onClick={() =>
                              setViewingDocument({
                                url: company.documents!.insuranceCertificateUrl!,
                                name: "Insurance Certificate",
                              })
                            }
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Insurance Certificate
                          </Button>
                        )}
                        {company.documents.additionalDocuments && company.documents.additionalDocuments.length > 0 && (
                          <div className="space-y-2">
                            <p className="font-medium text-foreground">Additional Documents:</p>
                            {company.documents.additionalDocuments.map((doc, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 text-primary hover:underline hover:bg-transparent justify-start"
                                onClick={() =>
                                  setViewingDocument({
                                    url: doc,
                                    name: `Additional Document ${index + 1}`,
                                  })
                                }
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Document {index + 1}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {company.message && (
                  <div className="pt-2">
                    <p className="text-sm font-medium">Message:</p>
                    <p className="text-sm text-muted-foreground mt-1">{company.message}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => handleApprove(company.id)}
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
                      setSelectedCompany(company);
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
              All company applications have been processed
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
              Provide a reason for rejecting this company application (optional).
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

      {/* Document Viewer */}
      {viewingDocument && (
        <DocumentViewer
          documentUrl={viewingDocument.url}
          documentName={viewingDocument.name}
          open={!!viewingDocument}
          onOpenChange={(open) => !open && setViewingDocument(null)}
        />
      )}
    </div>
  );
}
