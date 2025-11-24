"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Clock, DollarSign, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

// This will be replaced with actual GraphQL query
const mockCleaners = [
  {
    id: "1",
    name: "Maria Ionescu",
    tier: "Premium",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 85,
    location: "Bucharest, Sector 1",
    avatar: null,
    verified: true,
    completedJobs: 150,
  },
  {
    id: "2",
    name: "Ana Popescu",
    tier: "Standard",
    rating: 4.7,
    reviews: 89,
    hourlyRate: 65,
    location: "Bucharest, Sector 2",
    avatar: null,
    verified: true,
    completedJobs: 95,
  },
  {
    id: "3",
    name: "Elena Dumitrescu",
    tier: "Pro",
    rating: 5.0,
    reviews: 203,
    hourlyRate: 120,
    location: "Bucharest, Sector 3",
    avatar: null,
    verified: true,
    completedJobs: 250,
  },
];

export default function FindCleanersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tier, setTier] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");
  const [loading, setLoading] = useState(false);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "New":
        return "bg-gray-100 text-gray-800";
      case "Standard":
        return "bg-blue-100 text-blue-800";
      case "Premium":
        return "bg-purple-100 text-purple-800";
      case "Pro":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Find Cleaners</h1>
        <p className="text-muted-foreground mt-2">
          Browse and compare professional cleaning services in Bucharest
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tier Filter */}
            <Select value={tier} onValueChange={setTier}>
              <SelectTrigger>
                <SelectValue placeholder="All Tiers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {mockCleaners.length} cleaners
        </p>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Cleaners Grid */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6 space-y-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockCleaners.map((cleaner) => (
            <Card key={cleaner.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {cleaner.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{cleaner.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getTierColor(cleaner.tier)} variant="secondary">
                          {cleaner.tier}
                        </Badge>
                        {cleaner.verified && (
                          <Badge variant="outline" className="text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{cleaner.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({cleaner.reviews} reviews)
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{cleaner.location}</span>
                </div>

                {/* Hourly Rate */}
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{cleaner.hourlyRate} RON/hour</span>
                </div>

                {/* Completed Jobs */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{cleaner.completedJobs} completed jobs</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button asChild className="flex-1">
                    <Link href={`/dashboard/cleaners/${cleaner.id}`}>
                      View Profile
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/dashboard/book?cleaner=${cleaner.id}`}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && mockCleaners.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No cleaners found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search filters
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setTier("all");
              setLocation("all");
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Info Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">How to choose a cleaner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• <strong>New Tier:</strong> 40-50 RON/hour - New to the platform</p>
          <p>• <strong>Standard Tier:</strong> 50-70 RON/hour - Proven track record</p>
          <p>• <strong>Premium Tier:</strong> 70-100 RON/hour - Highly rated professionals</p>
          <p>• <strong>Pro Tier:</strong> 100-150 RON/hour - Top-rated experts</p>
        </CardContent>
      </Card>
    </div>
  );
}
