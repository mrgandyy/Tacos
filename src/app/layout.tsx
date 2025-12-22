import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Taco's Nightlife | VRChat Circuit",
  description: "A connected series of worlds. Coordinated events. Tradition built after dark.",
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
