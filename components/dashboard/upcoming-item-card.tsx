import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User as UserIcon } from "lucide-react";
import Link from "next/link";

interface UpcomingItemCardProps {
  id: string;
  date: string;
  time: string;
  duration?: number;
  serviceType: string;
  status: string;
  personName: string;
  personRole: "cleaner" | "customer";
  address: {
    street: string;
    city: string;
  };
  amount?: number;
  linkTo: string;
}

export function UpcomingItemCard({
  id,
  date,
  time,
  duration,
  serviceType,
  status,
  personName,
  personRole,
  address,
  amount,
  linkTo,
}: UpcomingItemCardProps) {
  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case "general":
        return "General Cleaning";
      case "deep":
        return "Deep Cleaning";
      case "move_in_out":
        return "Move In/Out";
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "IN_PROGRESS":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Link href={linkTo}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold">{getServiceTypeLabel(serviceType)}</h4>
              <p className="text-sm text-muted-foreground">
                with {personName}
              </p>
            </div>
            <Badge className={getStatusColor(status)} variant="secondary">
              {status}
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                {time}
                {duration && ` (${duration}h)`}
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {address.street}, {address.city}
              </span>
            </div>

            {amount !== undefined && (
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="font-semibold">Amount:</span>
                <span className="font-semibold">{(amount / 100).toFixed(2)} RON</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
