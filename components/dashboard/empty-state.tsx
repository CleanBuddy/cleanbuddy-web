"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FolderPlus } from "lucide-react"

interface EmptyStateProps {
  onCreateProject: () => void
}

export function EmptyState({ onCreateProject }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="max-w-md w-full mx-4">
        <CardContent className="pt-6 p-6 md:p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <FolderPlus className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold">Welcome to Your Dashboard</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Get started by creating your first project.
              </p>
            </div>

            <Button size="lg" onClick={onCreateProject} className="mt-4 w-full sm:w-auto">
              Create Your First Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
