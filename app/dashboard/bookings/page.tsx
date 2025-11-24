"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useCurrentUser } from "@/components/providers/user-provider";
import { MY_BOOKINGS, MY_JOBS } from "@/lib/graphql/queries/my-bookings";
import { BookingDetailModal } from "@/components/booking-detail-modal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, User as UserIcon, DollarSign, MessageSquare, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

type BookingStatus = "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
type ServiceType = "general" | "deep" | "move_in_out";

interface Booking {
  id: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  status: BookingStatus;
  serviceType: ServiceType;
  totalPrice: number;
  customerNotes?: string;
  cleanerNotes?: string;
  createdAt: string;
  cleaner?: {
    id: string;
    displayName: string;
  };
  customer?: {
    id: string;
    displayName: string;
  };
  cleanerProfile?: {
    id: string;
    tier: string;
    averageRating: number;
  };
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
}

export default function BookingsPage() {
  const { user } = useCurrentUser();
  const isCleaner = user?.role === "cleaner";
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  // Use appropriate query based on user role
  const query = isCleaner ? MY_JOBS : MY_BOOKINGS;

  const { data, loading, error, refetch } = useQuery(query, {
    variables: {
      filters: statusFilter !== "all" ? { status: statusFilter } : undefined,
      limit: 50,
      offset: 0,
    },
    skip: !user,
  });

  const bookings: Booking[] = isCleaner
    ? data?.myJobs?.edges?.map((edge: any) => edge.node) || []
    : data?.myBookings?.edges?.map((edge: any) => edge.node) || [];

  const totalCount = isCleaner ? data?.myJobs?.totalCount : data?.myBookings?.totalCount;

  const getStatusColor = (status: string) => {
    const upperStatus = status.toUpperCase();
    switch (upperStatus) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "IN_PROGRESS":
        return "bg-purple-100 text-purple-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "NO_SHOW":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ");
  };

  const getServiceTypeLabel = (type: ServiceType) => {
    switch (type) {
      case "general":
        return "General Cleaning";
      case "deep":
        return "Deep Cleaning";
      case "move_in_out":
        return "Move In/Out Cleaning";
      default:
        return type;
    }
  };

  const formatPrice = (priceInBani: number) => {
    const ron = priceInBani / 100;
    return `${ron.toFixed(2)} RON`;
  };

  const upcomingBookings = bookings.filter(
    (b) => b.status === "CONFIRMED" || b.status === "PENDING" || b.status === "IN_PROGRESS"
  );
  const pastBookings = bookings.filter(
    (b) => b.status === "COMPLETED" || b.status === "CANCELLED" || b.status === "NO_SHOW"
  );

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Bookings</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => refetch()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setSelectedBookingId(booking.id)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{getServiceTypeLabel(booking.serviceType)}</CardTitle>
            <CardDescription className="mt-1">
              {isCleaner
                ? `with ${booking.customer?.displayName || "Customer"}`
                : `with ${booking.cleaner?.displayName || "Cleaner"}`
              }
            </CardDescription>
          </div>
          <Badge className={getStatusColor(booking.status)} variant="secondary">
            {getStatusLabel(booking.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(booking.scheduledDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{booking.scheduledTime} ({booking.duration}h)</span>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
          <span className="text-muted-foreground">
            {booking.address.street}, {booking.address.city}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold">{formatPrice(booking.totalPrice)}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isCleaner ? "My Jobs" : "My Bookings"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isCleaner
              ? "Manage your cleaning jobs"
              : "Manage your cleaning appointments"
            }
            {" • "}
            {totalCount || 0} {isCleaner ? "jobs" : "bookings"} found
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
              <SelectItem value="NO_SHOW">No Show</SelectItem>
            </SelectContent>
          </Select>
          {!isCleaner && (
            <Button asChild>
              <Link href="/book">
                <Calendar className="mr-2 h-4 w-4" />
                Book New Service
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
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
          ) : upcomingBookings.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Book a cleaning service to get started
                </p>
                <Button asChild>
                  <Link href="/dashboard/book">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastBookings.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No past bookings</h3>
                <p className="text-sm text-muted-foreground">
                  Your booking history will appear here
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total {isCleaner ? "Jobs" : "Bookings"}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isCleaner ? "Total Earnings" : "Total Spent"}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(bookings.reduce((sum, b) => sum + b.totalPrice, 0))}
            </div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isCleaner ? "Average Rating" : "Completed Services"}
            </CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isCleaner ? (
              <>
                <div className="text-2xl font-bold">—</div>
                <p className="text-xs text-muted-foreground">See profile</p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {bookings.filter(b => b.status === "COMPLETED").length}
                </div>
                <p className="text-xs text-muted-foreground">Services completed</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Booking Detail Modal */}
      {selectedBookingId && (
        <BookingDetailModal
          bookingId={selectedBookingId}
          open={!!selectedBookingId}
          onClose={() => setSelectedBookingId(null)}
          onBookingUpdated={() => refetch()}
        />
      )}
    </div>
  );
}
