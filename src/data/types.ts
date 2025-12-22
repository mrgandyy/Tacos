export interface World {
    id: string;
    name: string;
    shortName: string; // e.g., "Afterdark"
    description: string;
    bestFor: string[];
    imageUrl: string; // Placeholder or local asset path
    vrchatParams?: string; // Optional: launch params
    color: string; // Hex for accent
}

export interface Event {
    id: string;
    title: string;
    venueId: string; // References World.id
    date: string; // ISO string or distinct time
    lineup: string[];
    description?: string;
    status: 'upcoming' | 'live' | 'past';
    links?: {
        vrchat?: string;
        discord?: string;
    };
}

export interface StaffRole {
    id: string;
    title: string;
    description: string;
    count?: number; // Approximate size of team or "Many needed"
}

export interface SocialLink {
    id: string;
    platform: string;
    label: string;
    url: string;
    icon?: string; // Lucide icon name or similar
    color?: string;
}
