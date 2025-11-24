"use client";

import { useCurrentUser } from "@/components/providers/user-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Home, Package } from "lucide-react";

export default function ServicesPage() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="space-y-6 py-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (user?.role !== "global_admin" && user?.role !== "company_admin") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">This page is only accessible to administrators.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground mt-2">
            Manage service offerings, pricing, and add-ons
          </p>
        </div>
        <Button disabled>
          <Sparkles className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Home className="h-5 w-5 text-muted-foreground" />
              <Badge>Active</Badge>
            </div>
            <CardTitle className="mt-2">General Cleaning</CardTitle>
            <CardDescription>
              Standard cleaning service for homes and offices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Starting at</span>
              <span className="text-lg font-semibold">150 RON</span>
            </div>
            <Button variant="outline" className="w-full mt-4" disabled>
              Edit Service
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
              <Badge>Active</Badge>
            </div>
            <CardTitle className="mt-2">Deep Cleaning</CardTitle>
            <CardDescription>
              Thorough cleaning for all areas of your space
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Starting at</span>
              <span className="text-lg font-semibold">250 RON</span>
            </div>
            <Button variant="outline" className="w-full mt-4" disabled>
              Edit Service
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Package className="h-5 w-5 text-muted-foreground" />
              <Badge>Active</Badge>
            </div>
            <CardTitle className="mt-2">Move In/Out</CardTitle>
            <CardDescription>
              Comprehensive cleaning for moving situations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Starting at</span>
              <span className="text-lg font-semibold">350 RON</span>
            </div>
            <Button variant="outline" className="w-full mt-4" disabled>
              Edit Service
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Add-Ons</CardTitle>
          <CardDescription>
            Additional services customers can add to their bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Configure optional add-ons like window cleaning, carpet cleaning, appliance cleaning, etc.
          </p>
          <Button variant="outline" disabled>
            Manage Add-Ons (Coming Soon)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
