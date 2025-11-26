"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Zap, Users, Shield, Clock, Building2 } from "lucide-react";
import { useCurrentUserQuery, UserRole, CompanyStatus } from "@/lib/api/_gen/gql";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data, loading } = useCurrentUserQuery();
  const user = data?.currentUser;
  const isAuthenticated = !!user && !loading;
  const router = useRouter();

  const userRole = user?.role;
  const company = user?.company;
  const companyStatus = company?.status;

  // Role-based checks
  const isClient = userRole === UserRole.Client || !userRole;
  const isCleaner = userRole === UserRole.Cleaner;
  const isCleanerAdmin = userRole === UserRole.CleanerAdmin;
  const isGlobalAdmin = userRole === UserRole.GlobalAdmin;

  // Company status-based checks for CLEANER_ADMIN
  const hasNoCompany = isCleanerAdmin && !company;
  const isPendingCompany = isCleanerAdmin && companyStatus === CompanyStatus.Pending;
  const isRejectedCompany = isCleanerAdmin && companyStatus === CompanyStatus.Rejected;
  const isApprovedCompany = isCleanerAdmin && companyStatus === CompanyStatus.Approved;

  const handleRegisterCompanyClick = () => {
    // Redirect to auth with company intent - role will be assigned as CLEANER_ADMIN at auth time
    router.push("/auth?intent=company");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold">
            CleanBuddy
          </Link>
          <nav className="flex gap-2 md:gap-4 items-center">
            <Link href="/about" className="text-sm md:text-base text-muted-foreground hover:text-foreground hidden sm:inline">
              About
            </Link>
            <Link href="/privacy" className="text-sm md:text-base text-muted-foreground hover:text-foreground hidden md:inline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm md:text-base text-muted-foreground hover:text-foreground hidden sm:inline">
              Contact
            </Link>

            {/* Show "Register Company" only for non-authenticated users or clients */}
            {(!isAuthenticated || isClient) && (
              <Button onClick={handleRegisterCompanyClick} variant="outline" size="sm" className="md:size-default">
                <Building2 className="h-4 w-4 mr-1" />
                For Cleaners
              </Button>
            )}

            {/* Show appropriate CTA based on authentication and role */}
            {!isAuthenticated ? (
              <Button asChild variant="default" size="sm" className="md:size-default">
                <Link href="/auth">Sign In</Link>
              </Button>
            ) : (
              <Button asChild variant="default" size="sm" className="md:size-default relative">
                <Link href="/dashboard">
                  Dashboard
                  {isPendingCompany && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Pending
                    </Badge>
                  )}
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          {/* Hero content for non-authenticated users or clients */}
          {(!isAuthenticated || isClient) && (
            <>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                Your Home, Sparkling Clean. Effortlessly.
              </h1>
              <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
                Book professional and reliable home cleaning services with CleanBuddy.
                Enjoy a pristine home without lifting a finger.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
                {isAuthenticated && isClient && (
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/dashboard">
                      My Bookings <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {!isAuthenticated && (
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/book">
                      Book a Cleaning <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </>
          )}

          {/* Hero content for CLEANER_ADMIN with no company (needs to complete application) */}
          {hasNoCompany && (
            <>
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full mb-6">
                <Building2 className="h-5 w-5" />
                <span className="font-medium">Complete Your Company Registration</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                Welcome to CleanBuddy!
              </h1>
              <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
                You're almost there! Please complete your company registration to get started.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/company-signup">
                  Complete Registration <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          )}

          {/* Hero content for pending company applicants */}
          {isPendingCompany && (
            <>
              <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-full mb-6">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Company Application Under Review</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                Welcome to CleanBuddy!
              </h1>
              <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
                Your company registration is being reviewed by our team. We'll notify you once a decision has been made.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/dashboard">
                  View Application Status <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          )}

          {/* Hero content for rejected company applicants */}
          {isRejectedCompany && (
            <>
              <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-2 rounded-full mb-6">
                <Building2 className="h-5 w-5" />
                <span className="font-medium">Company Registration Not Approved</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                We Need to Talk
              </h1>
              <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
                Unfortunately, your company registration was not approved.
                {company?.rejectionReason && ` Reason: ${company.rejectionReason}`}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/contact">
                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/dashboard">
                    View Details
                  </Link>
                </Button>
              </div>
            </>
          )}

          {/* Hero content for cleaners */}
          {isCleaner && (
            <>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                Welcome Back, {user?.displayName?.split(" ")[0]}!
              </h1>
              <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
                Manage your jobs, track your earnings, and grow your cleaning business with CleanBuddy.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/dashboard">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          )}

          {/* Hero content for approved company admins */}
          {isApprovedCompany && (
            <>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                Welcome Back, {user?.displayName?.split(" ")[0]}!
              </h1>
              <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
                Manage your company, cleaners, and bookings with CleanBuddy.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/dashboard">
                  Company Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          )}

          {/* Hero content for global admins */}
          {isGlobalAdmin && (
            <>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                Welcome, {user?.displayName?.split(" ")[0]}!
              </h1>
              <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
                Manage applications, bookings, and oversee the CleanBuddy platform.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/dashboard">
                  Admin Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Why Choose CleanBuddy?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 md:h-10 md:w-10 mb-3 md:mb-4 text-primary" />
                <CardTitle className="text-lg md:text-xl">Fast & Easy Booking</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Schedule your cleaning in minutes with our intuitive online system.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 md:h-10 md:w-10 mb-3 md:mb-4 text-primary" />
                <CardTitle className="text-lg md:text-xl">Professional Cleaners</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Experienced and vetted professionals dedicated to perfection.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 md:h-10 md:w-10 mb-3 md:mb-4 text-primary" />
                <CardTitle className="text-lg md:text-xl">Trusted & Secure</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Your satisfaction and safety are our top priorities.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">How CleanBuddy Works</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-8 text-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">1. Book Online</CardTitle>
                <CardDescription className="text-base">Select your service, date, and time.</CardDescription>
              </CardHeader>
              <CardContent>
                <CheckCircle className="h-12 w-12 text-primary mx-auto" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">2. Professional Cleaning</CardTitle>
                <CardDescription className="text-base">Our vetted cleaners make your home sparkle.</CardDescription>
              </CardHeader>
              <CardContent>
                <Users className="h-12 w-12 text-primary mx-auto" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">3. Enjoy Your Clean Home</CardTitle>
                <CardDescription className="text-base">Relax and savor your freshly cleaned space.</CardDescription>
              </CardHeader>
              <CardContent>
                <Zap className="h-12 w-12 text-primary mx-auto" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Only show for non-authenticated users or authenticated clients */}
      {(!isAuthenticated || (isAuthenticated && isClient)) && (
        <section className="py-12 md:py-20 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready for a Cleaner Home?</h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">
              Book your first cleaning with CleanBuddy today!
            </p>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href={isAuthenticated && isClient ? "/dashboard" : "/book"}>
                {isAuthenticated && isClient ? "My Bookings" : "Book Now"} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t py-6 md:py-8 px-4 mt-auto">
        <div className="container mx-auto text-center text-muted-foreground">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-3 md:mb-4">
            <Link href="/about" className="text-sm md:text-base hover:text-foreground">About</Link>
            <Link href="/privacy" className="text-sm md:text-base hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="text-sm md:text-base hover:text-foreground">Terms</Link>
            <Link href="/contact" className="text-sm md:text-base hover:text-foreground">Contact</Link>
            {/* Show "For Cleaners" only for non-authenticated users or clients */}
            {(!isAuthenticated || isClient) && (
              <button onClick={handleRegisterCompanyClick} className="text-sm md:text-base hover:text-foreground">
                For Cleaners
              </button>
            )}
          </div>
          <p className="text-xs md:text-sm">&copy; 2025 CleanBuddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
