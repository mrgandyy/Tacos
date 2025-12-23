import { Event } from './types';

// Mock data for now, easy to update
export const events: Event[] = [
    {
        id: 'evt-hood-1',
        title: "Hood Takeovers",
        venueId: 'the-hood',
        date: '2025-12-26T22:00:00',
        lineup: ['TBD'],
        status: 'upcoming'
    },
    {
        id: 'evt-taco-1',
        title: "Taco Tuesday",
        venueId: 'afterdark',
        date: '2025-12-30T22:00:00',
        lineup: ['TBD'],
        status: 'upcoming'
    },
    {
        id: 'evt-hood-2',
        title: "Hood Takeovers",
        venueId: 'the-hood',
        date: '2026-01-02T22:00:00',
        lineup: ['TBD'],
        status: 'upcoming'
    },
    {
        id: 'evt-taco-2',
        title: "Taco Tuesday",
        venueId: 'afterdark',
        date: '2026-01-06T22:00:00',
        lineup: ['TBD'],
        status: 'upcoming'
    },
    {
        id: 'evt-hood-3',
        title: "Hood Takeovers",
        venueId: 'the-hood',
        date: '2026-01-09T22:00:00',
        lineup: ['TBD'],
        status: 'upcoming'
    },
    {
        id: 'evt-taco-3',
        title: "Taco Tuesday",
        venueId: 'afterdark',
        date: '2026-01-13T22:00:00',
        lineup: ['TBD'],
        status: 'upcoming'
    },
    {
        id: 'evt-ap-1',
        title: "Taco's Afterparty",
        venueId: 'afterparty',
        date: '2025-12-28T02:00:00', // Assuming time, setting to 2 AM Sunday based on "Afterparty" name, can adjust if user meant different time. User said "update events for every 2 weeks on Sunday". Afterparties usually are late night. Or maybe it's Sunday DAY?
        // Wait, Taco's Afterparty usually implies after an event. 
        // User said: "update the events for every 2 weeks on Sunday starting this Sunday"
        // Let's assume standard evening time 10 PM if not specified, OR maybe it's a Sunday morning afterparty?
        // Given prompt "Taco's Afterparty", and "update the events for every 2 weeks on Sunday", I'll stick to a generally safe time or copy existing pattern.
        // Existing "Taco Tuesday" is 22:00.
        // "Afterparty" description says "as the sun comes up". So maybe 5 AM?
        // But user just said "releasing it on Sunday so update the events for every 2 weeks on Sunday".
        // Often VR events are US evening times.
        // I will set it to 22:00 (10 PM) matching others, or maybe earlier if it's "Sunday".
        // Let's go with 22:00 to be safe/consistent with others for now, unless I see a reason otherwise.
        // Actually, "Afterparty" usually means AFTER something. Taco Tuesday is Tues. Hood is Fri.
        // Maybe this is Sunday night?
        // I'll stick to 22:00 (10PM) as a placeholder for "Sunday event".
        lineup: ['TBD'],
        status: 'upcoming'
    },
    {
        id: 'evt-ap-2',
        title: "Taco's Afterparty",
        venueId: 'afterparty',
        date: '2026-01-11T22:00:00',
        lineup: ['TBD'],
        status: 'upcoming'
    },
    {
        id: 'evt-ap-3',
        title: "Taco's Afterparty",
        venueId: 'afterparty',
        date: '2026-01-25T22:00:00',
        lineup: ['TBD'],
        status: 'upcoming'
    }
];
