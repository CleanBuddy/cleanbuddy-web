"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { useCurrentUser } from "@/components/providers/user-provider";
import { SUBMIT_APPLICATION } from "@/lib/graphql/mutations/application-mutations";
import { UserRole } from "@/lib/api/_gen/gql";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Building2, FileText, Upload, CheckCircle2, X } from "lucide-react";
import Link from "next/link";

type FormStep = "company" | "documents" | "review";

interface CompanyInfo {
  companyName: string;
  registrationNumber: string;
  taxId: string;
  companyStreet: string;
  companyCity: string;
  companyPostalCode: string;
  companyCounty: string;
  companyCountry: string;
  businessType: string;
}

interface Documents {
  identityDocument: File | null;
  businessRegistration: File | null;
  insuranceCertificate: File | null;
  additionalDocuments: File[];
}

export default function CleanerSignupPage() {
  const router = useRouter();
  const { user, loading: userLoading, refetch } = useCurrentUser();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<FormStep>("company");
  const [message, setMessage] = useState("");

  // Redirect if user already has pending application or is already a cleaner
  useEffect(() => {
    if (!userLoading && user) {
      // If user is CLIENT, redirect to home with message
      if (user.role === UserRole.Client) {
        toast({
          title: "Start Your Application",
          description: "Click 'Become a Cleaner' to begin the application process.",
        });
        router.push("/");
        return;
      }

      // If user has already submitted application (PENDING_CLEANER), redirect to dashboard
      if (user.role === UserRole.PendingCleaner) {
        toast({
          title: "Application Already Submitted",
          description: "Your application is under review. Check your dashboard for status.",
        });
        router.push("/dashboard");
        return;
      }

      // If user is already an approved cleaner, redirect to dashboard
      if (user.role === UserRole.Cleaner) {
        toast({
          title: "Already a Cleaner",
          description: "You're already approved as a cleaner!",
        });
        router.push("/dashboard");
        return;
      }

      // If user has a rejected application (REJECTED_CLEANER)
      if (user.role === UserRole.RejectedCleaner) {
        toast({
          title: "Reapplication Available",
          description: "Please contact support before submitting a new application.",
          variant: "destructive",
        });
        router.push("/dashboard");
        return;
      }

      // If user has PENDING_APPLICATION role, allow them to continue with form
      // No redirect needed - this is the correct state for this page
    }
  }, [user, userLoading, router, toast]);

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: "",
    registrationNumber: "",
    taxId: "",
    companyStreet: "",
    companyCity: "",
    companyPostalCode: "",
    companyCounty: "",
    companyCountry: "Romania",
    businessType: "sole_proprietorship",
  });

  const [documents, setDocuments] = useState<Documents>({
    identityDocument: null,
    businessRegistration: null,
    insuranceCertificate: null,
    additionalDocuments: [],
  });

  const [submitApplication, { loading }] = useMutation(SUBMIT_APPLICATION, {
    refetchQueries: ['CurrentUser'], // Refetch the currentUser query to update the cache
    awaitRefetchQueries: true, // Wait for refetch to complete before onCompleted
    onCompleted: async () => {
      toast({
        title: "Application Submitted",
        description: "Your cleaner application has been submitted for review. We'll notify you once it's been processed.",
      });

      // Refetch user data from context as well
      await refetch();

      // Redirect to home page which will show the "Application Under Review" section
      router.push("/");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCompanyInfoChange = (field: keyof CompanyInfo, value: string) => {
    setCompanyInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleDocumentChange = (field: keyof Documents, value: File | null) => {
    setDocuments((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAdditionalDocument = (file: File) => {
    setDocuments((prev) => ({
      ...prev,
      additionalDocuments: [...prev.additionalDocuments, file],
    }));
  };

  const handleRemoveAdditionalDocument = (index: number) => {
    setDocuments((prev) => ({
      ...prev,
      additionalDocuments: prev.additionalDocuments.filter((_, i) => i !== index),
    }));
  };

  const validateCompanyInfo = (): boolean => {
    if (!companyInfo.companyName.trim()) {
      toast({ title: "Error", description: "Company name is required", variant: "destructive" });
      return false;
    }
    if (!companyInfo.registrationNumber.trim()) {
      toast({ title: "Error", description: "Registration number is required", variant: "destructive" });
      return false;
    }
    if (!companyInfo.taxId.trim()) {
      toast({ title: "Error", description: "Tax ID is required", variant: "destructive" });
      return false;
    }
    if (!companyInfo.companyStreet.trim() || !companyInfo.companyCity.trim() || !companyInfo.companyPostalCode.trim()) {
      toast({ title: "Error", description: "Complete address is required", variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateDocuments = (): boolean => {
    if (!documents.identityDocument) {
      toast({ title: "Error", description: "Identity document is required", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === "company") {
      if (validateCompanyInfo()) {
        setCurrentStep("documents");
      }
    } else if (currentStep === "documents") {
      if (validateDocuments()) {
        setCurrentStep("review");
      }
    }
  };

  const handleBack = () => {
    if (currentStep === "documents") {
      setCurrentStep("company");
    } else if (currentStep === "review") {
      setCurrentStep("documents");
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to apply", variant: "destructive" });
      return;
    }

    await submitApplication({
      variables: {
        input: {
          applicationType: "cleaner",
          message,
          companyInfo,
          documents: {
            identityDocument: documents.identityDocument,
            businessRegistration: documents.businessRegistration,
            insuranceCertificate: documents.insuranceCertificate,
            additionalDocuments: documents.additionalDocuments.length > 0 ? documents.additionalDocuments : null,
          },
        },
      },
    });
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please sign in to apply as a cleaner</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/auth">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Become a CleanBuddy Partner</CardTitle>
          <CardDescription>Join our network of professional cleaners</CardDescription>

          {/* Progress Steps */}
          <div className="flex justify-center gap-2 mt-6">
            <div className={`flex items-center gap-2 ${currentStep === "company" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === "company" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium hidden sm:inline">Company Info</span>
            </div>
            <div className="w-12 h-px bg-border self-center" />
            <div className={`flex items-center gap-2 ${currentStep === "documents" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === "documents" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium hidden sm:inline">Documents</span>
            </div>
            <div className="w-12 h-px bg-border self-center" />
            <div className={`flex items-center gap-2 ${currentStep === "review" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === "review" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium hidden sm:inline">Review</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Company Information Step */}
          {currentStep === "company" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company Information</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={companyInfo.companyName}
                    onChange={(e) => handleCompanyInfoChange("companyName", e.target.value)}
                    placeholder="e.g., Clean Solutions SRL"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number (CUI) *</Label>
                  <Input
                    id="registrationNumber"
                    value={companyInfo.registrationNumber}
                    onChange={(e) => handleCompanyInfoChange("registrationNumber", e.target.value)}
                    placeholder="e.g., RO12345678"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID (CF) *</Label>
                  <Input
                    id="taxId"
                    value={companyInfo.taxId}
                    onChange={(e) => handleCompanyInfoChange("taxId", e.target.value)}
                    placeholder="e.g., 12345678"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select
                    value={companyInfo.businessType}
                    onValueChange={(value) => handleCompanyInfoChange("businessType", value)}
                  >
                    <SelectTrigger id="businessType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sole_proprietorship">Sole Proprietorship (PFA)</SelectItem>
                      <SelectItem value="limited_liability">Limited Liability Company (SRL)</SelectItem>
                      <SelectItem value="joint_stock">Joint Stock Company (SA)</SelectItem>
                      <SelectItem value="individual">Individual (PF)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="font-medium">Company Address</h4>

                <div className="space-y-2">
                  <Label htmlFor="companyStreet">Street Address *</Label>
                  <Input
                    id="companyStreet"
                    value={companyInfo.companyStreet}
                    onChange={(e) => handleCompanyInfoChange("companyStreet", e.target.value)}
                    placeholder="e.g., Strada Victoriei 123"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="companyCity">City *</Label>
                    <Input
                      id="companyCity"
                      value={companyInfo.companyCity}
                      onChange={(e) => handleCompanyInfoChange("companyCity", e.target.value)}
                      placeholder="e.g., Bucharest"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyCounty">County</Label>
                    <Input
                      id="companyCounty"
                      value={companyInfo.companyCounty}
                      onChange={(e) => handleCompanyInfoChange("companyCounty", e.target.value)}
                      placeholder="e.g., Ilfov"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyPostalCode">Postal Code *</Label>
                    <Input
                      id="companyPostalCode"
                      value={companyInfo.companyPostalCode}
                      onChange={(e) => handleCompanyInfoChange("companyPostalCode", e.target.value)}
                      placeholder="e.g., 010001"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Step */}
          {currentStep === "documents" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Required Documents</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload your documents directly. Supported formats: PDF, JPG, PNG (max 10MB each)
                </p>
              </div>

              <div className="space-y-6">
                <FileUpload
                  label="Identity Document (ID/Passport)"
                  description="A clear copy of your government-issued ID or passport"
                  required
                  value={documents.identityDocument}
                  onChange={(file) => handleDocumentChange("identityDocument", file)}
                />

                <FileUpload
                  label="Business Registration Certificate"
                  description="Official business registration document (if applicable)"
                  value={documents.businessRegistration}
                  onChange={(file) => handleDocumentChange("businessRegistration", file)}
                />

                <FileUpload
                  label="Insurance Certificate"
                  description="Proof of liability insurance (if applicable)"
                  value={documents.insuranceCertificate}
                  onChange={(file) => handleDocumentChange("insuranceCertificate", file)}
                />

                <div className="space-y-3">
                  <Label>Additional Documents (optional)</Label>
                  <p className="text-sm text-muted-foreground">
                    Upload any additional documents that support your application
                  </p>

                  {documents.additionalDocuments.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / (1024 * 1024)).toFixed(1)} MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveAdditionalDocument(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="relative border-2 border-dashed rounded-lg p-4 hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleAddAdditionalDocument(file);
                          e.target.value = "";
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Click to add document</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Review Step */}
          {currentStep === "review" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Review Your Application</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Company Information</h4>
                  <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                    <p><span className="font-medium">Company:</span> {companyInfo.companyName}</p>
                    <p><span className="font-medium">Registration:</span> {companyInfo.registrationNumber}</p>
                    <p><span className="font-medium">Tax ID:</span> {companyInfo.taxId}</p>
                    <p><span className="font-medium">Type:</span> {companyInfo.businessType}</p>
                    <p><span className="font-medium">Address:</span> {companyInfo.companyStreet}, {companyInfo.companyCity}, {companyInfo.companyPostalCode}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Documents</h4>
                  <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                    <p><span className="font-medium">Identity Document:</span> {documents.identityDocument?.name || "Not provided"}</p>
                    {documents.businessRegistration && <p><span className="font-medium">Business Registration:</span> {documents.businessRegistration.name}</p>}
                    {documents.insuranceCertificate && <p><span className="font-medium">Insurance:</span> {documents.insuranceCertificate.name}</p>}
                    {documents.additionalDocuments.length > 0 && (
                      <p><span className="font-medium">Additional:</span> {documents.additionalDocuments.map(f => f.name).join(", ")}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Message (optional)</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Any additional information you'd like to share..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === "company" || loading}
            >
              Back
            </Button>

            {currentStep !== "review" ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
