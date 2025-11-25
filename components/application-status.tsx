"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

interface ApplicationStatusProps {
  application: {
    id: string;
    status: string;
    createdAt: string;
    rejectionReason?: string | null;
  };
}

export function ApplicationStatus({ application }: ApplicationStatusProps) {
  const isPending = application.status === "pending";
  const isRejected = application.status === "rejected";

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            {isPending && <Clock className="h-8 w-8 text-yellow-500" />}
            {isRejected && <XCircle className="h-8 w-8 text-red-500" />}
            <div>
              <CardTitle className="text-2xl">
                {isPending && "Application Under Review"}
                {isRejected && "Application Not Approved"}
              </CardTitle>
              <CardDescription>
                Cleaner Application Status
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isPending && (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Your application to become a cleaner is currently being reviewed by our team.
                  This process typically takes 1-3 business days. You'll receive an email once a decision has been made.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Application ID:</span>
                  <span className="font-mono">{application.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Submitted:</span>
                  <span>{new Date(application.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="capitalize text-yellow-600 font-medium">Pending Review</span>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">What happens next?</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Our team will review your submitted documents</li>
                  <li>• We'll verify your business registration and insurance</li>
                  <li>• You'll receive an email notification with the decision</li>
                  <li>• Once approved, you can access the cleaner dashboard</li>
                </ul>
              </div>
            </>
          )}

          {isRejected && (
            <>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Unfortunately, your application to become a cleaner was not approved at this time.
                </AlertDescription>
              </Alert>

              {application.rejectionReason && (
                <div className="space-y-2">
                  <h4 className="font-medium">Reason for rejection:</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
                    {application.rejectionReason}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Application ID:</span>
                  <span className="font-mono">{application.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Submitted:</span>
                  <span>{new Date(application.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button asChild className="flex-1">
                  <Link href="/cleaner-signup">Apply Again</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </>
          )}

          {!isPending && !isRejected && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Unknown application status. Please contact support.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
