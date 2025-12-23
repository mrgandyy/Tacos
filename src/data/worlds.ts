import { World } from './types';

export const worlds: World[] = [
    {
        id: 'underground',
        name: "Taco's Underground",
        shortName: "Underground",
        description: "Raw industrial energy. The bunker where the bass hits harder and the lights run red.",
        bestFor: ['Bass Music', 'Underground Vibes', 'High Energy'],
        imageUrl: '/branding/tacos-underground.png',
        color: '#FF2D86' // Pink
    },
    {
        id: 'afterdark',
        name: "Taco's Afterdark",
        shortName: "Afterdark",
        description: "The flagship club experience. Late-night dance floor, premium bar service, and top-tier DJs.",
        bestFor: ['Clubbing', 'Socializing', 'Top 40 / EDM'],
        imageUrl: '/branding/thumbnail-afterdark.png',
        color: '#38D6FF' // Cyan
    },
    {
        id: 'ascension',
        name: "Taco's Ascension",
        shortName: "Ascension",
        description: "Immersive rave environment. Visuals that melt reality and sound that elevates.",
        bestFor: ['Trance', 'Visual Trips', 'Peak Hours'],
        imageUrl: '/branding/tacos-ascension.jpg',
        color: '#7A3CFF' // Violet
    },
    {
        id: 'alley-cat',
        name: "The Alley Cat",
        shortName: "Alley Cat",
        description: "Secured by LOT1Z representing Viox. A hidden gem within the Alley Cat world.",
        bestFor: ['Chill', 'Vibes', 'Social'],
        imageUrl: '/branding/alley-cat.jpg',
        color: '#FFD700', // Gold
        socialLink: 'https://discord.gg/TFHAVSBcDM'
    },
    {
        id: 'afterparty',
        name: "Taco's Afterparty",
        shortName: "Afterparty",
        description: "The cooldown. Lounges, soft beats, and conversation as the sun comes up.",
        bestFor: ['Chilling', 'Conversation', 'Lofi / House'],
        imageUrl: '/branding/tacos-afterparty.png',
        color: '#FFFFFF'
    },
    {
        id: 'the-hood',
        name: "The Hood",
        shortName: "The Hood",
        description: "Street vibes and raw energy. The place for takeovers.",
        bestFor: ['Hip Hop', 'Street', 'Takeovers'],
        imageUrl: '/branding/thumbnail-the-hood.jpg',
        color: '#FF0000' // Red
    }
];
