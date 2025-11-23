import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold">
            SaaS Starter
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <p className="text-muted-foreground mb-6">
            This is a placeholder terms of service. Replace this with your actual terms of service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            Describe the acceptance of terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Use of Service</h2>
          <p className="text-muted-foreground">
            Explain how users can use your service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">User Responsibilities</h2>
          <p className="text-muted-foreground">
            List user responsibilities.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
          <p className="text-muted-foreground">
            Describe limitations of liability.
          </p>
        </div>

        <div className="mt-12">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>

      <footer className="border-t py-8 px-4 mt-auto">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 SaaS Starter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
