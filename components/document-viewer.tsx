"use client";

import { useState, useEffect } from "react";
import { useGenerateDocumentSignedUrlLazyQuery } from "@/lib/api/_gen/gql";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Download, ExternalLink } from "lucide-react";

interface DocumentViewerProps {
  documentUrl: string;
  documentName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocumentViewer({
  documentUrl,
  documentName,
  open,
  onOpenChange,
}: DocumentViewerProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [getSignedUrl, { loading, error }] = useGenerateDocumentSignedUrlLazyQuery();

  useEffect(() => {
    if (open && documentUrl) {
      // Reset state when opening
      setSignedUrl(null);

      // Fetch signed URL when dialog opens
      getSignedUrl({
        variables: { documentUrl },
      }).then((result) => {
        if (result.data?.generateDocumentSignedUrl) {
          setSignedUrl(result.data.generateDocumentSignedUrl);
        }
      });
    } else {
      setSignedUrl(null);
    }
  }, [open, documentUrl, getSignedUrl]);

  const isImage = documentUrl.match(/\.(jpg|jpeg|png)$/i);
  const isPdf = documentUrl.match(/\.pdf$/i);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {documentName}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {loading && (
            <div className="space-y-4 p-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          )}

          {error && (
            <div className="p-8 text-center">
              <p className="text-destructive mb-4">Failed to load document</p>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          )}

          {!loading && !error && signedUrl && (
            <div className="space-y-4">
              {/* Action buttons */}
              <div className="flex gap-2 p-4 border-b">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(signedUrl, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in New Tab
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = signedUrl;
                    link.download = documentName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>

              {/* Document preview */}
              <div className="px-4 pb-4">
                {isImage ? (
                  <img
                    src={signedUrl}
                    alt={documentName}
                    className="w-full h-auto rounded border"
                  />
                ) : isPdf ? (
                  <iframe
                    src={signedUrl}
                    className="w-full h-[600px] rounded border"
                    title={documentName}
                  />
                ) : (
                  <div className="text-center p-8 border rounded">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Preview not available for this file type
                    </p>
                    <Button variant="outline" onClick={() => window.open(signedUrl, "_blank")}>
                      Open Document
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
