import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  secondaryActionLabel,
  secondaryActionHref,
}: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 px-6">
        <div className="rounded-full bg-muted p-6 mb-4">
          <Icon className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          {description}
        </p>
        <div className="flex gap-3">
          {actionLabel && actionHref && (
            <Button asChild>
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          )}
          {secondaryActionLabel && secondaryActionHref && (
            <Button asChild variant="outline">
              <Link href={secondaryActionHref}>{secondaryActionLabel}</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
