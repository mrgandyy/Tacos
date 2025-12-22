import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GridBackground } from "@/components/layout/GridBackground";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#FF2D86",
};

export const metadata: Metadata = {
  title: "Taco's Nightlife | VRChat Circuit",
  description: "A connected series of worlds. Coordinated events. Tradition built after dark.",
  metadataBase: new URL('https://tacos-nightlife.vercel.app'), // Best practice to set a base, using generic for now or local
  openGraph: {
    title: "Taco's Nightlife | VRChat Circuit",
    description: "A connected series of worlds. Coordinated events. Tradition built after dark.",
    siteName: "Taco's Nightlife",
    images: [
      {
        url: "/branding/logo-afterdark.png",
        width: 1200,
        height: 630,
        alt: "Taco's Nightlife Branding",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taco's Nightlife | VRChat Circuit",
    description: "A connected series of worlds. Coordinated events. Tradition built after dark.",
    images: ["/branding/logo-afterdark.png"],
  },
  icons: {
    icon: '/branding/logo-mark.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-brand-black text-foreground min-h-screen flex flex-col font-sans`}
      >
        <GridBackground />
        <Navbar />
        <main className="flex-grow pt-16 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
