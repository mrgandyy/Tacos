import { World } from './types';

export const worlds: World[] = [
    {
        id: 'underground',
        name: "Taco's Underground",
        shortName: "Underground",
        description: "Raw industrial energy. The bunker where the bass hits harder and the lights run red.",
        bestFor: ['Bass Music', 'Underground Vibes', 'High Energy'],
        imageUrl: '/branding/logo-mark.png', // Temporary, ideally would be a screenshot
        color: '#FF2D86' // Pink
    },
    {
        id: 'afterdark',
        name: "Taco's Afterdark",
        shortName: "Afterdark",
        description: "The flagship club experience. Late-night dance floor, premium bar service, and top-tier DJs.",
        bestFor: ['Clubbing', 'Socializing', 'Top 40 / EDM'],
        imageUrl: '/branding/logo-afterdark.png',
        color: '#38D6FF' // Cyan
    },
    {
        id: 'ascension',
        name: "Taco's Ascension",
        shortName: "Ascension",
        description: "Immersive rave environment. Visuals that melt reality and sound that elevates.",
        bestFor: ['Trance', 'Visual Trips', 'Peak Hours'],
        imageUrl: '/branding/logo-mark.png',
        color: '#7A3CFF' // Violet
    },
    {
        id: 'afterparty',
        name: "Taco's AfterParty",
        shortName: "AfterParty",
        description: "The cooldown. Lounges, soft beats, and conversation as the sun comes up.",
        bestFor: ['Chilling', 'Conversation', 'Lofi / House'],
        imageUrl: '/branding/logo-mark.png',
        color: '#FFFFFF'
    }
];
