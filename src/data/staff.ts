import { StaffRole } from './types';

export const staffRoles: StaffRole[] = [
    {
        id: 'host',
        title: "Host / Greeter",
        description: "The face of the club. Welcome guests, manage instances, and keep the vibe friendly."
    },
    {
        id: 'security',
        title: "Moderator / Security",
        description: "Keep the peace. Handle crashers, resolve conflicts, and ensure everyone feels safe."
    },
    {
        id: 'dj',
        title: "DJ / Performer",
        description: "Control the sound. We're looking for diverse genres, from House to Hardstyle."
    },
    {
        id: 'visuals',
        title: "Visuals / VJ",
        description: "Light up the night. Control world shaders, stream video, or run light shows."
    },
    {
        id: 'media',
        title: "Photographer / Videographer",
        description: "Capture the memories. Take high-quality photos and clips for our socials."
    }
];
