"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useCurrentUser } from "@/components/providers/user-provider";
import { BOOKING } from "@/lib/graphql/queries/my-bookings";
import {
  CONFIRM_BOOKING,
  START_BOOKING,
  COMPLETE_BOOKING,
  CANCEL_BOOKING,
  MARK_NO_SHOW,
} from "@/lib/graphql/mutations/booking-mutations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  DollarSign,
  CheckCircle,
  XCircle,
  PlayCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface BookingDetailModalProps {
  bookingId: string;
  open: boolean;
  onClose: () => void;
  onBookingUpdated?: () => void;
}

type BookingStatus = "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
type CancellationReason = "CUSTOMER_REQUEST" | "CLEANER_REQUEST" | "EMERGENCY" | "WEATHER" | "OTHER";

export function BookingDetailModal({
  bookingId,
  open,
  onClose,
  onBookingUpdated,
}: BookingDetailModalProps) {
  const { user } = useCurrentUser();
  const { toast } = useToast();
  const isCleaner = user?.role === "cleaner";

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [cancellationReason, setCancellationReason] = useState<CancellationReason>("CUSTOMER_REQUEST");
  const [cancellationNote, setCancellationNote] = useState("");
  const [cleanerNotes, setCleanerNotes] = useState("");

  const { data, loading, refetch } = useQuery(BOOKING, {
    variables: { id: bookingId },
    skip: !open || !bookingId,
  });

  const [confirmBooking, { loading: confirming }] = useMutation(CONFIRM_BOOKING);
  const [startBooking, { loading: starting }] = useMutation(START_BOOKING);
  const [completeBooking, { loading: completing }] = useMutation(COMPLETE_BOOKING);
  const [cancelBooking, { loading: cancelling }] = useMutation(CANCEL_BOOKING);
  const [markNoShow, { loading: markingNoShow }] = useMutation(MARK_NO_SHOW);

  const booking = data?.booking;

  const handleConfirm = async () => {
    try {
      await confirmBooking({ variables: { id: bookingId } });
      toast({
        title: "Booking Confirmed",
        description: "You have successfully accepted this job.",
      });
      refetch();
      onBookingUpdated?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleStart = async () => {
    try {
      await startBooking({ variables: { id: bookingId } });
      toast({
        title: "Service Started",
        description: "The service has been marked as in progress.",
      });
      refetch();
      onBookingUpdated?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleComplete = async () => {
    try {
      await completeBooking({
        variables: {
          id: bookingId,
          cleanerNotes: cleanerNotes || undefined,
        },
      });
      toast({
        title: "Service Completed",
        description: "The service has been marked as completed.",
      });
      setShowCompleteDialog(false);
      setCleanerNotes("");
      refetch();
      onBookingUpdated?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCancel = async () => {
    try {
      await cancelBooking({
        variables: {
          input: {
            id: bookingId,
            reason: cancellationReason,
            note: cancellationNote || undefined,
          },
        },
      });
      toast({
        title: "Booking Cancelled",
        description: "The booking has been cancelled.",
      });
      setShowCancelDialog(false);
      setCancellationNote("");
      refetch();
      onBookingUpdated?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleNoShow = async () => {
    try {
      await markNoShow({ variables: { id: bookingId } });
      toast({
        title: "Marked as No-Show",
        description: "The customer has been marked as no-show.",
      });
      refetch();
      onBookingUpdated?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
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

  const formatPrice = (priceInBani: number) => {
    const ron = priceInBani / 100;
    return `${ron.toFixed(2)} RON`;
  };

  const getServiceTypeLabel = (type: string) => {
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

  const canConfirm = isCleaner && booking?.status === "PENDING";
  const canStart = isCleaner && booking?.status === "CONFIRMED";
  const canComplete = isCleaner && booking?.status === "IN_PROGRESS";
  const canCancel =
    booking?.status === "PENDING" ||
    booking?.status === "CONFIRMED" ||
    booking?.status === "IN_PROGRESS";
  const canMarkNoShow = isCleaner && booking?.status === "CONFIRMED";

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!booking) {
    return null;
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl">
                  {getServiceTypeLabel(booking.serviceType)}
                </DialogTitle>
                <DialogDescription>
                  Booking ID: {booking.id.slice(0, 8)}
                </DialogDescription>
              </div>
              <Badge className={getStatusColor(booking.status)} variant="secondary">
                {booking.status.replace("_", " ")}
              </Badge>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Date & Time */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {format(new Date(booking.scheduledDate), "EEEE, MMMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time & Duration</p>
                      <p className="font-medium">
                        {booking.scheduledTime} ({booking.duration}h)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* People */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      {isCleaner ? "Customer" : "Cleaner"}
                    </p>
                    <p className="font-medium">
                      {isCleaner
                        ? booking.customer?.displayName
                        : booking.cleaner?.displayName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isCleaner ? booking.customer?.email : booking.cleaner?.email}
                    </p>
                  </div>
                  {!isCleaner && booking.cleanerProfile && (
                    <Badge variant="outline">
                      {booking.cleanerProfile.tier}
                      {booking.cleanerProfile.averageRating > 0 &&
                        ` • ⭐ ${booking.cleanerProfile.averageRating.toFixed(1)}`}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Address */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Service Address</p>
                    <p className="font-medium">{booking.address.street}</p>
                    <p className="text-sm">
                      {booking.address.city}, {booking.address.postalCode}
                    </p>
                    {booking.address.building && (
                      <p className="text-sm text-muted-foreground">
                        Building: {booking.address.building}
                      </p>
                    )}
                    {booking.address.apartment && (
                      <p className="text-sm text-muted-foreground">
                        Apartment: {booking.address.apartment}
                      </p>
                    )}
                    {booking.address.accessInstructions && (
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong>Access:</strong> {booking.address.accessInstructions}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <p className="font-semibold">Pricing Breakdown</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Service Price</span>
                    <span>{formatPrice(booking.servicePrice)}</span>
                  </div>
                  {booking.addOnsPrice > 0 && (
                    <div className="flex justify-between">
                      <span>Add-ons</span>
                      <span>{formatPrice(booking.addOnsPrice)}</span>
                    </div>
                  )}
                  {booking.travelFee > 0 && (
                    <div className="flex justify-between">
                      <span>Travel Fee</span>
                      <span>{formatPrice(booking.travelFee)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span>
                      {formatPrice(
                        booking.servicePrice + booking.addOnsPrice + booking.travelFee
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Platform Fee (15%)</span>
                    <span>{formatPrice(booking.platformFee)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(booking.totalPrice)}</span>
                  </div>
                  {isCleaner && (
                    <div className="flex justify-between text-green-600 font-medium mt-2">
                      <span>Your Payout</span>
                      <span>{formatPrice(booking.cleanerPayout)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            {(booking.customerNotes || booking.cleanerNotes) && (
              <Card>
                <CardContent className="pt-6 space-y-3">
                  {booking.customerNotes && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Customer Notes
                      </p>
                      <p className="text-sm">{booking.customerNotes}</p>
                    </div>
                  )}
                  {booking.cleanerNotes && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Cleaner Notes
                      </p>
                      <p className="text-sm">{booking.cleanerNotes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <DialogFooter className="flex gap-2 sm:gap-2">
            {/* Action Buttons */}
            {canConfirm && (
              <Button onClick={handleConfirm} disabled={confirming} className="flex-1">
                {confirming ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="mr-2 h-4 w-4" />
                )}
                Confirm Job
              </Button>
            )}

            {canStart && (
              <Button onClick={handleStart} disabled={starting} className="flex-1">
                {starting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <PlayCircle className="mr-2 h-4 w-4" />
                )}
                Start Service
              </Button>
            )}

            {canComplete && (
              <Button
                onClick={() => setShowCompleteDialog(true)}
                disabled={completing}
                className="flex-1"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Complete Service
              </Button>
            )}

            {canMarkNoShow && (
              <Button
                onClick={handleNoShow}
                disabled={markingNoShow}
                variant="outline"
                className="flex-1"
              >
                {markingNoShow ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <AlertCircle className="mr-2 h-4 w-4" />
                )}
                No-Show
              </Button>
            )}

            {canCancel && (
              <Button
                onClick={() => setShowCancelDialog(true)}
                disabled={cancelling}
                variant="destructive"
                className="flex-1"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}

            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Complete Dialog */}
      <AlertDialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Mark this service as completed. You can add optional notes about the service.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="cleaner-notes">Cleaner Notes (Optional)</Label>
            <Textarea
              id="cleaner-notes"
              placeholder="Add any notes about the service..."
              value={cleanerNotes}
              onChange={(e) => setCleanerNotes(e.target.value)}
              className="mt-2"
              rows={4}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleComplete} disabled={completing}>
              {completing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Complete Service
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Please select a reason for cancellation. Cancellations less than 24 hours before
              the scheduled time may not be eligible for a full refund.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="cancellation-reason">Reason</Label>
              <Select
                value={cancellationReason}
                onValueChange={(value) => setCancellationReason(value as CancellationReason)}
              >
                <SelectTrigger id="cancellation-reason" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CUSTOMER_REQUEST">Customer Request</SelectItem>
                  <SelectItem value="CLEANER_REQUEST">Cleaner Request</SelectItem>
                  <SelectItem value="EMERGENCY">Emergency</SelectItem>
                  <SelectItem value="WEATHER">Weather</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cancellation-note">Additional Notes (Optional)</Label>
              <Textarea
                id="cancellation-note"
                placeholder="Provide additional details..."
                value={cancellationNote}
                onChange={(e) => setCancellationNote(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel} disabled={cancelling}>
              {cancelling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
