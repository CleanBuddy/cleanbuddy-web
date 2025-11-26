"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/components/providers/user-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  UserPlus,
  Copy,
  MoreHorizontal,
  XCircle,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import {
  UserRole,
  CompanyType,
  useMyCompanyInvitesQuery,
  useCreateCleanerInviteMutation,
  useRevokeCleanerInviteMutation,
  CleanerInviteStatus,
} from "@/lib/api/_gen/gql";
import { useEffect } from "react";
import Link from "next/link";

export default function CompanyInvitesPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useCurrentUser();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newInviteEmail, setNewInviteEmail] = useState("");
  const [newInviteMessage, setNewInviteMessage] = useState("");
  const [createdInviteUrl, setCreatedInviteUrl] = useState<string | null>(null);

  const { data, loading, error, refetch } = useMyCompanyInvitesQuery({
    skip: !user || user.role !== UserRole.CleanerAdmin,
  });

  const [createInvite, { loading: createLoading }] = useCreateCleanerInviteMutation();
  const [revokeInvite] = useRevokeCleanerInviteMutation();

  // Redirect non-company admins and Individual companies
  useEffect(() => {
    if (!userLoading && user) {
      if (user.role !== UserRole.CleanerAdmin) {
        toast({
          title: "Access Denied",
          description: "Only company admins can access this page.",
          variant: "destructive",
        });
        router.push("/dashboard");
      } else if (user.company?.companyType === CompanyType.Individual) {
        toast({
          title: "Not Available",
          description: "Inviting cleaners is only available for business accounts.",
          variant: "destructive",
        });
        router.push("/dashboard/company");
      }
    }
  }, [user, userLoading, router, toast]);

  const handleCreateInvite = async () => {
    try {
      const result = await createInvite({
        variables: {
          input: {
            email: newInviteEmail || null,
            message: newInviteMessage || null,
          },
        },
      });

      if (result.data?.createCleanerInvite) {
        setCreatedInviteUrl(result.data.createCleanerInvite.inviteUrl);
        refetch();
        toast({
          title: "Invite Created",
          description: "The invite link has been generated successfully.",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to create invite",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Copied!",
        description: "Invite link copied to clipboard.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to copy link to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleRevokeInvite = async (inviteId: string) => {
    try {
      await revokeInvite({
        variables: { id: inviteId },
      });
      refetch();
      toast({
        title: "Invite Revoked",
        description: "The invite has been revoked successfully.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to revoke invite",
        variant: "destructive",
      });
    }
  };

  const resetCreateDialog = () => {
    setNewInviteEmail("");
    setNewInviteMessage("");
    setCreatedInviteUrl(null);
    setIsCreateDialogOpen(false);
  };

  const getStatusBadge = (status: CleanerInviteStatus, expiresAt: string) => {
    const isExpired = new Date(expiresAt) < new Date();

    if (status === CleanerInviteStatus.Accepted) {
      return (
        <Badge variant="default" className="bg-green-500">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Accepted
        </Badge>
      );
    }
    if (status === CleanerInviteStatus.Revoked) {
      return (
        <Badge variant="secondary">
          <XCircle className="h-3 w-3 mr-1" />
          Revoked
        </Badge>
      );
    }
    if (isExpired || status === CleanerInviteStatus.Expired) {
      return (
        <Badge variant="outline" className="text-muted-foreground">
          <AlertCircle className="h-3 w-3 mr-1" />
          Expired
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-blue-500 border-blue-500">
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
  };

  if (userLoading || loading) {
    return (
      <div className="space-y-6 py-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 py-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">Error loading invites: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const invites = data?.myCompanyInvites || [];

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/company">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cleaner Invites</h1>
            <p className="text-muted-foreground mt-1">
              Invite cleaners to join your company
            </p>
          </div>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
          if (!open) resetCreateDialog();
          else setIsCreateDialogOpen(true);
        }}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Create Invite
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Cleaner Invite</DialogTitle>
              <DialogDescription>
                Generate an invite link to share with a cleaner.
              </DialogDescription>
            </DialogHeader>

            {createdInviteUrl ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Invite Created!</span>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    Share this link with the cleaner:
                  </p>
                  <div className="flex gap-2">
                    <Input
                      readOnly
                      value={createdInviteUrl}
                      className="text-sm"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleCopyLink(createdInviteUrl)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={resetCreateDialog}>Done</Button>
                </DialogFooter>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="cleaner@example.com"
                      value={newInviteEmail}
                      onChange={(e) => setNewInviteEmail(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      For your records only - the cleaner can use any email to sign up.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Personal Message (optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Welcome to our team!"
                      value={newInviteMessage}
                      onChange={(e) => setNewInviteMessage(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateInvite} disabled={createLoading}>
                    {createLoading ? "Creating..." : "Create Invite"}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Invites Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Invites</CardTitle>
          <CardDescription>
            {invites.length} invite{invites.length !== 1 ? "s" : ""} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {invites.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No invites yet</h3>
              <p className="text-muted-foreground mb-4">
                Create an invite to start building your team.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Create First Invite
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Accepted By</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invites.map((invite) => (
                  <TableRow key={invite.id}>
                    <TableCell>
                      {invite.email || <span className="text-muted-foreground">Not specified</span>}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(invite.status, invite.expiresAt)}
                    </TableCell>
                    <TableCell>
                      {invite.acceptedBy ? (
                        <div>
                          <p className="font-medium">{invite.acceptedBy.displayName}</p>
                          <p className="text-xs text-muted-foreground">{invite.acceptedBy.email}</p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(invite.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(invite.expiresAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {invite.status === CleanerInviteStatus.Pending && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || window.location.origin;
                                handleCopyLink(`${frontendUrl}/invite/${invite.token}`);
                              }}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleRevokeInvite(invite.id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Revoke
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
