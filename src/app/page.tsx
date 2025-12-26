"use client";

import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlitchText } from "@/components/ui/GlitchText";
import { NeonContainer } from "@/components/ui/NeonContainer";
import { worlds } from "@/data/worlds";
import { events } from "@/data/events";
import { partners } from "@/data/partners";
import { ArrowRight, Calendar, Music, Zap, Skull, Radio, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const nextEvent = events.find(e => e.status === 'upcoming') || events[0];

  return (
    <div className="flex flex-col min-h-screen selection:bg-cyber-pink selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Container className="relative z-10 text-center space-y-8">
          <div className="flex flex-col items-center justify-center mb-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                <GlitchText text="TACO'S" />
                <span className="block text-4xl md:text-6xl text-cyber-pink mt-2" style={{ textShadow: "0 0 20px var(--color-cyber-pink)" }}>
                  NIGHTLIFE
                </span>
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 text-cyber-cyan text-sm tracking-widest uppercase">
              <span className="animate-pulse">/// System Online</span>
              <span>|</span>
              <span>Circuit Configured</span>
              <span>|</span>
              <span>VRCHAT</span>
            </div>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              The connected series of worlds. <br className="hidden md:block" />
              <span className="text-white bg-cyber-violet/20 px-2">Coordinated Chaos.</span> Tradition built after dark.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
          >
            <Button variant="solid" size="lg" className="bg-cyber-pink text-white hover:bg-cyber-pink/80 shadow-[0_0_20px_rgba(255,45,134,0.4)] border-none clip-path-slant" asChild>
              <Link href="/worlds">INITIATE SEQUENCE</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 hover:text-white shadow-[0_0_10px_rgba(56,214,255,0.2)]" asChild>
              <Link href="/events">VIEW LOGS</Link>
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* Worlds Grid */}
      <Section className="relative">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-magenta to-transparent opacity-50" />
        <Container>
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-4">
                <Zap className="text-cyber-yellow w-8 h-8" />
                THE CIRCUIT
              </h2>
              <p className="text-gray-400 text-sm">/// ACCESSING VENUE DATABASE...</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex text-cyber-cyan hover:text-white">
              <Link href="/worlds" className="gap-2">
                [VIEW_ALL] <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {worlds.map((world, index) => {
              const CardContent = (
                <NeonContainer
                  className="group p-0 overflow-hidden hover:scale-[1.03] transition-transform duration-300 h-full"
                  glowColor={index % 2 === 0 ? "pink" : "cyan"}
                >
                  <div className="h-40 w-full bg-black relative">
                    <Image
                      src={world.imageUrl}
                      alt={world.name}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
                    {/* Glitch Overlay on Hover */}
                    <div className="absolute inset-0 bg-cyber-pink/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-black/80 border border-cyber-cyan text-cyber-cyan text-[10px] backdrop-blur-md">
                        {world.shortName}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyber-pink transition-colors">{world.name}</h3>
                      <div className="w-12 h-1 bg-cyber-cyan mt-2" />
                    </div>

                    <p className="text-sm text-gray-400 line-clamp-2">
                      {world.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {world.bestFor.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] uppercase text-gray-500 border border-white/10 px-2 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </NeonContainer>
              );

              return world.socialLink ? (
                <Link key={world.id} href={world.socialLink} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {CardContent}
                </Link>
              ) : (
                <div key={world.id} className="h-full">
                  {CardContent}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Community Section */}
      <Section className="relative bg-black/40 border-y border-white/5">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden rounded-2xl border border-white/10 hover:border-cyber-pink/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-pink/20 to-transparent opacity-50" />
              <div className="p-8 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">COMMUNITY <span className="text-cyber-pink">DJs</span></h3>
                <p className="text-gray-400 mb-6">Explore the roster of resident and guest audio architects.</p>
                <Button variant="solid" className="bg-cyber-pink text-white hover:bg-cyber-pink/80" asChild>
                  <Link href="/djs">VIEW ROSTER</Link>
                </Button>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl border border-white/10 hover:border-cyber-green/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/20 to-transparent opacity-50" />
              <div className="p-8 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">PARTNERED <span className="text-cyber-green">GROUPS</span></h3>
                <p className="text-gray-400 mb-6">Discover the clubs and communities powering the circuit.</p>
                <Button variant="solid" className="bg-cyber-green text-black hover:bg-cyber-green/80" asChild>
                  <Link href="/partners">BROWSE GROUPS</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Next Event / Feature */}
      <Section className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -left-20 top-1/4 w-64 h-64 bg-cyber-violet/30 rounded-full blur-[100px]" />

        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 md:order-1">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white leading-tight">
                  MORE THAN A <span className="text-cyber-cyan">SIMULATION</span>
                </h2>
                <div className="h-px w-32 bg-gradient-to-r from-cyber-pink to-transparent" />
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                Taco's isn't just a map you load into. It's a living, breathing network.
                Events flow from node to node, managing energy levels all night long.
              </p>

              <div className="grid gap-6">
                {[
                  { icon: Radio, title: "SIGNAL DETECTED", desc: "Coordinated events flow seamlessly between venues." },
                  { icon: Skull, title: "UNDERGROUND", desc: "Join our Discord to connect with the core userbase." },
                  { icon: Zap, title: "VOLTAGE HIGH", desc: "Platform for DJs, VJs, and builders to showcase power." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="mt-1 h-12 w-12 flex-none bg-black border border-white/10 group-hover:border-cyber-cyan flex items-center justify-center text-gray-400 group-hover:text-cyber-cyan transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-cyber-cyan transition-colors">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Hologram */}
            <div className="order-1 md:order-2 relative perspective-1000">
              <NeonContainer glowColor="violet" className="transform rotate-y-12 transition-transform duration-500 hover:rotate-y-0">
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-cyber-violet mb-4 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm font-bold tracking-widest">NEXT_LIFECYCLE</span>
                    </div>
                    <span className="w-2 h-2 bg-cyber-violet rounded-full animate-pulse" />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1">{nextEvent.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(nextEvent.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 border-l-2 border-cyber-pink">
                    <div className="flex items-center gap-3 text-sm text-gray-300 mb-2">
                      <Music className="w-4 h-4 text-cyber-pink" />
                      <span>{nextEvent.lineup.join(" // ")}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Coordinates: <strong className="text-white">{worlds.find(w => w.id === nextEvent.venueId)?.name}</strong>
                    </p>
                  </div>

                  <Button variant="solid" className="w-full bg-cyber-violet text-white hover:bg-cyber-violet/80 font-bold tracking-wider" asChild>
                    <Link href="/events">ACCESS DETAILS</Link>
                  </Button>
                </div>
              </NeonContainer>
            </div>
          </div>
        </Container>
      </Section>

      {/* Partners Section */}
      <Section className="relative border-t border-white/5 bg-black/40">
        <Container>
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-4">
              <span className="text-cyber-cyan">OUR</span> PARTNERS
            </h2>
            <div className="h-1 w-20 bg-cyber-pink mx-auto" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powering the experience with industry-leading hardware and accessories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {partners.map((partner) => (
              <NeonContainer key={partner.id} glowColor="cyan" className="group h-full flex flex-col">
                <div className="relative h-48 w-full bg-white/5 p-8 flex items-center justify-center overflow-hidden">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-cyber-cyan/5 group-hover:bg-cyber-cyan/10 transition-colors" />

                  <div className="relative z-10 w-full h-full">
                    <Image
                      src={partner.imageUrl}
                      alt={partner.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col space-y-4 bg-black/40 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyber-cyan transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-gray-400 leading-relaxed flex-1">
                    {partner.description}
                  </p>

                  <Button variant="outline" className="w-full border-white/20 hover:border-cyber-cyan hover:bg-cyber-cyan/10 group-hover:border-cyber-cyan/50" asChild>
                    <Link href={partner.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      VISIT STORE <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </NeonContainer>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
