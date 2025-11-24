"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { useCurrentUser } from "@/components/providers/user-provider";
import { SUBMIT_APPLICATION } from "@/lib/graphql/mutations/application-mutations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Building2, FileText, Upload, CheckCircle2 } from "lucide-react";
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
  identityDocumentUrl: string;
  businessRegistrationUrl: string;
  insuranceCertificateUrl: string;
  additionalDocuments: string[];
}

export default function CleanerSignupPage() {
  const router = useRouter();
  const { user } = useCurrentUser();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<FormStep>("company");
  const [message, setMessage] = useState("");

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
    identityDocumentUrl: "",
    businessRegistrationUrl: "",
    insuranceCertificateUrl: "",
    additionalDocuments: [],
  });

  const [submitApplication, { loading }] = useMutation(SUBMIT_APPLICATION, {
    onCompleted: () => {
      toast({
        title: "Application Submitted",
        description: "Your cleaner application has been submitted for review. We'll notify you once it's been processed.",
      });
      router.push("/dashboard");
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

  const handleDocumentChange = (field: keyof Documents, value: string) => {
    setDocuments((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAdditionalDocument = () => {
    const url = prompt("Enter document URL:");
    if (url) {
      setDocuments((prev) => ({
        ...prev,
        additionalDocuments: [...prev.additionalDocuments, url],
      }));
    }
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
    if (!documents.identityDocumentUrl.trim()) {
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
            identityDocumentUrl: documents.identityDocumentUrl,
            businessRegistrationUrl: documents.businessRegistrationUrl || null,
            insuranceCertificateUrl: documents.insuranceCertificateUrl || null,
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
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Required Documents</h3>
              <p className="text-sm text-muted-foreground">
                Please upload your documents to a cloud storage service (Google Drive, Dropbox, etc.) and provide the public links below.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="identityDocument">Identity Document (ID/Passport) *</Label>
                  <Input
                    id="identityDocument"
                    value={documents.identityDocumentUrl}
                    onChange={(e) => handleDocumentChange("identityDocumentUrl", e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessRegistration">Business Registration Certificate</Label>
                  <Input
                    id="businessRegistration"
                    value={documents.businessRegistrationUrl}
                    onChange={(e) => handleDocumentChange("businessRegistrationUrl", e.target.value)}
                    placeholder="https://... (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceCertificate">Insurance Certificate</Label>
                  <Input
                    id="insuranceCertificate"
                    value={documents.insuranceCertificateUrl}
                    onChange={(e) => handleDocumentChange("insuranceCertificateUrl", e.target.value)}
                    placeholder="https://... (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Additional Documents (optional)</Label>
                  <div className="space-y-2">
                    {documents.additionalDocuments.map((doc, index) => (
                      <div key={index} className="flex gap-2">
                        <Input value={doc} readOnly />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveAdditionalDocument(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddAdditionalDocument}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Add Document
                    </Button>
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
                    <p><span className="font-medium">Identity Document:</span> ✓ Provided</p>
                    {documents.businessRegistrationUrl && <p><span className="font-medium">Business Registration:</span> ✓ Provided</p>}
                    {documents.insuranceCertificateUrl && <p><span className="font-medium">Insurance:</span> ✓ Provided</p>}
                    {documents.additionalDocuments.length > 0 && (
                      <p><span className="font-medium">Additional:</span> {documents.additionalDocuments.length} document(s)</p>
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
