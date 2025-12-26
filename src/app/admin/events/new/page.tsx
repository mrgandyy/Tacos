import { EventForm } from "@/components/admin/events/EventForm";
import { Container } from "@/components/ui/Layout";

export default function NewEventPage() {
    return (
        <div className="min-h-screen pt-24 pb-12">
            <Container>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Create New Event</h1>
                    <p className="text-gray-400">Add a new event to the Tacos Nightlife timeline.</p>
                </div>

                <EventForm />
            </Container>
        </div>
    );
}
