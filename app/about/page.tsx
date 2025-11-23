import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
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
        <h1 className="text-4xl font-bold mb-8">About Us</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-6">
            This is a placeholder about page. Replace this content with information about your company or product.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            Add your mission statement here.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
          <p className="text-muted-foreground">
            Introduce your team here.
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
