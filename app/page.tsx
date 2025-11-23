"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Zap, Users, Shield } from "lucide-react";
import { useCurrentUserQuery } from "@/lib/api/_gen/gql";

export default function Home() {
  const { data, loading } = useCurrentUserQuery();
  const isAuthenticated = !!data?.currentUser && !loading;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold">
            SaaS Starter
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
            <Button asChild variant={isAuthenticated ? "default" : "outline"} size="sm" className="md:size-default">
              <Link href={isAuthenticated ? "/dashboard" : "/auth"}>
                {isAuthenticated ? "Dashboard" : "Sign In"}
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Build Your SaaS Faster
          </h1>
          <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
            A modern Next.js SaaS starter template with authentication, team management,
            and everything you need to launch quickly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={isAuthenticated ? "/dashboard" : "/auth"}>
                {isAuthenticated ? "Go to Dashboard" : "Get Started"} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Everything You Need</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 md:h-10 md:w-10 mb-3 md:mb-4 text-primary" />
                <CardTitle className="text-lg md:text-xl">Lightning Fast</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Built with Next.js 16 and React 19 for optimal performance
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 md:h-10 md:w-10 mb-3 md:mb-4 text-primary" />
                <CardTitle className="text-lg md:text-xl">Team Management</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Built-in team and project management out of the box
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 md:h-10 md:w-10 mb-3 md:mb-4 text-primary" />
                <CardTitle className="text-lg md:text-xl">Secure by Default</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  OAuth authentication and secure token management included
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary flex-shrink-0" />
                    Up to 3 team members
                  </li>
                  <li className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary flex-shrink-0" />
                    5 projects
                  </li>
                  <li className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary flex-shrink-0" />
                    Basic support
                  </li>
                </ul>
                <Button asChild className="w-full mt-6" variant="outline">
                  <Link href={isAuthenticated ? "/dashboard" : "/auth"}>
                    {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription>For growing teams</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary flex-shrink-0" />
                    Unlimited team members
                  </li>
                  <li className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary flex-shrink-0" />
                    Unlimited projects
                  </li>
                  <li className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary flex-shrink-0" />
                    Priority support
                  </li>
                  <li className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary flex-shrink-0" />
                    Advanced features
                  </li>
                </ul>
                <Button asChild className="w-full mt-6">
                  <Link href={isAuthenticated ? "/dashboard" : "/auth"}>
                    {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Get Started?</h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">
            Join thousands of teams already using our platform
          </p>
          <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
            <Link href={isAuthenticated ? "/dashboard" : "/auth"}>
              {isAuthenticated ? "Go to Dashboard" : "Start Building Today"} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8 px-4 mt-auto">
        <div className="container mx-auto text-center text-muted-foreground">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-3 md:mb-4">
            <Link href="/about" className="text-sm md:text-base hover:text-foreground">About</Link>
            <Link href="/privacy" className="text-sm md:text-base hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="text-sm md:text-base hover:text-foreground">Terms</Link>
            <Link href="/contact" className="text-sm md:text-base hover:text-foreground">Contact</Link>
          </div>
          <p className="text-xs md:text-sm">&copy; 2025 SaaS Starter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
