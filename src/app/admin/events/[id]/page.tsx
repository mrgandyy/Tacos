import { EventForm } from "@/components/admin/events/EventForm";
import { Container } from "@/components/ui/Layout";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    // Fetch event data
    const { data: event } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

    if (!event) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-24 pb-12">
            <Container>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Edit Event</h1>
                    <p className="text-gray-400">Update event details and lineup.</p>
                </div>

                <EventForm initialData={event} />
            </Container>
        </div>
    );
}
