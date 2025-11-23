import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <p className="text-muted-foreground mb-6">
            This is a placeholder privacy policy. Replace this with your actual privacy policy that complies with applicable laws (GDPR, CCPA, etc.).
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
          <p className="text-muted-foreground">
            Describe what information you collect from users.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground">
            Explain how you use the collected information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
          <p className="text-muted-foreground">
            Describe your security measures.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            Provide contact information for privacy-related questions.
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
