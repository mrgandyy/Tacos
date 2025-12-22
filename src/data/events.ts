import { Event } from './types';

// Mock data for now, easy to update
export const events: Event[] = [
    {
        id: 'evt-001',
        title: "Friday Night Heat",
        venueId: 'afterdark',
        date: '2025-12-26T22:00:00', // Future date relative to current time
        lineup: ['DJ Solstice', 'Neon Vixen', 'BassCannon'],
        status: 'upcoming',
        links: {
            discord: 'https://discord.gg/placeholder'
        }
    },
    {
        id: 'evt-002',
        title: "Underground Sessions",
        venueId: 'underground',
        date: '2025-12-27T23:00:00',
        lineup: ['GrimeLord', 'IndustrialTek'],
        status: 'upcoming'
    },
    {
        id: 'evt-003',
        title: "Sunday Recovery",
        venueId: 'afterparty',
        date: '2025-12-28T14:00:00',
        lineup: ['ChillWave', 'LofiGirl'],
        status: 'upcoming'
    }
];
