"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/components/providers/user-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, MapPin, Plus, X } from "lucide-react";
import {
  UserRole,
  useCreateCleanerProfileMutation,
  useMyCleanerProfileQuery,
  useTierRateRangesQuery,
} from "@/lib/api/_gen/gql";
import Link from "next/link";

interface ServiceArea {
  city: string;
  neighborhood?: string;
  postalCode?: string;
}

export default function CleanerProfileSetupPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useCurrentUser();
  const { toast } = useToast();
  const hasRedirected = useRef(false);

  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState<number>(5000); // Default 50 RON in bani
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([{ city: "" }]);

  // Check if user already has a profile - use errorPolicy to handle 422 gracefully
  const { data: profileData, loading: profileLoading } = useMyCleanerProfileQuery({
    skip: !user || user.role !== UserRole.Cleaner,
    errorPolicy: "all",
  });

  // Get rate ranges for validation hints
  const { data: rateRangesData } = useTierRateRangesQuery();

  const [createProfile, { loading: createLoading }] = useCreateCleanerProfileMutation();

  // Redirect logic - only redirect non-cleaners
  useEffect(() => {
    if (!userLoading && user && !hasRedirected.current) {
      // Non-cleaners shouldn't be here
      if (user.role !== UserRole.Cleaner) {
        hasRedirected.current = true;
        router.replace("/dashboard");
        return;
      }
    }
  }, [user, userLoading, router]);

  // If user already has a profile, redirect to dashboard
  useEffect(() => {
    if (!profileLoading && profileData?.myCleanerProfile && !hasRedirected.current) {
      hasRedirected.current = true;
      toast({
        title: "Profile Already Exists",
        description: "Your cleaner profile is already set up.",
      });
      router.replace("/dashboard");
    }
  }, [profileData, profileLoading, router, toast]);

  const handleAddServiceArea = () => {
    setServiceAreas([...serviceAreas, { city: "" }]);
  };

  const handleRemoveServiceArea = (index: number) => {
    if (serviceAreas.length > 1) {
      setServiceAreas(serviceAreas.filter((_, i) => i !== index));
    }
  };

  const handleServiceAreaChange = (index: number, field: keyof ServiceArea, value: string) => {
    const updated = [...serviceAreas];
    updated[index] = { ...updated[index], [field]: value || undefined };
    setServiceAreas(updated);
  };

  const handleSubmit = async () => {
    // Validate
    if (serviceAreas.length === 0 || !serviceAreas[0].city.trim()) {
      toast({
        title: "Error",
        description: "Please add at least one service area with a city",
        variant: "destructive",
      });
      return;
    }

    try {
      await createProfile({
        variables: {
          input: {
            hourlyRate,
            bio: bio || null,
            serviceAreaInputs: serviceAreas
              .filter(area => area.city.trim())
              .map(area => ({
                city: area.city.trim(),
                neighborhood: area.neighborhood?.trim() || "",
                postalCode: area.postalCode?.trim() || "",
              })),
          },
        },
      });

      // Clear invite-related localStorage
      localStorage.removeItem("inviteToken");
      localStorage.removeItem("authIntent");

      toast({
        title: "Profile Created!",
        description: "Your cleaner profile has been set up successfully.",
      });

      router.push("/dashboard");
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to create profile",
        variant: "destructive",
      });
    }
  };

  // Get rate range for NEW tier
  const newTierRange = rateRangesData?.tierRateRanges?.find(r => r.tier === "NEW");
  const minRate = newTierRange?.minRate ?? 3000;
  const maxRate = newTierRange?.maxRate ?? 10000;

  if (userLoading || profileLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/50">
        <div className="w-full max-w-lg space-y-4">
          <Card>
            <CardHeader className="text-center">
              <Skeleton className="h-8 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please sign in to continue</CardDescription>
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/50">
      <div className="w-full max-w-lg space-y-4">
        <div className="text-center mb-6">
          <Link href="/" className="text-3xl font-bold">
            CleanBuddy
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Set Up Your Profile</CardTitle>
            <CardDescription>
              Complete your cleaner profile to start receiving bookings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Hourly Rate */}
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (RON)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="hourlyRate"
                  type="number"
                  min={minRate / 100}
                  max={maxRate / 100}
                  value={hourlyRate / 100}
                  onChange={(e) => setHourlyRate(Math.round(parseFloat(e.target.value) * 100) || minRate)}
                  className="w-32"
                />
                <span className="text-sm text-muted-foreground">
                  RON/hour ({minRate / 100} - {maxRate / 100} RON for new cleaners)
                </span>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio (optional)</Label>
              <Textarea
                id="bio"
                placeholder="Tell customers about yourself and your experience..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
              />
            </div>

            {/* Service Areas */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Service Areas
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddServiceArea}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Area
                </Button>
              </div>

              {serviceAreas.map((area, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1 grid gap-2 sm:grid-cols-3">
                    <Input
                      placeholder="City *"
                      value={area.city}
                      onChange={(e) => handleServiceAreaChange(index, "city", e.target.value)}
                    />
                    <Input
                      placeholder="Neighborhood"
                      value={area.neighborhood || ""}
                      onChange={(e) => handleServiceAreaChange(index, "neighborhood", e.target.value)}
                    />
                    <Input
                      placeholder="Postal Code"
                      value={area.postalCode || ""}
                      onChange={(e) => handleServiceAreaChange(index, "postalCode", e.target.value)}
                    />
                  </div>
                  {serviceAreas.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveServiceArea(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                Add the areas where you're willing to work. At least one city is required.
              </p>
            </div>

            {/* Submit */}
            <Button
              className="w-full"
              size="lg"
              onClick={handleSubmit}
              disabled={createLoading}
            >
              {createLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Profile...
                </>
              ) : (
                "Complete Setup"
              )}
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
