"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/components/providers/user-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Star,
  ArrowLeft,
  UserPlus,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  UserRole,
  useMyCompanyCleanersQuery,
  CleanerTier,
} from "@/lib/api/_gen/gql";
import Link from "next/link";

export default function CompanyCleanersPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useCurrentUser();
  const { toast } = useToast();

  const { data, loading, error } = useMyCompanyCleanersQuery({
    skip: !user || user.role !== UserRole.CleanerAdmin,
  });

  // Redirect non-company admins
  useEffect(() => {
    if (!userLoading && user) {
      if (user.role !== UserRole.CleanerAdmin) {
        toast({
          title: "Access Denied",
          description: "Only company admins can access this page.",
          variant: "destructive",
        });
        router.push("/dashboard");
      }
    }
  }, [user, userLoading, router, toast]);

  const getTierBadge = (tier: CleanerTier) => {
    const tierStyles = {
      [CleanerTier.New]: "bg-gray-100 text-gray-800",
      [CleanerTier.Standard]: "bg-blue-100 text-blue-800",
      [CleanerTier.Premium]: "bg-purple-100 text-purple-800",
      [CleanerTier.Pro]: "bg-amber-100 text-amber-800",
    };

    return (
      <Badge className={tierStyles[tier] || tierStyles[CleanerTier.New]}>
        {tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase()}
      </Badge>
    );
  };


  if (userLoading || loading) {
    return (
      <div className="space-y-6 py-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 py-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">Error loading cleaners: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const cleaners = data?.myCompanyCleaners || [];
  const activeCleaners = cleaners.filter(c => c.isActive);
  const verifiedCleaners = cleaners.filter(c => c.isVerified);
  const averageRating = cleaners.length > 0
    ? cleaners.reduce((sum, c) => sum + c.averageRating, 0) / cleaners.length
    : 0;

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
            <h1 className="text-3xl font-bold tracking-tight">Your Cleaners</h1>
            <p className="text-muted-foreground mt-1">
              Manage your company's cleaning team
            </p>
          </div>
        </div>

        <Link href="/dashboard/company/invites">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Cleaner
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cleaners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cleaners.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeCleaners.length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedCleaners.length}</div>
            <p className="text-xs text-muted-foreground">
              Background checked
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageRating > 0 ? averageRating.toFixed(1) : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              From all reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cleaners Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            All cleaners registered with your company
          </CardDescription>
        </CardHeader>
        <CardContent>
          {cleaners.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No cleaners yet</h3>
              <p className="text-muted-foreground mb-4">
                Invite cleaners to join your company and start building your team.
              </p>
              <Link href="/dashboard/company/invites">
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite First Cleaner
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cleaner</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cleaners.map((cleaner) => (
                  <TableRow key={cleaner.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={cleaner.profilePicture || undefined} />
                          <AvatarFallback>
                            {cleaner.user?.displayName?.charAt(0) || "C"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{cleaner.user?.displayName || "Unknown"}</p>
                          <p className="text-xs text-muted-foreground">{cleaner.user?.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTierBadge(cleaner.tier)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <span>{cleaner.averageRating > 0 ? cleaner.averageRating.toFixed(1) : "N/A"}</span>
                        <span className="text-muted-foreground text-xs">
                          ({cleaner.totalReviews})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{cleaner.completedBookings} completed</p>
                        <p className="text-xs text-muted-foreground">
                          {cleaner.totalBookings} total
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {cleaner.isActive ? (
                          <Badge variant="outline" className="text-green-500 border-green-500">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">
                            <XCircle className="h-3 w-3 mr-1" />
                            Inactive
                          </Badge>
                        )}
                        {cleaner.isVerified && (
                          <Badge variant="outline" className="text-blue-500 border-blue-500">
                            Verified
                          </Badge>
                        )}
                      </div>
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
