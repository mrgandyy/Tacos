import { EventSchedule } from '@/components/events/EventSchedule'
import { Container, Section } from '@/components/ui/Layout'
import { GlitchText } from '@/components/ui/GlitchText'

export const metadata = {
    title: 'Events | Taco\'s Nightlife',
    description: 'Upcoming events and parties at Taco\'s.',
}

export default function EventsPage() {
    return (
        <div className="min-h-screen pt-20 pb-20">
            <Container>
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase">
                        <span className="text-cyber-pink block text-lg font-bold tracking-widest mb-2">System Logs</span>
                        <GlitchText text="EVENT SCHEDULE" />
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Track the signal. Don't miss the drop. Timestamps are local to your system.
                    </p>
                </div>

                <EventSchedule />
            </Container>
        </div>
    )
}
