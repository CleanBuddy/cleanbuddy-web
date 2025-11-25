"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, XCircle, BadgeCheck, LogOut, MoreVertical } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/ui/customer-and-user-avatar";
import { useCurrentUser } from "@/components/providers/user-provider";
import { useDialog } from "@/components/providers/dialog-provider";
import { UserSettingsDialogContent } from "@/components/dialogs/user-settings-dialog";
import { signOut } from "@/lib/auth";
import Link from "next/link";
import { ApplicationStatus as ApplicationStatusEnum, ApplicationType } from "@/lib/api/_gen/gql";

interface ApplicationStatusProps {
  application: {
    id: string;
    status: string;
    applicationType: string;
    createdAt: string;
    rejectionReason?: string | null;
  };
}

export function ApplicationStatus({ application }: ApplicationStatusProps) {
  const isPending = application.status === ApplicationStatusEnum.Pending;
  const isRejected = application.status === ApplicationStatusEnum.Rejected;
  const isCompanyApplication = application.applicationType === ApplicationType.CompanyAdmin;
  const applicationType = isCompanyApplication ? "Company" : "Cleaner";
  const { user } = useCurrentUser();
  const { openDialog } = useDialog();

  const handleLogout = async () => {
    await signOut();
  };

  const handleAccountSettings = () => {
    if (user) {
      openDialog(<UserSettingsDialogContent user={{ name: user.displayName, email: user.email }} />);
    }
  };

  return (
    <div className="min-h-screen p-4">
      {/* Top bar with user menu */}
      <div className="max-w-2xl mx-auto mb-4 flex justify-end">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <UserAvatar author={{ name: user.displayName, email: user.email }} />
                <div className="hidden sm:flex flex-col items-start text-left">
                  <span className="text-sm font-medium">{user.displayName}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center gap-2">
                  <UserAvatar author={{ name: user.displayName, email: user.email }} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.displayName}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleAccountSettings}>
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Application status card */}
      <div className="flex items-center justify-center">
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
                {applicationType} Application Status
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
                  Your {isCompanyApplication ? "company registration" : "application to become a cleaner"} is currently being reviewed by our team.
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
                  <li>• We'll verify your {isCompanyApplication ? "company registration and credentials" : "business registration and insurance"}</li>
                  <li>• You'll receive an email notification with the decision</li>
                  <li>• Once approved, you can access the {isCompanyApplication ? "company admin" : "cleaner"} dashboard</li>
                </ul>
              </div>
            </>
          )}

          {isRejected && (
            <>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Unfortunately, your {isCompanyApplication ? "company registration" : "application to become a cleaner"} was not approved at this time.
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
                  <Link href={isCompanyApplication ? "/company-signup" : "/cleaner-signup"}>Apply Again</Link>
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
    </div>
  );
}
