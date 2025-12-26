/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "cdn.discordapp.com" },
            { protocol: "https", hostname: "media.discordapp.net" },
            { protocol: "https", hostname: "img.youtube.com" },
            { protocol: "https", hostname: "placehold.co" },
            { protocol: "https", hostname: "github.com" },
            { protocol: "https", hostname: "**.supabase.co" },
        ],
    },
};

export default nextConfig;
