import { UserProvider } from "@/components/providers/user-provider";
import BookingFlow from "./booking-flow";

export default function BookPage() {
    return (
        <UserProvider>
            <BookingFlow />
        </UserProvider>
    );
}
